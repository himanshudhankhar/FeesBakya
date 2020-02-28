///////////////////////////////////////////////////////////////////////////////////////////
////Periodic service likhni baaki hai jo ki, balance sheet ko har mahine ki 1st tarik ko update kar de gi and add the deposit/balance and -ve amount to the account
//////////////////////////////////////////////////////////////////////////////////////////
/////Students_balance_sheet also contains active field if it is false means student is removed but still he has to pay the amount
const express = require('express');
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const app = express();
var series = require('async/series');
var async = require('async');
const port = process.env.PORT || 5000;
var validator = require('aadhaar-validator')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


async function rollnumberCheck(rollnumber){
  if(rollnumber==undefined||rollnumber==null||!validRollNumber(rollnumber)){
    return false;
  }
  let strength = rollnumber.substr(6, 3);
  let classs = rollnumber.substr(0,2);
  var classess = {
    'Nr': "Nursery",
    'Lk': "LKG",
    'Uk': "UKG",
    'Fi': 'First',
    'Se': 'Second',
    'Th': "Third",
    'Fu': 'Fourth',
    'Fi': "Fifth",
    'Sx': "Sixth",
    'Sv': "Seventh",
    "Eg": 'Eighth',
    'Nn': "Ninth",
    'Tn': "Tenth",
    'El': "Eleventh",
    "Tw": "Twelfth"
  }
  classs = classess[classs];
  let prom = new Promise((resolve,reject)=>{
  MongoClient.connect(url, function (err, db) {
    if (err){
      res.send({
        error:true,
        success:false,
        errorMEssage:"Some critical Error in DB"
      })
throw err;
    } 
    var dbo = db.db("FeesBakya");
     
    dbo.collection("class_rollnumber_record").findOne({classs:classs}, function (err, resp) {
      if (err) {
        res.send({
          error: true,
          success: false,
          errorMessage: "DataBase Error"
        });
        reject(err);
      }
      console.log(resp);
      db.close();
       resolve(resp);
     
    });
  });

});

let result = await prom;
return result.availableRollnumber>strength;

}  

function abs(value){
  if(value<0){
    return -value;
  }else{
    return value;
  }
}


function updateClassRollNumberRecordByOne(classs) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("FeesBakya");
    dbo.collection("class_rollnumber_record").updateOne({
      "classs": classs
    }, {
      $inc: {
        availableRollnumber: 1
      }
    }, function (err, resp) {
      if (err) {
        throw err;
      }
      db.close();
    });
  });
}







function validRollNumber(rollnumber) {

  //first 2 characters  must be from a set
  //next 4 characters must be a  means must be a number'
  // next 3 characters must be a number
  if (rollnumber == undefined || rollnumber == null) {
    return false;
  }
  rollnumber = rollnumber.toString().trim();
  if (rollnumber.length != 9) {
    console.log(rollnumber.length);
    return false;
  } else {
    console.log("bhai sahab", rollnumber);
  }
  let classs = rollnumber.substr(0, 2);
  let year = rollnumber.substr(2, 4);
  let strength = rollnumber.substr(6, 3);

  var classes = new Set([
    'Nr',
    'Lk',
    'Uk',
    'Fi',
    'Se',
    'Th',
    'Fu',
    'Fi',
    'Sx',
    'Sv',
    "Eg",
    'Nn',
    'Tn',
    'El',
    "Tw"
  ]);
  if (!classes.has((classs))) {
    console.log("False rollnumber");
    return false;
  }
  var classess = {
    'Nr': "Nursery",
    'Lk': "LKG",
    'Uk': "UKG",
    'Fi': 'First',
    'Se': 'Second',
    'Th': "Third",
    'Fu': 'Fourth',
    'Fi': "Fifth",
    'Sx': "Sixth",
    'Sv': "Seventh",
    "Eg": 'Eighth',
    'Nn': "Ninth",
    'Tn': "Tenth",
    'El': "Eleventh",
    "Tw": "Twelfth"
  }

  var numbers = /^[0-9]+$/;
  if (!year.match(numbers)) {
    return false;
  } else if (parseInt(year) > new Date().getFullYear() || parseInt(year) < 1900) {
    return false;
  }
  if (!strength.match(numbers)) {
    return false;
  }
  console.log("Bhai shab rollnumber sahi hai!!")
  //now check whether that number is valid for that class or not
  return true;
  //assumend that the rollnumber regex matches here.

}

function validMobile(inputtxt) {
  var phoneno = /^\d{10}$/;
  if (inputtxt.match(phoneno)) {
    return true;
  } else {
    return false;
  }

}

function validAadhar(aadhaarNumber) {
  return validator.isValidNumber(aadhaarNumber);
}

// First demo apis for testing ..........................................................................
app.get('/api/hello', (req, res) => {
  res.send({
    express: 'Hello From Express'
  });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

// All important Post requests .............................................................................
//1. register student
app.post('/register_student', (req, res) => {
  console.log(req.body);
  // student_details must include{
  //     student_name,
  //     fathers_name,
  //     mothers_name,
  //     dob,
  //     doe,
  //     gender,
  //     classs,
  //     address,
  //     studentAadhar,
  //     fathersAadhar,
  //     mobile,
  //     village,
  //     district,
  //     rollNumber,
  //     image_url
  // }
  //here we have to send request to db to register student
  var student_details = req.body;
  if (student_details == undefined) {
    res.send({
      success: false,
      error: true,
      errorMesage: "student details undefined"
    });
    return;
  }

  if (student_details.student_name == undefined || student_details.student_name == null || student_details.student_name.length == 0) {
    res.send({
      success: false,
      error: true,
      errorMesage: "student name empty"
    });
    return;
  }


  if (student_details.fathers_name == undefined || student_details.fathers_name == null || student_details.fathers_name.length == 0) {
    res.send({
      success: false,
      error: true,
      errorMesage: "fathers name empty"
    });
    return;
  }

  if (student_details.mothers_name == undefined || student_details.mothers_name == null || student_details.mothers_name.length == 0) {
    res.send({
      success: false,
      error: true,
      errorMesage: "mothers name empty"
    });
    return;
  }


  if (student_details.dob == undefined || student_details.dob == null || student_details.dob.length == 0) {
    res.send({
      success: false,
      error: true,
      errorMesage: "date of birth empty"
    });
    return;
  }
  if (student_details.doe == undefined || student_details.doe == null || student_details.doe.length == 0) {
    res.send({
      success: false,
      error: true,
      errorMesage: "date of enrollment empty"
    });
    return;
  }

  if (student_details.gender == undefined || student_details.gender == null || student_details.gender.length == 0) {
    res.send({
      success: false,
      error: true,
      errorMesage: "gender of student empty"
    });
    return;
  }
  if (student_details.address == undefined || student_details.address == null || student_details.address.length == 0) {
    res.send({
      success: false,
      error: true,
      errorMesage: "address empty"
    });
    return;
  }
  if (student_details.studentAadhar == undefined || student_details.studentAadhar == null || student_details.studentAadhar.length == 0) {
    res.send({
      success: false,
      error: true,
      errorMesage: "student aadhar empty"
    });
    return;
  }

  if (student_details.fathersAadhar == undefined || student_details.fathersAadhar == null || student_details.fathersAadhar.length == 0) {
    res.send({
      success: false,
      error: true,
      errorMesage: "fathers aadhar empty"
    });
    return;
  }

  if (student_details.classs == undefined || student_details.classs == null || student_details.classs.length == 0) {
    res.send({
      success: false,
      error: true,
      errorMesage: "class of admission empty"
    });
    return;
  }

  if (student_details.mobileNumber == undefined || student_details.mobileNumber == null || student_details.mobileNumber.length == 0) {
    res.send({
      success: false,
      error: true,
      errorMesage: "mobile number empty"
    });
    return;
  }
  if (!validMobile(student_details.mobileNumber)) {
    res.send({
      success: false,
      error: true,
      errorMesage: "mobile number not valid"
    });
    return;
  }
  if (!validAadhar(student_details.studentAadhar)) {
    res.send({
      success: false,
      error: true,
      errorMesage: "students aadhar not valid"
    });
    return;
  }
  if (!validAadhar(student_details.fathersAadhar)) {
    res.send({
      success: false,
      error: true,
      errorMesage: "father's aadhar not valid"
    });
    return;
  }
  if (student_details.rollnumber == undefined || student_details.rollnumber == null || student_details.rollnumber.length == 0) {
    res.send({
      success: false,
      error: true,
      errorMesage: "roll number empty"
    });
    return;
  }

  if (!validRollNumber(student_details.rollnumber)) {
    res.send({
      success: false,
      error: true,
      errorMessage: "roll number not valid"
    });
    return;
  }
  var classess = {
    'Nr': "Nursery",
    'Lk': "LKG",
    'Uk': "UKG",
    'Fi': 'First',
    'Se': 'Second',
    'Th': "Third",
    'Fu': 'Fourth',
    'Fi': "Fifth",
    'Sx': "Sixth",
    'Sv': "Seventh",
    "Eg": 'Eighth',
    'Nn': "Ninth",
    'Tn': "Tenth",
    'El': "Eleventh",
    "Tw": "Twelfth"
  }
  if (classess[student_details.rollnumber.substr(0, 2)] == student_details.classs) {
    console.log("sahi class hai rollnumber k hisab se!!");
  } else {
    res.send({
      error: true,
      success: false,
      errorMessage: "Rollnumber and class at time of registration doesn't match!!"
    });
    return;
  }
  //here we have to send entry to db
  student_details['active'] = true;
  async.series([

      function (callback) {
        //here check if that rollnumber exists or not in database
        MongoClient.connect(url, function (err, db) {
          if (err) throw err;
          var dbo = db.db("FeesBakya");
          var rollNumber = student_details.rollnumber;
          dbo.collection("student_details").findOne({
            "rollnumber": rollNumber
          }, function (errors, results) {
            if (errors) {
              res.send({
                error: true,
                success: false,
                errorMessage: "Error SomeWhere in DataBase"
              });
              throw errors;
            }
            console.log("Results for findings", results);
            if (results == null) {
              callback(null, true);
            } else {
              callback(null, false);
            }
            db.close();
          })
        });
      }
    ],
    function (err, results) {
      if (err) {
        res.send({
          success: false,
          error: true,
          errorMessage: "SomeWhere in database there is an error!!"
        });
        throw err;
      }

      if (results[0] == false) {
        console.log(results[0]);
        res.send({
          error: true,
          success: false,
          errorMessage: "Rollnumber already exists in databse!!"
        });
        return;
      }
      MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("FeesBakya");
        var myobj = student_details;
        dbo.collection("student_details").insertOne(myobj, function (err, resp) {
          if (err) {
            res.send({
              error: true,
              success: false,
              errorMessage: "DataBase Error"
            });
            throw err;
          }

          console.log("student registerd"); //add 0 balance to the balaance sheet as well
          var newBalanceHolder = {
            rollnumber: student_details.rollnumber,
            amountTotal: 0,
            classs: student_details.classs,
            active: true
          }
          dbo.collection("students_balance_sheet").insertOne(newBalanceHolder, function (errors, respp) {
            if (errors) {
              res.send({
                error: true,
                success: false,
                errorMessage: "Critical Database Error"
              });
              throw errors;
            }
            res.send({
              success: true,
              error: false,
              successMessage: "Student Added to registery as well as BalanceSheet"
            });
            updateClassRollNumberRecordByOne(student_details.classs);
            db.close();
          });
        });
      });

    });
  ///db part done

});

//2. confirm fees deposit
app.post('/confirm_fees_deposit', (req, res) => {
  console.log(req.body.feesPaymentData);
  // fees payment data includes{
  //     feesAmount,
  //     payment date,
  //     rollnumber,
  // }
  var feesPaymentData = req.body.feesPaymentData;



  if (feesPaymentData.feesAmount == undefined || feesPaymentData.feesAmount == null || feesPaymentData.feesAmount.length == 0) {
    res.send({
      success: false,
      error: true,
      errorMesage: "Fees Amount not entered"
    });
    return;
  }

  if (feesPaymentData.paymentDate == undefined || feesPaymentData.paymentDate == null || feesPaymentData.paymentDate.length == 0) {
    res.send({
      success: false,
      error: true,
      errorMesage: "Fees Payment Date not specified"
    });
    return;
  }

  if (feesPaymentData.rollnumber == undefined || feesPaymentData.rollnumber == null || feesPaymentData.rollnumber.length == 0) {
    res.send({
      success: false,
      error: true,
      errorMesage: "Payer's rollnumber not specified!!"
    });
    return;
  }
  // add payment to db

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("FeesBakya");
    var myobj = feesPaymentData;
    dbo.collection("fees_submission_details").insertOne(myobj, function (err, resp) {
      if (err) {
        res.send({
          error: true,
          success: false,
          errorMessage: "DataBase Error"
        });
        throw err;
      }
      dbo.collection("students_balance_sheet").findOne({
        rollnumber: feesPaymentData.rollnumberr
      }, (errorr, respp) => {
        if (errorr) {
          res.send({
            error: true,
            success: false,
            errorMessage: "DataBase Error"
          });
          dbo.collection("fees_submission_details").deleteOne({
            _id: resp._id
          }, (erroring, resposnse) => {
            if (erroring) {
              res.send({
                error: true,
                success: false,
                errorMessage: "critial DataBase Error while reading from balance sheet!!"
              });
              console.log("Big failure!!");
              throw erroring;
            }
          });

          console.log("write in fees submission but not in students balance sheet!!");
          throw errorr;
        }
        //no error suppose
        var initialAmount = respp.amountTotal; // here error can come
        db.collection("students_balance_sheet").updateOne({
          rollnumber: respp.rollnumber
        }, {
          $set: {
            amountTotal: parseInt(initialAmount) + parseInt(feesPaymentData.feesAmount)
          }
        }, (eror, reesp) => {
          if (eror) {
            res.send({
              error: true,
              success: false,
              errorMessage: "DataBase Error"
            });
            dbo.collection("fees_submission_details").deleteOne({
              _id: resp._id
            }, (erroring, resposnse) => {
              if (erroring) {
                res.send({
                  error: true,
                  success: false,
                  errorMessage: "critial DataBase Error while writing in balance sheet"
                });
                console.log("Big failure!!");
                throw erroring;
              }
            });

            console.log("write in fees submission but not in students balance sheet!!");
            throw eror;
          }

          //you have updated successfully 
          res.send({
            error: false,
            success: true,
            successMessage: "successfuly updated balance sheet and fees transaction!!"
          });
          //done here all parts
        });
      })
    });
  });

  // part done.
});


//3. Add Fees Rule
app.post('/add_fees_rule', (req, res) => {
  console.log(req.body.feesRuleData);
  // fees rule data {
  //     classs,
  //     dateOfImplementation,
  //     feesAmount,
  // }
  var feesRuleData = req.body.feesRuleData;
  if (feesRuleData.classs == undefined || feesRuleData.classs == null || feesRuleData.classs.length == 0) {
    res.send({
      success: false,
      error: true,
      errorMesage: "class not specified!!"
    });
    return;
  }
  if (feesRuleData.dateOfImplementation == undefined || feesRuleData.dateOfImplementation == null || feesRuleData.dateOfImplementation.length == 0) {
    res.send({
      success: false,
      error: true,
      errorMesage: "date of implementation not specified!!"
    });

    return;
  }
  if (feesRuleData.feesAmount == undefined || feesRuleData.feesAmount == null || feesRuleData.feesAmount.length == 0) {
    res.send({
      success: false,
      error: true,
      errorMesage: "fees amount not specified!!"
    })
    return;
  }
  //here we have to make second one inactive and make one more entry

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("FeesBakya");
    var myparams = {
      classs: feesRuleData.classs,
      active:true
    };
    var newvalues = {
      $set: {
        active: false,
        endDate: feesRuleData.dateOfImplementation
      }
    };
    dbo.collection("fees_rules_details").updateOne(myparams, newvalues, function (err, resp) {
      if (err) {
        res.send({
          error: true,
          success: false,
          errorMessage: "DataBase Error"
        });
        throw err;
      }
      console.log("rule upadted first");

      feesRuleData['active'] = true;
      feesRuleData['endDate'] = null;
      var myobj = feesRuleData;
      dbo.collection("fees_rules_details").insertOne(myobj, function (err, resp) {
        if (err) {
          res.send({
            error: true,
            success: false,
            errorMessage: "DataBase Error"
          });
          throw err;
        }
        res.send({
          success: true,
          error: false,
          errorMessage: "",
          feesPaymentData: feesRuleData,
          successMessage:"New Fees Rule will be implemented by next Month's 1st Date"
        });
        console.log("fees rule accepted");
        db.close();
      });

    });
    //Fees Rules Data added to D
  });

});




//4. Add Balance
app.post('/deposit_balance', (req, res) => {
  console.log(req.body.depositExtraBalance);
  // deposit balance includes{
  //     rollnumber,
  //     amount,
  //     comment,
  //     take_or_give,
  //     paymentDate,
  // }
  var depositExtraBalance = req.body.depositExtraBalance;

  if (depositExtraBalance.rollnumber == undefined || depositExtraBalance.rollnumber == null || depositExtraBalance.rollnumber.length == 0 || !validRollNumber(depositExtraBalance.rollnumber)) {
    res.send({
      error: true,
      success: false,
      errorMessage: "roll number not specified!!"
    });
    return;
  }
  if (depositExtraBalance.comment == undefined || depositExtraBalance.comment == null || depositExtraBalance.comment.length == 0) {
    res.send({
      error: true,
      success: false,
      errorMessage: "comment not specified!!"
    });
    return;
  }

  if (depositExtraBalance.amount == undefined || depositExtraBalance.amount == null || depositExtraBalance.amount.length == 0) {
    res.send({
      error: true,
      success: false,
      errorMessage: "amount not specified!!"
    });
    return;
  }

  if (depositExtraBalance.take_or_give == undefined || depositExtraBalance.take_or_give == null || depositExtraBalance.take_or_give.length == 0) {
    res.send({
      error: true,
      success: false,
      errorMessage: "take or give not specified!!"
    });
    return;
  }
  if (depositExtraBalance.paymentDate == undefined || depositExtraBalance.paymentDate == null || depositExtraBalance.paymentDate.length == 0) {
    res.send({
      error: true,
      success: false,
      errorMessage: "payment date not specified!!"
    });
    return;
  }

  rollnumberCheck(depositExtraBalance.rollnumber).then(outPut=>{
    console.log(outPut);
    if(outPut==false){
      res.send({
        error:true,
        errorMessage:"Roll Number Invalid!!",
        success:false
      });
      return;
    }
 


  //check whether that rollnumber exists or not;
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("FeesBakya");
    var myobj = depositExtraBalance;
    //you have to make it positive or negative
    if (myobj.take_or_give == "take") {
      //uss se lene hain then make amount negative
      myobj.amount = -abs(myobj.amount);
    } else {
      myobj.amount = abs(myobj.amount);
    }
    dbo.collection("balance_credit_debit_details").insertOne(myobj, function (err, resp) {
      if (err) {
        res.send({
          error: true,
          success: false,
          errorMessage: "DataBase Error"
        });
        throw err;
      }
      dbo.collection("students_balance_sheet").findOneAndUpdate({
        rollnumber: myobj.rollnumber
      }, {
        $inc: {
          amountTotal: myobj.amount
        }
      }, (erorrr, resppp) => {
        if (erorrr) {
          res.send({
            error: true,
            success: false,
            errorMessage: "Critical database error!!"
          });
          throw erorrr;
        }

        res.send({
          error:false,
          success:true,
          successMessage:"Balance added to credit/debit and student balance sheet"
        });

      })
    });
  });
  //balance credit debit


}).catch(err=>{
  res.send({
    error:true,
    errorMessage:"Some error in DB",
    success:false
  });
  return;
})
});
//5. Remove Student Confirmation
app.post('/removeStudentConfirmation', (req, res) => {
  console.log(req.body.removedStudentDetails);
  // removed student details inclue{
  //     rollnumber
  // }
  var removedStudentDetails = req.body.removedStudentDetails;
  if (removedStudentDetails.rollnumber == undefined || removedStudentDetails.rollnumber == null || removedStudentDetails.rollnumber.length == 0 || !validRollNumber(removedStudentDetails.rollnumber)) {
    res.send({
      error: true,
      success: false,
      errorMessage: "roll number not specified or not valid!!"
    });
    return;
  }

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("FeesBakya");
    var myparams = {
      rollnumber: removedStudentDetails.rollnumber
    };
    var newvalues = {
      $set: {
        active: false,
        dode: new Date().toUTCString()
      }
    };
    dbo.collection("student_details").findOneAndUpdate(myparams, newvalues, function (err, resp) {
      if (err) {
        res.send({
          error: true,
          success: false,
          errorMessage: "database errror"
        });
        throw err;
      } //remove it from balance sheet as well
      var newwValues = {
        $set: {
          active: false
        }
      }
      let studentDetails = resp.value;
      dbo.collection("students_balance_sheet").updateOne({
        rollnumber: myparams.rollnumber
      }, newwValues, function (erorr, respp) {
        if (erorr) {
          res.send({
            error: true,
            success: false,
            errorMessage: "Critical Database updation error!!"
          });
          throw erorr;
        }

        res.send({
          success: true,
          error: false,
          successMessage: "Made Student inactive, it may be a defaulter",
          studentDetails: studentDetails
        });
        db.close();
      });
    });
  });
  //done here

});


//6.add new academic session
app.post('/add_new_academic_session', (req, res) => {
  console.log(req.body.newAcademicSession);
  var newAcadmeicSession = req.body.newAcadmeicSession;
  // newAcadmic session includes{
  //     startdate,
  //     classs.
  // }
  if (newAcadmeicSession.startDate == undefined || newAcadmeicSession.startDate == null || newAcadmeicSession.startDate.length == 0) {
    res.send({
      error: true,
      success: false,
      errorMessage: "Start Date not specified"
    });
    return;
  }
  if (newAcadmeicSession.classs == undefined || newAcadmeicSession.classs == null || newAcadmeicSession.length == 0) {
    res.send({
      error: true,
      success: false,
      errorMessage: "class not specified"
    });
    return;
  }


  newAcadmeicSession['active'] = true,
    newAcadmeicSession['endDate'] = null;

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("FeesBakya");
    var myparams = {
      classs: newAcadmeicSession.classs,
    };
    var newvalues = {
      $set: {
        active: false,
        endDate: newAcadmeicSession.startDate
      }
    };
    dbo.collection("academic_sessions_increament_dates").updateOne(myparams, newvalues, function (err, resp) {
      if (err) {
        res.send({
          error: true,
          success: false,
          errorMessage: "database errror"
        });
        throw err;
      }
      console.log("academic session updated");
      dbo.collection("academic_sessions_increament_dates").insertOne(newAcadmeicSession, function (err, resp) {
        if (err) {
          res.send({
            error: true,
            success: false,
            errorMessage: "DataBase Error"
          });
          throw err;
        }
        res.send({
          success: true,
          error: false,
          errorMessage: "",
          academicSession: newAcadmeicSession,
        });
        console.log("new rule added");
        db.close();
      });

    });
  });



});
//7. modify student details
app.post('/modifyStudentDetails', (req, res) => {
  console.log(req.body.modifyStudentDetails);
  var modifyStudentDetails = req.body.modifyStudentDetails;
  // modify student details include{
  //  roll number 
  // }
  if (modifyStudentDetails == undefined || modifyStudentDetails == null) {
    res.send({
      error: true,
      success: false,
      errorMessage: "provide student details"
    });
    return;
  }
  if (modifyStudentDetails.rollnumber == undefined || modifyStudentDetails.rollnumber == null || modifyStudentDetails.rollnumber.length == 0) {
    res.send({
      error: true,
      success: false,
      errorMessage: "roll number not specified"
    });
    return;
  }

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("FeesBakya");
    var myparams = {
      rollnumber: modifyStudentDetails.rollnumber
    };
    var newvalues = {
      $set: modifyStudentDetails
    };
    dbo.collection("student_details").updateOne(myparams, newvalues, function (err, resp) {

      if (err) {
        res.send({
          error: true,
          success: false,
          errorMessage: "database errror"
        });
        throw err;
      }

      console.log("student modified easily");
      db.close();
    });
  });

  //student details modified

});
//8. delete the added fees rule ( rule number should be provided).
app.post('/deleteAddedFeesRule', (req, res) => {
  console.log(req.body.deleteAddedFeesRule);
  var deleteAddedFeesRule = req.body.deleteAddedFeesRule;
  //    delete Added Fees Rule includes {
  //    classs, (active rule right now)
  //    }
  if (deleteAddedFeesRule.classs == undefined || deleteAddedFeesRule.classs == null || deleteAddedFeesRule.classs.length == 0) {
    res.send({
      error: true,
      success: false,
      errorMessage: "class not specified"
    });
    return;
  }
  if (deleteAddedFeesRule.startDate == undefined || deleteAddedFeesRule.startDate == null || deleteAddedFeesRule.startDate.length == 0) {
    res.send({
      error: true,
      success: false,
      errorMessage: "start date not specified"
    });
    return;
  }
  //delete first and then make update

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("FeesBakya");
    var myparams = {
      classs: deleteAddedFeesRule.classs,
      active: true
    };
    dbo.collection("fees_rules_details").deleteOne(myparams, function (err, obj) {
      if (err) {
        res.send({
          error: true,
          success: false,
          errorMessage: "database error"
        });
        throw err;
      }
      console.log("active fees rule deleted");
      var mparams = {
        classs: deleteAddedFeesRule.classs,
        endDate: deleteAddedFeesRule.startDate
      }
      var newvalues = {
        $set: {
          endDate: null,
          active: true
        }
      }
      dbo.collection("fees_rules_details").updateOne(mparams, newvalues, function (err, res) {
        if (err) throw err;
        console.log("updated last fees rule");
        db.close();
      });
    });
  });

});
//9. delete the added acadmeic starting time
app.post('/deleteAddedAcademicSessionRule', (req, res) => {
  console.log(req.body.deleteAddedAcademicSessionRule);
  var deleteAddedAcademicSessionRule = req.body.deleteAddedAcademicSessionRule;
  if (deleteAddedAcademicSessionRule.classs == undefined || deleteAddedAcademicSessionRule.classs == null || deleteAddedAcademicSessionRule.classs.length == 0) {
    res.send({
      error: true,
      success: false,
      errorMessage: "class not specified!!"
    });
    return;
  }

  if (deleteAddedAcademicSessionRule.startDate == undefined || deleteAddedAcademicSessionRule.startDate == null || deleteAddedAcademicSessionRule.startDate.length == 0) {
    res.send({
      error: true,
      success: false,
      errorMessage: "start date not specified!!"
    });
    return;
  }


  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("FeesBakya");
    var myparams = {
      classs: deleteAddedAcademicSessionRule.classs,
      active: true
    };
    dbo.collection("academic_sessions_increament_dates").deleteOne(myparams, function (err, obj) {
      if (err) {
        res.send({
          error: true,
          success: false,
          errorMessage: "database error"
        });
        throw err;
      }
      console.log("active session rule deleted");
      var mparams = {
        classs: deleteAddedAcademicSessionRule.classs,
        endDate: deleteAddedAcademicSessionRule.startDate
      }
      var newvalues = {
        $set: {
          endDate: null,
          active: true
        }
      }
      dbo.collection("academic_sessions_increament_dates").updateOne(mparams, newvalues, function (err, res) {
        if (err) throw err;
        console.log("updated last session rule");
        db.close();
      });
    });
  });



});



//GET requests important ...................................................................................................
//1. is rollnumber available
app.get('/isRollNumberAvailable/:rollnumber', (req, res) => {
  //use class_rollnumber_record

  var rollnumber = req.params.rollnumber.toString();
  //now check the  Se2016054
  if (rollnumber == undefined || rollnumber == null || !validRollNumber(rollnumber)) {
    res.send({
      error: true,
      success: false,
      errorMessage: "roll number not valid!!"
    });
    return;
  }

  var askedNumbering = parseInt(rollnumber.substring(6, 9));
  var classes = {
    'Nr': "Nursery",
    'Lk': "LKG",
    'Uk': "UKG",
    'Fi': 'First',
    'Se': 'Second',
    'Th': "Third",
    'Fu': 'Fourth',
    'Fi': "Fifth",
    'Sx': "Sixth",
    'Sv': "Seventh",
    "Eg": 'Eighth',
    'Nn': "Ninth",
    'Tn': "Tenth",
    'El': "Eleventh",
    "Tw": "Twelfth"
  }

  MongoClient.connect(url, function (err, db) {
    if (err) {
      res.send({
        error: true,
        success: false,
        errorMessage: "database connection error"
      });
      throw err
    };
    var dbo = db.db("FeesBakya");
    dbo.collection("class_rollnumber_record").findOne({
      classs: classes[rollnumber.substr(0, 2)]
    }, function (err, result) {
      if (err) {
        res.send({
          error: true,
          success: false,
          errorMessage: "database error!!"
        });
        throw err;
      }
      console.log(result.availableRollnumber);
      var rolls = parseInt(result.availableRollnumber); //you have to store the number not the rollnumber
      if (rolls == askedNumbering) {
        res.send({
          error: false,
          success: true,
          successMessage: "Available"
        });
      } else {
        res.send({
          error: true,
          success: false,
          errorMessage: "Not Available!!"
        });
      }
      db.close();
    });
  });


  //res.send("maybe available"+req.params.rollnumber);

});
//2. get rollnumber for class z
app.get('/getRollNumber/:classs/:year(\\d+)/', (req, res) => {
  var classes = req.params.classs;
  if (classes == undefined || classes == null || classes.length == 0) {
    res.send({
      error: true,
      success: false,
      errorMessage: "class not specified!!"
    });
    return;
  }

  var year = parseInt(req.params.year);
  if (year == undefined || year == null || year > new Date().getFullYear() || year < 2000) {
    res.send({
      error: true,
      success: false,
      errorMessage: "Invalid year of enrollment!!"
    });
    return;
  }


  var classess = {
    'Nr': 'Nursery',
    'Lk': "LKG",
    'Uk': "UKG",
    'Fi': 'First',
    'Se': 'Second',
    'Th': "Third",
    'Fu': 'Fourth',
    'Fi': "Fifth",
    'Sx': "Sixth",
    'Sv': "Seventh",
    "Eg": 'Eighth',
    'Nn': "Ninth",
    'Tn': "Tenth",
    'El': "Eleventh",
    "Tw": "Twelfth"
  }
  var classSet = new Set([
    'Nr',
    'Lk',
    'Uk',
    'Fi',
    'Se',
    'Th',
    'Fu',
    'Fi',
    'Sx',
    'Sv',
    "Eg",
    'Nn',
    'Tn',
    'El',
    "Tw"
  ])
  if (!classSet.has(classes)) {
    res.send({
      error: true,
      errorMessage: "Invalid Class Specified!!",
      success: false
    });
    return;
  }
  var varr = classess[classes];

  if (varr == undefined || varr == null || varr.length == 0) {
    res.send({
      error: true,
      success: false,
      errorMessage: "invalid class specified!!"
    });
    return;
  }
  MongoClient.connect(url, function (err, db) {
    if (err) {
      res.send({
        error: true,
        success: false,
        errorMessage: "database connection error"
      });
      throw err
    };
    var dbo = db.db("FeesBakya");
    dbo.collection("class_rollnumber_record").findOne({
      classs: varr
    }, function (err, result) {
      if (err) {
        res.send({
          error: true,
          success: false,
          errorMessage: "database error!!"
        });
        throw err;
      }
      if (result == undefined || result == null) {
        res.send({
          error: true,
          success: false,
          errorMessage: "undefined search result"
        });

      } else {
        var numberr = result.availableRollnumber;
        if (numberr == undefined || numberr == null) {
          res.send({
            error: true,
            success: false,
            errorMessage: "some strange error"
          });
        } else {
          var num = parseInt(numberr);
          if (num < 100 && num >= 10) {
            numberr = '0' + numberr.toString();
          } else if (num < 10) {
            numberr = '00' + numberr.toString();
          }
          res.send({
            error: false,
            success: true,
            errorMessage: "",
            successMessage: classes + year + numberr
          });
        }
      }
      db.close();
    });
  });

});
//3. total students year.
app.get('/getTotalActiveStudentsFromYear/:year', (req, res) => {
  console.log((req.params));
  var yr = req.params.year;
  if (yr == undefined || yr == null || yr.length == 0) {
    res.send({
      error: true,
      success: false,
      errorMessage: "Year not specified!!",
    });
    return;
  }

  // all active students with year in doe is smaller than year specified;
  //db params for finding all the students who are active 

  MongoClient.connect(url, function (err, db) {
    if (err) {
      res.send({
        error: true,
        success: false,
        errorMessage: "database connection error"
      });
      throw err
    };
    var dbo = db.db("FeesBakya");
    dbo.collection("student_details").find({
      active: true
    }, function (err, result) {
      if (err) {
        res.send({
          error: true,
          success: false,
          errorMessage: "database error!!"
        });
        throw err;
      }
      //result will be an array of collections
      //it is assumed that some of the students will be active there
      var countTotalInYr = 0;
      for (let i = 0; i < result.length; i++) {
        if (parseInt(Date(result[i].doe).getFullYear().toString()) <= parseInt(yr)) {
          countTotalInYr += 1;
        }
      }
      dbo.collection("student_details").find({
        active: false
      }, function (err, reslt) {
        if (err) {
          res.send({
            error: true,
            success: false,
            errorMessage: "database error!!"
          });
          throw err;
        }
        for (let i = 0; i < reslt.length; i++) {
          if (parseInt(Date(reslt[i].dode).getFullYear().toString()) >= parseInt(yr)) {
            countTotalInYr += 1;
          }
        }
        res.send({
          error: false,
          success: true,
          successMessage: countTotalInYr + " students are still active from this year!!",
          count: countTotalInYr
        });
        db.close();
      })

    });
  });


});
//4. total faculties in year.
app.get('/getTotalFacultiesInYear/:year', (req, res) => {
  res.send("fetching total faculties for year " + req.params.year);
}); // will do it later
//5. fees collected in year 
app.get('/getFeesCollectedInYear/:year', (req, res) => {
  var yr = req.params.year;
  if (yr == undefined || yr == null || yr.length == 0) {
    res.send({
      error: true,
      success: false,
      errorMessage: "Year not specified!!"
    });
    return;
  }

  MongoClient.connect(url, function (err, db) {
    if (err) {
      res.send({
        error: true,
        success: false,
        errorMessage: "database connection error"
      });
      throw err
    };
    var dbo = db.db("FeesBakya");
    dbo.collection("fees_submission_details").find({}, function (err, result) {
      if (err) {
        res.send({
          error: true,
          success: false,
          errorMessage: "database error!!"
        });
        throw err;
      }
      //result will be an array of collections
      //it is assumed that some of the students will be active there
      var countTotalInYr = 0;
      for (let i = 0; i < result.length; i++) {
        if (parseInt(Date(result[i].paymentDate).getFullYear().toString()) == parseInt(yr)) {
          countTotalInYr += parseInt(result[i].feesAmount);
        }
      }

      res.send({
        error: false,
        success: true,
        successMessage: "Rs." + countTotalInYr + " Fees collected in year " + yr + "."
      });
      db.close();
    });
  });


});
//6. request cannot be full filled.
//7. get student details
app.post('/getStudentDetails', (req, res) => {
  console.log("req query ", req.body);

  var rollnumber = req.body.query.rollnumber;
  var classs = req.body.query.classs;
  var name = req.body.query.name;
  if ((name == undefined || name == null || name.length == 0) && (rollnumber == undefined || rollnumber == null || rollnumber.length == 0 || !validRollNumber(rollnumber)) && (classs == undefined || classs == null || classs.length == 0)) {
    res.send({
      error: true,
      success: false,
      errorMessage: "Name or Roll number or Class are not correct!!"
    });
    return;
  } else {
    console.log(name, rollnumber, classs);
  }
  var students_found = [];

  //make mongo request here!!

  MongoClient.connect(url, function (err, db) {
    if (err) {
      res.send({
        error: true,
        success: false,
        errorMessage: "database connection error"
      });
      throw err
    };
    var dbo = db.db("FeesBakya");
    dbo.collection("student_details").find().toArray(
      function (err, results) { //just fetch all students
        if (err) {
          res.send({
            error: true,
            success: false,
            errorMessage: "database error!!"
          });
          throw err;
        }
        //result will be an array of collections
        //it is assumed that some of the students will be active there
        console.log(results);
        if(name!==null && name!==undefined){
        name=name.toUpperCase();
        }
        for (let i = 0; i < results.length; i++) {
          if ((rollnumber!==null) &&( results[i].rollnumber == rollnumber)) {
            console.log("Get details roll number matched!!")
            students_found.push(results[i]);
          } else if ((name!==null) && (results[i].student_name.indexOf(name) > -1 || (name !== undefined && name !== null && name.length != 0 && name.indexOf(results[i].student_name) > -1))) {
            students_found.push(results[i]);
          } else if ((classs!==null) && (classs !== undefined && classs !== null && classs == results[i].classs)) {
            students_found.push(results[i]);
          }
        }

        res.send({
          error: false,
          success: true,
          students_found: students_found,
          successMessage: "This list can be empty!!"
        });



        db.close();
      });
  });



});
//8. get defaulters by name / roll number / class
app.get('/getDefaultersDetails/:rollnumber/:classs/:name', (req, res) => {
  var rollnumber = req.params.rollnumber;
  var classs = req.params.classs;
  var name = req.params.name;
  if ((name == undefined || name == null || name.length == 0) || (rollnumber == undefined || rollnumber == null || rollnumber.length == 0 || !validRollNumber(rollnumber)) || (classs == undefined || classs == null || classs.length == 0)) {
    res.send({
      error: true,
      success: false,
      errorMessage: "name , rollnumber , class not defined or not in proper syntax for defaulters api!!"
    });
    return;
  }
  //now find that student and all the transactions related to it;

  var defaulters = [];
  MongoClient.connect(url, function (err, db) {
    if (err) {
      res.send({
        error: true,
        success: false,
        errorMessage: "database connection error"
      });
      throw err
    };
    var dbo = db.db("FeesBakya");
    dbo.collection("students_balance_sheet").find({}, function (err, result) { //just fetch all students
      if (err) {
        res.send({
          error: true,
          success: false,
          errorMessage: "database error!!"
        });
        throw err;
      }
      for (let i = 0; i < result.length; i++) {
        if (parseInt(result[i].amount) < 0) {
          defaulters.push({
            rollnumber: result[i].rollnumber,
            amount: result[i].amount
          });
        }
      }
      //find the student details
      dbo.collection("student_details").find({}, function (errors, resultt) {
        if (errors) {
          res.send({
            error: true,
            success: false,
            errorMessage: "Error in database!!"
          });
          throw errors;
        }
        for (let i = 0; i < resultt.length; i++) {
          if (defaulters[i].rollnumber == resultt.rollnumber) {
            defaulters[i]['details'] = resultt;
            continue;
          }
        }
        res.send({
          success: true,
          error: false,
          successMessage: "Found defaulters list",
          defaultersList: defaulters
        });
        db.close();
      });



    });
  });
});


//9. all transactions by rollnumber includes paid as well deducted
app.get('/allTransaction/:rollNumber', (req, res) => {
  var rollnumber = req.params.rollNumber;
  if (rollnumber == undefined || rollnumber == null || rollnumber.length == 0 || !validRollNumber(rollnumber)) {
    res.send({
      error: true,
      success: false,
      errorMessage: "Roll number not specified!!"
    });
    return;
  }
  var allTransactions = [];
  MongoClient.connect(url, function (err, db) {
    if (err) {
      res.send({
        error: true,
        success: false,
        errorMessage: "database connection error"
      });
      throw err
    };
    var dbo = db.db("FeesBakya");
    dbo.collection("fees_submission_details").find({
      rollnumber: rollnumber
    }, function (err, result) { //just fetch all students
      if (err) {
        res.send({
          error: true,
          success: false,
          errorMessage: "Database connection error!!"
        });
        throw err;
      }
      for (let i = 0; i < result.length; i++) {
        allTransactions.push({
          transaction: result[i],
          type: "fees submission"
        });
      }
      dbo.collection("balance_credit_debit_details").find({
        rollnumber: rollnumber
      }, function (errr, resultt) { //just fetch all students
        if (errr) {
          res.send({
            error: true,
            success: false,
            errorMessage: "Database connection error!!"
          });
          throw errr;
        }
        for (let i = 0; i < resultt.length; i++) {
          allTransactions.push({
            transaction: resultt[i],
            type: "Balance added/deducted"
          });
        }
        db.close();
      });
    });

  });
});
//10. academic dates // no need for this api we dont need this dates
// app.get('/academicStartDates/:class', (req, res) => {
//   res.send("fetching all dates for " + req.params.class);
// });
//X11. get all payments by student X no need for this api just show all the transactions imposed on him
// app.get('/allPaymentsByStudent/:rollNumber', (req, res) => {
//   res.send("fetching all payments by " + req.params.rollnumber);
// });
//12. current fees rule for class X
app.get('/currentFeesRule/:classs', (req, res) => {
  var classSpecified = req.params.classs;
  if (classSpecified == undefined || classSpecified == null || classSpecified.length == 0 || !vaildClass(classSpecified)) {
    res.send({
      error: true,
      success: false,
      errorMesssage: "Class not specified!!"
    });
    return;
  }
  var feesRulesReq = [];
  MongoClient.connect(url, function (err, db) {
    if (err) {
      res.send({
        error: true,
        success: false,
        errorMessage: "database connection error"
      });
      throw err
    };
    var dbo = db.db("FeesBakya");
    dbo.collection("fees_rules_details").find({
      classs: classSpecified
    }, function (err, result) {
      if (err) {
        res.send({
          error: true,
          success: false,
          errorMessage: "DataBase connection error!!"
        });
        throw err;
      }
      for (let i = 0; i < result.length; i++) {
        feesRulesReq.push(result[i]);
      }

      res.send({
        success: true,
        error: false,
        successMessage: "found the class fees rules!!",
        rules: feesRulesReq
      });

    });




  });
});
//13. get all fees rules till now
app.get('/allFeesRules', (req, res) => {
  var allFeesRules = [];
  MongoClient.connect(url, function (err, db) {
    if (err) {
      res.send({
        error: true,
        success: false,
        errorMessage: "database connection error"
      });
      throw err
    };
    var dbo = db.db("FeesBakya");
    dbo.collection("fees_rules_details").find({}, function (err, result) {
      if (err) {
        res.send({
          error: true,
          success: false,
          errorMessage: "DataBBase connection error!!"
        });
        throw err;
      }
      for (let i = 0; i < result.length; i++) {
        allFeesRules.push(result[i]);
      }

      res.send({
        error: false,
        success: true,
        successMessage: "All Fees Rules Fetched!!",
        allFeesRules: allFeesRules
      });

    });

  });
});
//14 same as 10
//X15. get all acadmeic dates all classes this api is not needed
// app.get('/allClassesDates', (req, res) => {
//   res.send("fetching all classes dates");
// });
//X16 get all deductions of student //no need for this api just show the all transactions
// app.get('/allDeductionsForStudent/:rollNumber', (req, res) => {
//   res.send("fetching all deductions for " + req.params.rollnumber);
// });

//this api to be used for passing a student
app.post("/changeClassStudent", (req, res) => {
  var studentDetails = req.body.studentDetails;
  // studentDetails contains {
  // student rollnumber 
  // student new class
  // }
  if (studentDetails.classs == null || studentDetails.classs == undefined || !vaildClass(studentDetails.classs) || studentDetails.classs.length == 0) {
    res.send({
      error: true,
      success: false,
      errorMessage: "New Class Not Defined!!"
    });
    return;
  }
  if (studentDetails.rollnumber == undefined || studentDetails.rollnumber == null || !validRollNumber(studentDetails.rollnumber) || studentDetails.rollnumber.length == 0) {
    res.send({
      error: true,
      success: false,
      errorMessage: "Roll number not defined!!"
    });
    return;
  }
  //first change in the student_details then in students_balance_sheet
  MongoClient.connect(url, function (err, db) {
    if (err) {
      res.send({
        error: true,
        success: false,
        errorMessage: "database connection error"
      });
      throw err
    };
    var dbo = db.db("FeesBakya");
    dbo.collection("student_details").updateOne({
      rollnumber: studentDetails.rollnumber
    }, {
      $set: {
        classs: studentDetails.classs
      }
    }, function (err, result) {
      if (err) {
        res.send({
          error: true,
          success: false,
          errorMessage: "DataBase Connection error!!"
        });
        throw err;
      }

      dbo.collection("students_balance_sheet").updateOne({
        rollnumber: studentDetails.rollnumber
      }, {
        $set: {
          classs: studentDetails.classs
        },
        function (er, re) {
          if (er) {
            res.send({
              error: true,
              success: false,
              errorMessage: "Critical DataBase Connection error!!"
            });
            throw er;
          }
          res.send({
            success: true,
            error: false,
            successMessage: "Students Class changed successfully!!"
          });
          db.close();
        }
      });




    });



  });
});


app.get('/getTotalDefaulters', (req, res) => {

  //make a mongoconnection 
  let defaultersTotal = 0;
  MongoClient.connect(url, function (err, db) {
    if (err) {
      res.send({
        error: true,
        success: false,
        errorMessage: "database connection error"
      });
      throw err
    };
    var dbo = db.db("FeesBakya");
    dbo.collection("students_balance_sheet").find({}, (errr, result) => {
      if (errr) {
        res.send({
          error: true,
          success: false,
          errorMessage: "DataBase Error!!"
        });
        throw errr;
      }
      for (let i = 0; i < result.length; i++) {
        if (parseInt(result[i].amountTotal) < 0) {
          defaultersTotal += 1;
        }
      }
      res.send({
        error: false,
        success: true,
        successMessage: "Total Defaulters Counted!!",
        defaultersCount: defaultersTotal
      });
      db.close();
    });

  });
});



app.get('/getTotalFeesPayers', (req, res) => {

  //make a mongoconnection 
  let feesPy = 0;
  MongoClient.connect(url, function (err, db) {
    if (err) {
      res.send({
        error: true,
        success: false,
        errorMessage: "database connection error"
      });
      throw err
    };
    var dbo = db.db("FeesBakya");
    dbo.collection("students_balance_sheet").find({
      active: true
    }, (errr, result) => {
      if (errr) {
        res.send({
          error: true,
          success: false,
          errorMessage: "DataBase Error!!"
        });
        throw errr;
      }
      for (let i = 0; i < result.length; i++) {
        feesPy += 1;
      }
      res.send({
        error: false,
        success: true,
        successMessage: "Total Fees Payers Counted!!",
        totalFeesPayers: feesPy
      });
      db.close();
    });

  });
});

app.get('/thisMonthFeesCollection', function (req, res) {
  //from the fees collection database pick those submissions which have same month and same year
  let currentDate = new Date();
  let thisMonth = currentDate.getMonth();
  let thisYear = currentDate.getFullYear();
  let collectionAmount = 0;
  MongoClient.connect(url, function (err, db) {
    if (err) {
      res.send({
        error: true,
        success: false,
        errorMessage: "database connection error"
      });
      throw err
    };
    var dbo = db.db("FeesBakya");
    dbo.collection("fees_submission_details").find({}, (errr, result) => {
      if (errr) {
        res.send({
          error: true,
          success: false,
          errorMessage: "DataBase Connection Error!!"
        });
        throw errr;
      }
      for (let i = 0; i < result.length; i++) {
        let feesSubmissionDate = Date(result[i].paymentDate);
        if (feesSubmissionDate.getMonth() == thisMonth && feesSubmissionDate.getFullYear() == thisYear) {
          collectionAmount += parseInt(result[i].feesAmount);
        }
      }

      res.send({
        error: false,
        success: true,
        successMessage: "Found Collection of this month",
        collectionAmount: collectionAmount
      });
      db.close();
    });
  });

});



app.get('/estimatedFeesCollectionThisMonth', function (req, res) {
  //for this go to the balancesheet check for all students , jo active hain balance sheet mein sirf unko hi 
  let classVar = {
    'Nursery': 0,
    'LKG': 0,
    'UKG': 0,
    'First': 0,
    'Second': 0,
    'Third': 0,
    'Fourth': 0,
    'Fifth': 0,
    'Sixth': 0,
    'Seventh': 0,
    'Eighth': 0,
    'Ninth': 0,
    'Tenth': 0,
    'Eleventh': 0,
    'Twelfth': 0
  }
  let finalValue = 0;
  MongoClient.connect(url, function (err, db) {
    if (err) {
      res.send({
        error: true,
        success: false,
        errorMessage: "database connection error"
      });
      throw err
    };
    var dbo = db.db("FeesBakya");
    dbo.collection("students_balance_sheet").find({
      active: true
    }, (errr, result) => {
      if (errr) {
        res.send({
          error: true,
          success: false,
          errorMessage: "DataBase Connection Error!!"
        });
        throw errr;
      }
      for (let i = 0; i < result.length; i++) {
        classVar[result[i].classs] += 1;
      }
      //make one more db request to fees_rules and find out the actual active fees rules for each class

      MongoClient.connect(url, function (err, db) {
        if (err) {
          res.send({
            error: true,
            success: false,
            errorMessage: "database connection error"
          });
          throw err
        };
        var dbo = db.db("FeesBakya");
        dbo.collection("fees_rules_details").find({
          active: true
        }, (errror, resultt) => {
          if (errror) {
            res.send({
              error: true,
              success: false,
              errorMessage: "database connection error"
            });
            throw errror;
          }
          for (let i = 0; i < resultt.length; i++) {
            let value = parseInt(resultt[i].feesAmount);
            finalValue += value * classVar[resultt[i].classs];
          }

          res.send({
            error: false,
            success: true,
            successMessage: "Found total fees to be collected!!",
            feesToBeCollected: finalValue
          });
          db.close();

        });
      });


    })
  });



});
app.listen(port, () => console.log(`Listening on port ${port}`));