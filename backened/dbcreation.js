const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'FeesBakaya';

// Create a new MongoClient


var classRollnumberRecord = [

  {
    classs: "Nursery",
    availableRollnumber: 1
  },
  {
    classs: "First",
    availableRollnumber: 1
  },
  {
    classs: "Second",
    availableRollnumber: 1
  },
  {
    classs: "Third",
    availableRollnumber: 1
  },
  {
    classs: "Fourth",
    availableRollnumber: 1
  },
  {
    classs: "Fifth",
    availableRollnumber: 1
  },
  {
    classs: "Sixth",
    availableRollnumber: 1
  },
  {
    classs: "Seventh",
    availableRollnumber: 1
  },
  {
    classs: "Eighth",
    availableRollnumber: 1
  },
  {
    classs: "Ninth",
    availableRollnumber: 1
  },
  {
    classs: "Eleventh",
    availableRollnumber: 1
  },
  {
    classs: "Twelfth",
    availableRollnumber: 1
  }
]



module.exports = {

  dbCreation: function () {

    MongoClient.connect(url, function (err, db) {
      if (err) {
        console.log("Error while collecting collection names");
        throw err;
      }

      var dbo = db.db("FeesBakya");
      dbo.collections().then(result => {
        var collectionSet = new Set();
        console.log("Already created collections!!");
        for (let i = 0; i < result.length; i++) {
          console.log(result[i].collectionName);
          collectionSet.add(result[i].collectionName);
        }

        if (!collectionSet.has("student_details")) {
          dbo.createCollection("student_details").then(result => {
            console.log("Student Details Collection created.");
          }).catch(err => {
            console.log("Error while creating Student Details.");
            throw err;
          })
        }

        if (!collectionSet.has("academic_sessions_increament_dates")) {
          dbo.createCollection("academic_sessions_increament_dates").then(result => {
            console.log("Academic Session Increament Dates Collection created.");
          }).catch(err => {
            console.log("Error while creating Academic Session Increament Dates.");
            throw err;
          })
        }

        if (!collectionSet.has("balance_credit_debit_details")) {
          dbo.createCollection("balance_credit_debit_details").then(result => {
            console.log("balance_credit_debit_details Collection created.");
          }).catch(err => {
            console.log("Error while creating balance_credit_debit_details.");
            throw err;
          })
        }

        if (!collectionSet.has("class_rollnumber_record")) {
          dbo.createCollection("class_rollnumber_record").then(result => {
            console.log("class_rollnumber_record Collection created.");
            result.insertMany(classRollnumberRecord).then(response => {
              console.log("Inserted roll number initialisation in class rollnumber records");
            }).catch(error => {
              console.log("Error in initialisation of class rollnumber records!!", error);
              throw error;
            })


          }).catch(err => {
            console.log("Error while creating class rollnumber records.", err);
            throw err;
          })
        }



        if (!collectionSet.has("fees_rules_details")) {
          dbo.createCollection("fees_rules_details").then(result => {
            console.log("fees_rules_details Collection created.");
          }).catch(err => {
            console.log("Error while creating fees_rules_details.");
            throw err;
          })
        }

        if (!collectionSet.has("fees_submission_details")) {
          dbo.createCollection("fees_submission_details").then(result => {
            console.log("fees_submission_details Collection created.");
          }).catch(err => {
            console.log("Error while creating fees_submission_details.");
            throw err;
          })
        }


        if (!collectionSet.has("students_balance_sheet")) {
          dbo.createCollection("students_balance_sheet").then(result => {
            console.log("students_balance_sheet Collection created.");
          }).catch(err => {
            console.log("Error while creating students_balance_sheet.");
            throw err;
          })
        }



      }).catch(err => {
        console.log(err);
      });
      db.close();


    });



  }
}