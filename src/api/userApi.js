import axiosClient from "./axiosClient";

const userApi = {
  register: (email, username, password) =>
    axiosClient.post("/auth/signup", {
      email: email,
      username: username,
      password: password,
    }),
  google:()=>axiosClient.post("auth/signin/google"),
  verify: (email, verify_code) =>
    axiosClient.post("/auth/verify", {
      email: email,
      verify_code: verify_code,
    }),
  login: (email, password) =>
    axiosClient.post("auth/signin", {
      email: email,
      password: password,
    }),
};

export default userApi;
