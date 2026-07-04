import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Sparkles, Zap, Droplets, Sun, Star, ShieldCheck, Award, Users, Cpu,
  ChevronDown, ChevronLeft, ChevronRight, Calendar, MapPin, Phone, Mail,
  Clock, ArrowRight, Check, Heart, Flower2, Wand2,
  Syringe, Scissors, Snowflake, Waves, MessageCircle, X, Menu, Camera,
} from "lucide-react";

import heroImg from "@/assets/hero.jpg";
import aboutImg from "@/assets/about.jpg";
import gallery1 from "@/assets/gallery1.jpg";
import gallery2 from "@/assets/gallery2.jpg";
import gallery3 from "@/assets/gallery3.jpg";
import doctor1 from "@/assets/doctor1.jpg";
import doctor2 from "@/assets/doctor2.jpg";
import doctor3 from "@/assets/doctor3.jpg";

export const Route = createFileRoute("/")({
  component: LumierePage,
});

/* ---------------- Shared bits ---------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  center = true,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={center ? "text-center max-w-3xl mx-auto" : "max-w-2xl"}
    >
      {eyebrow && (
        <div className={`flex items-center gap-3 ${center ? "justify-center" : ""} mb-4`}>
          <span className="h-px w-8 bg-primary/50" />
          <span className="text-xs tracking-[0.3em] uppercase text-primary font-medium">
            {eyebrow}
          </span>
          <span className="h-px w-8 bg-primary/50" />
        </div>
      )}
      <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

function GoldButton({
  children,
  href = "#book",
  variant = "primary",
  className = "",
  ariaLabel,
}: {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "ghost";
  className?: string;
  ariaLabel?: string;
}) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all duration-500 overflow-hidden";
  const styles =
    variant === "primary"
      ? "text-primary-foreground gold-hover"
      : "text-foreground border border-foreground/20 hover:border-primary hover:text-primary";
  return (
    <a href={href} aria-label={ariaLabel} className={`${base} ${styles} ${className}`}>
      {variant === "primary" && (
        <span
          className="absolute inset-0 -z-10"
          style={{ background: "var(--gradient-gold)" }}
        />
      )}
      <span className="relative z-10">{children}</span>
      <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
    </a>
  );
}

/* ---------------- Navbar ---------------- */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Treatments", href: "#treatments" },
    { label: "About", href: "#about" },
    { label: "Gallery", href: "#gallery" },
    { label: "Specialists", href: "#specialists" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div
        className={`mx-auto max-w-7xl px-4 md:px-8 transition-all duration-500 ${
          scrolled
            ? "bg-background/70 backdrop-blur-xl border border-border/50 rounded-full mx-4 md:mx-8 soft-shadow"
            : ""
        }`}
      >
        <div className="flex items-center justify-between h-14">
          <a href="#" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full grid place-items-center" style={{ background: "var(--gradient-gold)" }}>
              <Flower2 className="w-4 h-4 text-white" />
            </div>
            <div className="leading-tight">
              <div className="font-serif text-lg tracking-tight">Lumière</div>
              <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground -mt-0.5">
                Aesthetics
              </div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-foreground/80 hover:text-primary transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-primary hover:after:w-full after:transition-all after:duration-300"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <GoldButton href="#book" className="!py-2.5 !px-5 text-xs">
              Book Consultation
            </GoldButton>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="lg:hidden p-2 -mr-2"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-background p-8 flex flex-col"
            >
              <button onClick={() => setOpen(false)} className="self-end p-2" aria-label="Close menu">
                <X className="w-5 h-5" />
              </button>
              <nav className="flex flex-col gap-6 mt-8">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-serif text-2xl text-foreground hover:text-primary"
                  >
                    {l.label}
                  </a>
                ))}
              </nav>
              <div className="mt-auto">
                <GoldButton href="#book" className="w-full">Book Consultation</GoldButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100dvh] flex items-center overflow-hidden pt-24">
      {/* Background */}
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <img
          src={heroImg}
          alt="Luxurious interior of Lumière Aesthetics Clinic"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </motion.div>

      {/* Floating gold orbs */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full opacity-40 animate-float"
          style={{ background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full opacity-30 animate-float"
          style={{ background: "radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)", filter: "blur(80px)", animationDelay: "2s" }} />
      </div>

      <motion.div style={{ opacity }} className="relative z-10 mx-auto max-w-7xl px-6 md:px-8 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs tracking-widest uppercase text-foreground/80">
              Luxury Aesthetic Medicine
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 1 }}
            className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.98] text-foreground"
          >
            Reveal Your <em className="gold-text not-italic">Natural</em>
            <br />
            Beauty with Advanced
            <br />
            Aesthetic Care
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-8 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed"
          >
            Personalized skin, facial and body treatments delivered by experienced medical
            professionals using internationally trusted technology.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.8 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <GoldButton href="#book">Book Consultation</GoldButton>
            <GoldButton href="#treatments" variant="ghost">View Treatments</GoldButton>
          </motion.div>

          {/* Trust */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.8 }}
            className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { icon: Star, label: "4.9 Rating", sub: "Google Reviews" },
              { icon: Users, label: "900+ Clients", sub: "Happy Patients" },
              { icon: Award, label: "Certified", sub: "Specialists" },
              { icon: Cpu, label: "Modern", sub: "Equipment" },
            ].map((t) => (
              <div key={t.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full glass grid place-items-center shrink-0">
                  <t.icon className="w-4 h-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">{t.label}</div>
                  <div className="text-xs text-muted-foreground">{t.sub}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------------- About ---------------- */

function AnimatedStat({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.7 }}
      className="text-center md:text-left"
    >
      <div className="font-serif text-4xl md:text-5xl gold-text">{value}</div>
      <div className="text-xs tracking-[0.2em] uppercase text-muted-foreground mt-2">{label}</div>
    </motion.div>
  );
}

function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] luxe-shadow">
              <img src={aboutImg} alt="Facial treatment at Lumière" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="absolute -bottom-8 -right-4 md:-right-8 glass rounded-3xl p-6 max-w-[240px] soft-shadow">
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
                ))}
              </div>
              <div className="text-sm text-foreground/90 leading-relaxed">
                "The most refined skin experience I've had."
              </div>
              <div className="mt-3 text-xs text-muted-foreground">— Sophia R.</div>
            </div>
          </motion.div>

          <div>
            <SectionHeader
              eyebrow="About the Clinic"
              title="Modern Aesthetic Medicine with Exceptional Care"
              center={false}
            />
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Lumière Aesthetics Clinic combines advanced dermatology, aesthetic medicine, and
              non-surgical cosmetic procedures to help patients achieve healthy, youthful-looking
              skin in a comfortable and luxurious environment.
            </p>

            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
              <AnimatedStat value="15+" label="Years Experience" />
              <AnimatedStat value="900+" label="Satisfied Patients" delay={0.1} />
              <AnimatedStat value="30+" label="Treatments" delay={0.2} />
              <AnimatedStat value="4.9★" label="Patient Rating" delay={0.3} />
            </div>

            <div className="mt-10 space-y-3">
              {[
                "Board-certified dermatologists & aesthetic doctors",
                "Latest FDA-approved medical technology",
                "Fully personalized treatment plans",
              ].map((t) => (
                <div key={t} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full grid place-items-center shrink-0 mt-0.5" style={{ background: "var(--gradient-gold)" }}>
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm text-foreground/85">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Treatments ---------------- */

const TREATMENTS = [
  { name: "Laser Hair Removal", icon: Zap, desc: "Smooth, permanent hair reduction with premium diode lasers." },
  { name: "Botox & Wrinkles", icon: Sparkles, desc: "Refined expressions with precisely dosed neuromodulators." },
  { name: "Dermal Fillers", icon: Droplets, desc: "Restore volume and contour with hyaluronic acid artistry." },
  { name: "Hydrafacial", icon: Waves, desc: "Signature multi-step glow facial for radiant, hydrated skin." },
  { name: "Acne Treatment", icon: ShieldCheck, desc: "Medical-grade protocols to clear active breakouts." },
  { name: "Acne Scar Treatment", icon: Wand2, desc: "Advanced resurfacing to smooth pitted texture." },
  { name: "Skin Whitening", icon: Sun, desc: "Even skin tone and reduce hyperpigmentation safely." },
  { name: "RF Microneedling", icon: Cpu, desc: "Radiofrequency-powered collagen remodeling." },
  { name: "Ultherapy", icon: Waves, desc: "Ultrasound lifting for the face, neck, and décolletage." },
  { name: "Thermage FLX", icon: Zap, desc: "Non-invasive skin tightening with monopolar RF." },
  { name: "Thread Lift", icon: Scissors, desc: "PDO threads for subtle lift and definition." },
  { name: "HIFU", icon: Sparkles, desc: "High-intensity focused ultrasound tightening." },
  { name: "Skin Boosters", icon: Syringe, desc: "Micro-injections for luminous, hydrated skin." },
  { name: "IPL Photofacial", icon: Sun, desc: "Intense pulsed light for pigmentation and redness." },
  { name: "Laser Resurfacing", icon: Zap, desc: "Fractional lasers to renew skin from within." },
  { name: "Mole & Skin Tag Removal", icon: Wand2, desc: "Precision removal with minimal downtime." },
  { name: "Fat Dissolving", icon: Droplets, desc: "Injectable lipolysis for stubborn fat pockets." },
  { name: "Cellulite Treatment", icon: Waves, desc: "Advanced protocols for smoother contours." },
  { name: "CoolSculpting", icon: Snowflake, desc: "Cryolipolysis body contouring, no surgery." },
  { name: "IV Vitamin Therapy", icon: Heart, desc: "Intravenous cocktails for glow and vitality." },
];

function Treatments() {
  return (
    <section id="treatments" className="relative py-24 md:py-32 bg-accent/40">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeader
          eyebrow="Featured Treatments"
          title="A Complete Menu of Refined Care"
          subtitle="From medical dermatology to non-surgical rejuvenation, every treatment is delivered by specialist physicians."
        />

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {TREATMENTS.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (i % 8) * 0.05, duration: 0.6 }}
              whileHover={{ y: -6 }}
              className="group relative rounded-3xl bg-card p-6 border border-border/60 soft-shadow overflow-hidden transition-all duration-500 hover:border-primary/40 hover:shadow-[0_20px_50px_-20px_rgba(185,151,91,0.35)]"
            >
              <div
                aria-hidden
                className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ background: "radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)", filter: "blur(30px)" }}
              />
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl grid place-items-center mb-5 transition-transform duration-500 group-hover:scale-110" style={{ background: "var(--gradient-gold)" }}>
                  <t.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-serif text-xl text-foreground">{t.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
                <a href="#book" className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-primary group/link">
                  Learn More
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Why Choose Us ---------------- */

function WhyChoose() {
  const items = [
    { icon: Award, title: "Board Certified Specialists", desc: "Experienced physicians accredited by leading medical boards." },
    { icon: Cpu, title: "Latest Medical Technology", desc: "FDA-approved, gold-standard devices from global leaders." },
    { icon: Sparkles, title: "Personalized Treatment Plans", desc: "Every protocol tailored to your skin, goals, and lifestyle." },
    { icon: ShieldCheck, title: "Safe & Comfortable", desc: "Sterile clinical excellence in a spa-like environment." },
  ];
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeader eyebrow="Why Choose Us" title="Distinguished by Detail" />
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              className="glass rounded-3xl p-8 text-center hover:luxe-shadow transition-all duration-500 hover:-translate-y-2"
            >
              <div className="w-14 h-14 mx-auto rounded-2xl grid place-items-center mb-5" style={{ background: "var(--gradient-gold)" }}>
                <it.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-serif text-xl text-foreground">{it.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Gallery ---------------- */

const GALLERY = [
  { src: gallery1, category: "Skin", title: "Radiance Ritual" },
  { src: gallery2, category: "Face", title: "Signature Suite" },
  { src: gallery3, category: "Skin", title: "Bespoke Care" },
  { src: gallery1, category: "Anti Aging", title: "Youthful Glow" },
  { src: gallery2, category: "Body", title: "Contouring" },
  { src: gallery3, category: "Hair Removal", title: "Smooth Result" },
];

function Gallery() {
  const cats = ["All", "Face", "Skin", "Body", "Hair Removal", "Anti Aging"];
  const [active, setActive] = useState("All");
  const [modal, setModal] = useState<number | null>(null);

  const filtered = active === "All" ? GALLERY : GALLERY.filter((g) => g.category === active);

  return (
    <section id="gallery" className="relative py-24 md:py-32 bg-accent/40">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeader
          eyebrow="Before & After"
          title="Real Results, Refined Craft"
          subtitle="Selected transformations from our patients — hover to reveal the after."
        />

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-5 py-2 rounded-full text-xs tracking-wide transition-all ${
                active === c
                  ? "text-primary-foreground"
                  : "text-foreground/70 border border-border hover:border-primary/50"
              }`}
              style={active === c ? { background: "var(--gradient-gold)" } : {}}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((g, i) => (
            <motion.button
              key={`${g.title}-${i}`}
              layout
              onClick={() => setModal(i)}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.6 }}
              className="group relative rounded-[1.75rem] overflow-hidden aspect-[4/5] soft-shadow text-left"
            >
              <img src={g.src} alt={g.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-105 grayscale group-hover:grayscale-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass text-[10px] tracking-widest uppercase text-foreground/90">
                {g.category}
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <div className="flex items-center gap-3">
                  <span className="text-xs tracking-widest uppercase opacity-70">Before</span>
                  <span className="h-px flex-1 bg-white/40" />
                  <span className="text-xs tracking-widest uppercase opacity-100 font-medium">After</span>
                </div>
                <div className="mt-2 font-serif text-2xl">{g.title}</div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {modal !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] grid place-items-center p-4 bg-foreground/80 backdrop-blur-md"
            onClick={() => setModal(null)}
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={filtered[modal].src}
              alt={filtered[modal].title}
              className="max-w-4xl w-full rounded-3xl"
            />
            <button className="absolute top-6 right-6 text-white p-2" onClick={() => setModal(null)} aria-label="Close">
              <X className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------------- Testimonials ---------------- */

const REVIEWS = [
  { text: "The clinic exceeded every expectation. The doctors were professional and the results were incredible.", name: "Ava Martinez", role: "Hydrafacial patient" },
  { text: "Beautiful clinic, friendly staff, painless treatment and excellent care.", name: "Chloe Bennett", role: "Botox patient" },
  { text: "Highly recommended for anyone looking for advanced skin treatments.", name: "Isabella Wu", role: "Laser resurfacing" },
];

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % REVIEWS.length), 6000);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)", filter: "blur(80px)" }} />
      </div>
      <div className="mx-auto max-w-4xl px-6 md:px-8">
        <SectionHeader eyebrow="Patient Reviews" title="Loved by Those Who Trust Us" />
        <div className="mt-14 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="glass rounded-[2rem] p-10 md:p-14 text-center luxe-shadow"
            >
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="font-serif text-2xl md:text-3xl leading-snug text-foreground italic">
                "{REVIEWS[i].text}"
              </p>
              <div className="mt-8">
                <div className="text-sm font-medium text-foreground">{REVIEWS[i].name}</div>
                <div className="text-xs text-muted-foreground mt-1">{REVIEWS[i].role}</div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button onClick={() => setI((p) => (p - 1 + REVIEWS.length) % REVIEWS.length)} className="w-10 h-10 rounded-full glass grid place-items-center hover:text-primary transition" aria-label="Previous">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {REVIEWS.map((_, idx) => (
                <button key={idx} onClick={() => setI(idx)} aria-label={`Review ${idx + 1}`} className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-primary" : "w-1.5 bg-foreground/20"}`} />
              ))}
            </div>
            <button onClick={() => setI((p) => (p + 1) % REVIEWS.length)} className="w-10 h-10 rounded-full glass grid place-items-center hover:text-primary transition" aria-label="Next">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Process ---------------- */

function Process() {
  const steps = [
    { n: "01", title: "Book Appointment", desc: "Choose a time that suits you online or by phone." },
    { n: "02", title: "Skin Assessment", desc: "Comprehensive analysis by a specialist physician." },
    { n: "03", title: "Personalized Treatment", desc: "A protocol crafted uniquely for your goals." },
    { n: "04", title: "Aftercare & Follow-up", desc: "Ongoing support to protect and enhance results." },
  ];
  return (
    <section className="relative py-24 md:py-32 bg-accent/40">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeader eyebrow="Consultation Process" title="A Considered Journey to Radiance" />
        <div className="mt-16 grid md:grid-cols-4 gap-6 relative">
          <div aria-hidden className="hidden md:block absolute top-10 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              className="text-center relative"
            >
              <div className="w-20 h-20 rounded-full mx-auto grid place-items-center relative bg-background border-2 border-primary/30 soft-shadow">
                <span className="font-serif text-2xl gold-text">{s.n}</span>
              </div>
              <h3 className="mt-6 font-serif text-xl">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-xs mx-auto">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Specialists ---------------- */

function Specialists() {
  const docs = [
    { img: doctor1, name: "Dr. Amelia Laurent", spec: "Aesthetic Dermatology", years: "12 Years" },
    { img: doctor2, name: "Dr. Julien Marchetti", spec: "Cosmetic Medicine", years: "15 Years" },
    { img: doctor3, name: "Dr. Sora Nakamura", spec: "Laser Specialist", years: "10 Years" },
  ];
  return (
    <section id="specialists" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeader eyebrow="Meet Our Specialists" title="Physicians of Precision & Artistry" />
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {docs.map((d, i) => (
            <motion.article
              key={d.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.7 }}
              className="group"
            >
              <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] soft-shadow">
                <img src={d.img} alt={d.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <div className="text-xs tracking-widest uppercase opacity-80">{d.spec}</div>
                  <div className="font-serif text-2xl mt-1">{d.name}</div>
                  <div className="mt-1 text-xs opacity-80">{d.years} experience</div>
                </div>
              </div>
              <a href="#book" className="mt-5 inline-flex items-center gap-2 text-sm text-primary font-medium hover:gap-3 transition-all">
                Book Consultation <ArrowRight className="w-4 h-4" />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Pricing ---------------- */

function Pricing() {
  const plans = [
    { name: "Skin Care", price: "From $180", items: ["Signature facial", "Extractions", "LED therapy", "Personal consult"] },
    { name: "Laser Packages", price: "From $290", items: ["Full-body assessment", "6 laser sessions", "Post-care kit", "Priority booking"], featured: true },
    { name: "Anti Aging", price: "From $450", items: ["Skin analysis", "Botox / filler", "Skin boosters", "Aftercare plan"] },
    { name: "Hydrafacial", price: "From $220", items: ["Deep cleanse", "Hydration serum", "Antioxidant boost", "Glow finish"] },
  ];
  return (
    <section id="pricing" className="relative py-24 md:py-32 bg-accent/40">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeader
          eyebrow="Pricing Preview"
          title="Transparent, Tailored Packages"
          subtitle="Every package is customizable — request a personalized quote for the ideal plan."
        />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className={`relative rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 ${
                p.featured
                  ? "text-primary-foreground luxe-shadow"
                  : "bg-card border border-border/60 soft-shadow"
              }`}
              style={p.featured ? { background: "var(--gradient-gold)" } : {}}
            >
              {p.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] tracking-widest uppercase bg-foreground text-background">
                  Most Popular
                </div>
              )}
              <div className={`text-xs tracking-[0.2em] uppercase ${p.featured ? "text-white/80" : "text-muted-foreground"}`}>
                {p.name}
              </div>
              <div className={`font-serif text-3xl mt-3 ${p.featured ? "text-white" : "text-foreground"}`}>
                {p.price}
              </div>
              <div className={`mt-5 h-px ${p.featured ? "bg-white/30" : "bg-border"}`} />
              <ul className="mt-5 space-y-3">
                {p.items.map((it) => (
                  <li key={it} className={`flex items-start gap-2.5 text-sm ${p.featured ? "text-white/90" : "text-foreground/80"}`}>
                    <Check className={`w-4 h-4 mt-0.5 shrink-0 ${p.featured ? "text-white" : "text-primary"}`} />
                    {it}
                  </li>
                ))}
              </ul>
              <a
                href="#book"
                className={`mt-7 inline-flex items-center gap-1.5 text-sm font-medium ${p.featured ? "text-white" : "text-primary"}`}
              >
                Request Quote <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <GoldButton href="#book">Request Personalized Quote</GoldButton>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */

const FAQS = [
  { q: "How long is recovery?", a: "Most non-invasive treatments have zero to minimal downtime; you can return to routine within hours. Ablative procedures may require 3–7 days." },
  { q: "Are treatments painful?", a: "Comfort is a priority. Topical anesthetics, cooling systems, and modern devices make most treatments virtually painless." },
  { q: "How many sessions are required?", a: "It depends on the treatment and your goals. Your physician will outline a personalized plan during your consultation." },
  { q: "Is consultation free?", a: "Your first assessment consultation is complimentary and includes a full skin analysis." },
  { q: "Are results permanent?", a: "Some treatments give lasting results; others require periodic maintenance to sustain outcomes." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 md:px-8">
        <SectionHeader eyebrow="FAQ" title="Answers to Common Questions" />
        <div className="mt-14 space-y-3">
          {FAQS.map((f, i) => (
            <div key={f.q} className="border border-border/70 rounded-2xl overflow-hidden bg-card">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between text-left px-6 py-5 hover:bg-accent/50 transition"
                aria-expanded={open === i}
              >
                <span className="font-medium text-foreground pr-4">{f.q}</span>
                <ChevronDown className={`w-4 h-4 text-primary shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">
                      {f.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Booking form / Final CTA ---------------- */

function BookingCTA() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <section id="book" className="relative py-24 md:py-32 overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10" style={{ background: "var(--gradient-luxe)" }} />
      <div aria-hidden className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-30 -z-10"
        style={{ background: "radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)", filter: "blur(80px)" }} />

      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader
              eyebrow="Begin Your Journey"
              title="Start Your Skin Transformation Today"
              subtitle="Book your personalized consultation with our experienced aesthetic specialists."
              center={false}
            />
            <div className="mt-8 flex flex-wrap gap-4">
              <GoldButton href="#book">Book Appointment</GoldButton>
              <GoldButton href="#contact" variant="ghost">Contact Clinic</GoldButton>
            </div>
            <div className="mt-10 space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-primary" /> +91 6361492452</div>
              <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-primary" /> official@mavrostech.in</div>
              <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-primary" /> Bangalore, Karnataka</div>
            </div>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            className="glass rounded-[2rem] p-8 md:p-10 luxe-shadow"
          >
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-14 h-14 rounded-full mx-auto grid place-items-center mb-4" style={{ background: "var(--gradient-gold)" }}>
                  <Check className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-serif text-2xl">Thank you</h3>
                <p className="mt-2 text-sm text-muted-foreground">We'll be in touch within 24 hours to confirm your consultation.</p>
              </div>
            ) : (
              <>
                <div className="text-xs tracking-[0.3em] uppercase text-primary mb-2">Online Booking</div>
                <h3 className="font-serif text-2xl md:text-3xl">Reserve Your Consultation</h3>
                <div className="mt-6 grid sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-xs text-muted-foreground">Full Name</span>
                    <input required type="text" name="name" className="mt-1 w-full h-11 px-4 rounded-xl bg-background/60 border border-border focus:border-primary focus:outline-none text-sm" />
                  </label>
                  <label className="block">
                    <span className="text-xs text-muted-foreground">Phone</span>
                    <input required type="tel" name="phone" className="mt-1 w-full h-11 px-4 rounded-xl bg-background/60 border border-border focus:border-primary focus:outline-none text-sm" />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="text-xs text-muted-foreground">Email</span>
                    <input required type="email" name="email" className="mt-1 w-full h-11 px-4 rounded-xl bg-background/60 border border-border focus:border-primary focus:outline-none text-sm" />
                  </label>
                  <label className="block">
                    <span className="text-xs text-muted-foreground">Preferred Date</span>
                    <input required type="date" name="date" className="mt-1 w-full h-11 px-4 rounded-xl bg-background/60 border border-border focus:border-primary focus:outline-none text-sm" />
                  </label>
                  <label className="block">
                    <span className="text-xs text-muted-foreground">Preferred Time</span>
                    <input required type="time" name="time" className="mt-1 w-full h-11 px-4 rounded-xl bg-background/60 border border-border focus:border-primary focus:outline-none text-sm" />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="text-xs text-muted-foreground">Treatment of Interest</span>
                    <select name="treatment" className="mt-1 w-full h-11 px-4 rounded-xl bg-background/60 border border-border focus:border-primary focus:outline-none text-sm">
                      <option>Not sure — recommend for me</option>
                      {TREATMENTS.slice(0, 10).map((t) => <option key={t.name}>{t.name}</option>)}
                    </select>
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="text-xs text-muted-foreground">Message (optional)</span>
                    <textarea name="message" rows={3} className="mt-1 w-full px-4 py-3 rounded-xl bg-background/60 border border-border focus:border-primary focus:outline-none text-sm resize-none" />
                  </label>
                </div>
                <button type="submit" className="mt-6 w-full h-12 rounded-full text-primary-foreground font-medium tracking-wide gold-hover" style={{ background: "var(--gradient-gold)" }}>
                  Request Consultation
                </button>
              </>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */

function Footer() {
  return (
    <footer id="contact" className="relative border-t border-border/60 bg-accent/30 pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full grid place-items-center" style={{ background: "var(--gradient-gold)" }}>
                <Flower2 className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-serif text-lg">Lumière</div>
                <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground -mt-0.5">Aesthetics</div>
              </div>
            </div>
            <p className="mt-5 text-sm text-muted-foreground leading-relaxed max-w-xs">
              Advanced dermatology and aesthetic medicine in a serene, luxurious environment.
            </p>
            <div className="mt-6 flex gap-3">
              {[Camera, Heart, MessageCircle].map((Icon, i) => (
                <a key={i} href="#" aria-label="Social media" className="w-9 h-9 rounded-full grid place-items-center glass hover:text-primary transition">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs tracking-[0.2em] uppercase text-primary">Quick Links</div>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              {["Treatments", "About", "Gallery", "FAQ", "Contact"].map((l) => (
                <li key={l}><a href={`#${l.toLowerCase()}`} className="hover:text-primary transition">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs tracking-[0.2em] uppercase text-primary">Location</div>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-2"><MapPin className="w-4 h-4 shrink-0 text-primary mt-0.5" /> Bangalore, Karnataka</li>
              <li className="flex gap-2"><Phone className="w-4 h-4 shrink-0 text-primary mt-0.5" /> +91 6361492452</li>
              <li className="flex gap-2"><Mail className="w-4 h-4 shrink-0 text-primary mt-0.5" /> official@mavrostech.in</li>
            </ul>
          </div>

          <div>
            <div className="text-xs tracking-[0.2em] uppercase text-primary">Opening Hours</div>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li className="flex justify-between"><span>Mon – Fri</span> <span className="text-foreground">10:00 – 20:00</span></li>
              <li className="flex justify-between"><span>Saturday</span> <span className="text-foreground">10:00 – 18:00</span></li>
              <li className="flex justify-between"><span>Sunday</span> <span className="text-foreground">Closed</span></li>
            </ul>
            <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="w-3.5 h-3.5 text-primary" /> By appointment only
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/60 flex flex-col sm:flex-row justify-between gap-3 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Lumière Aesthetics Clinic. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary">Privacy</a>
            <a href="#" className="hover:text-primary">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Floating actions ---------------- */

function FloatingButtons() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.a
            href="#book"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-6 z-40 hidden md:inline-flex items-center gap-2 px-5 py-3 rounded-full text-primary-foreground text-sm font-medium luxe-shadow gold-hover"
            style={{ background: "var(--gradient-gold)" }}
          >
            <Calendar className="w-4 h-4" /> Book Consultation
          </motion.a>
        )}
      </AnimatePresence>

      <a
        href="https://wa.me/916361492452"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white grid place-items-center shadow-[0_10px_30px_-10px_rgba(37,211,102,0.6)] hover:scale-110 transition-transform"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </>
  );
}

/* ---------------- Loading screen ---------------- */

function Loader() {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGone(true), 1200);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-background"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="w-14 h-14 rounded-full grid place-items-center animate-pulse" style={{ background: "var(--gradient-gold)" }}>
              <Flower2 className="w-6 h-6 text-white" />
            </div>
            <div className="font-serif text-2xl tracking-tight">Lumière</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------- Page ---------------- */

function LumierePage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Loader />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Treatments />
        <WhyChoose />
        <Gallery />
        <Testimonials />
        <Process />
        <Specialists />
        <Pricing />
        <FAQ />
        <BookingCTA />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
