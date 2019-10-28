import axios from "axios";

export default {
  async fetchPostsList(callback) {
    return axios.get("http://127.0.0.1/getuser").then(res => {
      return callback(res.data);
    });
  }
};
