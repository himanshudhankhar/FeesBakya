import React from 'react';
import './stylesAdded.css';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
import DatePicker from "react-datepicker";
export default class RemoveStudentTab extends React.Component{
constructor(props){
    super(props);
    this.state={
        openRemoveStudentDialog:false
    }
    this.handleSubmitButton=this.handleSubmitButton.bind(this);
    this.handleConfirmRemove = this.handleConfirmRemove.bind(this);
    this.handleCancelButton=this.handleCancelButton.bind(this);
}
handleCancelButton(){
    this.setState({
        openRemoveStudentDialog:false
    })
}


handleSubmitButton(){
    this.setState({
        openRemoveStudentDialog:true
    })
}

handleConfirmRemove(){
    this.setState({
        openRemoveStudentDialog:false
    })
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

    <Dialog onClose={this.handleCloseDialog} aria-labelledby="remove-student-dialog" open={this.state.openRemoveStudentDialog}>
    <DialogTitle id="removeStudentDialog">Remove Student</DialogTitle>
      <div style={{display:"flex",flexDirection:"column"}}>
  
    <form style={{marginLeft:30,marginRight:30,marginBottom:30}}>
    <div class="row">
      <div class="col-25">
        <label for="fullname">Student Name</label>
      </div>
      <div class="col-75">
        <input type="text"  placeholder="Himanshu Dhankhar" disabled/>
      </div>
    </div>


    <div class="row">
      <div class="col-25">
        <label for="gender">Gender</label>
      </div>
      <div class="col-75">
       <input type="text" disabled placeholder="Male"/>
     </div>   
     </div>



    <div class="row">
      <div class="col-25">
        <label for="fathersname">Fathers Name</label>
      </div>
      <div class="col-75">
        <input type="text"  placeholder="Mr. Dharamvir Singh Dhankhar" disabled/>
      </div>
    </div>

    <div class="row">
      <div class="col-25">
        <label for="mothersname">Mothers Name</label>
      </div>
      <div class="col-75">
        <input type="text"   placeholder="Mrs. Satyavati" disabled/>
      </div>
    </div>


    <div class="row">
      <div class="col-25">
        <label for="class">Class</label>
      </div>
      <div class="col-75">
     <input type="text" placeholder="Tenth" disabled/>
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="Address">Address</label>
      </div>
      <div class="col-75">
        <textarea  placeholder="B-49 Ramapark Uttam Nagar" disabled style={{height:'60px'}}></textarea>
      </div>
    </div>

    <div class="row">
      <div class="col-25">
        <label for="sAadhar">Student Aadhar</label>
      </div>
      <div class="col-75">
        <input type="text"   placeholder="8656-4519-1299" disabled/>
      </div>
    </div>


    <div class="row">
      <div class="col-25">
        <label for="fAadhar">Father Aadhar</label>
      </div>
      <div class="col-75">
        <input type="text"   placeholder="8656-6512-1299" disabled/>
      </div>
    </div>

    <div class="row">
      <div class="col-25">
        <label for="mobileNumber">Mobile Number</label>
      </div>
      <div class="col-75">
        <input type="text"   placeholder="9079161380" disabled/>
      </div>
    </div>

    <div class="row">
      <div class="col-25">
        <label for="village">Village</label>
      </div>
      <div class="col-75">
        <input type="text"   placeholder="Chittrolli" disabled/>
      </div>
    </div>

    <div class="row">
      <div class="col-25">
        <label for="district">District</label>
      </div>
      <div class="col-75">
        <input type="text"   placeholder="Jhajjar" disabled/>
      </div>
    </div>

    <div class="row">
      <div class="col-25">
        <label for="dob">Date of Birth</label>
      </div>
      <div class="col-75">
      <DatePicker
        selected={new Date("1995-12-17T00:00:00")}
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
        selected={new Date("1995-12-17T00:00:00")}
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
        <input type="text"  placeholder="B16CS008" disabled/>
      </div>
    </div>

    <div class="row">
    <div class="col-25">
        <label  >Photo:</label>
      </div>
      <div class="col-75">
         <img style={{width:150,height:150}} src="student.jpg"/>
      </div>
    </div>


    


    



    <div class="row">
    <Button id="submitButton2" variant="contained" color="green" onClick={this.handleCancelButton}>Cancel</Button>
   
      <Button id="submitButton2" variant="contained" color="green" onClick={this.handleConfirmRemove}>Confirm Remove</Button>
            </div>
    

    </form>

          
        </div>



      </Dialog>
</div>
)
    }
}