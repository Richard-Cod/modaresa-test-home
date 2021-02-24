import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Joi from 'joi';

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [formData, setformData] = useState({
    type: [], country: 'country', name: 'name', current_type: 'current',
  });

  const [errorMsg, seterrorMsg] = useState('');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateField = (e) => {
    const newFormData = formData;
    newFormData[e.target.id] = e.target.value;
    setformData({ ...newFormData });
  };

  const schema = Joi.object({
    name: Joi.string()
      .required(),

    country: Joi.string()
      .required(),

    type: Joi.array()
      .min(1)
      .required(),

  });

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Create a Brand
      </Button>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Brand</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill the informations
          </DialogContentText>

          <h4 style={{ color: 'red', textAlign: 'center' }}>{errorMsg}</h4>
          <TextField
            onChange={updateField}
            value={formData.name}
            autoFocus
            margin="dense"
            id="name"
            label="Brand name"
            type="text"
            fullWidth
          />
          <TextField
            onChange={updateField}
            value={formData.country}
            margin="dense"
            id="country"
            label="Brand country"
            type="text"
            fullWidth
          />
          <TextField
            onChange={updateField}
            value={formData.current_type}
            margin="dense"
            id="current_type"
            label="Brand Type"
            type="text"
          />
          <Button
            onClick={(e) => {
              const type = [...formData.type, formData.current_type];
              setformData({ ...formData, type, current_type: '' });
            }}
            color="secondary"
          >
            Add a type
          </Button>

          <p>
            Types :
            {formData.type.join(' , ')}
          </p>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              const { country, name, type } = formData;

              const { error } = schema.validate({ country, name, type });
              if (error) {
                seterrorMsg(error.details[0].message);
                return;
              }
              props.onFormSubmit({ country, name, type });
              setOpen(false);

              setformData({
                type: [], country: 'country', name: 'name', current_type: 'current',
              });
            }}
            color="primary"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
