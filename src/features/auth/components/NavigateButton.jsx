import { useNavigate } from "react-router-dom";
export default function NavigateButton({ name, destination }) {
  const navigate = useNavigate();
  return (
    <button
      style={{
        position: "absolute",
        top: "20px",
        right: "20px",
        width: "10rem",
      }}
      onClick={() => navigate(destination)}
      className="btnStyle2"
    >
      <strong>{name}</strong>
    </button>
  );
}
