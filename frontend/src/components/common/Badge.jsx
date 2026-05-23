const colors = {
  green: "bg-green-100 text-green-800",
  red: "bg-red-100 text-red-800",
  blue: "bg-blue-100 text-blue-800",
  gray: "bg-gray-100 text-gray-700",
};

const Badge = ({ children, color = "green", className = "" }) => (
  <span
    className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${colors[color]} ${className}`}
  >
    {children}
  </span>
);

export default Badge;
