import { useEffect, useRef } from 'react';
import Head from 'next/head';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { motion, useScroll, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import SelectedWorks from '../components/SelectedWorks';
import Services from '../components/Services';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
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
          className="fixed w-full top-0 z-50 bg-[#f1f2de]/90 backdrop-blur-sm border-b border-[#0a0a0a]/5"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 xl:px-20">
            <div className="flex items-center justify-between py-6">

              {/* Logo */}
              <motion.a
                href="/"
                className="block"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <img
                  src="/Logo_default_light.png"
                  alt="Turq Design"
                  className="w-16 h-16 md:w-20 md:h-20 object-contain"
                />
              </motion.a>

              {/* Navigation */}
              <nav className="hidden md:flex items-center gap-12">
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
                    className="relative py-3 px-2 text-base font-medium text-[#0a0a0a] group"
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

              {/* Mobile Menu */}
              <motion.button
                className="md:hidden p-3 text-[#0a0a0a]"
                whileTap={{ scale: 0.95 }}
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18M3 12h18M3 18h18"/>
                </svg>
              </motion.button>
            </div>
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
                    <span className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-[#20807e]">
                      Creative Studio — 2024
                    </span>
                  </div>
                </motion.div>

                {/* Center - Main Headlines */}
                <div className="col-span-12 lg:col-span-8">
                  <div className="space-y-2 md:space-y-4">
                    <div className="overflow-hidden">
                      <motion.h1
                        className="text-[clamp(2.5rem,10vw,7rem)] font-black leading-[0.9] tracking-[-0.04em]"
                        initial={{ y: 200, skewY: 7 }}
                        animate={{ y: 0, skewY: 0 }}
                        transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        We design
                      </motion.h1>
                    </div>

                    <div className="overflow-hidden">
                      <motion.h1
                        className="text-[clamp(2.5rem,10vw,7rem)] font-black leading-[0.9] tracking-[-0.04em]"
                        initial={{ y: 200, skewY: 7 }}
                        animate={{ y: 0, skewY: 0 }}
                        transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        brands <span className="italic font-light text-[#20807e]">people</span>
                      </motion.h1>
                    </div>

                    <div className="overflow-hidden flex items-baseline gap-4">
                      <motion.h1
                        className="text-[clamp(2.5rem,10vw,7rem)] font-black leading-[0.9] tracking-[-0.04em]"
                        initial={{ y: 200, skewY: 7 }}
                        animate={{ y: 0, skewY: 0 }}
                        transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      >
                        remember<span className="text-[#f9d412]">.</span>
                      </motion.h1>
                      <motion.span
                        className="text-[clamp(1rem,3vw,2rem)] font-medium text-[#20807e] hidden md:inline"
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
                    className="text-lg md:text-xl text-[#0a0a0a]/60 max-w-2xl mt-8 leading-relaxed"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                  >
                    Turq Design is a creative studio crafting bold brand identities, digital experiences, and visual systems that help businesses stand out and scale.
                  </motion.p>

                  {/* CTAs */}
                  <motion.div
                    className="flex flex-wrap gap-4 mt-10"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1 }}
                  >
                    <motion.a
                      href="#work"
                      className="inline-flex items-center gap-3 bg-[#0a0a0a] text-white rounded-full font-semibold text-sm px-8 py-4 group"
                      whileHover={{ scale: 1.05, backgroundColor: '#20807e' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      View Our Work
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:translate-x-1 transition-transform">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.a>
                    <motion.a
                      href="#contact"
                      className="inline-flex items-center gap-3 border-2 border-[#0a0a0a] text-[#0a0a0a] rounded-full font-semibold text-sm px-8 py-4 group hover:bg-[#0a0a0a] hover:text-white transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Start a Project
                    </motion.a>
                  </motion.div>
                </div>

                {/* Right Column - Scroll CTA */}
                <motion.div
                  className="col-span-12 lg:col-span-2 flex flex-col justify-end items-end"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.a
                    href="#work"
                    className="magnetic-btn group relative w-14 h-14 md:w-16 md:h-16 bg-[#0a0a0a] rounded-full flex items-center justify-center hover:bg-[#20807e] transition-colors duration-500"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-white rotate-90">
                      <path d="M10 3v14M3 10l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.a>
                </motion.div>

              </div>

            </div>
          </motion.div>

          {/* Scroll Progress Line */}
          <motion.div
            className="absolute left-8 md:left-12 lg:left-16 xl:left-20 top-1/2 -translate-y-1/2 w-px h-32 bg-[#0a0a0a]/10"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <motion.div
              className="w-full bg-[#20807e] origin-top"
              style={{ height: '100%', scaleY: scrollYProgress }}
            />
          </motion.div>
        </section>

        {/* Marquee Section */}
        <section className="py-6 md:py-8 lg:py-10 bg-[#0a0a0a] overflow-hidden" ref={marqueeRef}>
          <div className="marquee-track flex whitespace-nowrap">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-8 px-8">
                <span className="text-4xl md:text-6xl font-black text-white/10 uppercase tracking-tight">Branding</span>
                <span className="text-[#f9d412]">✦</span>
                <span className="text-4xl md:text-6xl font-black text-white/10 uppercase tracking-tight">Digital</span>
                <span className="text-[#20807e]">✦</span>
                <span className="text-4xl md:text-6xl font-black text-white/10 uppercase tracking-tight">Strategy</span>
                <span className="text-[#f9d412]">✦</span>
                <span className="text-4xl md:text-6xl font-black text-white/10 uppercase tracking-tight">Identity</span>
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
                  className="reveal-text text-xl md:text-2xl lg:text-3xl text-[#0a0a0a]/80 max-w-4xl leading-relaxed font-light"
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
                <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#0a0a0a]/40 mb-4 block">
                  Our Approach
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.04em] leading-[0.9]">
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
                    <span className="text-6xl md:text-7xl font-black text-[#0a0a0a]/5">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-4 text-[#20807e]">
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-base text-[#0a0a0a]/60 leading-relaxed">
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
                <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#0a0a0a]/40 mb-4 block">
                  Why Choose Us
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.04em] leading-[0.9] mb-6">
                  Why Turq Design
                </h2>
                <p className="text-base md:text-lg text-[#0a0a0a]/60 leading-relaxed">
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
                      <span className="text-lg md:text-xl font-medium">{item}</span>
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
                <div className="text-xs uppercase tracking-wider text-[#f9d412] font-bold mb-4">
                  About Us
                </div>
                <h2 className="text-4xl lg:text-5xl font-black leading-tight tracking-tighter mb-6">
                  Turq Design
                </h2>
                <p className="text-lg text-white/90 leading-relaxed mb-6">
                  Turq Design is a multidisciplinary creative studio specializing in branding, visual identity, and digital design.
                </p>
                <p className="text-base text-white/70 leading-relaxed">
                  We believe great design is more than aesthetics — it's about clarity, consistency, and connection. Our approach blends strategy, creativity, and execution to create brand systems that work across every touchpoint.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <p className="text-xl md:text-2xl leading-relaxed text-white font-light mb-6">
                  From early-stage startups to established brands, we partner closely with our clients to translate ideas into
                  <span className="font-black text-[#f9d412]"> compelling visual stories</span> that resonate and endure.
                </p>

                {/* Testimonial */}
                <div className="mt-12 p-6 bg-white/10 rounded-2xl">
                  <svg className="w-8 h-8 text-[#f9d412] mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                  <p className="text-base text-white/90 italic leading-relaxed mb-4">
                    "Turq Design delivered a brand identity that perfectly captured our vision. The process was smooth, collaborative, and highly professional."
                  </p>
                  <p className="text-sm text-white/50">— Happy Client</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 md:py-32 lg:py-40 bg-white">
          <div className="max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 xl:px-20">
            <div className="grid grid-cols-12 gap-4 md:gap-8">
              <div className="col-span-12 text-center">
                <div className="overflow-hidden mb-4">
                  <motion.h2
                    className="scale-reveal text-4xl md:text-6xl lg:text-[8rem] font-black leading-[0.85] tracking-[-0.04em]"
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                  >
                    Let's build
                  </motion.h2>
                </div>
                <div className="overflow-hidden mb-4">
                  <motion.h2
                    className="scale-reveal text-4xl md:text-6xl lg:text-[8rem] font-black leading-[0.85] tracking-[-0.04em]"
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                  >
                    something
                  </motion.h2>
                </div>
                <div className="overflow-hidden mb-12">
                  <motion.h2
                    className="scale-reveal text-4xl md:text-6xl lg:text-[8rem] font-black leading-[0.85] tracking-[-0.04em]"
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                  >
                    <span className="italic font-light text-[#20807e]">meaningful</span>
                  </motion.h2>
                </div>

                <motion.p
                  className="text-lg md:text-xl text-[#0a0a0a]/60 mb-12 max-w-xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  Have a project in mind or want to explore working together? Get in touch and let's talk about how we can bring your ideas to life.
                </motion.p>

                <motion.div
                  className="flex flex-wrap justify-center gap-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <motion.a
                    href="mailto:hello@turqdesign.com"
                    className="magnetic-btn inline-flex items-center gap-4 bg-[#0a0a0a] text-white rounded-full font-bold text-sm md:text-base uppercase tracking-[0.2em] px-10 md:px-14 py-5 md:py-6 group"
                    whileHover={{ scale: 1.05, backgroundColor: '#20807e' }}
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
                    className="inline-flex items-center gap-4 border-2 border-[#0a0a0a] text-[#0a0a0a] rounded-full font-bold text-sm md:text-base uppercase tracking-[0.2em] px-10 md:px-14 py-5 md:py-6 hover:bg-[#0a0a0a] hover:text-white transition-colors duration-300"
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
        <footer className="py-12 md:py-16 lg:py-20 bg-[#0a0a0a] text-white">
          <div className="max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 xl:px-20">
            <div className="grid grid-cols-12 gap-8 md:gap-12 items-end">

              {/* Logo & Tagline */}
              <div className="col-span-12 md:col-span-4">
                <div className="flex items-center gap-3 mb-4">
                  <img src="/Logo_default_dark.png" alt="Turq Design Logo" className="w-10 h-10 object-contain brightness-0 invert" />
                  <div className="text-xl font-black tracking-tight">TURQ DESIGN</div>
                </div>
                <p className="text-sm text-white/40 max-w-xs">
                  Design with purpose. Built to last.
                </p>
              </div>

              {/* Social Links */}
              <div className="col-span-12 md:col-span-4">
                <div className="flex flex-wrap gap-6 md:justify-center">
                  {['Instagram', 'LinkedIn', 'Dribbble', 'Behance'].map((social) => (
                    <motion.a
                      key={social}
                      href="#"
                      className="text-sm text-white/60 font-medium uppercase tracking-wider hover:text-[#f9d412] transition-colors duration-300"
                      whileHover={{ y: -2 }}
                    >
                      {social}
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Copyright */}
              <div className="col-span-12 md:col-span-4 md:text-right">
                <p className="text-xs text-white/30 uppercase tracking-wider">
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
