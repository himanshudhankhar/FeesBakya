import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DatePicker from "react-datepicker";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Select,Button } from '@material-ui/core';
export default class DefaultersTab extends React.Component{


constructor(props){
    super(props);
    this.state={
        openDefaulters:false,
        defaultersFetched:[{
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
            transactions:[
                {
                    deposit:2000,
                    date:"20 jun 2019",
                    comment:"lumpsum fees paid"
                    
                },{
                    deposit:-850,
                    date:"10 july 2019",
                    comment:"fees deduction for july month"
                },{
                    deposit:-850,
                    date:"10 August 2019",
                    comment:"fees deduction for august month"
                },{
                    deposit:-850,
                    date:"10 september 2019",
                    comment:"fees deduction for sptember month"
                }
            ],
            total:-550
        
        
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
            transactions:[
                {
                    deposit:2000,
                    date:"20 jun 2019",
                    comment:"lumpsum fees paid"
                    
                },{
                    deposit:-850,
                    date:"10 july 2019",
                    comment:"fees deduction for july month"
                },{
                    deposit:-850,
                    date:"10 August 2019",
                    comment:"fees deduction for august month"
                },{
                    deposit:-850,
                    date:"10 september 2019",
                    comment:"fees deduction for sptember month"
                }
            ],
            total:-550
        }
        
        ],
        expanded:0,
        expandedFeesDetails:false,
       
    }
this.handleSearchForFees=this.handleSearchForFees.bind(this);
this.handleCloseFeeDefaulters = this.handleCloseFeeDefaulters.bind(this);
this.handleExpansion=this.handleExpansion.bind(this);
this.handleExpansionFeesDetails=this.handleExpansionFeesDetails.bind(this);
this.sendDuesMessage = this.sendDuesMessage.bind(this);
}

sendDuesMessage(value){
//send backened message from here
}
handleExpansionFeesDetails(){
   var exp = this.state.expandedFeesDetails
    this.setState({
        expandedFeesDetails:!exp
    })
}
handleCloseFeeDefaulters(){
    this.setState({
        openDefaulters:false,
        expandedFeesDetails:false
    })
}
handleExpansion(value){
    var exp = this.state.expanded
  if(exp==value){
    this.setState({
        expanded:0,
        expandedFeesDetails:false,
    })  
  }else{
    this.setState({
        expanded:value,
        expandedFeesDetails:false,
    })
}
}
handleSearchForFees(){
    this.setState({
        openDefaulters:true
    })
}










    render(){
        return(
            <div style={{display:"flex",flexDirection:"column",padding:50, justifyContent:"center",textAlign:"center"}}>
            <div class="container">
<h3><b>Defaulters</b></h3>

<div class="row">
              <div class="col-25">
                <label for="classSelection"><b>Select Class</b></label>
              </div>
              <div class="col-75">
        <select id="class" name="class">
        <option value="none">Choose</option>
            <option value="All">All Classes</option>
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
 


            <hr/>
<div>
    <b>OR</b>
</div>
<hr/>
            <div class="row">
              <div class="col-25">
                <label for="getFeeDetailsbyName"><b>Enter Name:</b></label>
              </div>
              <div class="col-75">
                <input type="text" id="getFeeDetailsbyName" name="getFeeDetailsbyName" placeholder="Enter Name..."/>
              </div>
            </div>
         

<hr/>
<div>
    <b>OR</b>
</div>
<hr/>

<div class="row">
              <div class="col-25">
                <label for="getFeeDetailsbyRollNumber"><b>Enter RollNumber:</b></label>
              </div>
              <div class="col-75">
                <input type="text" id="getFeeDetailsbyRollNumber" name="getFeeDetailsbyRollNumber" placeholder="Enter RollNumber..."/>
              </div>
            </div>

            <Button id="submitButton3" variant="contained" onClick={this.handleSearchForFees}>Fetch</Button>




                </div>





{/* Here will come a dialog */}



<Dialog onClose={this.handleCloseFeeDefaulters} aria-labelledby="get-student-details-dialog" open={this.state.openDefaulters}>
    <DialogTitle id="detailsDialog">All Defaulters</DialogTitle>
    <div style={{display:"flex",flexDirection:"column"}}>

        {this.state.defaultersFetched.map(value=>{
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


  <div class="row">
  <div class="col-25">
      <label  >Total(Rs):</label>
    </div>
    <div class="col-75" >
     {value.total > 0 ? <div style={{color:"green",padding:10}}>{value.total}</div>:<div style={{color:"red",padding:10}}>{value.total}</div>
        }
    </div>
  </div>
  

  <div class="row">
  <ExpansionPanel square expanded={this.state.expandedFeesDetails} onChange={()=>{this.handleExpansionFeesDetails()}}>
            <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header"  style={{backgroundColor:"#e7e7e7"}}>
               <div> All Transactions </div> 
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
<form   >
{value.transactions.map(val=>{
    return <div style={{display:"flex",flexDirection:"column",backgroundColor:"#e7e7e7",margin:5,padding:5}}>
    
    
    <div style={{display:"flex",flexDirection:"row"}}>


 
    
      <label for="depost">Deposit(Rs):</label>
    
    
{
    val.deposit > 0 ? <div style={{color:"green",margin:10}}>{val.deposit}</div>:<div style={{color:"red",margin:10}}>{val.deposit}</div>
}
    </div>

<div  style={{display:"flex",flexDirection:"row"}}>
    <label for="dateofdeposit">Date:</label>
    <p style={{margin:10}}>{val.date}</p>
</div>
<div  style={{display:"flex",flexDirection:"row"}}>
    <label for="commet">Comment:</label>
    <p style={{margin:10}}>{val.comment}</p>
</div>

    </div>

   
})}
</form>
            </ExpansionPanelDetails>
            </ExpansionPanel>
         
      </div>
     

     <Button style={{borderRadius:8, marginTop:15,padding:10,backgroundColor:"green",color:"white",cursor:"pointer"}} onClick={()=>{this.sendDuesMessage(value)}}>Send Fees Due Message</Button>
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