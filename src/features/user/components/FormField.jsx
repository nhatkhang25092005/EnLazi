import { Notification } from "../../../shared/components";
export default function RegisterFormField({ message, children }) {
  return (
    <div className="form-field" style={{marginBottom:"1rem"}}>
      <Notification message={message} />
      {children}
    </div>
  );
}
