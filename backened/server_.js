const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// First demo apis for testing ..........................................................................
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
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
    if(student_details==undefined)
{
    res.send({
        success:false,
        error:true,
        errorMesage:"student details undefined"
    });
    return;
}
 
if(student_details.student_name==undefined||student_details.student_name==null||student_details.student_name.length==0)
{
    res.send({
        success:false,
        error:true,
        errorMesage:"student name empty"
    });
    return;
}

 
if(student_details.fathers_name==undefined||student_details.fathers_name==null||student_details.fathers_name.length==0)
{
    res.send({
        success:false,
        error:true,
        errorMesage:"fathers name empty"
    });
    return;
}                          

if(student_details.mothers_name==undefined||student_details.mothers_name==null||student_details.mothers_name.length==0)
{
    res.send({
        success:false,
        error:true,
        errorMesage:"mothers name empty"
    });
    return;
}


if(student_details.dob==undefined||student_details.dob==null||student_details.dob.length==0)
{
    res.send({
        success:false,
        error:true,
        errorMesage:"date of birth empty"
    });
    return;
}
if(student_details.doe==undefined||student_details.doe==null||student_details.doe.length==0)
{
    res.send({
        success:false,
        error:true,
        errorMesage:"date of enrollment empty"
    });
    return;
}

if(student_details.gender==undefined||student_details.gender==null||student_details.gender.length==0)
{
    res.send({
        success:false,
        error:true,
        errorMesage:"gender of student empty"
    });
    return;
}
if(student_details.address==undefined||student_details.address==null||student_details.address.length==0)
{
    res.send({
        success:false,
        error:true,
        errorMesage:"address empty"
    });
    return;
}
if(student_details.studentAadhar==undefined||student_details.studentAadhar==null||student_details.studentAadhar.length==0)
{
    res.send({
        success:false,
        error:true,
        errorMesage:"student aadhar empty"
    });
    return;
}

if(student_details.fathersAadhar==undefined||student_details.fathersAadhar==null||student_details.fathersAadhar.length==0)
{
    res.send({
        success:false,
        error:true,
        errorMesage:"fathers aadhar empty"
    });
    return;
}

if(student_details.classs==undefined||student_details.classs==null||student_details.classs.length==0)
{
    res.send({
        success:false,
        error:true,
        errorMesage:"class of admission empty"
    });
    return;
}

if(student_details.mobile==undefined||student_details.mobile==null||student_details.mobile.length==0)
{
    res.send({
        success:false,
        error:true,
        errorMesage:"mobile number empty"
    });
    return;
}
if(!validMobile(student_details.mobile)){
    res.send({
        success:false,
        error:true,
        errorMesage:"mobile number not valid"
    });
    return;
}
if(!validAadhar(student_details.studentAadhar)){
    res.send({
        success:false,
        error:true,
        errorMesage:"students aadhar not valid"
    });
    return;
}
if(!validAadhar(student_details.fathersAadhar)){
    res.send({
        success:false,
        error:true,
        errorMesage:"father's aadhar not valid"
    });
    return;
}
if(student_details.rollnumber==undefined||student_details.rollnumber==null||student_details.rollnumber.length==0)
{
    res.send({
        success:false,
        error:true,
        errorMesage:"roll number empty"
    });
    return;
}

if(!validRollNumber(student_details.rollnumber)){
    res.send({
        success:false,
        error:true,
        errorMesage:"roll number not valid"
    });
    return;
}
//here we have to send entry to db



  });

  //2. confirm fees deposit
  app.post('/confirm_fees_deposit', (req, res) => {
    console.log(req.body.feesPaymentData);
    res.send(
      'Recieved your fees payment request!!',
    );
  });
//3. Add Fees Rule
app.post('/add_fees_rule', (req, res) => {
    console.log(req.body.feesRuleData);
    res.send(
      'Recieved your request to add new fees rule',
    );
  });
  //4. Add Balance
  app.post('/deposit_balance', (req, res) => {
    console.log(req.body.depositExtraBalance);
    res.send(
      'Recieved your request to add new transaction to ' + req.body.depositExtraBalance.debitORcredit,
    );
  });
  //5. Remove Student Confirmation
  app.post('/removeStudentConfirmation', (req, res) => {
    console.log(req.body.removedStudentDetails);
    res.send(
      'recieved your request to remove the student'+req.body.removedStudentDetails.name,
    );
  });
  //6.add new academic session
  app.post('/add_new_academic_session', (req, res) => {
    console.log(req.body.newAcademicSession);
    res.send(
      'Recieved your request to add new academic session for ' + req.body.newAcademicSession.class +' start from ' + req.body.newAcademicSession.startDate,
    );
  });
//7. modify student details
app.post('/modifyStudentDetails', (req, res) => {
    console.log(req.body.modifyStudentDetails);
    res.send(
      'Recieved your request to modify student details for ' + req.body.modifyStudentDetails.studentName,
    );
  });
//8. delete the added fees rule ( rule number should be provided).
app.post('/deleteAddedFeesRule', (req, res) => {
    console.log(req.body.deleteAddedFeesRule);
    res.send(
      'Recieved your request to delete Added Fees Rule ' + req.body.deleteAddedFeesRule.ruleID,
    );
  });
  //9. delete the added acadmeic starting time
  app.post('/deleteAddedAcademicSessionRule', (req, res) => {
    console.log(req.body.deleteAddedAcademicSessionRule);
    res.send(
      'Recieved your request to delete Added acadmeic session Rule ' + req.body.deleteAddedAcademicSessionRule.ruleASID,
    );
  });



  //GET requests important ...................................................................................................
//1. is rollnumber available
app.get('/isRollNumberAvailable/:rollnumber', (req, res) => {
    res.send("maybe available"+req.query.rollnumber);
  });
//2. get rollnumber for class z
app.get('/getRollNumber/:class', (req, res) => {
    res.send("fetching rollnumber for "+req.query.class);
  });
//3. total students year.
app.get('/getTotalStudentsInYear/:year', (req, res) => {
    res.send("fetching total students for year "+req.query.year);
  });
//4. total faculties in year.
app.get('/getTotalFacultiesInYear/:year', (req, res) => {
    res.send("fetching total faculties for year "+req.query.year);
  });
//5. fees collected in year 
app.get('/getFeesCollectedInYear/:year', (req, res) => {
    res.send("fetching total fees collected for year "+req.query.year);
  });
  //6. request cannot be full filled.
//7. get student details
app.get('/getStudentDetails/:rollNumber/:class/:name', (req, res) => {
    res.send("fetching Student Details "+req.query.rollnumber +","+req.query.class+","+req.query.name);
  });
//8. get defaulters by name / roll number / class
app.get('/getDefaultersDetails/:rollNumber/:class/:name', (req, res) => {
    res.send("fetching Defaulters Student Details "+req.query.rollnumber +","+req.query.class+","+req.query.name);
  });
//9. all transactions by rollnumber includes paid as well deducted
app.get('/allTransaction/:rollNumber', (req, res) => {
    res.send("fetching all transactions for "+req.query.rollnumber );
  });
  //10. academic dates
  app.get('/academicStartDates/:class', (req, res) => {
    res.send("fetching all dates for "+req.query.class );
  });
  //11. get all payments by student X
  app.get('/allPaymentsByStudent/:rollNumber', (req, res) => {
    res.send("fetching all payments by "+req.query.rollnumber );
  });
  //12. current fees rule for class X
  app.get('/currentFeesRule/:class', (req, res) => {
    res.send("fetching current fees rule for "+req.query.class );
  });
  //13. get all fees rules till now
  app.get('/allFeesRules', (req, res) => {
    res.send("fetching all fees rules for all classes");
  });
  //14 same as 10
//15. get all acadmeic dates all classes
app.get('/allClassesDates', (req, res) => {
    res.send("fetching all classes dates");
  });
//16 get all deductions of student 
app.get('/allDeductionsForStudent/:rollNumber', (req, res) => {
    res.send("fetching all deductions for "+req.query.rollnumber );
  });




app.listen(port, () => console.log(`Listening on port ${port}`));