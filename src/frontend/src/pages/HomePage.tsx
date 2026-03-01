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
  { value: "Since 2022", label: "Industry Experience" },
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
    photo: "/assets/generated/goa-villa-property.dim_800x600.jpg",
    photoAlt: "Portuguese-colonial Goa villa like Priya's property",
  },
  {
    name: "Rajan Nair",
    role: "Property Investor, Mumbai",
    text: "Professional, reliable, and based right in Siolim. They sent a detailed quote within hours and the service exceeded expectations.",
    stars: 5,
    photo: "/assets/generated/goa-neighborhood.dim_800x600.jpg",
    photoAlt: "Goa traditional neighborhood street",
  },
  {
    name: "Sandra D'Souza",
    role: "Homeowner, Goa",
    text: "Finally a local team that truly understands Goa properties — the humidity, monsoons, and all. Excellent work throughout.",
    stars: 5,
    photo: "/assets/generated/goa-bougainvillea.dim_800x500.jpg",
    photoAlt: "Beautiful bougainvillea on a Goan wall",
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
      {/* Portuguese Tile Color Strip */}
      <div className="tile-border w-full" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(/assets/generated/siolim-church-hero.dim_1600x900.jpg)",
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

            {/* Ornamental azulejo divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
              className="flex items-center gap-3 mb-5"
            >
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/50 to-accent/20" />
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect
                  x="9"
                  y="0"
                  width="6.36"
                  height="6.36"
                  rx="1"
                  transform="rotate(45 9 0)"
                  fill="oklch(0.68 0.20 42 / 0.8)"
                />
                <rect
                  x="9"
                  y="0"
                  width="3.5"
                  height="3.5"
                  rx="0.5"
                  transform="rotate(45 9 0) translate(1.43 1.43)"
                  fill="oklch(0.52 0.18 195 / 0.6)"
                />
              </svg>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-accent/50 to-accent/20" />
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
      <section className="py-24 bg-secondary/50 azulejo-pattern">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">
            {/* Left: Text */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="flex-1 text-center lg:text-left"
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
              <motion.p
                variants={fadeUp}
                custom={2}
                className="font-body text-sm text-accent/80 italic tracking-wide"
              >
                Aamchi Maati, Aamchi Maaya — Our Land, Our Care
              </motion.p>
            </motion.div>
            {/* Right: Goa image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full lg:w-80 xl:w-96 flex-shrink-0"
            >
              <div className="rounded-2xl overflow-hidden shadow-elevated border border-border/40">
                <img
                  src="/assets/generated/goa-backwaters.dim_800x600.jpg"
                  alt="Peaceful Goa backwaters"
                  className="w-full h-56 object-cover"
                />
              </div>
            </motion.div>
          </div>

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
                className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-border bg-card text-sm font-body text-foreground/70 hover:border-accent/60 hover:bg-accent/5 hover:text-foreground transition-all duration-200 cursor-default"
              >
                <MapPin className="w-3.5 h-3.5 text-accent" />
                {area}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Atmospheric Goa Banner — between Areas and Gallery */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8 }}
        className="relative h-64 sm:h-80 overflow-hidden"
        style={{
          backgroundImage:
            "url(/assets/generated/siolim-church-hero.dim_1600x900.jpg)",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/75 via-primary/50 to-transparent" />
        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.p
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-heading text-xs uppercase tracking-widest text-accent font-semibold mb-3"
            >
              Goa, India
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-white max-w-lg leading-tight"
            >
              Experience the beauty of Goa
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="font-body text-white/70 mt-3 max-w-sm"
            >
              Sun-drenched coastlines, colonial heritage, and lush green
              landscapes — worth every bit of protection.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Goa Photo Gallery */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="font-heading text-xs uppercase tracking-widest text-accent font-semibold mb-3"
            >
              Beautiful Goa
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="font-display text-4xl sm:text-5xl font-semibold text-foreground mb-4 text-balance"
            >
              The Paradise We Call Home
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="font-body text-muted-foreground max-w-xl mx-auto"
            >
              From sun-drenched beaches to colonial villas draped in
              bougainvillea — this is Goa, and it's worth protecting.
            </motion.p>
          </motion.div>

          {/* Mosaic Grid */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl mx-auto"
          >
            {/* Large hero image spanning 2 cols & 2 rows */}
            <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden shadow-card group">
              <img
                src="/assets/generated/siolim-church-hero.dim_1600x900.jpg"
                alt="Siolim Church, Goa"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                style={{ minHeight: "260px" }}
              />
            </div>
            {/* Villa */}
            <div className="rounded-2xl overflow-hidden shadow-card group">
              <img
                src="/assets/generated/goa-villa-property.dim_800x600.jpg"
                alt="Portuguese-colonial Goa villa"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                style={{ minHeight: "130px" }}
              />
            </div>
            {/* Neighborhood */}
            <div className="rounded-2xl overflow-hidden shadow-card group">
              <img
                src="/assets/generated/goa-neighborhood.dim_800x600.jpg"
                alt="Goa traditional neighborhood"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                style={{ minHeight: "130px" }}
              />
            </div>
            {/* Backwaters */}
            <div className="rounded-2xl overflow-hidden shadow-card group">
              <img
                src="/assets/generated/goa-backwaters.dim_800x600.jpg"
                alt="Goa backwaters"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                style={{ minHeight: "130px" }}
              />
            </div>
            {/* Bougainvillea */}
            <div className="rounded-2xl overflow-hidden shadow-card group">
              <img
                src="/assets/generated/goa-bougainvillea.dim_800x500.jpg"
                alt="Bougainvillea on Goan wall"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                style={{ minHeight: "130px" }}
              />
            </div>
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
                className="group"
              >
                <Card className="h-full shadow-card hover:shadow-elevated transition-shadow duration-300 border-border overflow-hidden">
                  {/* Decorative photo thumbnail at top of card */}
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={t.photo}
                      alt={t.photoAlt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/80" />
                  </div>
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
                      <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center font-heading font-bold text-accent text-sm flex-shrink-0">
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

      {/* Goa Cultural Section Divider — stylized palm & cross motif */}
      <div className="flex items-center justify-center gap-4 py-6 bg-background">
        <div className="flex-1 max-w-32 h-px bg-gradient-to-r from-transparent to-border" />
        <svg
          width="64"
          height="24"
          viewBox="0 0 64 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="opacity-60"
        >
          {/* Palm leaf left */}
          <path
            d="M8 20 C8 20 2 14 4 8 C6 4 10 6 8 20Z"
            fill="oklch(0.58 0.15 148 / 0.5)"
          />
          <path
            d="M8 20 C8 20 1 16 5 10 C7 7 11 10 8 20Z"
            fill="oklch(0.58 0.15 148 / 0.3)"
          />
          <line
            x1="8"
            y1="20"
            x2="8"
            y2="22"
            stroke="oklch(0.52 0.18 195 / 0.6)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Center cross/church motif */}
          <line
            x1="32"
            y1="2"
            x2="32"
            y2="22"
            stroke="oklch(0.68 0.20 42 / 0.7)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="26"
            y1="8"
            x2="38"
            y2="8"
            stroke="oklch(0.68 0.20 42 / 0.7)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="32" cy="5" r="1.5" fill="oklch(0.52 0.18 195 / 0.6)" />
          {/* Diamond tiles */}
          <rect
            x="28.5"
            y="13.5"
            width="4"
            height="4"
            rx="0.5"
            transform="rotate(45 30.5 15.5)"
            fill="oklch(0.68 0.20 42 / 0.4)"
          />
          {/* Palm leaf right */}
          <path
            d="M56 20 C56 20 62 14 60 8 C58 4 54 6 56 20Z"
            fill="oklch(0.58 0.15 148 / 0.5)"
          />
          <path
            d="M56 20 C56 20 63 16 59 10 C57 7 53 10 56 20Z"
            fill="oklch(0.58 0.15 148 / 0.3)"
          />
          <line
            x1="56"
            y1="20"
            x2="56"
            y2="22"
            stroke="oklch(0.52 0.18 195 / 0.6)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <div className="flex-1 max-w-32 h-px bg-gradient-to-l from-transparent to-border" />
      </div>

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

      {/* Portuguese Tile Color Strip — bottom */}
      <div className="tile-border w-full" />
    </main>
  );
}
