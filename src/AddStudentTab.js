import React from 'react';
import './stylesAdded.css';

import Button from '@material-ui/core/Button';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import {IKContext ,IKUpload} from "imagekitio-react"


import CircularProgress from '@material-ui/core/CircularProgress';
import SuccessDialog from './SuccessDialog';
import ErrorDialog from './ErrorDialog';
import windowSize from 'react-window-size';
const ImageKit = require('imagekit-javascript');
const pjson = require('../package.json');

class AddStudentTab extends React.Component{
 registerStudentUrl = "http://localhost:5000/register_student";
constructor(props){
    super(props);
    this.state={
      showUploadImage:false,
      progress:false,
dob:new Date(),
startDate:new Date(),
doe:new Date(),
fullname:"",
fathersname:"",
mothersname:"",
village:"",
district:"",
sAadhar:"",
fAadhar:"",
mobileNumber:"",
doe:Date.now(),
face:"",
rollnumber:"",
standard:"",
address:"",
successDialog:false,
errorDialog:false,
successMessage:"",
errorMessage:""
     }
    this.handleSubmitButton=this.handleSubmitButton.bind(this);
    this.handleFileUpload=this.handleFileUpload.bind(this);
    this.handleDobChange=this.handleDobChange.bind(this);
    this.handleSubmitButton=this.handleSubmitButton.bind(this);
    this.handleChangeDob=this.handleChangeDob.bind(this);
    this.handleChangeDoe=this.handleChangeDoe.bind(this);
    this.closeSuccessDialog=this.closeSuccessDialog.bind(this);
    this.closeErrorDialog=this.closeErrorDialog.bind(this);
    this.reqImageUpload = this.reqImageUpload.bind(this);
}

closeSuccessDialog(){
  this.setState({
    successDialog:false,
    errorDialog:false,
    successMessage:"",
    errorMessage:"",
    progress:false,
    dob:new Date(),
    startDate:new Date(),
    doe:new Date(),
    fullname:"",
    fathersname:"",
    mothersname:"",
    village:"",
    district:"",
    sAadhar:"",
    fAadhar:"",
    mobileNumber:"",
    doe:Date.now(),
    face:"",
    rollnumber:"",
    standard:"",
    address:""
  });
   document.getElementById("fullname").value="";
    document.getElementById("fathersname").value="";
  document.getElementById("mothersname").value="";
   document.getElementById("class").value="";
  document.getElementById("address").value="";
   document.getElementById("sAadhar").value="";
    document.getElementById("fAadhar").value="";
    document.getElementById("mobileNumber").value="";
   document.getElementById("Village").value="";
    document.getElementById("district").value="";
   document.getElementById("gender").value="";
   document.getElementById("rollnumber").value="";
   document.getElementById("ImageUpload").value="";
   this.setState({
     face:"",
     showUploadImage:false
   })
  
}


closeErrorDialog(){
  this.setState({
    successDialog:false,
    errorDialog:false,
    successMessage:"",
    errorMessage:"",
    progress:false,
    dob:new Date(),
    startDate:new Date(),
    doe:new Date(),
    fullname:"",
    fathersname:"",
    mothersname:"",
    village:"",
    district:"",
    sAadhar:"",
    fAadhar:"",
    mobileNumber:"",
    doe:Date.now(),
    face:"",
    rollnumber:"",
    standard:"",
    address:""
  });
  //  document.getElementById("fullname").value="";
  //   document.getElementById("fathersname").value="";
  // document.getElementById("mothersname").value="";
  //  document.getElementById("class").value="";
  // document.getElementById("address").value="";
  //  document.getElementById("sAadhar").value="";
  //   document.getElementById("fAadhar").value="";
  //   document.getElementById("mobileNumber").value="";
  //  document.getElementById("Village").value="";
  //   document.getElementById("district").value="";
  //  document.getElementById("gender").value="";
  //  document.getElementById("rollnumber").value="";
  //  document.getElementById("face").value="";
  
}

askRollnumberComplete(){
  let classs = document.getElementById('class').value;
  let dated = this.state.doe;
  this.askRollnumber(classs,dated);
}


askRollnumber(classs,date){

  var classess = {
    'Nursery':'Nr',
     "LKG":'Lk',
     "UKG":'Uk',
    'First':'Fi',
    'Second':'Se',
    "Third":'Th',
    'Fourth':'Fu',
    "Fifth":'Fi',
   "Sixth": 'Sx',
    "Seventh":'Sv',
     'Eighth':"Eg",
    "Ninth":'Nn',
    "Tenth":'Tn',
    "Eleventh":'El',
    "Twelfth":"Tw"
  }
  let self = this;
  axios.get('http://localhost:5000/getRollNumber/'+classess[classs]+"/"+new Date(date).getFullYear()+"/").then((resp)=>{
  console.log(resp.data.successMessage);
  document.getElementById("rollnumber").value = resp.data.successMessage;
self.setState({
  rollnumber:resp.data.successMessage,
  showUploadImage:true
})
  }).catch(err=>{
    console.log(err);
  })
}



handleChangeDoe(date){
this.setState({
    doe:date
});

if(document.getElementById('class').value!==null || document.getElementById('class').value!==undefined){
  //fetch from the backened about the rollnumber and paste it
  let classs = document.getElementById('class').value;
 this.askRollnumber(classs,date);
}
}

handleChangeDob(date){
    this.setState({
        dob:date
    })
    this.askRollnumberComplete();
}
handleChange = date => {
    this.setState({
      startDate: date
    });
  };
handleDobChange(event){
    console.log(event.target.value);
    this.setState({
        dob:event.target.value
    });
    this.askRollnumberComplete();
}

handleFileUpload(event){
    
    this.setState({
        fileUploaded:event.target.files[0]
    })
}
handleSubmitButton(){
 this.askRollnumberComplete();
    // 14 inputs required
    let fullname = document.getElementById("fullname").value;
    let fathersname = document.getElementById("fathersname").value;
    let mothersname = document.getElementById("mothersname").value;
    let standard = document.getElementById("class").value;
    let address = document.getElementById("address").value;
    let sAadhar = document.getElementById("sAadhar").value;
    let fAadhar = document.getElementById("fAadhar").value;
    let mobileNumber = document.getElementById("mobileNumber").value;
    let village = document.getElementById("Village").value;
    let district = document.getElementById("district").value;
    let gender = document.getElementById("gender").value;
    let rollnumber = document.getElementById("rollnumber").value;
    let face =this.state.face;
 if(fullname==""||fullname==null||fullname==undefined||fullname.length==0){
    alert("Enter Student Name");
    return;
}else{
    fullname=fullname.trim();
}
if(gender==null||gender==undefined||gender==""||gender.length==0){
  alert("Select Gender");
  return;
}
if(fathersname==null||fathersname==""||fathersname==undefined||fathersname.length==0){
    alert("Enter Fathers Name");
    return;}else{
        fathersname=fathersname.trim();

    }

if(mothersname==""||mothersname==null||mothersname.length==0||mothersname==undefined){
    alert("Enter Mothers Name");
    return;
}else{
    mothersname=mothersname.trim();
}
if(standard==undefined||standard==null||standard==""||standard.length==0)
{
alert("Enter Class");
return;    
}else{
    standard=standard.trim();
}

if(address==null|address==undefined||address==""||address.length==0){
    alert("Enter Valid Address");
    return;
}else{
    address=address.trim();
}

if(sAadhar==null||sAadhar==undefined||sAadhar==""||sAadhar.length==0){
    alert('Enter Student Aadhar');
    return;
}else{
    sAadhar=sAadhar.trim();
}

if(fAadhar==null||fAadhar==undefined||fAadhar==""||fAadhar.length==0){
    alert("Enter Fathers Aadhar Card Number")
    return;
}else{
    fAadhar=fAadhar.trim();
}

if(mobileNumber==null||mobileNumber==undefined||mobileNumber==""||mobileNumber.length==0){
    alert("Enter Mobile Number");
    return;
}else{
    mobileNumber=mobileNumber.trim();
}
if(village==null||village==undefined||village==""||village.length==0){
    alert("Enter Village");
    return;
}else{
    village=village.trim();
}
if(district==undefined||district==null||district==""||district.length==0){
    alert("Enter District");
    return;
}else{
    district = district.trim();
}
if(this.state.dob==null||this.state.dob==undefined||this.state.dob==""||this.state.dob.length==0){
    alert("Enter Date Of Birth");
    console.log(document.getElementById("dob").value);
    return;
} 

if(this.state.doe==undefined||this.state.doe==null||this.state.doe==""||this.state.doe.length==0){
    alert("Enter Date Of Enrollment");
    return;
}

if(this.state.dob>=this.state.doe){
  alert("DOB cannot greater than equal to DOE");
  return;
}
if(this.state.dob.getYear()==new Date().getYear() && this.state.dob.getMonth()==new Date().getMonth()){
  alert("DOB seems invalid, child is too young!!");
  return;
}

if(rollnumber==undefined||rollnumber==null||rollnumber==""||rollnumber.length==0){
    alert("Enter RollNumber Assigned");
    return;
}
else{
    rollnumber=rollnumber.trim();
}
if(face==undefined||face==null||face==""||face.length==0){
    alert("Select the Student Image");
    return;
}

//now check for mobile and adhar card numbers 
if(mobileNumber.match(/\d/g).length===10){
    console.log("mobile number seems valid");
}else{
   
    alert("Enter valid Mobile Number Please!!");
    return;
}

if(sAadhar.match(/[0-9]{12}/g)){
    console.log("Student Aadhar seems valid");
     
}else{
   
    alert("Enter Valid 12 digit Student Aadhar");
    return;
}

if(fAadhar.match(/[0-9]{12}/g)){
    console.log("Father Aadhar seems valid");
     
}else{
   
  alert("Enter Valid 12 digit Father Aadhar");

    return;
}
let student_name=fullname.toUpperCase();
let fathers_name = fathersname.toUpperCase();
let mothers_name = mothersname.toUpperCase();
let studentAadhar = sAadhar;
let fathersAadhar = fAadhar;
let classs = standard;
let studentDetails={
  student_name,fathers_name,mothers_name,classs,address,studentAadhar,fathersAadhar,mobileNumber,village,district,rollnumber,face,
  dob:new Date(this.state.dob).toUTCString(),
  doe:new Date(this.state.doe).toUTCString(),
  gender
}
 
console.log(studentDetails);
//make the backened request 
let self = this;
 
axios.post(this.registerStudentUrl,studentDetails).then((response) => {
  console.log(response);
  // self.setState({
  //   progress:false
  // })
  if(response.data.error==true){
    self.setState({errorDialog:true,errorMessage:response.data.errorMessage});
  }else{
    self.setState({successDialog:true,successMessage:response.data.successMessage});
  }
  
}, (error) => {
  console.log(error);
});

}




reqImageUpload(e,fileName,useUniqueFileName,tags,folder,isPrivateFile,customCoordinates,responseFields){
console.log(e.target);
    let publicKey="public_8PFAM11+fdiUFyUXnMIIsr9TP5s=" 
    let urlEndpoint="https://ik.imagekit.io/Dhankhar7924/" 
    let authenticationEndpoint="http://localhost:5000/authenticate"
    
    let onError = (e, err) => {
      e.insertAdjacentHTML(
        "afterend",
        `<div>${err.message}</div>`
      );
    };

    let onSuccess = (e) => {
      var newDiv = document.createElement("div"); 
  var newContent = document.createTextNode("Image Uploaded"); 
  // add the text node to the newly created div
  newDiv.appendChild(newContent);  
      document.getElementById("ImageUpload").insertAdjacentElement("afterend",newDiv);
    };

    if (publicKey === undefined) {
      throw new Error('Missing publicKey during initialization');
    }

    if (urlEndpoint === undefined) {
      throw new Error('Missing urlEndpoint during initialization');
    }

    if (authenticationEndpoint === undefined) {
      throw new Error('Missing authenticationEndpoint during initialization');
    }

    let ik = new ImageKit({
      sdkVersion : `react-${pjson.version}`,
      publicKey: publicKey,
      urlEndpoint: urlEndpoint,
      authenticationEndpoint: authenticationEndpoint
    });

    const params = {
      file: e.target.files[0],
      fileName: fileName,
      useUniqueFileName: useUniqueFileName,
      isPrivateFile: isPrivateFile,
      folder: folder,
    }
    if (tags) {
      Object.assign(params, { tags: tags });
    }

    if (customCoordinates) {
      Object.assign(params, { customCoordinates: customCoordinates });
    }

    if (responseFields) {
      Object.assign(params, { responseFields: responseFields });
    }
let self = this;
    ik.upload(params, function (err, result) {
      if (err) {
        onError(e, err);
      } else {
        self.setState({
          face:result.url
        })
        onSuccess(e);
      }
    });
  }


onSuccessImageUpload(result){
  console.log(result);
}
onError(err){
  console.log(err);
}









    render(){
        return(
            <div style={{display:"flex",flexDirection:"column",padding:50}}>
                <div class="container">
  <form>
    <div class="row">
      <div class="col-25">
        <label for="fullname">Student Name</label>
      </div>
      <div class="col-75">
        <input type="text" id="fullname" name="fullname" placeholder="Full Name...."/>
      </div>
    </div>


    <div class="row">
      <div class="col-25">
        <label for="gender">Gender</label>
      </div>
      <div class="col-75">
        <select id="gender" name="gender" >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="others">Others</option>
          </select>
        </div>
     </div>   



    <div class="row">
      <div class="col-25">
        <label for="fathersname">Fathers Name</label>
      </div>
      <div class="col-75">
        <input type="text" id="fathersname" name="fathersname" placeholder="Fathers Full Name..."/>
      </div>
    </div>

    <div class="row">
      <div class="col-25">
        <label for="mothersname">Mothers Name</label>
      </div>
      <div class="col-75">
        <input type="text" id="mothersname" name="mothersname" placeholder="Mothers Full Name..."/>
      </div>
    </div>


    <div class="row">
      <div class="col-25">
        <label for="class">Class</label>
      </div>
      <div class="col-75">
        <select id="class" name="class">
          <option value="choose">Choose</option>
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
    <div class="row">
      <div class="col-25">
        <label for="Address">Address</label>
      </div>
      <div class="col-75">
        <textarea id="address" name="address" placeholder="Write Full Address(street , village , district , pincode etc).." style={{height:'60px'}}></textarea>
      </div>
    </div>

    <div class="row">
      <div class="col-25">
        <label for="sAadhar">Student Aadhar</label>
      </div>
      <div class="col-75">
        <input type="text" id="sAadhar" name="sAadhar" placeholder="Student Aadhar Number(No Spaces)..."/>
      </div>
    </div>


    <div class="row">
      <div class="col-25">
        <label for="fAadhar">Father Aadhar</label>
      </div>
      <div class="col-75">
        <input type="text" id="fAadhar" name="fAadhar" placeholder="Father Aadhar Number(No Spaces)..."/>
      </div>
    </div>

    <div class="row">
      <div class="col-25">
        <label for="mobileNumber">Mobile Number</label>
      </div>
      <div class="col-75">
        <input type="text" id="mobileNumber" name="mobileNumber" placeholder="Fathers Mobile Number (Donot Add Country Code)..."/>
      </div>
    </div>

    <div class="row">
      <div class="col-25">
        <label for="village">Village</label>
      </div>
      <div class="col-75">
        <input type="text" id="Village" name="Village" placeholder="Village..."/>
      </div>
    </div>

    <div class="row">
      <div class="col-25">
        <label for="district">District</label>
      </div>
      <div class="col-75">
        <input type="text" id="district" name="district" placeholder="District..."/>
      </div>
    </div>

    <div class="row">
      <div class="col-25">
        <label for="dob">Date of Birth</label>
      </div>
      <div class="col-75">
      <DatePicker
        selected={this.state.dob}
        onChange={this.handleChangeDob}
      />
      </div>
    </div>

    <div class="row">
      <div class="col-25">
        <label for="doe">Date of Enrollment</label>
      </div>
      <div class="col-75">
      <DatePicker
        selected={this.state.doe}
        onChange={this.handleChangeDoe}
      />
      </div>
    </div>

    <div class="row">
      <div class="col-25">
        <label for="rollnumber">Rollnumber Assigned</label>
      </div>
      <div class="col-75">
        <input type="text" id="rollnumber" name="rollnumber" placeholder="Rollnumber Assigned..." disabled onClick={this.askRollnumberComplete}/>
      </div>
    </div>


    
    <div class="row">
      <div class="col-25">
        <label for="face">Upload Image:</label>
      </div>
      <div class="col-75">
        {/* <input type="file"    accept="image/*" id="face" name="face" onChange={this.handleFileUpload} /> */}
      {this.state.showUploadImage==true?
      <IKContext  
    publicKey="public_8PFAM11+fdiUFyUXnMIIsr9TP5s=" 
    urlEndpoint="https://ik.imagekit.io/Dhankhar7924/" 
    authenticationEndpoint="http://localhost:5000/authenticate"
    >
    <IKUpload fileName={this.state.rollnumber} id="ImageUpload" isPrivateFile= {false} onChange={(e)=>{this.reqImageUpload(e,this.state.rollnumber,false,[],"StudentImages",false)}}/>
 </IKContext>:
 <div>
Get a Rollnumber First
 </div>}
      </div>
    </div>


    



    <div class="row">
      {this.state.progress==true?
    <CircularProgress style={{
      position:"fixed",
      bottom:this.props.windowWidth/2 - 10 ,
      right:this.props.windowHeight/2 - 10
    }}/>:
    <div/>
      }

      <Button id="submitButton" variant="contained" color="green" onClick={this.handleSubmitButton}>Submit</Button>
    </div>
  </form>
  <ErrorDialog show={this.state.errorDialog} errorMessage={this.state.errorMessage} onClose={this.closeErrorDialog}/>
  <SuccessDialog show={this.state.successDialog} successMessage={this.state.successMessage} onClose={this.closeSuccessDialog}/>
</div>
            </div>
        )
    }
}
export default windowSize(AddStudentTab);