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

