import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const NAV_LINKS = [
  { label: "Home", href: "#", active: true },
  { label: "Compare", href: "#" },
  { label: "Price Tracker", href: "#" },
  { label: "Bike Finder Quiz", href: "#" },
  { label: "About", href: "#" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 w-full bg-surface-container-lowest border-b border-outline-variant/10 backdrop-blur-md"
    >
      {/* ── Desktop / top bar ── */}
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-4 flex justify-between items-center">
        <a
          href="#"
          className="text-headline-md font-bold text-primary tracking-tight"
        >
          PK Bikes
        </a>

        <nav className="hidden md:flex gap-8 items-center">
          {NAV_LINKS.map(({ label, href, active }) => (
            <a
              key={label}
              href={href}
              className={
                active
                  ? "text-label-md text-primary border-b-2 border-primary pb-1 transition-all"
                  : "text-label-md text-on-surface-variant hover:text-primary transition-colors duration-200"
              }
            >
              {label}
            </a>
          ))}
        </nav>

        <a
          href="#"
          className="hidden md:inline-flex items-center text-label-md text-primary px-4 py-2 border border-outline-variant/30 rounded-lg hover:border-primary/50 transition-colors"
        >
          Login / Register
        </a>

        <button
          className="md:hidden text-on-surface p-2"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined">
            {menuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-surface-container-lowest border-t border-outline-variant/10"
          >
            <nav className="flex flex-col px-margin-mobile py-4 gap-1">
              {NAV_LINKS.map(({ label, href, active }) => (
                <a
                  key={label}
                  href={href}
                  className={
                    active
                      ? "text-label-md text-primary bg-primary/5 px-4 py-3 rounded-lg border-l-2 border-primary"
                      : "text-label-md text-on-surface-variant hover:text-primary hover:bg-surface-container px-4 py-3 rounded-lg transition-colors"
                  }
                >
                  {label}
                </a>
              ))}

              <div className="mt-3 pt-3 border-t border-outline-variant/20">
                <a
                  href="#"
                  className="flex items-center justify-center text-label-md text-primary px-4 py-3 border border-outline-variant/30 rounded-lg hover:border-primary/50 transition-colors"
                >
                  Login / Register
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
