import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  MapPin,
  Shield,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import type { Variants } from "motion/react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: "easeOut" },
  }),
};

const stats = [
  { value: "5+", label: "Properties Managed" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "3 yrs", label: "Industry Experience" },
  { value: "24/7", label: "Emergency Support" },
];

const features = [
  {
    icon: Shield,
    title: "Trusted Caretakers",
    desc: "We manage your Goa property with the same care as if it were our own — so you can relax wherever you are in the world.",
  },
  {
    icon: Clock,
    title: "Fast Response",
    desc: "On-ground team in North Goa. From minor repairs to urgent issues, we're always just a call away.",
  },
  {
    icon: TrendingUp,
    title: "Value Protection",
    desc: "Proactive upkeep prevents costly repairs and preserves the beauty and value of your Goa property.",
  },
  {
    icon: Users,
    title: "NRI Specialist",
    desc: "Designed for owners living outside Goa or India. We handle everything locally so you never have to worry.",
  },
];

const testimonials = [
  {
    name: "Priya Mehta",
    role: "NRI Property Owner, Dubai",
    text: "Williams Homes gave me complete peace of mind. They manage my Calangute villa like their own. Highly recommended for NRIs.",
    stars: 5,
  },
  {
    name: "Rajan Nair",
    role: "Property Investor, Mumbai",
    text: "Professional, reliable, and based right in Siolim. They sent a detailed quote within hours and the service exceeded expectations.",
    stars: 5,
  },
  {
    name: "Sandra D'Souza",
    role: "Homeowner, Goa",
    text: "Finally a local team that truly understands Goa properties — the humidity, monsoons, and all. Excellent work throughout.",
    stars: 5,
  },
];

const goaAreas = [
  "Calangute",
  "Baga",
  "Anjuna",
  "Vagator",
  "Siolim",
  "Mapusa",
  "Panaji",
  "Candolim",
  "Assagao",
  "Morjim",
];

export function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(/assets/generated/hero-property.dim_1600x900.jpg)",
          }}
        />
        {/* Overlay */}
        <div className="hero-overlay absolute inset-0" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/15 border border-accent/30 mb-6"
            >
              <MapPin className="w-3.5 h-3.5 text-accent" />
              <span className="font-heading text-xs uppercase tracking-widest text-accent font-semibold">
                Goa, India · Property Services
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-white leading-[1.05] tracking-tight mb-6"
            >
              Your Goa Property.
              <br />
              <span className="text-accent italic">Our Responsibility.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22, ease: "easeOut" }}
              className="font-body text-lg text-white/75 leading-relaxed max-w-xl mb-10"
            >
              Specialist property maintenance for Goa homes and villas — ideal
              for NRIs and owners residing outside India. Book a consultation or
              request a free maintenance quote today.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.32 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-heading font-semibold text-base shadow-glow group px-7"
              >
                <Link to="/book">
                  Book a Consultation
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 font-heading font-semibold text-base bg-white/5 backdrop-blur-sm px-7"
              >
                <Link to="/maintenance">Get a Free Quote</Link>
              </Button>
            </motion.div>
          </div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-primary/40 backdrop-blur-md px-6 py-5 text-center"
              >
                <div className="font-display text-3xl font-semibold text-accent">
                  {stat.value}
                </div>
                <div className="font-heading text-xs uppercase tracking-wider text-white/60 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Services Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="font-heading text-xs uppercase tracking-widest text-accent font-semibold mb-3"
            >
              What We Offer
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="font-display text-4xl sm:text-5xl font-semibold text-foreground mb-4 text-balance"
            >
              Two Ways We Can Help
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="font-body text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              Whether you need expert guidance on your Goa property or a
              comprehensive maintenance quote, we make it effortless — even from
              thousands of kilometres away.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Consultation Card */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card className="group relative overflow-hidden border-border hover:border-accent/40 transition-all duration-300 shadow-card hover:shadow-elevated h-full">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/60 to-accent" />
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Calendar className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-foreground mb-3">
                    Book a Consultation
                  </h3>
                  <p className="font-body text-muted-foreground leading-relaxed mb-6">
                    Talk to our Goa-based property experts. We assess your
                    property, understand your requirements, and advise on
                    maintenance and investment strategy.
                  </p>
                  <ul className="space-y-2.5 mb-8">
                    {[
                      "Property Assessment",
                      "NRI Investment Advice",
                      "General Inquiries",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2.5 text-sm font-body text-foreground/80"
                      >
                        <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-heading font-semibold group/btn"
                  >
                    <Link to="/book">
                      Schedule Now
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quote Card */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card className="group relative overflow-hidden border-border hover:border-primary/30 transition-all duration-300 shadow-card hover:shadow-elevated h-full bg-primary text-primary-foreground">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/30 to-accent" />
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <FileText className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-primary-foreground mb-3">
                    Get a Free Quote
                  </h3>
                  <p className="font-body text-primary-foreground/70 leading-relaxed mb-6">
                    Submit your property details and we'll email you a
                    personalised maintenance quote. No commitment, no hidden
                    fees — just a tailored plan for your Goa property.
                  </p>
                  <ul className="space-y-2.5 mb-8">
                    {[
                      "Share property location & size",
                      "Describe your requirements",
                      "Quote emailed within 24–48 hrs",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2.5 text-sm font-body text-primary-foreground/80"
                      >
                        <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-white/20 text-primary-foreground hover:bg-white/10 hover:border-white/40 font-heading font-semibold bg-white/5 group/btn"
                  >
                    <Link to="/maintenance">
                      Request Quote
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-secondary/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="font-heading text-xs uppercase tracking-widest text-accent font-semibold mb-3"
            >
              Why Williams Homes
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="font-display text-4xl sm:text-5xl font-semibold text-foreground mb-4 text-balance"
            >
              Built for Goa Property Owners
            </motion.h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                custom={i}
                variants={fadeUp}
              >
                <div className="group p-6 rounded-2xl bg-card border border-border hover:border-accent/30 hover:shadow-card transition-all duration-300 h-full">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas We Serve */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-10"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="font-heading text-xs uppercase tracking-widest text-accent font-semibold mb-3"
            >
              Service Areas
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="font-display text-3xl sm:text-4xl font-semibold text-foreground mb-4"
            >
              We Cover All of Goa
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="font-body text-muted-foreground max-w-xl mx-auto"
            >
              From the northern beaches to South Goa estates, our local team
              covers every corner of the state.
            </motion.p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto"
          >
            {goaAreas.map((area) => (
              <div
                key={area}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-border bg-card text-sm font-body text-foreground/70 hover:border-accent/40 hover:text-foreground transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-accent" />
                {area}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-secondary/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="font-heading text-xs uppercase tracking-widest text-accent font-semibold mb-3"
            >
              Client Stories
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="font-display text-4xl sm:text-5xl font-semibold text-foreground text-balance"
            >
              Trusted by Goa Property Owners
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                custom={i}
                variants={fadeUp}
              >
                <Card className="h-full shadow-card hover:shadow-elevated transition-shadow duration-300 border-border">
                  <CardContent className="p-8">
                    <div className="flex gap-0.5 mb-5">
                      {Array.from({ length: t.stars }, (_, j) => (
                        <Star
                          key={`star-${t.name}-${j}`}
                          className="w-4 h-4 fill-accent text-accent"
                        />
                      ))}
                    </div>
                    <blockquote className="font-body text-foreground/80 leading-relaxed mb-6 italic">
                      "{t.text}"
                    </blockquote>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center font-heading font-bold text-accent text-sm">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-heading font-semibold text-sm text-foreground">
                          {t.name}
                        </div>
                        <div className="font-body text-xs text-muted-foreground">
                          {t.role}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-primary-foreground mb-4 text-balance">
              Ready to protect your Goa property?
            </h2>
            <p className="font-body text-primary-foreground/65 mb-10 leading-relaxed">
              Book a free consultation or submit your property details for a
              personalised maintenance quote. Based in Siolim, North Goa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-heading font-semibold shadow-glow group px-8"
              >
                <Link to="/book">
                  Book Free Consultation
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/25 text-primary-foreground hover:bg-white/10 hover:border-white/40 font-heading font-semibold bg-white/5 px-8"
              >
                <Link to="/maintenance">Get a Free Quote</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
