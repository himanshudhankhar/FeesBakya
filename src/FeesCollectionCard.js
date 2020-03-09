import React from 'react';
import axios from 'axios';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';

function abs(aaa){
    if(aaa>=0){
        return aaa;
    }else{
        return -aaa;
    }
}


export default class FeesCollectionCard extends React.Component{
    baseURL="";
  urlThisMonthCollection="/thisMonthFeesCollection";
  urlEstimatedCollection="/estimatedFeesCollectionThisMonth";
constructor(props){
    super(props);

if(process.env.NODE_ENV=="development"){
    this.baseURL="http://localhost:5000";
}else{
    this.baseURL = "https://ekta-high-school.herokuapp.com";
}

this.urlEstimatedCollection = this.baseURL + this.urlEstimatedCollection;
this.urlThisMonthCollection = this.baseURL + this.urlThisMonthCollection;

    this.state={
        thisMonthCollection:0,
        estimationCollection:0,
        fraction:0,
    }
    this.updateCard = this.updateCard.bind(this);
}

updateCard(){
    let self = this;
    axios.get(self.urlThisMonthCollection).then(function(response){
let collectedAmount = parseInt(response.data.collectionAmount);
axios.get(self.urlEstimatedCollection).then(function(responsee){
    let estimatedCollection  = parseInt(responsee.data.feesToBeCollected);
    self.setState({
        thisMonthCollection:collectedAmount,
        estimatedCollection:estimatedCollection,
        fraction:parseInt((collectedAmount)/(estimatedCollection+1))
    });
        }).catch(function(error){
    console.log(error);
        });
    }).catch(function(error){
console.log(error);
    });
}
componentDidMount(){
    let self = this;
    axios.get(self.urlThisMonthCollection).then(function(response){
let collectedAmount = parseInt(response.data.collectionAmount);
axios.get(self.urlEstimatedCollection).then(function(responsee){
    let estimatedCollection  = parseInt(responsee.data.feesToBeCollected);
    self.setState({
        thisMonthCollection:collectedAmount,
        estimatedCollection:estimatedCollection,
        fraction:parseInt((collectedAmount)/(estimatedCollection+1))
    });
        }).catch(function(error){
    console.log(error);
        });
    }).catch(function(error){
console.log(error);
    });
}


    render(){
        return (
            

<Card  style={{minWidth:300,maxWidth:400,textAlign:"center",margin:5}} onClick={this.updateCard}>
                <div style={{padding:10}}>
            <Typography component="h5" variant="h5">
            Fees Collection
          </Typography>

<div style={{display:"flex",flexDirection:"column",padding:5}}>
   <div style={{display:"flex",flexDirection:"row" ,alignItems:"center"}}>
    <h4>This Month Cltn:</h4>
        <div style={{marginLeft:10,color:"green"}}><b>Rs.{this.state.thisMonthCollection}</b></div>
    </div>
    <div style={{display:"flex",flexDirection:"row"  ,alignItems:"center"}}>
    <h4>Estimated Cltn:</h4>
        <div style={{marginLeft:20,color:"green"}}><b>Rs.{this.state.estimationCollection}</b></div>
    </div>
<div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
        <div style={{color:"green"}}><b>{this.state.fraction}%</b></div>
{/* <SvgIcon style={{color:"green"}}>
<path d="M7 14l5-5 5 5z"/><path d="M0 0h24v24H0z" fill="none"/></SvgIcon> */}

</div>
</div>
</div>
            </Card>

        )
    }
}