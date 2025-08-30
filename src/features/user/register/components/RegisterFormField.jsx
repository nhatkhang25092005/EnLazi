import { Notification } from "../../../../shared/components";
export default function RegisterFormField({ error, children }) {
  return (
    <div className="form-field" style={{marginBottom:"1rem"}}>
      <Notification message={error} />
      {children}
    </div>
  );
}
