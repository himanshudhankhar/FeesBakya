import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default class SuccessDialog extends React.Component {
   render(){
  return (
    <div>
      
      <Dialog
        open={this.props.show}
        TransitionComponent={Transition}
        keepMounted
        onClose={this.props.onClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Error"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          {this.props.errorMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        
          <Button onClick={this.props.onClose} color="secondary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
   }
}