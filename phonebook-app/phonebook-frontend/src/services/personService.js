import axios from "axios";
import { REACT_APP_BACKEND_URL } from "../utils/config";

const baseUrl = REACT_APP_BACKEND_URL || "/api/persons";

const getAll = () => {
  return axios.get(baseUrl).then((response) => {
    return response.data;
  });
};

const create = (newPerson) => {
  return axios.post(baseUrl, newPerson).then((response) => {
    return response.data;
  });
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => {
    return response.data;
  });
};

const update = (id, changedPerson) => {
  return axios.put(`${baseUrl}/${id}`, changedPerson).then((response) => {
    return response.data;
  });
};

export default { getAll, create, deletePerson, update };
