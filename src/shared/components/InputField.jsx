import PropTypes from "prop-types";
export default function InputField({ image, ...props }) {
  return (
    <input
     {...props}
      style={{
        "--input-bg-image": image ? `url(${image})` : "none", //override att
      }}
    />
  );
}

InputField.PropTypes = {
  image: PropTypes.any,
};
