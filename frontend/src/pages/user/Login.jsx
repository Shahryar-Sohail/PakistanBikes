import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login, register } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";

/* ─────────────────────────────────────────────
   Small reusable icon input wrapper
───────────────────────────────────────────── */
const InputField = ({
  id,
  type,
  placeholder,
  value,
  onChange,
  icon,
  rightSlot,
  autoComplete,
}) => (
  <div className="relative">
    <label className="sr-only font-label-sm text-label-sm" htmlFor={id}>
      {placeholder}
    </label>
    {/* Left icon */}
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <span className="material-symbols-outlined text-outline text-[22px]">
        {icon}
      </span>
    </div>
    <input
      id={id}
      name={id}
      type={type}
      autoComplete={autoComplete}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="
        w-full pl-10 pr-4 py-3
        bg-surface-container-low
        border border-outline/20
        rounded-lg
        font-body-md text-body-md text-on-surface
        placeholder:text-on-surface-variant
        focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
        transition-all
      "
    />
    {/* Optional right slot (e.g. password toggle) */}
    {rightSlot && (
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
        {rightSlot}
      </div>
    )}
  </div>
);

/* ─────────────────────────────────────────────
   Inline error message
───────────────────────────────────────────── */
const ErrorBanner = ({ message }) =>
  message ? (
    <div className="flex items-center gap-2 px-3 py-2 bg-error-container text-on-error-container rounded-lg text-label-sm font-label-sm">
      <span className="material-symbols-outlined text-[18px]">error</span>
      {message}
    </div>
  ) : null;

/* ─────────────────────────────────────────────
   Google SVG Logo
───────────────────────────────────────────── */
const GoogleLogo = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

/* ─────────────────────────────────────────────
   Main Page Component
───────────────────────────────────────────── */
const Login = () => {
  const navigate = useNavigate();
  const { updateUser } = useContext(AuthContext);

  // Tab state
  const [activeTab, setActiveTab] = useState("login");

  // ── Login form state ──
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginRemember, setLoginRemember] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // ── Register form state ──
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);

  /* ── Handlers ── */
  const handleLoginChange = (e) =>
    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleRegisterChange = (e) =>
    setRegisterData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);
    try {
      const data = await login(loginData.email, loginData.password);
      updateUser(data.user);
      navigate("/admin");
    } catch (err) {
      setLoginError(
        err?.response?.data?.message || "Invalid email or password."
      );
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegisterError("");

    if (registerData.password !== registerData.confirmPassword) {
      setRegisterError("Passwords do not match.");
      return;
    }
    if (registerData.password.length < 6) {
      setRegisterError("Password must be at least 6 characters.");
      return;
    }

    setRegisterLoading(true);
    try {
      await register(registerData.name, registerData.email, registerData.password);
      setRegisterSuccess(true);
      // Switch to login tab after a short delay
      setTimeout(() => {
        setActiveTab("login");
        setRegisterSuccess(false);
        setLoginData({ email: registerData.email, password: "" });
        setRegisterData({ name: "", email: "", password: "", confirmPassword: "" });
      }, 1500);
    } catch (err) {
      setRegisterError(
        err?.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setRegisterLoading(false);
    }
  };

  const isLogin = activeTab === "login";

  return (
    /* ── Blueprint grid background ── */
    <main
      className="flex-grow flex items-center justify-center p-margin-mobile md:p-margin-desktop relative"
      style={{
        minHeight: "calc(100vh - 128px)", // account for Navbar + Footer
        backgroundSize: "24px 24px",
        backgroundImage:
          "linear-gradient(to right, rgba(28,28,30,0.05) 1px, transparent 1px), " +
          "linear-gradient(to bottom, rgba(28,28,30,0.05) 1px, transparent 1px)",
      }}
    >
      {/* ── Auth Card ── */}
      <div className="w-full max-w-md bg-surface-container-lowest rounded-xl border border-outline/10 shadow-sm relative overflow-hidden">
        {/* Accent top bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />

        <div className="p-8">
          {/* ── Brand Header ── */}
          <div className="text-center mb-8">
            <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">
              PK Bikes
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">
              National Kinetic Performance
            </p>
          </div>

          {/* ── Tab Switchers ── */}
          <div className="flex border-b border-outline-variant/30 mb-8 relative">
            {/* Login tab */}
            <button
              id="tab-login"
              type="button"
              onClick={() => setActiveTab("login")}
              className={`flex-1 pb-4 text-center font-label-md text-label-md relative focus:outline-none transition-colors ${
                isLogin ? "text-primary" : "text-on-surface-variant hover:text-primary"
              }`}
            >
              Login
              <span
                id="indicator-login"
                className={`absolute bottom-0 left-0 right-0 h-[3px] bg-primary rounded-t-full transition-all duration-300 transform ${
                  isLogin ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </button>

            {/* Register tab */}
            <button
              id="tab-register"
              type="button"
              onClick={() => setActiveTab("register")}
              className={`flex-1 pb-4 text-center font-label-md text-label-md relative focus:outline-none transition-colors ${
                !isLogin ? "text-primary" : "text-on-surface-variant hover:text-primary"
              }`}
            >
              Register
              <span
                id="indicator-register"
                className={`absolute bottom-0 left-0 right-0 h-[3px] bg-primary rounded-t-full transition-all duration-300 transform ${
                  !isLogin ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </button>
          </div>

          {/* ══════════════════════════════════════
               LOGIN FORM
          ══════════════════════════════════════ */}
          {isLogin && (
            <form className="space-y-6" id="form-login" onSubmit={handleLoginSubmit}>
              <div className="space-y-4">
                {/* Email */}
                <InputField
                  id="email"
                  type="email"
                  placeholder="Email Address"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  icon="mail"
                  autoComplete="email"
                />

                {/* Password */}
                <InputField
                  id="password"
                  type={showLoginPassword ? "text" : "password"}
                  placeholder="Password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  icon="lock"
                  autoComplete="current-password"
                  rightSlot={
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowLoginPassword((v) => !v)}
                      className="text-outline hover:text-primary transition-colors focus:outline-none"
                      aria-label={showLoginPassword ? "Hide password" : "Show password"}
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {showLoginPassword ? "visibility" : "visibility_off"}
                      </span>
                    </button>
                  }
                />
              </div>

              {/* Error */}
              <ErrorBanner message={loginError} />

              {/* Remember me + Forgot password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer group">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={loginRemember}
                    onChange={(e) => setLoginRemember(e.target.checked)}
                    className="h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary/50 transition-colors"
                  />
                  <span className="ml-2 font-label-sm text-label-sm text-on-surface-variant group-hover:text-on-surface transition-colors">
                    Remember me
                  </span>
                </label>
                <Link
                  to="/forgot-password"
                  className="font-label-sm text-label-sm text-primary hover:text-on-primary-fixed-variant transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Sign In button */}
              <button
                id="btn-sign-in"
                type="submit"
                disabled={loginLoading}
                className="
                  w-full bg-primary hover:bg-surface-tint
                  text-on-primary font-label-md text-label-md
                  py-3 rounded-lg shadow-sm
                  hover:-translate-y-1 hover:shadow-md
                  transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                  disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0
                  flex items-center justify-center gap-2
                "
              >
                {loginLoading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[18px]">
                      progress_activity
                    </span>
                    Signing In…
                  </>
                ) : (
                  "Sign In"
                )}
              </button>

              {/* Divider */}
              <div className="relative py-2">
                <div aria-hidden="true" className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-outline-variant/30" />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-3 bg-surface-container-lowest font-label-sm text-label-sm text-outline">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Google button */}
              <button
                id="btn-google-login"
                type="button"
                className="
                  w-full bg-surface-container hover:bg-surface-container-high
                  border border-outline/10
                  text-on-surface font-label-md text-label-md
                  py-3 rounded-lg
                  transition-colors
                  flex items-center justify-center gap-2
                  focus:outline-none focus:ring-2 focus:ring-outline focus:ring-offset-1
                "
              >
                <GoogleLogo />
                <span>Google</span>
              </button>
            </form>
          )}

          {/* ══════════════════════════════════════
               REGISTER FORM
          ══════════════════════════════════════ */}
          {!isLogin && (
            <form className="space-y-6" id="form-register" onSubmit={handleRegisterSubmit}>
              <div className="space-y-4">
                {/* Full Name */}
                <InputField
                  id="name"
                  type="text"
                  placeholder="Full Name"
                  value={registerData.name}
                  onChange={handleRegisterChange}
                  icon="person"
                  autoComplete="name"
                />

                {/* Email */}
                <InputField
                  id="email"
                  type="email"
                  placeholder="Email Address"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  icon="mail"
                  autoComplete="email"
                />

                {/* Password */}
                <InputField
                  id="password"
                  type={showRegisterPassword ? "text" : "password"}
                  placeholder="Password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  icon="lock"
                  autoComplete="new-password"
                  rightSlot={
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowRegisterPassword((v) => !v)}
                      className="text-outline hover:text-primary transition-colors focus:outline-none"
                      aria-label={showRegisterPassword ? "Hide password" : "Show password"}
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {showRegisterPassword ? "visibility" : "visibility_off"}
                      </span>
                    </button>
                  }
                />

                {/* Confirm Password */}
                <InputField
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
                  icon="lock_reset"
                  autoComplete="new-password"
                  rightSlot={
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowConfirmPassword((v) => !v)}
                      className="text-outline hover:text-primary transition-colors focus:outline-none"
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {showConfirmPassword ? "visibility" : "visibility_off"}
                      </span>
                    </button>
                  }
                />
              </div>

              {/* Error / Success */}
              <ErrorBanner message={registerError} />
              {registerSuccess && (
                <div className="flex items-center gap-2 px-3 py-2 bg-secondary-container text-on-secondary-container rounded-lg text-label-sm font-label-sm">
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  Account created! Redirecting to login…
                </div>
              )}

              {/* Register button */}
              <button
                id="btn-create-account"
                type="submit"
                disabled={registerLoading || registerSuccess}
                className="
                  w-full bg-primary hover:bg-surface-tint
                  text-on-primary font-label-md text-label-md
                  py-3 rounded-lg shadow-sm
                  hover:-translate-y-1 hover:shadow-md
                  transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                  disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0
                  flex items-center justify-center gap-2
                "
              >
                {registerLoading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[18px]">
                      progress_activity
                    </span>
                    Creating Account…
                  </>
                ) : (
                  "Create Account"
                )}
              </button>

              {/* Divider */}
              <div className="relative py-2">
                <div aria-hidden="true" className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-outline-variant/30" />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-3 bg-surface-container-lowest font-label-sm text-label-sm text-outline">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Google button */}
              <button
                id="btn-google-register"
                type="button"
                className="
                  w-full bg-surface-container hover:bg-surface-container-high
                  border border-outline/10
                  text-on-surface font-label-md text-label-md
                  py-3 rounded-lg
                  transition-colors
                  flex items-center justify-center gap-2
                  focus:outline-none focus:ring-2 focus:ring-outline focus:ring-offset-1
                "
              >
                <GoogleLogo />
                <span>Google</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
};

export default Login;
