export default function ImgButton({ image, children, ...props }) {
  return (
    <>
      <button
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
