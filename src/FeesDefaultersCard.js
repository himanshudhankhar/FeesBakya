import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';
import axios from 'axios';

export default class FeesDefaultersCard extends React.Component{
      urlTotalDefaulters="/getTotalDefaulters";
  urlTotalFeesPayers="/getTotalFeesPayers";
baseURL = "";
constructor(props){
    super(props);

if(process.env.NODE_ENV=="development"){
    this.baseURL ="http://localhost:5000";
}else{
    this.baseURL = "https://ekta-high-school.herokuapp.com";
}

this.urlTotalDefaulters = this.baseURL + this.urlTotalDefaulters;
this.urlTotalFeesPayers = this.baseURL + this.urlTotalFeesPayers;

    this.state={
        defaulters:0,
        tStudents:0,
        fraction:0
    }
    this.updateCard=this.updateCard.bind(this);

}

updateCard(){
    var  self=this;
     var totalDefaulters=0;
     var totalFeesPayers=0;
    axios.get(self.urlTotalDefaulters)
    .then(function (response) {
        
        totalDefaulters = response.data.defaultersCount;
        axios.get(self.urlTotalFeesPayers)
        .then(function (responses) {
            totalFeesPayers = responses.data.totalFeesPayers;
    self.setState({
        defaulters:totalDefaulters,
        tStudents:totalFeesPayers,
        fraction :parseInt((totalDefaulters)/(totalFeesPayers+1))
    });
            
    
        }).catch(function(eror){
            console.log(eror);
        });


    }).catch(function(eror){
        console.log(eror);
    });
}



componentDidMount(){
    //make axios request for total defaulters and total students eligible for fees payment
     var  self=this;
     var totalDefaulters=0;
     var totalFeesPayers=0;
    axios.get(self.urlTotalDefaulters)
    .then(function (response) {
        totalDefaulters = response.data.defaultersCount;
        axios.get(self.urlTotalFeesPayers)
        .then(function (responses) {
            totalFeesPayers = responses.data.totalFeesPayers;
    self.setState({
        defaulters:totalDefaulters,
        tStudents:totalFeesPayers,
        fraction :parseInt((totalDefaulters)/(totalFeesPayers+1))
    });
            
    
        }).catch(function(eror){
            console.log(eror);
        });


    }).catch(function(eror){
        console.log(eror);
    });
}


    render(){
        return(
            

<Card  style={{minWidth:300,maxWidth:400,textAlign:"center",margin:5}} onClick={this.updateCard}>
                <div style={{padding:10}}>
            <Typography component="h5" variant="h5">
            Fees Defaulters
          </Typography>

<div style={{display:"flex",flexDirection:"column",padding:5}}>
   <div style={{display:"flex",flexDirection:"row" ,alignItems:"center"}}>
    <h4>Total Defaulters:</h4>
    <div style={{marginLeft:10,color:"green"}}><b>{this.state.defaulters}</b></div>
    </div>
    <div style={{display:"flex",flexDirection:"row"  ,alignItems:"center"}}>
    <h4>Total Students:</h4>
        <div style={{marginLeft:20,color:"green"}}><b>{this.state.tStudents}</b></div>
    </div>
<div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
        <div style={{color:"green"}}><b>{this.state.fraction}%</b></div>
{/* <SvgIcon style={{color:"green"}}>
<path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></SvgIcon> */}

</div>
</div>
</div>
            </Card>
        )
    }
} 