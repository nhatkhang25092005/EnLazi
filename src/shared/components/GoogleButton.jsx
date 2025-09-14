import { useGoogleLogin } from "@react-oauth/google";
import { Icons } from "../../imageAccess";
import { useNavigate } from "react-router-dom";
import { handleGoogleRequest } from "../services/handleRequest";
import { PATH } from "../constants/path";

export default function GoogleButton() {
  const navigate = useNavigate(null);
  const login = useGoogleLogin({
    flow: `auth-code`,
    onSuccess: async (response) => {
      const apiRes = await handleGoogleRequest(response.code)
      if(apiRes.isOk()) navigate(PATH.DASHBOARD)
      console.log(apiRes)
    },
    onError: () => {
      console.log("Login fail!");
      alert("Can not connect to google. Please try it later")
    },
  });
  return (
    <button
      style={{ display: "inline-block", position: "relative" }}
      className="btnStyle3"
      onClick={login}
    >
      <img
        src={Icons.google}
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
