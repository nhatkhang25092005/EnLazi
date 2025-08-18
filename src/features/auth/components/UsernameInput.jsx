import usernameIcon from "../../../assets/username.png"
export default function UsernameInput() {
  return (
    <div
      style={{
        display: "inline-block",
        alignItems: "center",
        position: "relative",
      }}
    >
      <img
        src={usernameIcon}
        alt=""
        style={{
          position: "absolute",
          width: "20px",
          top: "30%",
          left: "10px",
        }}
      />
      <input
        placeholder="Username"
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
