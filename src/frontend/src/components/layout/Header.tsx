import { Button } from "@/components/ui/button";
import { Link, useRouterState } from "@tanstack/react-router";
import { Building2, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/book", label: "Book Consultation" },
  { to: "/maintenance", label: "Get a Quote" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close mobile menu on route change
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally closes on path change
  useEffect(() => {
    setMobileOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPath]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-primary/95 backdrop-blur-md shadow-elevated"
          : "bg-primary/80 backdrop-blur-sm"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5 text-accent-foreground" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-lg font-semibold text-primary-foreground tracking-tight">
                Williams
              </span>
              <span className="font-heading text-[10px] uppercase tracking-[0.2em] text-accent font-medium">
                Homes
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentPath === link.to;
              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`relative px-4 py-2 rounded-md font-heading text-sm font-medium transition-colors ${
                      isActive
                        ? "text-accent"
                        : "text-primary-foreground/80 hover:text-primary-foreground"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-0 rounded-md bg-white/8"
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              asChild
              size="sm"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-heading font-semibold shadow-glow"
            >
              <Link to="/book">Get Started</Link>
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden p-2 text-primary-foreground/80 hover:text-primary-foreground"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-primary/98 backdrop-blur-md border-t border-white/10"
          >
            <ul className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = currentPath === link.to;
                return (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className={`block px-4 py-3 rounded-md font-heading text-sm font-medium transition-colors ${
                        isActive
                          ? "text-accent bg-white/8"
                          : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/5"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li className="pt-2">
                <Button
                  asChild
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-heading font-semibold"
                >
                  <Link to="/book">Book a Consultation</Link>
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
