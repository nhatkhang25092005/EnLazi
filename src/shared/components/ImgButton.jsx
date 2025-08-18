export default function ImgButton({ image, children, ...props }) {
  return (
    <>
      <button
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
