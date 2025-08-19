import img from "../../assets/homeImg.png";
import { useNavigate } from "react-router-dom";
import "./home.css";
import axiosClient from "../../api/axiosClient"
export default function Home() {
  console.log( axiosClient)
  //html of home
  const navigate = useNavigate();
  return (
    <div id="home">
      <img id="image" src={img} alt="Home image" />
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
