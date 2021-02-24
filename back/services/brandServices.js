const brandsList = [
  {
    id: 1,
    name: 'Nike',
    type: ['shoes', 'shirts'],
    country: 'usa',
    createdAt: new Date(),
    description: 'Nike, Inc is an American multinational corporation',
  },

];

module.exports = {
  getBrands: () => brandsList,
  createBrand: (data) => {
    const {
      name, type, country, description,
    } = data;

    let id = 1;
    if (brandsList.length > 0) {
      id = brandsList[brandsList.length - 1].id + 1;
    }

    brandsList.push({
      id,
      name,
      type,
      country,
      description,
      createdAt: new Date(),
    });

    return brandsList[brandsList.length - 1];
  },

  removeBrand: (id) => {
    const searchBrand = brandsList.filter((value) => value.id == id)[0];
    if (!searchBrand) {
      return;
    }
    const index = brandsList.indexOf(searchBrand);
    if (index > -1) {
      brandsList.splice(index, 1);
    }
  },
};
