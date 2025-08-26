import usernameIcon from "../../../assets/username.png"
export default function UsernameInput({value, changeFunc}) {
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
        name="username"
        placeholder="Username"
        type="text"
        onChange={(e)=>changeFunc(e)}
        value={value}
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
