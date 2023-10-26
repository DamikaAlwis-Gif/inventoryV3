// verify the token
// find the role, user id

// if the role is technical officer or office clerk:
// query firstview: find count of available, checked out, under maintenance & out of order items

// if the role is student or staff member:
// query check_in_out_view: find count of checked-out items for user id,
//                          out of the checked-out items for user id, the closest date to check-in
// do the same with reservation_view

import express from "express";
import jwt from "jsonwebtoken";
import db from "../dataBase/db.js";

const dashboardRouter = express.Router();

const getVerification = (req, res, next) => {

  const token = req.cookies.token;
  const secret_key = "jwtSecret";

  if (!token) {
    return res.json({ error: "No token!"})
  } else {
    jwt.verify(token, secret_key, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.json({ error: "Not authorized!"});
      } else {
        console.log(decoded);
        req.user_id = decoded.user_id;
        next();
        // return res.json({ status: "OK", user_id: decoded.user_id, role: decoded.role});
      }
    })
  }
}

const getLabList = (req, res, next) => {
  console.log("\n\nHello from getLabList!")
  let labNames = [];

  const getLabsSql = "SELECT name FROM accessview WHERE user_id = ?;"
  db.query(getLabsSql, [req.user_id], (err, labData) => {

    if (err) {
      return res.json({ error: "An error occured while trying to query the database for 'labData'!" })

    } else {
      labNames = labData.map(row => row.name);
      console.log(labNames);
      req.labNames = labNames;
      next();
    }
  });
}

const getStatistics = (req, res) => {

      const labNames = req.labNames;
      const placeholders = labNames.map(() => '?').join(', ');
      req.placeholders = placeholders;

      const getStatsSql = `SELECT availability, COUNT(*) AS count FROM first_view WHERE lab_name IN (${placeholders}) GROUP BY availability`;

      db.query(getStatsSql, labNames, (err, statData) => {

        if (err) {
          console.log(err);
          return res.json({ error: "An error occured while trying to query the database for 'statData'!"})

        } else {
          console.log(statData);

          let finalStatData = {};
          statData.map((row) => {
            finalStatData[row.availability] = row.count;
          });
          console.log(finalStatData);

          return res.json({ 
            status: "OK",
            available: finalStatData['Available'],
            checkedOut: finalStatData['Checked out'],
            maintenance: finalStatData['Under maintenance'],
            outofOrder: finalStatData['Out of order']
          });
        }
      })
    }

// const getpersonalStatistics = (req, res) => {

// }

const getReservations = (req, res, next) => {

  const labNames = req.labNames;
  const placeholders = labNames.map(() => '?').join(', ');
  req.placeholders = placeholders;

  let dataArray = [];

  const getReservationsSql =
    `SELECT name, resource_id, lab_name, 'Reservation' as activity, DATE_FORMAT(start_date, '%d-%m-%Y %h:%i %p') AS due FROM reservation_view WHERE lab_name IN (${placeholders}) ORDER BY due LIMIT 10`;
    // AND start_date BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 7 DAY) 
  db.query(getReservationsSql, labNames, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'An error occurred while fetching reservation data.' });
    }

    // console.log("Reservations: ", result);
    result.map((row) => {
      dataArray.push(row);
    })
    // console.log(dataArray);
    req.labNames = labNames;
    req.dataArray = dataArray;
    next();
  });
};

const getMaintenance = (req, res, next) => {

  const labNames = req.labNames;
  let dataArray = req.dataArray;

  const getMaintenanceSql =
    `SELECT name, resource_id, lab_name, 'Maintenance' as activity, DATE_FORMAT(start_date, '%d-%m-%Y %h:%i %p') AS due FROM maintenance_view WHERE lab_name IN (${req.placeholders}) ORDER BY due LIMIT 10`;
    // AND start_date BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 7 DAY) 
  db.query(getMaintenanceSql, labNames, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'An error occurred while fetching maintenance data.' });
    }
    // console.log("Maintenance: ", result);
    result.map((row) => {
      dataArray.push(row);
    })
    // console.log(dataArray);
    req.labNames = labNames;
    req.dataArray = dataArray;
    next();
  });
};

const getCheckInOut = (req, res) => {

  const labNames = req.labNames;
  let dataArray = req.dataArray;

  const getCheckInOutSql = 
  `SELECT name, resource_id, lab_name, 'Check-in' as activity, DATE_FORMAT(due_datetime, '%d-%m-%Y %h:%i %p') AS due FROM check_in_out_view WHERE lab_name IN (${req.placeholders}) AND (status = 'checked-out' OR status = 'overdue') ORDER BY due LIMIT 10`;
  // AND (due_datetime BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 7 DAY) 
  db.query(getCheckInOutSql, labNames, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'An error occurred while fetching check-in/out data.' });
    }
    // console.log("CheckInOut: ", result);

    result.map((row) => {
      dataArray.push(row);
    })
    console.log(dataArray);
    dataArray.sort((a, b) => a.due - b.due);
    console.log(dataArray);
    res.json(dataArray);
  });
};

dashboardRouter.get("/", getVerification, getLabList, getStatistics);
dashboardRouter.get("/upcoming", getVerification, getLabList, getReservations, getMaintenance, getCheckInOut);
dashboardRouter.get("/verify", getVerification);
dashboardRouter.get("/data", getStatistics);

export default dashboardRouter;
