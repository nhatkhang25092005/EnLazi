export default function Notification({ classStatus, message }) {
  return <p className={classStatus} style={{textAlign:"left", color:"red", marginTop:"0px",marginBottom:"5px"}}><strong>{message}</strong></p>;
}
