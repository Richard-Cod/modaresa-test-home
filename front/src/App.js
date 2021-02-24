import './App.css';

import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';
import brandsService from './services/Brands';

import 'react-toastify/dist/ReactToastify.css';

import Popup from './components/modulablePopup';
import CreateNewBrandForm from './components/NewBrandForm';

function App() {
  const [brands, setbrands] = useState([]);
  const handleRequestError = (error) => {
    console.log(error);
    console.log(error.response);
    console.log(error.request);

    let message = 'An error occured making the request';
    if (error.response && error.response.data.error) {
      message = error.response.data.error;
    }

    toast(message, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    const getBrands = async () => {
      try {
        const response = await brandsService.list();

        setbrands(response.data);

        toast('Brands loaded ! 👏🏽 ', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } catch (error) {
        handleRequestError(error);
      }
    };

    getBrands();
  }, []);

  const deleteBrand = async (id) => {
    // eslint-disable-next-line no-alert
    const test = window.confirm('Do you really want to delete that brand ?');
    if (!test) return;

    setbrands(brands.filter((value) => value.id !== id));

    try {
      await brandsService.delete(id);

      toast('Brand deleted successfully ! 🩸', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      handleRequestError(error);
    }
  };

  const createBrand = async (formData) => {
    try {
      const response = await brandsService.create(formData);
      setbrands([...brands, response.data]);

      toast('Brand created successfully ! 🩸', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      handleRequestError(error);
    }
  };

  return (
    <div className="App">
      <h1>Home Test Juniors/Interns</h1>

      <Popup
        mainTitle="Create New Brand maintitle"
        secondTitle="New Brand secondTitle"
        callToActionText="Fill out the fields"
        closeButtonText="Close"
        actionButtonText="Create"
        openButtonTitle="Create a Brand"
        onFormSubmit={createBrand}
      >

        <CreateNewBrandForm />

      </Popup>

      {brands.length === 0 ? <p>No brands yet</p> : (
        <div style={{ maxWidth: '80%', margin: '0 auto' }}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>CreatedAT</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>country</TableCell>
                  <TableCell>Desc</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {brands.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{moment(row.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</TableCell>
                    <TableCell>{row.type.join(' . ')}</TableCell>
                    <TableCell>{row.country}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>
                      <Button onClick={() => deleteBrand(row.id)} variant="contained" color="secondary">
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) }

      <ToastContainer />

    </div>

  );
}

export default App;
