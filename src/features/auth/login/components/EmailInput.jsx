import emailImg from "../../../../assets/email.png";
export default function EmailInput() {
  return (
    <div
      style={{
        display: "inline-block",
        alignItems: "center",
        position: "relative",
      }}
    >
      <img
        src={emailImg}
        alt=""
        style={{
          position: "absolute",
          width: "20px",
          top: "30%",
          left: "10px",
        }}
      />
      <input
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
