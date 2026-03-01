import { Link } from "@tanstack/react-router";
import { Building2, Heart, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
                <Building2 className="w-5 h-5 text-accent-foreground" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display text-lg font-semibold tracking-tight">
                  Williams
                </span>
                <span className="font-heading text-[10px] uppercase tracking-[0.2em] text-accent font-medium">
                  Homes
                </span>
              </div>
            </div>
            <p className="text-primary-foreground/65 text-sm leading-relaxed max-w-sm font-body">
              Goa-based property maintenance specialists. We protect and manage
              your Goa home or villa — ideal for NRIs and owners residing
              outside India.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-accent mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              {[
                { to: "/book", label: "Book Consultation" },
                { to: "/maintenance", label: "Get a Free Quote" },
                { to: "/book", label: "Property Assessment" },
                { to: "/book", label: "NRI Investment Advice" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-primary-foreground/65 hover:text-primary-foreground text-sm transition-colors font-body"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-accent mb-4">
              Contact
            </h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2.5 text-primary-foreground/65 text-sm font-body">
                <Phone className="w-3.5 h-3.5 flex-shrink-0 text-accent" />
                +91 98207 85232
              </li>
              <li className="flex items-center gap-2.5 text-primary-foreground/65 text-sm font-body">
                <Mail className="w-3.5 h-3.5 flex-shrink-0 text-accent" />
                williamshomesgoa@gmail.com
              </li>
              <li className="flex items-start gap-2.5 text-primary-foreground/65 text-sm font-body">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-accent mt-0.5" />
                <span>
                  401 Sairaj Residency, Porto Vaddo
                  <br />
                  Siolim, 403517 Goa
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/45 text-xs font-body">
            © {year} Williams Homes. All rights reserved.
          </p>
          <p className="text-primary-foreground/45 text-xs font-body flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-accent fill-accent" />{" "}
            using{" "}
            <a
              href={utmLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/80 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
