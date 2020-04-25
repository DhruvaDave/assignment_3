import axios from 'axios';
// import { serverUrl } from '../const';
import http from "../http-common";


class ProjectDataService {
  getAll() {
    return http.get("/project/findAll");
  }

  get(id) {
    return http.get(`/project/${id}`);
  }

  create(data) {
    console.log("-------------hre--------");
    return http.post("/project/create", data);
  }

  update(id, data) {
    return http.put(`/project/update/${id}`, data);
  }

  delete(id) {
    return http.delete(`/project/delete/${id}`);
  }

  deleteAll() {
    return http.delete(`/project/deleteAll`);
  }

  findByTitle(title) {
    return http.get(`/project/findAll?title=${title}`);
  }
}

export default new ProjectDataService();