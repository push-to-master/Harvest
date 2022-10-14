import http from "../http/http-common";

class HarvestDataService {
  getAll(page = 0) {
    return http.get(`?page=${page}`);
  }

  get(id) {
    return http.get(`/id/${id}`);
  }

  find(query, by = "name", page = 0) {
    return http.get(`?${by}=${query}&page=${page}`);
  } 

  createReview(data) {
    return http.post("/review", data);
  }

  updateReview(data) {
    return http.put("/review", data);
  }

  deleteReview(id, userId) {
    return http.delete(`/review?id=${id}`, {data:{user_id: userId}});
  }

  getCuisines(id) {
    return http.get(`/cuisines`);
  }

  getAllLogs(page = 0){
    return http.get(`/logs?page=${page}`)
  }
  createLog(data){
    return http.post("/logs",data);
  }

  getOrgs(data){
    return http.get("/orgs");
  }

  getTypes(page = 0){
    return http.get("/category");
  }
}

export default new HarvestDataService();