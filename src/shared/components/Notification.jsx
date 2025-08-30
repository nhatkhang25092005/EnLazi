export default function Notification({ message }) {
  return (
    <p
      style={{
        width:"18rem",
        textAlign: "left",
        color: "red",
        marginTop: "0px",
        marginBottom: "5px",
        marginLeft: "1.5rem",
        wordBreak:"break-word"
      }}
    >
      <strong>{message}</strong>
    </p>
  );
}
