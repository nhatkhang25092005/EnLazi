import { GoogleOAuthProvider } from "@react-oauth/google";
import {GoogleButton} from "../../../shared/components";

export default function GoogleAuthProvider() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <GoogleButton />
    </GoogleOAuthProvider>
  );
}
