import React from 'react';
import Button from '@material-ui/core/Button';
import DatePicker from "react-datepicker";
import axios from 'axios';
import ErrorDialog from './ErrorDialog';
import SuccessDialog from './SuccessDialog';
export default class UpdateFeesTab extends React.Component{
constructor(props){
  super(props);
  this.state={
    feesImplementationDate:new Date(),
    feesRule:{},
    feesPaymentDate:new Date(),
    feesPaymentDetails:{},
    balanceAdditionDate:new Date(),
    balanceAddedDetails:{},
    errorDialog:false,
    successDialog:false,
    errorMessage:"",
    successMessage:""

  }
this.handleBalanceAddition=this.handleBalanceAddition.bind(this);
  this.handleChangeFeesImplementationDate=this.handleChangeFeesImplementationDate.bind(this);
  this.handleSetFeesRule=this.handleSetFeesRule.bind(this);
  this.handleChangePaymentDateFees=this.handleChangePaymentDateFees.bind(this);
  this.handleFeesPayment=this.handleFeesPayment.bind(this);
  this.handleChangeAddBalanceDate = this.handleChangeAddBalanceDate.bind(this);
  this.closeErrorMessage=this.closeErrorMessage.bind(this);
  this.closeSuccessMessage = this.closeSuccessMessage.bind(this);
}

closeErrorMessage(){
  this.setState({
    errorDialog:false,
    errorMessage:""
  });
}

closeSuccessMessage(){
   document.getElementById("rollnumberBalance").value="";
    document.getElementById("balanceAmount").value="";
    document.getElementById("balanceAddComment").value="";
    document.getElementById("takeOrGiveBalance").value="";


  this.setState({
    successDialog:false,
    successMessage:""
  });
}

handleChangeAddBalanceDate(date){
  this.setState({
    balanceAdditionDate:date
  })
};
handleBalanceAddition(){
  //make a backened call from here for addition of balance
  // app.post('/deposit_balance', (req, res) => {
    //  rollnumber,
    //     amount,
    //     comment,
    //     take_or_give,
    //     paymentDate,
    // all in depositExtraBalance
   let rollnumber = document.getElementById("rollnumberBalance").value;
   let amount  = document.getElementById("balanceAmount").value;
   let comment = document.getElementById("balanceAddComment").value;
   let take_or_give = document.getElementById("takeOrGiveBalance").value;
   let paymentDate = this.state.balanceAdditionDate.toUTCString();// it will not be null
if(rollnumber==undefined||rollnumber==null||rollnumber.trim().length==0){
  alert("Enter RollNumber for Adding a Balance");
  return;
}else{
  rollnumber=rollnumber.trim();
}
if(amount==undefined||amount==null||amount.trim().length==0){
alert("Enter Amount for Adding a Balance");
return;
}else if(!amount.match(/^[0-9]+$/)){
  alert("Enter balance amount in numbers");
  return;
}
if(comment==undefined||comment==null||comment.trim().length==0){
  alert("Enter Description/Comment!!");
  return;
}
if(take_or_give=="Choose"){
  alert("Select credit/debit for balance!!");
  return;
}
//payment date is correctly choosen;
let self =this;
axios.post("http://localhost:5000/deposit_balance",{depositExtraBalance:{
  rollnumber,amount,comment,take_or_give,paymentDate
}}).then(response=>{
  let data = response.data;
  if(data.error==true){
    self.setState({
      errorDialog:true,
      errorMessage:data.errorMessage,
    });
    return;
  }
  if(data.success==true){
    self.setState({
      successDialog:true,
      successMessage:data.successMessage
    });
    return;
  }
}).catch(err=>{
  console.log("Error",err);
})





}

handleSetFeesRule(){
  //make backened calls from here and check whether feespayment details are valid and then check response of backened
  let classSelected = document.getElementById("classSelection").value;
  let dateOfImplementation = this.state.feesImplementationDate; ///this date has to be todays date you cannot change the date of implementation
  let amountFeesImplemented  = document.getElementById("feesRuleAmount").value;
if(classSelected==null||classSelected==undefined||classSelected=="Choose"){
  alert("Select a class for new fees rule");
  return;
}
console.log(amountFeesImplemented);
if(amountFeesImplemented==undefined||amountFeesImplemented==null||amountFeesImplemented.length==0||!amountFeesImplemented.match(/^[0-9]+$/)){
  alert("Enter numerical value in amount of Fees Rule");
  return;
}
//make a post request to 
let self= this;
axios.post('http://localhost:5000/add_fees_rule',{feesRuleData:{
  classs:classSelected,
  dateOfImplementation,
  feesAmount:amountFeesImplemented
}}).then(response => {
  console.log(response.data);
  let data = response.data;
  if(data.error==true){
self.setState({
  errorDialog:true,
  errorMessage:data.errorMessage
});
  }else if(data.success==true){
    document.getElementById("classSelection").value="Choose";
    document.getElementById("feesRuleAmount").value = "";
    
    self.setState({
      successDialog:true,
      successMessage:data.successMessage
    });
  }
}).catch(err=>{
  console.log(err);
})

}

handleFeesPayment(){
  //make backened call from here
  let paymentRollnumber= document.getElementById("feesPaymentRollnumber").value;
  let paymentAmount = document.getElementById("feesPaymentAmount").value;
  let paymentDate = this.state.feesPaymentDate;

if(paymentRollnumber==undefined||paymentRollnumber==null||paymentRollnumber.length==0){
  alert("Enter Fees Payment Rollnumber");
  return;
}

if(paymentAmount==undefined||paymentAmount==null||paymentAmount.length==0||!paymentAmount.match(/^[0-9]+$/)){
  alert("Enter Amount in numerical value");
  return;
}
let self =this;
axios.post("http://localhost:5000/confirm_fees_deposit",{
  feesPaymentData:{
    feesAmount:paymentAmount,
    rollnumber:paymentRollnumber,
    paymentDate
  }
}).then(response=>{
  let data = response.data;
  if(data.error==true){
    self.setState({
      errorDialog:true,
      errorMessage:data.errorMessage
    });
  }else{
    document.getElementById("feesPaymentRollnumber").value="";
    document.getElementById("feesPaymentAmount").value="";
    self.setState({
      successDialog:true,
      successMessage:data.successMessage
    });
  }
}).catch(err=>{
  console.log(err);
  self.setState({
    errorDialog:true,
    errorMessage:"Some backened Error errupted!!"
  });
})


}

handleChangePaymentDateFees(date){
  this.setState({
    feesPaymentDate:date
  })
};


handleChangeFeesImplementationDate(date){
  this.setState({
    feesImplementationDate:date
  });
}
render(){
    return(
<div style={{display:"flex",flexDirection:"column",padding:50, justifyContent:"center",textAlign:"center"}}>
<b>Set New Fees Rule</b>
<div class="container">
<form>
<div class="row">
              <div class="col-25">
                <label for="rollnumber"><b>Select Class</b></label>
              </div>
              <div class="col-75">
        <select id="classSelection" name="class">
          <option value= "Choose">Choose</option>
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
        <label for="dob"><b>Implementation Date</b></label>
      </div>
      <div class="col-75">
      <DatePicker
        selected={this.state.feesImplementationDate}
        onChange={this.handleChangeFeesImplementationDate}
        disabled
      />
      </div>
    </div>
    <div class="row">
    <div class="col-25">
      <label for="class"><b>Set Fees(Rs.)</b></label>
    </div>
    <div class="col-75">
   <input type="text" placeholder="ex: 500" id="feesRuleAmount"/>
    </div>
  </div>
  <Button id="submitButton3" variant="contained" onClick={this.handleSetFeesRule}>Set</Button>
</form>
        </div>

        <br/>
        <b>Confirm Deposit</b>
        <div class="container">
<form>
<div class="row">
    <div class="col-25">
      <label for="class"><b>Enter RollNumber:</b></label>
    </div>
    <div class="col-75">
   <input type="text" id="feesPaymentRollnumber" placeholder="ex. Tn2020001" />
    </div>
  </div>

  <div class="row">
    <div class="col-25">
      <label for="class"><b>Enter Amount Paid(Rs.):</b></label>
    </div>
    <div class="col-75">
   <input type="text" id="feesPaymentAmount" placeholder="ex. 5000" />
    </div>
  </div>
  <div class="row">
      <div class="col-25">
        <label for="dob"><b>Payment Date:</b></label>
      </div>
      <div class="col-75">
      <DatePicker
        selected={this.state.feesPaymentDate}
        onChange={this.handleChangePaymentDateFees}
      />
      </div>
    </div>
    <Button id="submitButton3" variant="contained" onClick={this.handleFeesPayment}>Confirm Payment</Button>

</form>
    </div>


    <br/>
        <b>Add Balance</b>
        <div class="container">
<form>

<div class="row">
    <div class="col-25">
      <label for="class"><b>Enter RollNumber:</b></label>
    </div>
    <div class="col-75">
   <input type="text" id="rollnumberBalance" placeholder="ex. Tn2020100" />
    </div>
  </div>


  
<div class="row">
    <div class="col-25">
      <label for="class"><b>Enter Amount(Rs.):</b></label>
    </div>
    <div class="col-75">
   <input type="text" id="balanceAmount" placeholder="4590" />
    </div>
  </div>



  
  
<div class="row">
    <div class="col-25">
      <label for="class"><b>Comment:</b></label>
    </div>
    <div class="col-75">
   <input type="text" id="balanceAddComment" placeholder="Remaining from others reasons" />
    </div>
</div>

<div class="row">
              <div class="col-25">
                <label for="rollnumber"><b>Credit/Debit:</b></label>
              </div>
              <div class="col-75">
        <select id="takeOrGiveBalance" name="dbt">
          <option value="Choose">Choose</option>
          <option value="give">WE HAVE TO GIVE THEM</option>
          <option value="take">THEY HAVE TO GIVE US</option>
        </select>
         </div> 
        </div> 

        <div class="row">
      <div class="col-25">
        <label for="dob"><b>Payment Date:</b></label>
      </div>
      <div class="col-75">
      <DatePicker
        selected={this.state.balanceAdditionDate}
        onChange={this.handleChangeAddBalanceDate}
      />
      </div>
      </div>

      <Button id="submitButton3" variant="contained" onClick={this.handleBalanceAddition}>Make Payment Note</Button>
</form>

</div>
<ErrorDialog show={this.state.errorDialog} errorMessage={this.state.errorMessage} onClose={this.closeErrorMessage}/>
<SuccessDialog show={this.state.successDialog} successMessage={this.state.successMessage} onClose={this.closeSuccessMessage}/>


        </div>
    )
}

}