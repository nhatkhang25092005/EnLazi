import {Icons} from "../../../imageAccess";
export default function EmailInput({ value, changeFunc }) {
  return (
    <div
      style={{
        display: "inline-block",
        alignItems: "center",
        position: "relative",
      }}
    >
      <img
        src={Icons.email}
        alt=""
        style={{
          position: "absolute",
          width: "20px",
          top: "30%",
          left: "10px",
        }}
      />
      <input
        onChange={(event) => changeFunc(event)}
        value={value}
        name="email"
        placeholder="Email"
        type="email"
        style={{
          height: "3rem",
          width: "20rem",
          paddingLeft: "50px",
          borderRadius: "15px",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}
