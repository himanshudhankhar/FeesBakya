const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'FeesBakaya';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err) {
  if(err){
    console.log(err);
    throw err;
  }
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db("FeesBakya");
    db.createCollection("student_details",function(error,collectn){
            if(error){
                console.log(error);
                return;
            }
            console.log("student table created",collectn.collectionName);
            
    client.close();
          });

   });


client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  const db = client.db("FeesBakya");
    db.createCollection("fees_submission_details",function(error,collectn){
            if(error){
                console.log(error);
                return;
            }
            console.log("fees submission table created",collectn.collectionName);
            client.close();
    });
});


client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db("FeesBakya");
    db.createCollection("fees_rules_details",function(error,collectn){
            if(error){
                console.log(error);
                return;
            }
            console.log("fees_rules table created",collectn.collectionName);
            client.close();
    });
 
});


client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db("FeesBakya");
    db.createCollection("academic_sessions_increament_dates",function(error,collectn){
            if(error){
                console.log(error);
                return;
            }
            console.log("academic session increament table created",collectn.collectionName);
            client.close();
    });
 
});



client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db("FeesBakya");
    db.createCollection("class_rollnumber_record",function(error,collectn){
            if(error){
                console.log(error);
                return;
            }
            collectn.insertMany([
            {
              classs:"Nursery",
              availableRollnumber:1
            },
            {
              classs:"First",
              availableRollnumber:1
            },
            {
              classs:"Second",
              availableRollnumber:1
            },
            {
              classs:"Third",
              availableRollnumber:1
            },{
              classs:"Fourth",
              availableRollnumber:1
            },{
              classs:"Fifth",
              availableRollnumber:1
            },{
              classs:"Sixth",
              availableRollnumber:1
            },{
              classs:"Seventh",
              availableRollnumber:1
            },{
              classs:"Eighth",
              availableRollnumber:1
            },{
              classs:"Ninth",
              availableRollnumber:1
            },{
              classs:"Tenth",
              availableRollnumber:1
            },{
              classs:"Eleventh",
              availableRollnumber:1
            },
            {
              classs:"Twelfth",
              availableRollnumber:1
            }
          
          
          ],function(rer,res){
            if(rer){
              throw rer;
            }

          })
            console.log("class_rollnumber_record table constructed",collectn.collectionName);
            client.close();
    });
 
});


client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db("FeesBakya");
    db.createCollection("balance_credit_debit_details",function(error,collectn){
            if(error){
                console.log(error);
                return;
            }
            console.log("balance_credit_debit_details table constructed",collectn.collectionName);
            client.close();
    });
 
});


client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  const db = client.db("FeesBakya");
    db.createCollection("students_balance_sheet",function(error,collectn){
            if(error){
                console.log(error);
                return;
            }
            console.log("students_balance_sheet created",collectn.collectionName);
            client.close();
    });
 
});

 