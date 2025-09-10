import { Icons } from "../../../imageAccess";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PasswordInput({value, changeFunc}) {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      style={{
        alignItems: "center",
        display: "inline-block",
        position: "relative",
      }}
    >
      <img
        src={Icons.closeEye}
        style={{
          width: "20px",
          position: "absolute",
          top: "25%",
          left: "9px",
        }}
      ></img>
      <input
        value={value}
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
        name="password"
        onChange={(e)=>changeFunc(e)}
        placeholder="password"
      ></input>
      <img
        src={showPass ? Icons.openEye : Icons.closeEye}
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
        onClick={() => navigate("/forgot")}
      >
        <strong>Forgot?</strong>
      </span>
    </div>
  );
}
