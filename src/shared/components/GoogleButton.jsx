import { useGoogleLogin } from "@react-oauth/google";
import ggImg from "../../assets/googleIcon.png";
import userApi from "../../api/userApi";
import { useNavigate } from "react-router-dom";

export default function GoogleButton() {
  const navigate = useNavigate(null);
  const login = useGoogleLogin({
    flow: `auth-code`,
    onSuccess: async (response) => {
      userApi
        .google(response.code)
        .then((res) => {
          const data = res.data.data
          console.log(data)
          sessionStorage.setItem("accessToken", data.accesstoken);
          sessionStorage.setItem("refreshToken", data.refreshtoken);
          sessionStorage.setItem("sessionId", data.sessionid);

          navigate("/dashboard");
        })
        .catch()
        .finally();
    },
    onError: () => {
      console.log("Login fail!");
    },
  });
  return (
    <button
      style={{ display: "inline-block", position: "relative" }}
      className="btnStyle3"
      onClick={login}
    >
      <img
        src={ggImg}
        style={{
          position: "absolute",
          width: "35px",
          top: "50%",
          transform: "translateY(-50%)",
          left: "20px",
        }}
      />
      <strong>Google</strong>
    </button>
  );
}
