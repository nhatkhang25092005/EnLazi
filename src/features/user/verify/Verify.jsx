//css
import "./verify.css";

//feature components
import {PopupModal} from "../components";

//verify component
import CodeInput from "./components/CodeInput";

//custom hook
import useVerifyLogic from "./useVerifyLogic";

//use shared components
import { Loader } from "../../../shared/components";

//constants
import { VERIFY_CONSTANTS } from "../../../shared/constants/messages";

export default function Verify() {
  const {
    loaderRef,
    code,
    setCode,
    popupRef,
    notification,
    handleSubmit
  } = useVerifyLogic();

  return (
    <div id="verify">
      <Loader ref={loaderRef}/>
      <PopupModal handleButton={notification.handleButton}  image={notification.image} colorTitle={notification.colorTitle} title={notification.title} content={notification.content} ref={popupRef}/>
      <h1>{VERIFY_CONSTANTS.TITLE}</h1>
      <p id="p1">
        <strong>{VERIFY_CONSTANTS.TELL1}</strong>
      </p>
      <p id="p2">
        <strong>{VERIFY_CONSTANTS.TELL2}</strong>
      </p>
      <CodeInput code={code} setCode={setCode}/>
      <button className="btnStyle1" onClick={handleSubmit}>
        <strong>{VERIFY_CONSTANTS.BUTTON_TEXT}</strong>
      </button>
    </div>
  );
}
