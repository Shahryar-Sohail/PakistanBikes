const FOOTER_LINKS = [
  "Privacy Policy",
  "Terms of Service",
  "Contact Us",
  "Dealer Network",
];

const Footer = () => (
  <footer className="bg-surface-container-highest border-t border-outline-variant/20 mt-auto">
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex flex-col items-center md:items-start gap-2">
        <span className="text-headline-md font-bold text-on-surface">
          PK Bikes
        </span>
        <p className="text-body-md text-on-surface-variant text-center md:text-left">
          &copy; 2024 Pakistan Bikes. Engineered for National Kinetic
          Performance.
        </p>
      </div>

      <nav className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-4">
        {FOOTER_LINKS.map((link) => (
          <a
            key={link}
            href="#"
            className="text-label-sm text-on-surface-variant hover:text-primary transition-colors"
          >
            {link}
          </a>
        ))}
      </nav>
    </div>
  </footer>
);

export default Footer;
