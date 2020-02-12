import React from 'react';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';
import axios from 'axios';
var getUrl = 'http://localhost:5000/getTotalActiveStudentsFromYear';

//make a backened call to server for total students strength

function abs(aaa){
    if(aaa>=0){
        return aaa;
    }else{
        return -aaa;
    }
}

export default class StudentStrengthCard extends React.Component{
constructor(props){
    super(props);
    this.state={
thisYearStrength:0,
previousYearStrength:1,
fraction:0,
postive:true
    }
    this.getStrength=this.getStrength.bind(this);
     
}
 
 
getStrength(){
    var self =this;
    let thisYearStrength=0;
let previousYearStrength=0;
    axios.get(getUrl+"/"+new Date().getFullYear(),)
  .then(function (response) {
    // handle success
    console.log(response);
       thisYearStrength = response.data.count;
     axios.get(getUrl+"/"+ (new Date().getFullYear()-1))
  .then(function (response) {
       previousYearStrength = response.data.count;
       self.setState({
           thisYearStrength,
           previousYearStrength,
           fraction:abs(parseInt((100*(thisYearStrength-previousYearStrength))/(previousYearStrength+1))),
           positive:Boolean(thisYearStrength>=previousYearStrength)
       });
     
  }).catch(function (error) {
    // handle error
    console.log(error);
  })
  }).catch(function (errorr) {
    // handle error
    console.log(errorr);
  });
}
//we have to handle the errors which are coming from backened
componentDidMount(){
let thisYearStrength=0;
let previousYearStrength=0;
var self =this;
    axios.get(getUrl+"/"+new Date().getFullYear())
  .then(function (response) {
    // handle success
    console.log(response);
       thisYearStrength = response.data.count;
     axios.get(getUrl+"/"+ (new Date().getFullYear()-1))
  .then(function (response) {
       previousYearStrength = response.data.count;
       self.setState({
           thisYearStrength,
           previousYearStrength,
           fraction:abs(parseInt((100*(thisYearStrength-previousYearStrength))/(previousYearStrength+1))),
           positive:Boolean(thisYearStrength>=previousYearStrength)
       });
  }).catch(function (error) {
    // handle error
    console.log(error);
  })
  }).catch(function (errors) {
    // handle error
    console.log(errors);
  });
}


    render(){
        return(
            <Card style={{minWidth:300,maxWidth:400,textAlign:"center",margin:5}} onClick={this.getStrength}>
            <div style={{padding:10}}>
        <Typography component="h5" variant="h5">
        Student Strength
      </Typography>

<div style={{display:"flex",flexDirection:"column",padding:5}}>
<div style={{display:"flex",flexDirection:"row" ,alignItems:"center"}}>
<h4>Total Students</h4>
<div style={{color:"green",marginLeft:10}}><b>{this.state.thisYearStrength}</b></div>
</div>
<div style={{display:"flex",flexDirection:"row"  ,alignItems:"center"}}>
<h4>Last Year</h4>
<div style={{marginLeft:50,color:"green"}}><b>{this.state.previousYearStrength}</b></div>
</div>
<div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
    {this.state.positive==true?
    <div  style={{display:"flex", flexDirection:"row",alignContent:"center",justifyContent:"center"}}>
        <div style={{color:"green"}}><b>{this.state.fraction}%</b></div>
        
<SvgIcon style={{color:"green"}}>
<path d="M7 14l5-5 5 5z"/><path d="M0 0h24v24H0z" fill="none"/></SvgIcon>
</div>:
<div style={{display:"flex",flexDirection:"row",alignContent:"center",justifyContent:"center"}}>
        <div style={{color:"red"}}><b>{this.state.fraction}%</b></div>
        
<SvgIcon style={{color:"red"}}>
<path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></SvgIcon>
</div>


    }
       {
           console.log(this.state)
       } 

</div>
</div>
</div>
        </Card>


        )
    }
}