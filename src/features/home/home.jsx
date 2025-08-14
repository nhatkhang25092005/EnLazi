import img from "../../assets/homeImg.png";
import "./home.css";
export default function Home() {
  //html of home
  return (
    <div id="home">
      <img id="image" src={img} alt="Home image" />
      <div id="authorizeOption">
        <p style={{ fontSize: "25px", textAlign: "center" }}>
          <strong>
            Learn English in an interesting <br /> and funny way!
          </strong>
        </p>
        <button className="btnStyle1">
          <strong>Login</strong>
        </button>
        <button className="btnStyle2">
          <strong>Register</strong>
        </button>
      </div>
    </div>
  );
}
