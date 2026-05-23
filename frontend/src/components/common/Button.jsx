const variants = {
  primary: "btn bg-green-600 hover:bg-green-700 text-white border-none",
  secondary: "btn bg-gray-200 hover:bg-gray-300 text-gray-800 border-none",
  outline:
    "btn btn-outline border-green-600 text-green-600 hover:bg-green-600 hover:text-white",
  danger: "btn bg-red-500 hover:bg-red-600 text-white border-none",
};

const Button = ({ children, variant = "primary", className = "", ...props }) => (
  <button className={`${variants[variant]} ${className}`} {...props}>
    {children}
  </button>
);

export default Button;
