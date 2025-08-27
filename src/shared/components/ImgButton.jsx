export default function ImgButton({handleClick=null, image, children, ...props }) {
  return (
    <>
      <button
        onClick = {handleClick || null}
        className="btnStyle3"
        {...props}
        style={{
          "--input-bg-image": image ? `url(${image})` : "none", //override att
        }}
      >
        {children}
      </button>
    </>
  );
}
