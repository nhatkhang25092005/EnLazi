import { Notification } from "../../../shared/components";
export default function RegisterFormField({ message, children }) {
  console.log(message)
  return (
    <div className="form-field" style={{marginBottom:"1rem"}}>
      <Notification message={message} />
      {children}
    </div>
  );
}
