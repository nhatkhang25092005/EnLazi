import { forwardRef } from "react";


const Loader = forwardRef((props,ref) => {
  return (
    <dialog className="loader" ref={ref}>
      <div id="cube1"></div>
      <div id="cube2"></div>
    </dialog>
  );
});

export default Loader;
