import axiosClient from "./axiosClient";
import axios from "axios";

const userApi = {
  register: (email, username, password) =>
    axiosClient.post("/auth/signup", {
      email: email,
      username: username,
      password: password,
    }),
  verify: (email, verify_code) =>
    axiosClient.post("/auth/verify", {
      email: email,
      verify_code: verify_code,
    }),
};

export default userApi;
