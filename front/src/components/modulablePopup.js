import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import PropTypes from 'prop-types';

function FormDialog(props) {
  const {
    mainTitle,
    secondTitle,
    closeButtonText,
    callToActionText,
    onFormSubmit,
    children,
  } = props;

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    // checking isValidElement is the safe way and avoids a typescript error too
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { onFormSubmit, callBack: handleClose });
    }
    return child;
  });

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {mainTitle}
      </Button>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{secondTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {callToActionText}
          </DialogContentText>

          {childrenWithProps}

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {closeButtonText }
          </Button>

        </DialogActions>
      </Dialog>
    </div>
  );
}

FormDialog.defaultProps = {
  closeButtonText: 'Cancel',
  callToActionText: 'Please fill the informations ',
  children: PropTypes.any,
};

FormDialog.propTypes = {
  mainTitle: PropTypes.string.isRequired,
  secondTitle: PropTypes.string.isRequired,
  closeButtonText: PropTypes.string,
  callToActionText: PropTypes.string,
  onFormSubmit: PropTypes.func.isRequired,
  children: PropTypes.element,

};

export default FormDialog;
