const express = require('express');

const router = express.Router();

const services = require('../services/brandServices');

router.get('/', (req, res) => {
  const brands = services.getBrands();
  res.send(brands);
});

router.post('/create', (req, res) => {
  const { body } = req;
  const brandsList = services.getBrands();
  const searchBrand = brandsList.filter((value) => value.name === body.name);
  if (searchBrand[0]) {
    return res.status(400).send({ error: 'Brand with that name already exists' });
  }
  const brand = services.createBrand(body);
  res.send(brand);
});

router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  services.removeBrand(id);
  res.send({ msg: `Brand ${id} removed successfully ` });
});

module.exports = router;
