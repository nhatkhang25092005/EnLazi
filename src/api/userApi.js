import axiosClient from "./axiosClient";

const userApi = {
  //register ~
  register: (email, username, password) =>
    axiosClient.post(import.meta.env.VITE_API_LOGIN, {
      email: email,
      username: username,
      password: password,
    }),

  //google ~
  google: async (code) =>
    await axiosClient.post(import.meta.env.VITE_API_GOOGLE, { code: code }),

  //verify ~
  verify: (email, verify_code) =>
    axiosClient.post(import.meta.env.VITE_API_VERIFY, {
      email: email,
      verify_code: verify_code,
    }),

  //login ~
  login: (email, password) =>
    axiosClient.post(import.meta.env.VITE_API_LOGIN, {
      email: email,
      password: password,
    }),

  //forgot password ~
  forgotPassword: (email) =>
    axiosClient.post(import.meta.env.VITE_API_FORGOT, { email: email }),

  //verify forgot password ~
  verifyForgotPassword: (email, code, newPassword) =>
    axiosClient.post(import.meta.env.VITE_API_VERIFY_FORGOT, {
      email: email,
      verify_code: code,
      password: newPassword,
    }),
};

export default userApi;
