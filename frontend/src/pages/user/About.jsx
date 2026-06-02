import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* ─────────────────────────────────────────────
   Stats
───────────────────────────────────────────── */
const STATS = [
  { value: "250+", label: "Bikes Tracked", color: "text-secondary" },
  { value: "48h", label: "Price Updates", color: "text-secondary" },
  { value: "100%", label: "Spec Accuracy", color: "text-secondary" },
  { value: "Local", label: "Verified Specs", color: "text-secondary" },
];

/* ─────────────────────────────────────────────
   Spec Standard features
───────────────────────────────────────────── */
const SPEC_FEATURES = [
  "High-Fidelity Exhaust Audio Profiles",
  "Regional Dealer Network Validation",
  "Component-level Spare Part Analysis",
];

/* ─────────────────────────────────────────────
   Feature cards (bottom of story section)
───────────────────────────────────────────── */
const FEATURE_CARDS = [
  {
    icon: "verified_user",
    title: "Authenticated Data",
    description:
      "Cross-referenced with manufacturer tech sheets and local dyno tests.",
  },
  {
    icon: "trending_up",
    title: "Live Price Tracking",
    description:
      "Dynamic tracking of MSRP and market markup across all major cities.",
  },
];

/* ─────────────────────────────────────────────
   Social icon links for team member
───────────────────────────────────────────── */
const SocialLink = ({ icon, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary-fixed transition-all"
  >
    <span className="material-symbols-outlined text-[16px]">{icon}</span>
  </a>
);

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
const About = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const handleJoin = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setJoined(true);
      setEmail("");
    }
  };

  return (
    <div className="bg-background min-h-screen">

      {/* ════════════════════════════════════════════
           HERO — "Built for the National Grid"
      ════════════════════════════════════════════ */}
      <section className="px-margin-mobile md:px-margin-desktop py-16 max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left copy */}
          <div>
            {/* Pill badge */}
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-secondary/30 bg-secondary-container/30 text-on-secondary-container font-label-sm text-label-sm mb-6">
              <span
                className="material-symbols-outlined text-[14px] text-secondary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                electric_bolt
              </span>
              National Kinetic Performance
            </span>

            <h1 className="font-headline-lg text-headline-lg text-on-surface leading-tight mb-3">
              Built for the
            </h1>
            <h2
              className="font-headline-lg text-headline-lg leading-tight mb-6"
              style={{
                background: "linear-gradient(135deg, #9e2016 30%, #c0392b 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontStyle: "italic",
              }}
            >
              National Grid
            </h2>

            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-8 max-w-md">
              At PK Bikes, we don't just list specs; we bridge the gap between mechanical
              precision and the unique demands of Pakistan's diverse terrains.
            </p>

            {/* CTA row */}
            <div className="flex flex-wrap items-center gap-6">
              <button
                onClick={() => navigate("/bike-finder-quiz")}
                className="
                  inline-flex items-center gap-2
                  bg-primary hover:bg-surface-tint
                  text-on-primary font-label-md text-label-md
                  px-6 py-3 rounded-lg shadow-sm
                  hover:-translate-y-0.5 hover:shadow-md
                  transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                "
              >
                Explore Our Story
                <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
              </button>

              {/* Avatars + count */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["#9e2016", "#006d38", "#005875"].map((c, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-background flex items-center justify-center text-on-primary font-label-sm text-label-sm"
                      style={{ backgroundColor: c }}
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface">10k+ Enthusiasts</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">Joined</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — card on left, portrait circle on right, side by side */}
          <div className="flex items-center justify-center lg:justify-end gap-6">
            {/* Profile info card */}
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/10 shadow-lg p-5 w-52 shrink-0">
              <p className="font-label-md text-label-md text-on-surface mb-0.5">Farhan K.</p>
              <p className="font-label-sm text-label-sm text-primary uppercase tracking-wide mb-3">
                Lead Architect &amp; Rider
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant text-sm leading-relaxed mb-4">
                A passionate developer dedicated to bringing transparency and tech-forward solutions
                to Pakistan's bike industry.
              </p>
              <div className="flex gap-2">
                <SocialLink icon="link" href="#" />
                <SocialLink icon="code" href="#" />
                <SocialLink icon="mail" href="#" />
              </div>
            </div>

            {/* Circular portrait */}
            <div
              className="w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-surface-container-lowest shadow-lg shrink-0"
              style={{
                background: "linear-gradient(135deg, #eae7ea 0%, #dcd9dc 100%)",
              }}
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkHUIs3sE8v_rMqY9JlJ9gkwMVJ_b-Ei4opL-QkwgqD0THjYeL1EvQs3JgI7MGEdmOOf-A4KH5WqLK9_33NlB8koEC3qPeXykjCiEbSvd_cyXRiysNhQlEDEEHG16tYDhz9LCogxMquXEeQfkfVn3NrvVcdQZ6AYxJbabE4WTKfmQ6bNpqh5nVbgB7X1b5CfAphNKXTmKpzoLHtPD34KW1F-L_bIMHMYhvYxnfr4vKkCOrjiLqXbWumyIiFCxEtyMWyeXVEoKG5_Gl"
                alt="Farhan K. — Lead Architect & Rider"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
           STATS STRIP
      ════════════════════════════════════════════ */}
      <section className="bg-surface-container-low border-y border-outline-variant/10 py-10">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="font-headline-lg text-headline-lg text-on-surface">{s.value}</p>
                <p className={`font-label-md text-label-md uppercase tracking-wider mt-1 ${s.color}`}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
           STORY SECTION — "Precision in Every Byte"
      ════════════════════════════════════════════ */}
      <section className="px-margin-mobile md:px-margin-desktop py-20 max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 items-start">

          {/* Left — copy */}
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-1">
              Precision in Every Byte.
            </h2>
            {/* Red underline accent */}
            <div className="w-12 h-1 bg-primary rounded-full mb-6 mt-2" />

            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-5">
              PK Bikes was born from a simple frustration: the lack of reliable, centralised data
              for the Pakistani motorcycle market. As enthusiasts ourselves, we realized that
              finding actual torque curves, real-world fuel averages, and authentic exhaust notes
              was nearly impossible.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-10">
              We've spent thousands of hours auditing technical manuals and collaborating with local
              mechanics to build a database that reflects the reality of the road, not just the
              glossy brochures.
            </p>

            {/* Feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FEATURE_CARDS.map((fc) => (
                <div
                  key={fc.title}
                  className="bg-surface-container rounded-xl p-5 border border-outline-variant/10 hover:-translate-y-1 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-error-container flex items-center justify-center mb-3">
                    <span
                      className="material-symbols-outlined text-[20px] text-primary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {fc.icon}
                    </span>
                  </div>
                  <p className="font-label-md text-label-md text-on-surface mb-1">{fc.title}</p>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm leading-relaxed">
                    {fc.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — image with floating "Spec Standard" card on top */}
          <div className="relative">
            {/* Background image */}
            <div className="relative rounded-xl overflow-hidden h-80 md:h-96 shadow-sm">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTaSZRVEe-IhBnxmCy56gaC7RbKfmT1-hqbe99MgQE1NvGjxZj1VCjcJuC5sYMNmewhyZ9-p8F0yuXHa-m8ZJyY9khUqtJU8GreTT8_IrVlq5L3VEYNMnJEImIlbQlA7x_zVGfDwGrD72glL9JkYgWf9QLAsW_ZUtd46XjVO7qJlEBUx0x7cWsW0Kd3V0TSb2ubYI1uaas1lclZMvTxJJKl2ao-caOsun1Kkmhj6xF56uTTQUP3mM6WWC_kRGqjv8zXYN-ir0S8Wba"
                alt="Motorcycle workshop"
                className="w-full h-full object-cover"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* "The Spec Standard" card — floating on top-left, overlapping the image */}
            <div className="absolute -top-6 -left-4 z-20 bg-inverse-surface rounded-xl shadow-xl p-5 w-64 max-w-[calc(100%-1rem)]">
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px] text-on-primary">
                    bar_chart
                  </span>
                </div>
                <span className="font-label-sm text-label-sm text-inverse-on-surface/60 uppercase tracking-widest">
                  Engineered Integrity
                </span>
              </div>
              <p className="font-label-md text-label-md text-inverse-on-surface mb-3">
                The Spec Standard
              </p>
              <ul className="space-y-2">
                {SPEC_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="text-primary font-bold text-lg leading-none mt-0.5">›</span>
                    <span className="font-body-md text-body-md text-inverse-on-surface/80 text-sm">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
           NEWSLETTER — "Stay in the Kinetic Loop"
      ════════════════════════════════════════════ */}
      <section className="px-margin-mobile md:px-margin-desktop pb-20 max-w-container-max mx-auto">
        <div className="bg-primary rounded-2xl px-8 py-12 md:px-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            {/* Copy */}
            <div className="max-w-sm">
              <h2 className="font-headline-md text-headline-md text-on-primary mb-2">
                Stay in the Kinetic Loop.
              </h2>
              <p className="font-body-md text-body-md text-on-primary/80 leading-relaxed">
                Get weekly updates on new arrivals, price drops, and technical deep-dives delivered
                straight to your inbox.
              </p>
            </div>

            {/* Form */}
            {joined ? (
              <div className="flex items-center gap-3 bg-on-primary/10 px-6 py-4 rounded-xl">
                <span
                  className="material-symbols-outlined text-on-primary text-[24px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
                <span className="font-label-md text-label-md text-on-primary">
                  You're in! Welcome to the grid.
                </span>
              </div>
            ) : (
              <form
                onSubmit={handleJoin}
                className="flex flex-col sm:flex-row gap-3 w-full md:w-auto"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="
                    flex-1 md:w-64
                    px-4 py-3 rounded-lg
                    bg-surface-container-lowest
                    border border-transparent
                    font-body-md text-body-md text-on-surface
                    placeholder:text-on-surface-variant
                    focus:outline-none focus:ring-2 focus:ring-on-primary/30
                    transition-all
                  "
                />
                <button
                  type="submit"
                  className="
                    px-6 py-3 rounded-lg
                    bg-surface-container-lowest hover:bg-surface-container-low
                    text-primary font-label-md text-label-md
                    border border-outline-variant/20
                    hover:-translate-y-0.5 hover:shadow-md
                    transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-on-primary/30
                    whitespace-nowrap
                  "
                >
                  Join the Grid
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
