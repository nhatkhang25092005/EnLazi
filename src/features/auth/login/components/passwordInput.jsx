import password from "../../../../assets/password.png";
import openEye from "../../../../assets/openEye.png";
import closeEye from "../../../../assets/closeEye.png";
import { useState } from "react";

export default function PasswordInput() {
  const [showPass, setShowPass] = useState(false);

  //TODO: nav to forgot password
  const onForgot = () => {
    return;
  };

  return (
    <div
      style={{
        alignItems: "center",
        display: "inline-block",
        position: "relative",
      }}
    >
      <img
        src={password}
        style={{
          width: "20px",
          position: "absolute",
          top: "25%",
          left: "9px",
        }}
      ></img>
      <input
        type={showPass ? "text" : "password"}
        style={{
          height: "3rem",
          borderRadius: "15px",
          width: "20rem",
          paddingLeft: "50px",
          border: "#A49494 solid 1px",
          boxSizing: "border-box",
          fontSize: "17px",
        }}
        placeholder="password"
      ></input>
      <img
        src={showPass ? openEye : closeEye}
        onClick={() => setShowPass((showPass) => !showPass)}
        style={{
          width: "20px",
          position: "absolute",
          top: "30%",
          right: "70px",
          cursor: "pointer",
        }}
      ></img>
      <span
        style={{
          position: "absolute",
          top: "27%",
          right: "10px",
          cursor: "pointer",
        }}
        onClick={onForgot}
      >
        <strong>Forgot?</strong>
      </span>
    </div>
  );
}
