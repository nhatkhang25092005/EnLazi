import { useGoogleLogin } from "@react-oauth/google";
import { Icons } from "../../imageAccess";
import { useNavigate } from "react-router-dom";
import { handleGoogleRequest } from "../services/handleRequest";
import { processGoogle } from "../services/handleResponse";
import { PATH } from "../constants/path";

export default function GoogleButton() {
  const navigate = useNavigate(null);
  const uiProps = {
    navigate,
  }
  const login = useGoogleLogin({
    flow: `auth-code`,
    onSuccess: async (response) => {
      const apiRes = await handleGoogleRequest(response.code)
      processGoogle(apiRes, uiProps)
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
