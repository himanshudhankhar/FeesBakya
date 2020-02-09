import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import AdminPanel from './AdminPanel';
import NoMatch from './NoMatchFound';
import Home from './Home'
import StudentDetails from './StudentDetials';
import {
  BrowserRouter as Router,
  Switch,Redirect,
  Route,
  Link
} from "react-router-dom";
export default class App extends React.Component {
constructor(props){
  super(props);
this.state={
  registerDialog:false,
  loginDialog:false,
  redirectAdmin:false,
  redirectStudent:false,
  loginAllowed:false,
  loggedIn:false,
  typeOfLogin:1
}
this.openLoginDialog=this.openLoginDialog.bind(this);
this.closeLoginDialog = this.closeLoginDialog.bind(this);
this.clearLoginData = this.clearLoginData.bind(this);
this.handleLogin=this.handleLogin.bind(this);
this.handleLoginChange = this.handleLoginChange.bind(this);
this.handlePasswordChange=this.handlePasswordChange.bind(this);
this.handleLogOut=this.handleLogOut.bind(this);

}

handleLogOut(){
  this.setState({
    loggedIn:false,
    typeOfLogin:0
  });
  localStorage.clear();
}

handleLoginChange(event){
 
  this.setState({
    loginSchoolId:event.target.value
  })
}
handlePasswordChange(event){
  this.setState({
    loginSchoolPassword:event.target.value
  })
}

clearLoginData(){
  this.setState({
    loginSchoolId:"",
    loginSchoolPassword:""
    // well otp for login is not an option now
  });
}

handleLogin(){
  //make checks and backened calls
  let schoolId  = this.state.loginSchoolId;
  let schoolPassword = this.state.loginSchoolPassword;
  if(schoolId==undefined || schoolId=="" || schoolId==NaN){
alert("Enter school id");
return;
  }
  if(schoolPassword==undefined || schoolPassword==""||schoolPassword==NaN){
    alert("Enter Password!!");
    return;
  }
  localStorage.setItem("token", Date.now());
  localStorage.setItem("typeOfLogin","admin");
this.clearLoginData();
this.setState({
  typeOfLogin:1,
  loginAllowed:true,
  loginDialog:false,
  loggedIn:true
});
}


openLoginDialog(){
  this.setState({
    loginDialog:true
  })
} 

closeLoginDialog(){
  this.setState({
    loginDialog:false
  });
  this.clearLoginData();
} 


  render(){


  return (
  <Switch>
   <Route path="/" exact>

<div style={{display:"flex",flexDirection:"column"}}>
    <div style={{display:"flex",flexDirection:"column"}}>
      <div style={{display:"flex",flexDirection:"row",width:"50dp" , backgroundColor:'#00008B'}}>
<h2 style={{margin:10,color:"white"}}>Ekta High School Student Management Portal</h2>
<div style={{display:"flex",flexDirection:"row",padding:"5dp",position:"absolute",right:10,margin:10}}>
{
  this.state.loggedIn===false?

      <Button   color="secondary" onClick={this.openLoginDialog}>
        LOGIN
      </Button>
      :
      <Button   color="secondary" onClick={this.handleLogOut}>
      LOGOUT
    </Button>
      }
        
        </div>
      </div>
      <Dialog onClose={this.closeLoginDialog} aria-labelledby="login-dialog" open={this.state.loginDialog}>
      <DialogTitle id="loginDialog">Login</DialogTitle>
      <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Use credentials provided by school authority: 
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="schoolEmailId"
            label="ID"
            type="email"
            fullWidth
            value={this.state.loginSchoolId}
            onChange={this.handleLoginChange}
          />
          <TextField
            autoFocus
            onChange={this.handlePasswordChange}
            margin="dense"
            id="schoolLoginPassword"
            label="Password"
            type="password"
            fullWidth
            value={this.state.loginSchoolPassword}
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleLogin} color="primary">
            Login
          </Button>
          <Button onClick={()=>{this.clearLoginData(); this.closeLoginDialog();}} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
    </Dialog>



    </div>
 {
   this.state.typeOfLogin==0?
   <Home/>
   :
  <div/>
  
 }

 {
   this.state.typeOfLogin==1?
   <AdminPanel/>
   :
   <div/>

 }
 {
   this.state.typeOfLogin==2?
   <StudentDetails/>
   :
   <div/>
 }
  </div>
</Route>
<Route>
  <NoMatch/>
</Route>
</Switch>
  
  );
}
}
