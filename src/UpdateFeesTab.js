import React from 'react';
import Button from '@material-ui/core/Button';
import DatePicker from "react-datepicker";

export default class UpdateFeesTab extends React.Component{

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
        <label for="dob"><b>Implementation Date</b></label>
      </div>
      <div class="col-75">
      <DatePicker
        selected={new Date()}
        onChange={this.handleChangeDate}
      />
      </div>
    </div>
    <div class="row">
    <div class="col-25">
      <label for="class"><b>Set Fees(Rs.)</b></label>
    </div>
    <div class="col-75">
   <input type="text" placeholder="500" />
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
   <input type="text" placeholder="ex. C9B34" />
    </div>
  </div>

  <div class="row">
    <div class="col-25">
      <label for="class"><b>Enter Amount Paid(Rs.):</b></label>
    </div>
    <div class="col-75">
   <input type="text" placeholder="ex. 5000" />
    </div>
  </div>
  <div class="row">
      <div class="col-25">
        <label for="dob"><b>Payment Date:</b></label>
      </div>
      <div class="col-75">
      <DatePicker
        selected={new Date()}
        onChange={this.handleChangeDatePayment}
      />
      </div>
    </div>
    <Button id="submitButton3" variant="contained" onClick={this.handleSetFeesRule}>Confirm Payment</Button>

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
   <input type="text" placeholder="ex. T9B60" />
    </div>
  </div>


  
<div class="row">
    <div class="col-25">
      <label for="class"><b>Enter Amount(Rs.):</b></label>
    </div>
    <div class="col-75">
   <input type="text" placeholder="4590" />
    </div>
  </div>



  
  
<div class="row">
    <div class="col-25">
      <label for="class"><b>Comment:</b></label>
    </div>
    <div class="col-75">
   <input type="text" placeholder="Remaining from others reasons" />
    </div>
</div>

<div class="row">
              <div class="col-25">
                <label for="rollnumber"><b>Credit/Debit:</b></label>
              </div>
              <div class="col-75">
        <select id="dbt" name="dbt">
          <option value="">WE HAVE TO GIVE THEM</option>
          <option value="First">THEY HAVE TO GIVE US</option>
        </select>
         </div> 
        </div> 

        <div class="row">
      <div class="col-25">
        <label for="dob"><b>Payment Date:</b></label>
      </div>
      <div class="col-75">
      <DatePicker
        selected={new Date()}
        onChange={this.handleChangeAdditionalPayment}
      />
      </div>
      </div>

      <Button id="submitButton3" variant="contained" onClick={this.handleSetFeesRule}>Make Payment Note</Button>
</form>

</div>



        </div>
    )
}

}