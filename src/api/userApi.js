import axiosClient from "./axiosClient";

const userApi = {
  //api register ~
  register: (email, username, password) =>
    axiosClient.post(import.meta.env.VITE_API_LOGIN, {
      email: email,
      username: username,
      password: password,
    }),

  //api google ~
  google: async (code)=> await axiosClient.post(import.meta.env.VITE_API_GOOGLE,{code:code}),

  //api verify ~
  verify: (email, verify_code) =>
    axiosClient.post(import.meta.env.VITE_API_VERIFY, {
      email: email,
      verify_code: verify_code,
    }),

  //api login ~
  login: (email, password) =>
    axiosClient.post(import.meta.env.VITE_API_LOGIN, {
      email: email,
      password: password,
    }),

  //api forgot password ~
  forgotPassword : (email) => axiosClient.post(import.meta.env.VITE_API_FORGOT,{email:email})
};

export default userApi;
