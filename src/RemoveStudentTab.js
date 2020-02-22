import React from 'react';
import './stylesAdded.css';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import userImage from './userImage.png';
import Button from '@material-ui/core/Button';
import DatePicker from "react-datepicker";
import SuccessDialog from './SuccessDialog';
import ErrorDialog from './ErrorDialog';
import { Scrollbars } from 'react-custom-scrollbars';

export default class RemoveStudentTab extends React.Component{
constructor(props){
    super(props);
    this.state={
        openRemoveStudentDialog:false,
        successDialog:false,
        errorDialog:false,
        successMessage:"",
        errorMessage:"",
        studentDetails:{
          student_name:"",
          mothers_name:"",
          fathers_name:"",
          doe:new Date(),
          dob:new Date(),
          address:"",


        }
    }
    this.handleSubmitButton=this.handleSubmitButton.bind(this);
    this.handleConfirmRemove = this.handleConfirmRemove.bind(this);
    this.handleCancelButton=this.handleCancelButton.bind(this);
    this.closeSuccessDialog=this.closeSuccessDialog.bind(this);
    this.closeErrorDialog=this.closeErrorDialog.bind(this);
}


closeSuccessDialog(){
  this.setState({
    successDialog:false,
    successMessage:"",
    errorMessage:"",
    errorDialog:false,
    openRemoveStudentDialog:false,
    studentDetails:{
      student_name:"",
      mothers_name:"",
      fathers_name:"",
      doe:new Date(),
      dob:new Date(),
      address:"",


    }
  })
}


closeErrorDialog(){
  this.setState({
    successDialog:false,
    successMessage:"",
    errorMessage:"",
    errorDialog:false
  })
}

handleCancelButton(){
    this.setState({
        openRemoveStudentDialog:false
    })
}


handleSubmitButton(){
  //  now from here make a backened call to remove the student
let studentRollNumber = document.getElementById("rollnumber").value;
if(studentRollNumber==null||studentRollNumber==undefined||studentRollNumber.length==0){
  alert("Please Enter RollNumber of Student");
  return;
}
let self =this;
axios.post("http://localhost:5000/getStudentDetails",{query:{
  rollnumber:studentRollNumber
}}).then(response=>{
  let outPut = response.data;
if(outPut.error==true){
  self.setState({
    errorDialog:true,
    errorMessage:outPut.errorMessage
  });
  return;
}


if(outPut.students_found==undefined||outPut.students_found==null||outPut.students_found.length==0){
  self.setState({
    errorDialog:true,
    errorMessage:"No student registered with this roll number!!"
  });
  return;
}

//there cannot be more than one student untill and unless he was registered two times and de activated one time
  let studentDetails = outPut.students_found[0];

  if(outPut.error==true){
     self.setState({
       errorDialog:true,
       errorMessage:outPut.errorMessage
     });
  }else{
    if( studentDetails!==null &&  studentDetails!==undefined &&  studentDetails.fathers_name!==null &&  studentDetails.fathers_name!==undefined){
      self.setState({
        openRemoveStudentDialog:true,
        studentDetails:studentDetails
      });
    }else{
      console.log("this was called!!")
      self.setState({
        errorDialog:true,
        errorMessage:"No student registered with this roll number!!"
      });
    }
  }

}).catch(err=>{
  console.log(err);
});

}

handleConfirmRemove(){
  let self =this;
  axios.post("http://localhost:5000/removeStudentConfirmation",{removedStudentDetails:{
      rollnumber:self.state.studentDetails.rollnumber
  }}).then(response => {
    console.log(response);
    let outPut  = response.data;
    if(outPut.success==true){
      self.setState({
        successDialog:true,
        successMessage:outPut.successMessage,
        openRemoveStudentDialog:false
      });
    }

  }).catch(error=>{
console.log(error);
  });
}






    render(){
        return(
<div style={{display:"flex",flexDirection:"column",padding:50, justifyContent:"center",textAlign:"center"}}>
<div class="container">
<form>

<div class="row">
  <div class="col-25">
    <label for="rollnumber">Enter Roll Number</label>
  </div>
  <div class="col-75">
    <input type="text" id="rollnumber" name="rollnumber" placeholder="Rollnumber Assigned..."/>
  </div>
</div>

<div class="row">
  <Button id="submitButton" variant="contained" color="green" onClick={this.handleSubmitButton}>Submit</Button>
</div>
</form>
</div>
       <h5 style={{color:"red"}}>
           *Selected Student will not be shown as enrolled and will not be shown as fees payer. However he his records will be kept in the system.
       </h5>
   <ErrorDialog show={this.state.errorDialog} errorMessage={this.state.errorMessage} onClose={this.closeErrorDialog}/>
  <SuccessDialog show={this.state.successDialog} successMessage={this.state.successMessage} onClose={this.closeSuccessDialog}/>

    <Dialog onClose={this.handleCloseDialog} aria-labelledby="remove-student-dialog" open={this.state.openRemoveStudentDialog}>
    <DialogTitle id="removeStudentDialog">Remove Student</DialogTitle>
    <Scrollbars autoHeight autoHeightMax={500} autoHeightMin={300}
 autoHide >
      <div style={{display:"flex",flexDirection:"column"}}>
  
    <form style={{marginLeft:30,marginRight:30,marginBottom:30}}>
    <div class="row">
      <div class="col-25">
        <label for="fullname">Student Name</label>
      </div>
      <div class="col-75">
        <input type="text"  placeholder={this.state.studentDetails.student_name} disabled/>
      </div>
    </div>


    <div class="row">
      <div class="col-25">
        <label for="gender">Gender</label>
      </div>
      <div class="col-75">
       <input type="text" disabled placeholder={this.state.studentDetails.gender}/>
     </div>   
     </div>



    <div class="row">
      <div class="col-25">
        <label for="fathersname">Fathers Name</label>
      </div>
      <div class="col-75">
        <input type="text"  placeholder={this.state.studentDetails.fathers_name} disabled/>
      </div>
    </div>

    <div class="row">
      <div class="col-25">
        <label for="mothersname">Mothers Name</label>
      </div>
      <div class="col-75">
        <input type="text"   placeholder={this.state.studentDetails.mothers_name} disabled/>
      </div>
    </div>


    <div class="row">
      <div class="col-25">
        <label for="class">Class</label>
      </div>
      <div class="col-75">
     <input type="text" placeholder={this.state.studentDetails.classs} disabled/>
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="Address">Address</label>
      </div>
      <div class="col-75">
        <textarea  placeholder={this.state.studentDetails.address} disabled style={{height:'60px'}}></textarea>
      </div>
    </div>

    <div class="row">
      <div class="col-25">
        <label for="sAadhar">Student Aadhar</label>
      </div>
      <div class="col-75">
        <input type="text"   placeholder={this.state.studentDetails.studentAadhar} disabled/>
      </div>
    </div>


    <div class="row">
      <div class="col-25">
        <label for="fAadhar">Father Aadhar</label>
      </div>
      <div class="col-75">
        <input type="text"   placeholder={this.state.studentDetails.fathersAadhar} disabled/>
      </div>
    </div>

    <div class="row">
      <div class="col-25">
        <label for="mobileNumber">Mobile Number</label>
      </div>
      <div class="col-75">
        <input type="text"   placeholder={this.state.studentDetails.mobileNumber} disabled/>
      </div>
    </div>

    <div class="row">
      <div class="col-25">
        <label for="village">Village</label>
      </div>
      <div class="col-75">
        <input type="text"   placeholder={this.state.studentDetails.village} disabled/>
      </div>
    </div>

    <div class="row">
      <div class="col-25">
        <label for="district">District</label>
      </div>
      <div class="col-75">
        <input type="text"   placeholder={this.state.studentDetails.district} disabled/>
      </div>
    </div>

    <div class="row">
      <div class="col-25">
        <label for="dob">Date of Birth</label>
      </div>
      <div class="col-75">
      <DatePicker
        selected={new Date(this.state.studentDetails.dob)}
        onChange={this.handleChangeDob}
        disabled
      />
      </div>
    </div>

    <div class="row">
      <div class="col-25">
        <label for="doe">Date of Enrollment</label>
      </div>
      <div class="col-75">
      <DatePicker
        selected={new Date(this.state.studentDetails.doe)}
        onChange={this.handleChangeDoe}
        disabled
      />
      </div>
    </div>

    <div class="row">
      <div class="col-25">
        <label for="rollnumber">Roll Number:</label>
      </div>
      <div class="col-75">
        <input type="text"  placeholder={this.state.studentDetails.rollnumber} disabled/>
      </div>
    </div>

    <div class="row">
    <div class="col-25">
        <label  >Photo:</label>
      </div>
      <div class="col-75">
         <img style={{width:150,height:150}} src={userImage}/>
      </div>
    </div>
{this.state.studentDetails.active==true?
    <div class="row">
    <Button id="submitButton2" variant="contained" color="green" onClick={this.handleCancelButton}>Cancel</Button>
   
    <Button id="submitButton3" variant="contained" color="green" onClick={this.handleConfirmRemove}>Confirm Remove</Button>
            </div>
    :
    <div  class="row">
    <div style={{color:"#FF5511",padding:10}}>Student was already removed</div>

    <Button id="submitButton2" variant="contained" color="green" onClick={this.handleCancelButton}>OK</Button>
    </div>
    }
    </form>
        </div>
        </Scrollbars>
      </Dialog>
</div>
)
    }
}