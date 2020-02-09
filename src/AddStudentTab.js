import React from 'react';
import './stylesAdded.css';
import Button from '@material-ui/core/Button';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default class AddStudentTab extends React.Component{

constructor(props){
    super(props);
    this.state={
dob:Date.now(),
startDate:Date.now(),
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
    }
    this.handleSubmitButton=this.handleSubmitButton.bind(this);
    this.handleFileUpload=this.handleFileUpload.bind(this);
    this.handleDobChange=this.handleDobChange.bind(this);
    this.handleSubmitButton=this.handleSubmitButton.bind(this);
    this.handleChangeDob=this.handleChangeDob.bind(this);
    this.handleChangeDoe=this.handleChangeDoe.bind(this);
}
handleChangeDoe(date){
this.setState({
    doe:date
})
}

handleChangeDob(date){
    this.setState({
        dob:date
    })
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
    })
}

handleFileUpload(event){
    
    this.setState({
        fileUploaded:event.target.files[0]
    })
}
handleSubmitButton(){
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
    let face = document.getElementById("face").value;
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
// if(this.state.dob==null||this.state.dob==undefined||this.state.dob==""||this.state.dob.length==0){
//     alert("Enter Date Of Birth");
//     console.log(document.getElementById("dob").value);
//     return;
// }else{
//     dob=dob.trim();
// }

// if(doe==undefined||doe==null||doe==""||doe.length==0){
//     alert("Enter Date Of Enrollment");
//     return;
// }else{
//     doe=doe.trim();
// }
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

let studentDetails={
    fullname,fathersname,mothersname,standard,address,sAadhar,fAadhar,mobileNumber,village,district,rollnumber,face
}
 
console.log(this.state);

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
        <input type="text" id="rollnumber" name="rollnumber" placeholder="Rollnumber Assigned..."/>
      </div>
    </div>


    
    <div class="row">
      <div class="col-25">
        <label for="face">Upload Image</label>
      </div>
      <div class="col-75">
        <input type="file"    accept="image/*" id="face" name="face" onChange={this.handleFileUpload} />
      </div>
    </div>


    



    <div class="row">
      <Button id="submitButton" variant="contained" color="green" onClick={this.handleSubmitButton}>Submit</Button>
    </div>
  </form>
</div>
            </div>
        )
    }
}