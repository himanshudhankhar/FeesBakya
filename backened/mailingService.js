var nodemailer = require('nodemailer');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

function getStudentNamesAndRollNumber(students, callback) {
    let studentNamesAndRollnumbers = "";
    if(students.length==0){
        callback(null,"");
        return;
    }


    MongoClient.connect(url, function (err, db) {
        var dbo = db.db("FeesBakya");
        for (let i = 0; i < students.length; i++) {
            // studentNamesAndRollnumbers+=students[i].rollnumber+", ";

            if (err) {

                throw err;
                callback(err, null);
            }


            dbo.collection("student_details").findOne({
                rollnumber: students[i].rollnumber
            }, (err, result) => {
                if (err) {
                    console.log(err);
                    throw err;
                }

                console.log(result);
                studentNamesAndRollnumbers += result.student_name + " (" + result.rollnumber + "), ";
                if (i == students.length - 1) {
                    db.close();
                    callback(null, studentNamesAndRollnumbers);
                }
            });
        }
        

    });
}


module.exports = {

    mailingServiceToOwner: function (students, classFees) {

        //here make email calls to the owner about the calls recieved about the 
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'dhankhar7924@gmail.com',
                pass: 'learnerofknowledge'
            }
        });

        getStudentNamesAndRollNumber(students, (err, studentNamesAndRollnumbers) => {

if(err){
    console.log("Error while finding name and rollnumber in mailing service to owner!!");
    throw err;
}



            if (studentNamesAndRollnumbers.length == 0) {
                studentNamesAndRollnumbers = "No Students in class " + classFees.classs;
            }
            var mailOptions = {
                from: 'dhankhar7924@gmail.com',
                to: 'dhankhar.1@iitj.ac.in',
                subject: 'Fees imposed Rs ' + classFees.amount + ' for date ' + new Date().toDateString(),
                text: studentNamesAndRollnumbers
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });



        });

    }

}