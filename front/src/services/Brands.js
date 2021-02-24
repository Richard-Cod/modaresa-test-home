import Api from './Api';

const name = 'brands';

export default {
  list() {
    return Api().get(`${name}`);
  },
  create(infos) {
    return Api().post(`${name}/create`, infos);
  },
  getOne(id) {
    return Api().get(`${name}/${id}`);
  },
  delete(id) {
    return Api().delete(`${name}/delete/${id}`);
  },

};
