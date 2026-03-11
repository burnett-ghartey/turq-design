import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import SelectedWorks from '../components/SelectedWorks';
import Services from '../components/Services';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const marqueeRef = useRef(null);

  // Parallax scroll values
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const process = [
    {
      num: '01',
      title: 'Discover',
      desc: 'We start by understanding your brand, goals, audience, and challenges. This phase sets the strategic foundation for everything that follows.'
    },
    {
      num: '02',
      title: 'Define',
      desc: 'We translate insights into clear concepts, visual directions, and brand frameworks aligned with your objectives.'
    },
    {
      num: '03',
      title: 'Design',
      desc: 'We craft refined visuals, layouts, and systems that bring the brand to life across digital and physical touchpoints.'
    },
    {
      num: '04',
      title: 'Deliver',
      desc: 'We finalize, refine, and prepare everything for real-world use — ensuring consistency, clarity, and impact.'
    }
  ];

  const whyTurq = [
    'Strategy-driven design',
    'Clean, modern visual language',
    'Attention to detail',
    'Collaborative process',
    'Scalable brand systems'
  ];

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // Horizontal marquee animation
      if (marqueeRef.current) {
        gsap.to('.marquee-track', {
          xPercent: -50,
          ease: 'none',
          duration: 20,
          repeat: -1,
        });
      }

      // Scroll-triggered text reveals
      gsap.utils.toArray('.reveal-text').forEach((text) => {
        gsap.from(text, {
          y: 100,
          opacity: 0,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: text,
            start: 'top 85%',
            once: true
          }
        });
      });

      // Parallax images
      gsap.utils.toArray('.parallax-img').forEach((img) => {
        gsap.to(img, {
          yPercent: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        });
      });

      // Horizontal scroll reveal for service cards
      gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.from(card, {
          x: i % 2 === 0 ? -100 : 100,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true
          }
        });
      });

      // Scale reveal for section headers
      gsap.utils.toArray('.scale-reveal').forEach((el) => {
        gsap.from(el, {
          scale: 0.8,
          opacity: 0,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            once: true
          }
        });
      });

    }, heroRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Head>
        <title>Turq Design - We Design Brands People Remember</title>
        <meta name="description" content="Turq Design is a creative studio crafting bold brand identities, digital experiences, and visual systems that help businesses stand out and scale." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-[#f1f2de] text-[#0a0a0a] overflow-x-hidden" ref={heroRef}>
        {/* Header */}
        <motion.header
          className={`fixed top-0 z-50 transition-all duration-300 border-b border-[#0a0a0a]/5 ${mobileMenuOpen ? 'left-4 right-4 top-4 rounded-2xl bg-[#f1f2de] border' : 'left-0 right-0 bg-[#f1f2de]'}`}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 xl:px-20">
            <div className="flex items-center justify-between py-2 md:py-3">

              {/* Logo */}
              <motion.a
                href="/"
                className="block"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <img
                  src="/Logo_default_dark_full.png"
                  alt="Turq Design"
                  className="w-[120px] h-[120px] md:w-[100px] md:h-[100px] object-contain"
                />
              </motion.a>

              {/* Navigation */}
              <nav className="hidden lg:flex items-center gap-12">
                {[
                  { href: '#work', label: 'Work' },
                  { href: '#services', label: 'Services' },
                  { href: '#process', label: 'Process' },
                  { href: '#about', label: 'About' },
                  { href: '#contact', label: 'Contact' }
                ].map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className="relative py-3 px-2 text-[12px] font-normal tracking-[0.15em] uppercase text-[#0a0a0a] group"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                  >
                    <span className="relative z-10 group-hover:text-[#20807e] transition-colors duration-200">
                      {item.label}
                    </span>
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f9d412] group-hover:w-full transition-all duration-300 ease-out"></div>
                  </motion.a>
                ))}
              </nav>

              {/* Mobile Menu Button */}
              <button
                className="lg:!hidden p-3 text-[#0a0a0a] shadow-none drop-shadow-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {mobileMenuOpen ? (
                    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                  ) : (
                    <path d="M3 6h18M3 12h18M3 18h18" />
                  )}
                </svg>
              </button>
            </div>

            {/* Mobile Menu Panel */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.nav
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="lg:hidden overflow-hidden"
                >
                  <div className="flex flex-col gap-1 pb-6 pt-2">
                    {[
                      { href: '#work', label: 'Work' },
                      { href: '#services', label: 'Services' },
                      { href: '#process', label: 'Process' },
                      { href: '#about', label: 'About' },
                      { href: '#contact', label: 'Contact' }
                    ].map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="text-[32px] font-normal tracking-[0.1em] uppercase text-[#0a0a0a] py-3 px-2 hover:text-[#20807e] transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </motion.nav>
              )}
            </AnimatePresence>
          </div>
        </motion.header>

        {/* Hero Section */}
        <section className="relative min-h-screen overflow-hidden">
          <motion.div
            className="w-full pt-32 pb-20"
            style={{ y: heroY, opacity: heroOpacity }}
          >
            <div className="max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 xl:px-20">

              {/* Asymmetric Grid Layout */}
              <div className="grid grid-cols-12 gap-4 md:gap-6 items-end min-h-[70vh]">

                {/* Left Column - Tagline */}
                <motion.div
                  className="col-span-12 lg:col-span-2 lg:self-center"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="lg:-rotate-90 lg:origin-center lg:whitespace-nowrap">
                    <span className="text-[12px] font-normal tracking-[0.3em] uppercase text-[#20807e]">
                      Creative Studio — 2024
                    </span>
                  </div>
                </motion.div>

                {/* Center - Main Headlines */}
                <div className="col-span-12 lg:col-span-8">
                  <div className="space-y-2 md:space-y-4">
                    <div className="overflow-hidden pb-1">
                      <motion.h1
                        className="text-[31px] md:text-[3rem] lg:text-[4rem] font-semibold leading-[1.15] tracking-[-0.02em]"
                        initial={{ y: 200, skewY: 7 }}
                        animate={{ y: 0, skewY: 0 }}
                        transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        We design
                      </motion.h1>
                    </div>

                    <div className="overflow-hidden">
                      <motion.h1
                        className="text-[31px] md:text-[3rem] lg:text-[4rem] font-semibold leading-[1.15] tracking-[-0.02em]"
                        initial={{ y: 200, skewY: 7 }}
                        animate={{ y: 0, skewY: 0 }}
                        transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        brands <span className="italic font-bold text-[#23807a]">people</span>
                      </motion.h1>
                    </div>

                    <div className="overflow-hidden flex items-baseline gap-4">
                      <motion.h1
                        className="text-[31px] md:text-[3rem] lg:text-[4rem] font-semibold leading-[1.15] tracking-[-0.02em]"
                        initial={{ y: 200, skewY: 7 }}
                        animate={{ y: 0, skewY: 0 }}
                        transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      >
                        remember<span className="text-[#f9d412]">.</span>
                      </motion.h1>
                      <motion.span
                        className="text-[16px] md:text-[32px] font-medium text-[#20807e] hidden md:inline"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                      >
                        ●
                      </motion.span>
                    </div>
                  </div>

                  {/* Sub-headline */}
                  <motion.p
                    className="text-[14px] md:text-[18px] text-[#0a0a0a]/60 max-w-2xl mt-8 leading-relaxed"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                  >
                    Turq Design is a creative studio crafting bold brand identities, digital experiences, and visual systems that help businesses stand out and scale.
                  </motion.p>

                  {/* CTAs */}
                  <motion.div
                    className="flex flex-col md:flex-row flex-wrap gap-4 mt-10"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1 }}
                  >
                    <motion.a
                      href="#work"
                      className="inline-flex items-center justify-center gap-3 bg-[#23807a] text-white rounded-full font-medium text-[14px] tracking-wider capitalize w-full md:w-auto px-8 py-4 group"
                      whileHover={{ scale: 1.05, backgroundColor: '#1a6b65' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      View Our Work
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:translate-x-1 transition-transform">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.a>
                    <motion.a
                      href="#contact"
                      className="inline-flex items-center justify-center gap-3 border-2 border-[#0a0a0a] text-[#0a0a0a] rounded-full font-medium text-[14px] tracking-wider capitalize w-full md:w-auto px-8 py-4 group hover:bg-[#0a0a0a] hover:text-white transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Start a Project
                    </motion.a>
                  </motion.div>
                </div>


              </div>

            </div>
          </motion.div>

        </section>

        {/* Marquee Section */}
        <section className="py-6 md:py-8 lg:py-10 bg-[#0a0a0a] overflow-hidden" ref={marqueeRef}>
          <div className="marquee-track flex whitespace-nowrap">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-8 px-8">
                <span className="text-[36px] md:text-[60px] font-semibold text-white/10 uppercase tracking-tight">Branding</span>
                <span className="text-[#f9d412]">✦</span>
                <span className="text-[36px] md:text-[60px] font-semibold text-white/10 uppercase tracking-tight">Digital</span>
                <span className="text-[#20807e]">✦</span>
                <span className="text-[36px] md:text-[60px] font-semibold text-white/10 uppercase tracking-tight">Strategy</span>
                <span className="text-[#f9d412]">✦</span>
                <span className="text-[36px] md:text-[60px] font-semibold text-white/10 uppercase tracking-tight">Identity</span>
                <span className="text-[#20807e]">✦</span>
              </div>
            ))}
          </div>
        </section>

        {/* About Intro Section */}
        <section className="py-24 md:py-32 lg:py-40">
          <div className="max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 xl:px-20">
            <div className="grid grid-cols-12 gap-4 md:gap-8">
              <div className="col-span-12 lg:col-span-10 lg:col-start-2">
                <motion.p
                  className="text-[24px] md:text-[32px] lg:text-[40px] text-[#0a0a0a]/80 max-w-4xl leading-snug font-light tracking-[-0.01em]"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  Turq Design is a branding and creative studio focused on building meaningful visual identities and digital experiences. We help startups, businesses, and organizations express who they are through design that is <span className="font-bold text-[#20807e]">clear, intentional, and memorable</span>.
                </motion.p>
              </div>
            </div>
          </div>
        </section>

        {/* Selected Works */}
        <SelectedWorks />

        {/* Services Section */}
        <Services />

        {/* Process Section */}
        <section id="process" className="py-24 md:py-32 lg:py-40 bg-[#fafafa]">
          <div className="max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 xl:px-20">

            {/* Section Header */}
            <div className="grid grid-cols-12 gap-4 md:gap-8 mb-20 md:mb-28">
              <motion.div
                className="col-span-12 md:col-span-8"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <span className="text-[12px] font-normal tracking-[0.3em] uppercase text-[#20807e] mb-4 block">
                  Our Approach
                </span>
                <h2 className="text-[25px] md:text-[39px] font-medium leading-[1.15]">
                  How We Work
                </h2>
              </motion.div>
            </div>

            {/* Process Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((step, i) => (
                <motion.div
                  key={i}
                  className="relative"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.15 }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <div className="mb-6">
                    <span className="text-[60px] md:text-[96px] font-bold text-[#0a0a0a]/5">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="text-[20px] md:text-[24px] font-light mb-4 text-[#20807e]">
                    {step.title}
                  </h3>
                  <p className="text-[14px] md:text-[16px] text-[#0a0a0a]/60 leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* Why Turq Design Section */}
        <section id="why" className="py-24 md:py-32 lg:py-40">
          <div className="max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 xl:px-20">
            <div className="grid grid-cols-12 gap-8 md:gap-12">

              {/* Left Column */}
              <motion.div
                className="col-span-12 lg:col-span-5"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <span className="text-[12px] font-normal tracking-[0.3em] uppercase text-[#20807e] mb-4 block">
                  Why Choose Us
                </span>
                <h2 className="text-[25px] md:text-[39px] font-medium leading-[1.15] mb-6">
                  Why Turq Design
                </h2>
                <p className="text-[14px] md:text-[16px] text-[#0a0a0a]/60 leading-relaxed">
                  We've collaborated with startups, businesses, and organizations across various industries to build brands that connect and perform.
                </p>
              </motion.div>

              {/* Right Column - Features */}
              <motion.div
                className="col-span-12 lg:col-span-6 lg:col-start-7"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <ul className="space-y-4">
                  {whyTurq.map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-center gap-4 py-4 border-b border-[#0a0a0a]/10"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <span className="w-3 h-3 bg-[#20807e] rounded-full flex-shrink-0"></span>
                      <span className="text-[18px] md:text-[20px] font-medium">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 md:py-32 lg:py-40 bg-[#20807e] text-white reveal-section">
          <div className="max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 xl:px-20">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="text-[12px] uppercase tracking-[0.3em] text-[#f9d412] font-normal mb-4">
                  About Us
                </div>
                {/* <h2 className="text-[36px] md:text-[48px] lg:text-[60px] font-bold leading-[1.1] mb-6">
                  Turq Design
                </h2> */}
                <p className="text-[18px] text-white/90 leading-relaxed mb-6">
                  Turq Design is a multidisciplinary creative studio specializing in branding, visual identity, and digital design.
                </p>
                <p className="text-[18px] text-white/70 leading-relaxed">
                  We believe great design is more than aesthetics — it's about clarity, consistency, and connection. Our approach blends strategy, creativity, and execution to create brand systems that work across every touchpoint.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <p className="text-[24px] md:text-[26px] leading-relaxed text-white font-light mb-6">
                  From early-stage startups to established brands, we partner closely with our clients to translate ideas into
                  <span className="font-bold text-[#f9d412]"> compelling visual stories</span> that resonate and endure.
                </p>

                {/* Testimonial */}
                <div className="mt-12 p-6 bg-white/10 rounded-2xl">
                  <svg className="w-8 h-8 text-[#f9d412] mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                  <p className="text-[16px] text-white/90 italic leading-relaxed mb-4">
                    "Turq Design delivered a brand identity that perfectly captured our vision. The process was smooth, collaborative, and highly professional."
                  </p>
                  <p className="text-[14px] text-white/50">— Happy Client</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-20 lg:py-24 bg-white">
          <div className="max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 xl:px-20">
            <div className="grid grid-cols-12 gap-4 md:gap-8">
              <div className="col-span-12 text-center">
                <div className="mb-12">
                  <h2 className="reveal-text text-[25px] md:text-[39px] font-medium leading-[1.15]">
                    Let's build something <span className="italic font-bold text-[#20807e]">meaningful</span>
                  </h2>
                </div>

                <motion.p
                  className="text-[14px] md:text-[18px] text-[#0a0a0a]/60 mb-12 max-w-xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  Have a project in mind or want to explore working together? Get in touch and let's talk about how we can bring your ideas to life.
                </motion.p>

                <motion.div
                  className="flex flex-col md:flex-row flex-wrap justify-center gap-4 mt-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <motion.a
                    href="mailto:hello@turqdesign.com"
                    className="magnetic-btn inline-flex items-center justify-center gap-4 bg-[#20807e] text-white rounded-full font-[500] text-[14px] md:text-[14px] capitalize tracking-wider md:tracking-widest w-full md:w-auto px-10 md:px-14 py-5 md:py-6 group"
                    whileHover={{ scale: 1.05, backgroundColor: '#1a6b69' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Start a Project
                    <motion.span
                      className="inline-block"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.a>
                  <motion.a
                    href="mailto:hello@turqdesign.com"
                    className="inline-flex items-center justify-center gap-4 border-2 border-[#0a0a0a] text-[#0a0a0a] rounded-full font-[500] text-[14px] md:text-[14px] capitalize tracking-wider md:tracking-widest w-full md:w-auto px-10 md:px-14 py-5 md:py-6 hover:bg-[#0a0a0a] hover:text-white transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Contact Us
                  </motion.a>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 md:py-16 lg:py-20 bg-[#23807a] text-white">
          <div className="max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 xl:px-20">
            <div className="grid grid-cols-12 gap-8 md:gap-12 items-end">

              {/* Logo & Tagline */}
              <div className="col-span-12 md:col-span-4 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                  <img src="/Logo_mark_light.png" alt="Turq Design Logo" className="w-[120px] h-[120px] md:w-[120px] md:h-[100px] object-contain" />
                  {/* <div className="text-[20px] font-semibold tracking-tight">TURQ DESIGN</div> */}
                </div>
                <p className="text-[14px] text-white/40 max-w-xs mx-auto md:mx-0">
                  Design with purpose. Built to last.
                </p>
              </div>

              {/* Social Links */}
              <div className="col-span-12 md:col-span-4">
                <div className="flex flex-wrap gap-6 justify-center md:justify-center">
                  {['Instagram', 'LinkedIn', 'Dribbble', 'Behance'].map((social) => (
                    <motion.a
                      key={social}
                      href="#"
                      className="text-[12px] text-white/60 font-normal uppercase tracking-wide hover:text-[#f9d412] transition-colors duration-300"
                      whileHover={{ y: -2 }}
                    >
                      {social}
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Copyright */}
              <div className="col-span-12 md:col-span-4 text-center md:text-right">
                <p className="text-[12px] text-white/30 uppercase tracking-wide">
                  © 2024 Turq Design. All rights reserved.
                </p>
              </div>

            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
