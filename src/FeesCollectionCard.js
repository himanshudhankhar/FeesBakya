import React from 'react';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';
export default class FeesCollectionCard extends React.Component{
    render(){
        return (
            

<Card  style={{minWidth:300,maxWidth:400,textAlign:"center",margin:5}}>
                <div style={{padding:10}}>
            <Typography component="h5" variant="h5">
            Fees Collection
          </Typography>

<div style={{display:"flex",flexDirection:"column",padding:5}}>
   <div style={{display:"flex",flexDirection:"row" ,alignItems:"center"}}>
    <h4>This Month cltd</h4>
    <div style={{marginLeft:10,color:"green"}}><b>Rs. 50000</b></div>
    </div>
    <div style={{display:"flex",flexDirection:"row"  ,alignItems:"center"}}>
    <h4>Last Month</h4>
    <div style={{marginLeft:50,color:"green"}}><b>Rs. 40000</b></div>
    </div>
<div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
    <div style={{color:"green"}}><b>25%</b></div>
<SvgIcon style={{color:"green"}}>
<path d="M7 14l5-5 5 5z"/><path d="M0 0h24v24H0z" fill="none"/></SvgIcon>

</div>
</div>
</div>
            </Card>

        )
    }
}