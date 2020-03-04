import React from 'react';
import userImage from './userImage.png';
import { Scrollbars } from 'react-custom-scrollbars';
import './stylesAdded.css';
import Backdrop from '@material-ui/core/Backdrop';
import IDCard from './IDCard';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DatePicker from "react-datepicker";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import './stylesAdded.css';
import domtoimage from 'dom-to-image';
import {download} from './download';
import Pdf from "react-to-pdf";
import axios from 'axios';
import ErrorDialog from './ErrorDialog';
import SuccessDialog from './SuccessDialog';
import { Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));
export default class GetDetailsTab extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            searchDialog:false,
            expanded:"none",
            errorDialog:false,
            errorMessage:"",
            successDialog:false,
            successMessage:"",
            showIDCard:false,

            detailsFetched:[
    ]
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.handleCloseDetailsDialog=this.handleCloseDetailsDialog.bind(this);
        this.handleExpansion=this.handleExpansion.bind(this);
        this.closeErrorDialog = this.closeErrorDialog.bind(this);
        this.showIDCardDialog = this.showIDCardDialog.bind(this);
        this.closeIDCardDialog=this.closeIDCardDialog.bind(this);
        
this.ref = React.createRef();        

      
    }
    closeIDCardDialog(){
      this.setState({
        showIDCard:false,
        
      });
    }
    showIDCardDialog(){
        this.setState({
            showIDCard:true,
            
        })
    }
    closeErrorDialog(){
      this.setState({
        errorDialog:false,
        errorMessage:""
      });
    }

    handleExpansion(value){
       let currentValue = this.state.expanded;
       if(currentValue==value){
         this.setState({
           expanded:"none"
         });
       }else{
         this.setState({
           expanded:value
         })
       }
    }

    handleCloseDetailsDialog(){
        this.setState({
            searchDialog:false
        })
    }
handleSearch(){
   //make the backened request to handle search query
   let rollnumber = document.getElementById('rollnumberQuery').value;
   let classs = document.getElementById("classsQuery").value;
   let name = document.getElementById("nameQuery").value;
if(rollnumber!==undefined||rollnumber!==null||rollnumber.length!=0){
  rollnumber=rollnumber.trim();
}else{
  rollnumber=null;
}
if(classs=="Choose"){
  classs=null;
}
  

if(name.trim()==""){
  name=null;
}
let self =this;
axios.post("http://localhost:5000/getStudentDetails",{query:{
  rollnumber,classs,name
}}).then(response=>{

console.log(response.data);
let outPut = response.data;
if(outPut.error==true){
self.setState({
  errorDialog:true,
  errorMessage:outPut.errorMessage
});
}
if(outPut.success==true && outPut.students_found.length>0){
  self.setState({
    detailsFetched:outPut.students_found,
    searchDialog:true
  });
}else if(outPut.students_found!==undefined && outPut.students_found.length==0){
self.setState({
  errorDialog:true,
  errorMessage:"No Student Found!!"
});
}


  }).catch(error=>{
    console.log(error);
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
                <input type="text" id="rollnumberQuery" name="rollnumber" placeholder="Rollnumber Assigned..." onKeyPress={e => {
  if (e.key === 'Enter') e.preventDefault();
}} />
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
        <select id="classsQuery" name="class">
          <option value="Choose">Choose</option>
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
                <input type="text" id="nameQuery" name="getDetailsbyName" placeholder="Enter Name..." onKeyPress={e => {
  if (e.key === 'Enter') e.preventDefault();
}} />
              </div>
            </div>


            <Button id="submitButton3" variant="contained" onClick={this.handleSearch}>Search</Button>
            </form>
            </div>
<ErrorDialog show={this.state.errorDialog} errorMessage={this.state.errorMessage} onClose={this.closeErrorDialog}/>
<Dialog onClose={this.handleCloseDetailsDialog} aria-labelledby="get-student-details-dialog" open={this.state.searchDialog}>
    <DialogTitle id="detailsDialog" style={{backgroundColor:"#1155FF",color:"#FFFFFF" ,fontStyle: 'bold',}}>Student Details</DialogTitle>
    <Scrollbars autoHeight autoHeightMax={500} autoHeightMin={100}
 autoHide>        
    <div style={{display:"flex",flexDirection:"column"}}>

        {this.state.detailsFetched.map(value=>{
            return  (
            <ExpansionPanel square expanded={this.state.expanded==value.rollnumber} onChange={()=>{this.handleExpansion(value.rollnumber)}}>
            <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
            {
                value.gender=="male"?
                <Typography>{value.student_name} S/o {value.fathers_name} class {value.classs}</Typography>:
                <Typography>{value.student_name} D/o {value.fathers_name} class {value.classs}</Typography>

            }
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              
            
            <div>            
           
  <form    style={{marginLeft:10,marginRight:10,marginBottom:10,padding:20 }}>
    
       <div class="row">
    <div class="col-25">
      <label for="fullname">Student Name</label>
    </div>
    <div class="col-75">
      <input type="text"  placeholder={value.student_name} disabled/>
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
      <input type="text"  placeholder={value.fathers_name} disabled/>
    </div>
  </div>

  <div class="row">
    <div class="col-25">
      <label for="mothersname">Mothers Name</label>
    </div>
    <div class="col-75">
      <input type="text"   placeholder={value.mothers_name} disabled/>
    </div>
  </div>


  <div class="row">
    <div class="col-25">
      <label for="class">Class</label>
    </div>
    <div class="col-75">
   <input type="text" placeholder={value.classs} disabled/>
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
      <input type="text"   placeholder={value.studentAadhar} disabled/>
    </div>
  </div>


  <div class="row">
    <div class="col-25">
      <label for="fAadhar">Father Aadhar</label>
    </div>
    <div class="col-75">
      <input type="text"   placeholder={value.fathersAadhar} disabled/>
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
      selected={new Date( new Date(value.dob))}
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
      selected={new Date( new Date(value.doe))}
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
      <input type="text"  placeholder={value.rollnumber} disabled/>
    </div>
  </div>

  <div class="row">
  <div class="col-25">
      <label  >Photo:</label>
    </div>
    <div class="col-75">
       <img style={{width:150,height:150}} src={value.face}/>
    </div>
  </div>
  
{value.active==false?
<div class="row">
        <p style={{color:"#FF5511"}}>Student De-Registered on:</p><p style={{color:"#1155FF"}}>{value.dode}</p>
</div>
:
<div class="row">

</div>

}

  


  

  

  </form>
<div>
<Button color="primary" onClick={this.showIDCardDialog}>Generate ID Card</Button>
{value.active==true && this.state.showIDCard==true?
<div id="idcard">
   <div ref={this.ref} style={{padding:8,border:"1px solid black"}}>
      
<IDCard  user={value}/>
 
</div>
<button style={{backgroundColor:"#1155FF" , borderRadius:"8px",borderColor:"#1155FF",borderWidth:"1px", color:"#FFFFFF",paddingTop:8,paddingBottom:8,paddingLeft:10,paddingRight:10,marginLeft:10}}  onClick={()=>{
var node = document.getElementById('idcard');
 
domtoimage.toSvg(node)
    .then(function (dataUrl) {
      
      
        var img = new Image();
        img.src = dataUrl;
        
        
     download(dataUrl,value.student_name+'IDCard.svg','image/svg+xml');
        // document.body.appendChild(img);
    })
    .catch(function (error) {
        console.error('oops, something went wrong!', error);
    });
}}>Download</button>
{/* <Pdf targetRef={this.ref} filename={value.rollnumber + "IDCard.pdf"} >
        {({ toPdf }) => <button style={{backgroundColor:"#1155FF" , borderRadius:"8px",borderColor:"#1155FF",borderWidth:"1px", color:"#FFFFFF",paddingTop:8,paddingBottom:8,paddingLeft:10,paddingRight:10,marginLeft:10}}  onClick={toPdf}>Download</button>}
</Pdf> */}
<Button onClick={this.closeIDCardDialog}>Close</Button>
</div>
:
<div/>
        }
 
</div>
   </div>
  </ExpansionPanelDetails>
          </ExpansionPanel>
            )
   
        })}
            
    </div>
    </Scrollbars>
</Dialog>

            </div>
        )
    }
}