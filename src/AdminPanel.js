import React from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import TotalFacultiesCard from './TotalFacultiesCard';
import AppBar from '@material-ui/core/AppBar';
import FeesDefaultersCard from './FeesDefaultersCard';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import StudentStrengthCard from './StudentStrengthCard';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import NavigationIcon from '@material-ui/icons/Navigation';
import Fab from '@material-ui/core/Fab';
import FeesCollectionCard from './FeesCollectionCard';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronRightIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import SvgIcon from '@material-ui/core/SvgIcon';
import UpdateMarksView from './UpdateMarksView';
import SeeMarksView from './SeeMarksView';

import DefaultersTab from './DefaultersTab';
import AddStudentTab from './AddStudentTab';
import RemoveStudentTab from './RemoveStudentTab';
import GetDetailsTab from './GetDetailsTab';
import UpdateFeesTab from './UpdateFeesTab';

 
export default class AdminPanel extends React.Component {
  
constructor(props){
    super(props);
    this.state={
        drawerOpen:false,
        showTab:1
    }
this.openDrawer=this.openDrawer.bind(this);
this.handleDrawerClose = this.handleDrawerClose.bind(this);

this.defaultersView=this.defaultersView.bind(this);
this.getDetailsView=this.getDetailsView.bind(this);
this.updateFeesView=this.updateFeesView.bind(this);
this.removeStudentView=this.removeStudentView.bind(this);
this.addStudentView=this.addStudentView.bind(this);
this.homePageView =this.homePageView.bind(this);
this.updateMarksView=this.updateMarksView.bind(this);
this.seeMarksView=this.seeMarksView.bind(this);
}

updateMarksView(){
    this.setState({
        showTab:7,
        drawerOpen:false
    })
}
seeMarksView(){
    this.setState({
        showTab:8,
        drawerOpen:false
    })
}


homePageView(){
    this.setState({
        showTab:1,
        drawerOpen:false
    }) 
}


defaultersView(){
this.setState({
    showTab:6,
    drawerOpen:false
})
}
getDetailsView(){
    this.setState({
        showTab:4,
        drawerOpen:false
    })
}
updateFeesView(){
    this.setState({
        showTab:5,
        drawerOpen:false
    })
}
removeStudentView(){
    this.setState({
        showTab:3,
        drawerOpen:false
    })
}
addStudentView(){
    this.setState({
        showTab:2,
        drawerOpen:false
    })
}


handleDrawerClose(){
    this.setState({
        drawerOpen:false
    })
}

openDrawer(){
    this.setState({
        drawerOpen:true
    })
}

   render(){

  return (

    <div style={{display:"flex",flexDirection:"column",paddingTop:"20dp"}}>
     <div style={{width:10,padding:5}}>
      <Fab variant="small" color="secondary" aria-label="add"  onClick={this.openDrawer}>
          <NavigationIcon  />
          Actions
          </Fab>
          </div>
    <main>
        {this.state.showTab==1?
          <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-around",alignItems:"space-around"}}>
<StudentStrengthCard/>
<TotalFacultiesCard/>
<FeesCollectionCard/>
<FeesDefaultersCard/>
          </div>
          :
          <div/>
        }
{
    this.state.showTab==2?
    <AddStudentTab/>
    :<div/>
}

{
    this.state.showTab==3?
    <RemoveStudentTab/>
    :
    <div/>
}
{
    this.state.showTab==4?
    <GetDetailsTab/>:
    <div/>
}
{
    this.state.showTab==5?
    <UpdateFeesTab/>
    :
    <div/>
}
{
    this.state.showTab==6?
    <DefaultersTab/>
    :
    <div/>
}
{
    this.state.showTab==7?
    <UpdateMarksView/>
    :
    <div/>
}
{
    this.state.showTab==8?
    <SeeMarksView/>
    :
    <div/>
}



    </main>
      

<Drawer
open={this.state.drawerOpen}
>
    <List>
        <ListItem>
<IconButton onClick={this.handleDrawerClose}>
            <ChevronRightIcon />  <p><b>Close</b></p>
</IconButton>
</ListItem>
<Divider/>
    <ListItem style={{cursor:"pointer"}} onClick={this.homePageView}>
    <ListItemIcon>
        <SvgIcon style={{width:"40",height:"40"}}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/><path d="M0 0h24v24H0z" fill="none"/>  
           </SvgIcon>
    </ListItemIcon>
    <Typography component="h6" variant="h6"><b>Admin Home</b></Typography>
    </ListItem>

    <Divider/>
    <ListItem style={{cursor:"pointer"}} onClick={this.addStudentView}>
    <ListItemIcon>
        <SvgIcon style={{width:"40",height:"40"}}>
        <path d="M0 0h24v24H0z" fill="none"/><path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </SvgIcon>
    </ListItemIcon>
    <Typography component="h6" variant="h6"><b>Add Student</b></Typography>
    </ListItem>
    <Divider/>
    <ListItem style={{cursor:"pointer"}} onClick={this.removeStudentView}>
    <ListItemIcon>
        <SvgIcon style={{width:"40",height:"40"}}>
        <path d="M0 0h24v24H0z" fill="none"/><path d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
        </SvgIcon>
    </ListItemIcon>
    <Typography component="h6" variant="h6"  ><b>Remove Student</b></Typography>
    </ListItem>
    <Divider/>
    <ListItem style={{cursor:"pointer"}} onClick={this.getDetailsView}>
    <ListItemIcon>
        <SvgIcon style={{width:"40",height:"40"}}>
        <path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>   </SvgIcon>
    </ListItemIcon>
    <Typography component="h6" variant="h6"  ><b>Get Details</b></Typography>
    </ListItem>


    <Divider/>
    <ListItem style={{cursor:"pointer"}} onClick={this.updateFeesView}>
    <ListItemIcon>
        <SvgIcon style={{width:"40",height:"40"}}>
        <path d="M0 .5h24v24H0z" fill="none"/><path d="M12 16.5l4-4h-3v-9h-2v9H8l4 4zm9-13h-6v1.99h6v14.03H3V5.49h6V3.5H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2z"/>  
       </SvgIcon> 
        </ListItemIcon>
    <Typography component="h6" variant="h6"  ><b>Update Fees</b></Typography>
    </ListItem>


    
    <Divider/>
    <ListItem style={{cursor:"pointer"}} onClick={this.defaultersView}>
    <ListItemIcon>
        <SvgIcon style={{width:"40",height:"40"}}>
        <path fill="none" d="M0 0h24v24H0z"/><path d="M12.5 6.9c1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-.53.12-1.03.3-1.48.54l1.47 1.47c.41-.17.91-.27 1.51-.27zM5.33 4.06L4.06 5.33 7.5 8.77c0 2.08 1.56 3.21 3.91 3.91l3.51 3.51c-.34.48-1.05.91-2.42.91-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c.96-.18 1.82-.55 2.45-1.12l2.22 2.22 1.27-1.27L5.33 4.06z"/> 
          </SvgIcon> 
        </ListItemIcon>
    <Typography component="h6" variant="h6"  ><b>Defaulters</b></Typography>
    </ListItem>


    
    <Divider/>
    <ListItem style={{cursor:"pointer"}} onClick={this.updateMarksView}>
    <ListItemIcon>
        <SvgIcon style={{width:"40",height:"40"}}>
        <path d="M0 0h24v24H0z" fill="none"/><path d="M14 10H2v2h12v-2zm0-4H2v2h12V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM2 16h8v-2H2v2z"/>    </SvgIcon> 
        </ListItemIcon>
    <Typography component="h6" variant="h6"  ><b>Update Marks</b></Typography>
    </ListItem>
    <Divider/>
    <ListItem style={{cursor:"pointer"}} onClick={this.seeMarksView}>
    <ListItemIcon>
        <SvgIcon style={{width:"40",height:"40"}}>
        <path d="M19 5v14H5V5h14m1.1-2H3.9c-.5 0-.9.4-.9.9v16.2c0 .4.4.9.9.9h16.2c.4 0 .9-.5.9-.9V3.9c0-.5-.5-.9-.9-.9zM11 7h6v2h-6V7zm0 4h6v2h-6v-2zm0 4h6v2h-6zM7 7h2v2H7zm0 4h2v2H7zm0 4h2v2H7z"/><path fill="none" d="M0 0h24v24H0z"/>    </SvgIcon> 
        </ListItemIcon>
    <Typography component="h6" variant="h6"  ><b>See Marks</b></Typography>
    </ListItem>

    </List>
</Drawer>
    </div>
  );
   }
}