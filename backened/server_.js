const express = require('express');
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
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
  console.log(req.body.student_details);
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
  var students_details = req.body.student_details;
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

  if (student_details.mobile == undefined || student_details.mobile == null || student_details.mobile.length == 0) {
    res.send({
      success: false,
      error: true,
      errorMesage: "mobile number empty"
    });
    return;
  }
  if (!validMobile(student_details.mobile)) {
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
      errorMesage: "roll number not valid"
    });
    return;
  }
  //here we have to send entry to db
  student_details['active'] = true;
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
        active:true
      }
      dbo.collection("student_balance_sheet").insertOne(newBalanceHolder, function (errors, respp) {
        if (errors) {
          res.send({
            error: true,
            success: false,
            errorMessage: "Critical Database Error"
          });
          throw errors;
        }
        res.end({
          success: true,
          error: false,
          successMessage: "Student Added to registery as well as BalanceSheet"
        });
        db.close();
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
    var myquery = {
      classs: feesRuleData.classs
    };
    var newvalues = {
      $set: {
        active: false,
        endDate: feesRuleData.dateOfImplementation
      }
    };
    dbo.collection("fees_rules_details").updateOne(myquery, newvalues, function (err, resp) {
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

  if (depositExtraBalance.rollnumber == undefined || depositExtraBalance.rollnumber == null || depositExtraBalance.rollnumber.length == 0) {
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
      errorMessage: "take or give not specified!!"
    });
    return;
  }
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
        if(erorrr){
          res.send({
            error:true,
            success:false,
            errorMessage:"Critical database error!!"
          });
          throw erorrr;
        }

      })
    });
  });
  //balance credit debit
});


//5. Remove Student Confirmation
app.post('/removeStudentConfirmation', (req, res) => {
  console.log(req.body.removedStudentDetails);
  // removed student details inclue{
  //     rollnumber
  // }
  var removedStudentDetails = req.body.removedStudentDetails;
  if (removedStudentDetails.rollnumber == undefined || removedStudentDetails.rollnumber == null || removedStudentDetails.rollnumber.length == 0) {
    res.send({
      error: true,
      success: false,
      errorMessage: "roll number not specified!!"
    });
    return;
  }

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("FeesBakya");
    var myquery = {
      rollnumber: removedStudentDetails.rollnumber
    };
    var newvalues = {
      $set: {
        active: false
      }
    };
    dbo.collection("student_details").updateOne(myquery, newvalues, function (err, resp) {
      if (err) {
        res.send({
          error: true,
          success: false,
          errorMessage: "database errror"
        });
        throw err;
      }//remove it from balance sheet as well
      var newwValues ={
        $set:{
          active:false
        }
      }
     dbo.collection("students_balance_sheet").updateOne({rollnumber:myquery.rollnumber},newwValues,function(erorr,respp){
if(erorr){
  res.send({
    error:true,
    success:false,
    errorMessage:"Critical Database updation error!!"
  });
  throw erorr;
}

res.send({
  success:true,
  error:false,
  successMessage:"Made Student inactive, it may be a defaulter"
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
    var myquery = {
      classs: newAcadmeicSession.classs,
    };
    var newvalues = {
      $set: {
        active: false,
        endDate: newAcadmeicSession.startDate
      }
    };
    dbo.collection("academic_sessions_increament_dates").updateOne(myquery, newvalues, function (err, resp) {
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
    var myquery = {
      rollnumber: modifyStudentDetails.rollnumber
    };
    var newvalues = {
      $set: modifyStudentDetails
    };
    dbo.collection("student_details").updateOne(myquery, newvalues, function (err, resp) {
      
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
    var myquery = {
      classs: deleteAddedFeesRule.classs,
      active: true
    };
    dbo.collection("fees_rules_details").deleteOne(myquery, function (err, obj) {
      if (err) {
        res.send({
          error: true,
          success: false,
          errorMessage: "database error"
        });
        throw err;
      }
      console.log("active fees rule deleted");
      var mquery = {
        classs: deleteAddedFeesRule.classs,
        endDate: deleteAddedFeesRule.startDate
      }
      var newvalues = {
        $set: {
          endDate: null,
          active: true
        }
      }
      dbo.collection("fees_rules_details").updateOne(mquery, newvalues, function (err, res) {
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
    var myquery = {
      classs: deleteAddedAcademicSessionRule.classs,
      active: true
    };
    dbo.collection("academic_sessions_increament_dates").deleteOne(myquery, function (err, obj) {
      if (err) {
        res.send({
          error: true,
          success: false,
          errorMessage: "database error"
        });
        throw err;
      }
      console.log("active session rule deleted");
      var mquery = {
        classs: deleteAddedAcademicSessionRule.classs,
        endDate: deleteAddedAcademicSessionRule.startDate
      }
      var newvalues = {
        $set: {
          endDate: null,
          active: true
        }
      }
      dbo.collection("academic_sessions_increament_dates").updateOne(mquery, newvalues, function (err, res) {
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

  var rollnumber = req.query.rollnumber.toString();
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
    'Lk': "LKG",
    'Uk': "UKG",
    'Fi': 'First',
    'Se': 'Second',
    'Th': "Third",
    'Fu': 'Fourth',
    'Fi': "Fifth",
    'Sx': "Sixth",
    'Sv': "Seventh",
    "Eg": 'Eight',
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


  //res.send("maybe available"+req.query.rollnumber);

});
//2. get rollnumber for class z
app.get('/getRollNumber/:classs', (req, res) => {
  var classes = req.query.classs;
  if (classes == undefined || classes == null || classes.length == 0) {
    res.send({
      error: true,
      success: false,
      errorMessage: "class not specified!!"
    });
    return;
  }



  var classess = {
    'Lk': "LKG",
    'Uk': "UKG",
    'Fi': 'First',
    'Se': 'Second',
    'Th': "Third",
    'Fu': 'Fourth',
    'Fi': "Fifth",
    'Sx': "Sixth",
    'Sv': "Seventh",
    "Eg": 'Eight',
    'Nn': "Ninth",
    'Tn': "Tenth",
    'El': "Eleventh",
    "Tw": "Twelfth"
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
          if (num < 100) {
            numberr = '0' + numberr.toString();
          }
          res.send({
            error: false,
            success: true,
            errorMessage: "",
            successMessage: classes + Date().getYear() + numberr
          });
        }
      }
      db.close();
    });
  });

});
//3. total students year.
app.get('/getTotalActiveStudentsFromYear/:year', (req, res) => {
  var yr = req.query.year;
  if (yr == undefined || yr == null || yr.length == 0) {
    res.send({
      error: true,
      success: false,
      errorMessage: "Year not specified!!",
    });
    return;
  }

  // all active students with year in doe is smaller than year specified;
  //db query for finding all the students who are active 

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
        if (parseInt(Date(result[i].doe).getYear().toString()) <= parseInt(yr)) {
          countTotalInYr += 1;
        }
      }

      res.send({
        error: false,
        success: true,
        successMessage: countTotalInYr + " students are still active from this year!!"
      });
      db.close();
    });
  });


});
//4. total faculties in year.
app.get('/getTotalFacultiesInYear/:year', (req, res) => {
  res.send("fetching total faculties for year " + req.query.year);
}); // will do it later
//5. fees collected in year 
app.get('/getFeesCollectedInYear/:year', (req, res) => {
  var yr = req.query.year;
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
        if (parseInt(Date(result[i].paymentDate).getYear().toString()) == parseInt(yr)) {
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
app.get('/getStudentDetails/:rollNumber/:classs/:name', (req, res) => {
  var rollnumber = req.query.rollnumber;
  var classs = req.query.classs;
  var name = req.query.name;
  if ((name == undefined || name == null || name.length == 0) || (rollnumber == undefined || rollnumber == null || rollnumber.length == 0 || !validRollNumber(rollnumber)) || (classs == undefined || classs == null || classs.length == 0)) {
    res.send({
      error: true,
      success: false,
      errorMessage: "name , rollnumber , class not defined or not in proper syntax!!"
    });
    return;
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
    dbo.collection("student_details").find({
      active: true
    }, function (err, result) { //just fetch all students
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
      for (let i = 0; i < results.length; i++) {
        if (results[i].rollnumber == rollnumber) {
          students_found.push(results[i]);
        } else if (part_of_name_matches(result[i].student_name, name)) {
          students_found.push(result[i]);
        } else if (classCalculated(result[i].doe, result[i].classs) == classs) {
          students_found.push(result[i]);
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
  var rollnumber = req.query.rollnumber;
  var classs = req.query.classs;
  var name = req.query.name;
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
  res.send("fetching all transactions for " + req.query.rollnumber);
});
//10. academic dates // no need for this api we dont need this dates
// app.get('/academicStartDates/:class', (req, res) => {
//   res.send("fetching all dates for " + req.query.class);
// });
//X11. get all payments by student X no need for this api just show all the transactions imposed on him
// app.get('/allPaymentsByStudent/:rollNumber', (req, res) => {
//   res.send("fetching all payments by " + req.query.rollnumber);
// });
//12. current fees rule for class X
app.get('/currentFeesRule/:class', (req, res) => {
  res.send("fetching current fees rule for " + req.query.class);
});
//13. get all fees rules till now
app.get('/allFeesRules', (req, res) => {
  res.send("fetching all fees rules for all classes");
});
//14 same as 10
//X15. get all acadmeic dates all classes this api is not needed
// app.get('/allClassesDates', (req, res) => {
//   res.send("fetching all classes dates");
// });
//X16 get all deductions of student //no need for this api just show the all transactions
// app.get('/allDeductionsForStudent/:rollNumber', (req, res) => {
//   res.send("fetching all deductions for " + req.query.rollnumber);
// });

//this api to be used for passing a student
app.post("/changeClassStudent",(req,res)=>{
var studentDetails = req.body.studentDetails;
// studentDetails contains {
  // student rollnumber 
  // student new class
// }

//first change in the student_details then in students_balance_sheet




});

app.listen(port, () => console.log(`Listening on port ${port}`));