import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';

import Joi from 'joi';

import PropTypes from 'prop-types';

function NewBrandForm(props) {
  const [formData, setformData] = useState({
    type: [], country: '', name: '', current_type: '', description: '',
  });
  const [errorMsg, seterrorMsg] = useState('');

  const schema = Joi.object({
    name: Joi.string()
      .required(),

    country: Joi.string()
      .required(),
    type: Joi.array()
      .min(1),

    description: Joi.string().allow(''),

  });

  const updateField = (e) => {
    const newFormData = formData;
    newFormData[e.target.id] = e.target.value;
    setformData({ ...newFormData });
  };

  const removeOneType = (name) => {
    const type = formData.type.filter((value) => value !== name);

    setformData({ ...formData, type });
  };

  return (
    <div>

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
        onClick={() => {
          if (formData.current_type === '') return;
          const searchType = formData.type.filter((value) => value === formData.current_type)[0];
          if (searchType) {
            seterrorMsg('That type is already set');
            return;
          }
          const type = [...formData.type, formData.current_type];

          setformData({ ...formData, type, current_type: '' });
        }}
        color="secondary"
      >
        Add a type
      </Button>

      <p>
        Types :
        {' '}
        {formData.type.map((value) => (
          <div>
            <span>{value}</span>
            <Button color="secondary" onClick={() => removeOneType(value)}>X</Button>
          </div>
        ))}

      </p>

      <TextField
        onChange={updateField}
        value={formData.description}
        margin="dense"
        id="description"
        label="Brand Description"
        type="text"
        fullWidth
      />
      <br />

      <Button
        onClick={async () => {
          const {
            country, name, type, description,
          } = formData;

          const { error } = schema.validate({
            country, name, type, description,
          });
          if (error) {
            seterrorMsg(error.details[0].message);
            return;
          }

          await props.onFormSubmit({
            country, name, type, description,
          });
          // setOpen(false)

          setformData({
            type: [],
            country: '',
            name: '',
            current_type: '',
            description: '',
          });

          props.callBack();
        }}
        color="primary"
      >
        Submit Form
      </Button>

    </div>
  );
}

NewBrandForm.defaultProps = {
  onFormSubmit: null,
  callBack: null,
};

NewBrandForm.propTypes = {
  onFormSubmit: PropTypes.func,
  callBack: PropTypes.func,

};

export default NewBrandForm;
