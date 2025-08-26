import { forwardRef } from "react";
const PopupModal = forwardRef(function PopupModal({ title,colorTitle, content,image ,handleButton}, ref) {
  function closePopup() {
    const currDlg = ref.current;
    if (!currDlg) return;
    currDlg.classList.add("closing");

    const handle = () => {
      currDlg.classList.remove("closing");
      currDlg.close();
      currDlg.removeEventListener("animationend", handle);
    };
    currDlg.addEventListener("animationend", handle);
  }

  return (
    <>
      <dialog className="popup" ref={ref}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            marginBottom: "30px",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              left:"-1%"
            }}
          >
            <img
              src={image}
              alt="error"
              style={{
                width: "50px",
                height: "50px",
                marginRight: "8px",
              }}
            />
            <p
              style={{
                color: colorTitle,
                margin: 0,
                fontSize:"40px"
              }}
            >
              <strong>{title}</strong>
            </p>
          </div>
        </div>

        <p
          style={{
            textAlign: "center",
          }}
        >
          <strong>{content}</strong>
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <button type="button" onClick={handleButton || closePopup} className="btnStyle1">
            <strong>OK</strong>
          </button>
        </div>
      </dialog>
    </>
  );
});

export default PopupModal;
