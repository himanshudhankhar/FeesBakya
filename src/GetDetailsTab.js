import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DatePicker from "react-datepicker";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import './stylesAdded.css';
import { Typography } from '@material-ui/core';
export default class GetDetailsTab extends React.Component{
    constructor(props){
        super(props);
        this.state={
            searchDialog:false,
            expanded:"none",
            detailsFetched:[
{
    name:"Himanshu Dhankhar",
    fathersName:"Dharamvir Singh Dhankhar",
    mothersName:"Satyavati Devi",
    dob:"1995-12-17",
    doe:"1995-12-17",
    gender:"male",
    address:"B-49 Ramapark, Uttam Nagar",
    rollNumber:"B16CS008",
    district:"jhajjar",
    village:"chittrolli",
    imgSrc:"student.jpg",
    saadhar:"865676191299",
    faadhar:"865676191299",
    mobileNumber:"9079161380",
    class:"Tenth",


},
{
    name:"Himanshu Dhankhar",
    fathersName:"Dharamvir Singh Dhankhar",
    mothersName:"Satyavati Devi",
    dob:"1995-12-17",
    doe:"1995-12-17",
    gender:"male",
    address:"B-49 Ramapark, Uttam Nagar",
    rollNumber:"B16CS009",
    district:"jhajjar",
    village:"chittrolli",
    imgSrc:"student.jpg",
    saadhar:"865676191299",
    faadhar:"865676191299",
    mobileNumber:"9079161380",
    class:"Tenth",
}



            ]
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.handleCloseDetailsDialog=this.handleCloseDetailsDialog.bind(this);
        this.handleExpansion=this.handleExpansion.bind(this);
    }
    handleExpansion(value){
        this.setState({
            expanded:value
        })
    }

    handleCloseDetailsDialog(){
        this.setState({
            searchDialog:false
        })
    }
handleSearch(){
    this.setState({
            searchDialog:true
    })
}

    render(){
        return(
            <div style={{display:"flex",flexDirection:"column",padding:50, justifyContent:"center",textAlign:"center"}}>
          <b>Get Details by Roll Number:</b>
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

<Button id="submitButton3" variant="contained" onClick={this.handleSearch}>Search</Button>
            </form>
            </div>
<b>Get Details by Class</b>

            <div class="container">
            <form>
            
            <div class="row">
              <div class="col-25">
                <label for="classSelection">Select Class</label>
              </div>
              <div class="col-75">
        <select id="class" name="class">
          <option value="Nursery">Nursery</option>
          <option value="First">First</option>
          <option value="Second">Second</option>
          <option value="Third">Third</option>
          <option value="Fourth">Fourth</option>
          <option value="Fifth">Fifth</option>
          <option value="Sixth">Sixth</option>
          <option value="Seventh">Seventh</option>
          <option value="Eighth">Eighth</option>
          <option value="Ninth">Ninth</option>
          <option value="Tenth">Tenth</option>
          <option value="Eleventh">Eleventh</option>
          <option value="Twelfth">Twelfth</option>
        </select>
      </div>
            </div>


            <Button id="submitButton3" variant="contained" onClick={this.handleSearch}>Search</Button>
            </form>
            </div>

<b>Get Details by Name</b> 

            <div class="container">
            <form>
            
            <div class="row">
              <div class="col-25">
                <label for="getDetailsbyName">Enter Name:</label>
              </div>
              <div class="col-75">
                <input type="text" id="getDetailsbyName" name="getDetailsbyName" placeholder="Enter Name..."/>
              </div>
            </div>


            <Button id="submitButton3" variant="contained" onClick={this.handleSearch}>Search</Button>
            </form>
            </div>

<Dialog onClose={this.handleCloseDetailsDialog} aria-labelledby="get-student-details-dialog" open={this.state.searchDialog}>
    <DialogTitle id="detailsDialog">Student Details</DialogTitle>
    <div style={{display:"flex",flexDirection:"column"}}>

        {this.state.detailsFetched.map(value=>{
            return  (
            <ExpansionPanel square expanded={this.state.expanded==value.rollNumber} onChange={()=>{this.handleExpansion(value.rollNumber)}}>
            <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
            {
                value.gender=="male"?
                <Typography>{value.name} S/o {value.fathersName} class {value.class}</Typography>:
                <Typography>{value.name} D/o {value.fathersName} class {value.class}</Typography>

            }
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              
            
            
            
           
  <form style={{marginLeft:30,marginRight:30,marginBottom:30}}>
  <div class="row">
    <div class="col-25">
      <label for="fullname">Student Name</label>
    </div>
    <div class="col-75">
      <input type="text"  placeholder={value.name} disabled/>
    </div>
  </div>


  <div class="row">
    <div class="col-25">
      <label for="gender">Gender</label>
    </div>
    <div class="col-75">
     <input type="text" disabled placeholder={value.gender}/>
   </div>   
   </div>



  <div class="row">
    <div class="col-25">
      <label for="fathersname">Fathers Name</label>
    </div>
    <div class="col-75">
      <input type="text"  placeholder={value.fathersName} disabled/>
    </div>
  </div>

  <div class="row">
    <div class="col-25">
      <label for="mothersname">Mothers Name</label>
    </div>
    <div class="col-75">
      <input type="text"   placeholder={value.mothersName} disabled/>
    </div>
  </div>


  <div class="row">
    <div class="col-25">
      <label for="class">Class</label>
    </div>
    <div class="col-75">
   <input type="text" placeholder={value.class} disabled/>
    </div>
  </div>
  <div class="row">
    <div class="col-25">
      <label for="Address">Address</label>
    </div>
    <div class="col-75">
      <textarea  placeholder={value.address} disabled style={{height:'60px'}}></textarea>
    </div>
  </div>

  <div class="row">
    <div class="col-25">
      <label for="sAadhar">Student Aadhar</label>
    </div>
    <div class="col-75">
      <input type="text"   placeholder={value.saadhar} disabled/>
    </div>
  </div>


  <div class="row">
    <div class="col-25">
      <label for="fAadhar">Father Aadhar</label>
    </div>
    <div class="col-75">
      <input type="text"   placeholder={value.faadhar} disabled/>
    </div>
  </div>

  <div class="row">
    <div class="col-25">
      <label for="mobileNumber">Mobile Number</label>
    </div>
    <div class="col-75">
      <input type="text"   placeholder={value.mobileNumber} disabled/>
    </div>
  </div>

  <div class="row">
    <div class="col-25">
      <label for="village">Village</label>
    </div>
    <div class="col-75">
      <input type="text"   placeholder={value.village} disabled/>
    </div>
  </div>

  <div class="row">
    <div class="col-25">
      <label for="district">District</label>
    </div>
    <div class="col-75">
      <input type="text"   placeholder={value.district} disabled/>
    </div>
  </div>

  <div class="row">
    <div class="col-25">
      <label for="dob">Date of Birth</label>
    </div>
    <div class="col-75">
    <DatePicker
      selected={new Date( value.dob + "T00:00:00")}
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
      selected={new Date( value.doe + "T00:00:00")}
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
      <input type="text"  placeholder={value.rollNumber} disabled/>
    </div>
  </div>

  <div class="row">
  <div class="col-25">
      <label  >Photo:</label>
    </div>
    <div class="col-75">
       <img style={{width:150,height:150}} src={value.imgSrc}/>
    </div>
  </div>


  


  

 
  

  </form>
  </ExpansionPanelDetails>
          </ExpansionPanel>
            )
   
        })}
            
    </div>
</Dialog>

            </div>
        )
    }
}