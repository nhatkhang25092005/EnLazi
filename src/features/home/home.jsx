import {Others} from "../../imageAccess";
import { useNavigate } from "react-router-dom";
import "./home.css";
export default function Home() {
  //html of home
  const navigate = useNavigate();
  return (
    <div id="home">
      <img id="image" src={Others.home} alt="Home image" />
      <div id="authorizeOption">
        <p style={{ fontSize: "25px", textAlign: "center" }}>
          <strong>
            Learn English in an interesting <br /> and funny way!
          </strong>
        </p>
        <button className="btnStyle1" onClick={() => navigate("/login")}>
          <strong>Login</strong>
        </button>
        <button className="btnStyle2" onClick={() => navigate("/register")}>
          <strong>Register</strong>
        </button>
      </div>
    </div>
  );
}
