import { useEffect, useRef } from 'react';
import Head from 'next/head';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import SelectedWorks from '../components/SelectedWorks';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const marqueeRef = useRef(null);


  const servicesInView = useInView(servicesRef, { once: true, margin: "-100px" });
  const aboutInView = useInView(aboutRef, { once: true, margin: "-100px" });
  const contactInView = useInView(contactRef, { once: true, margin: "-100px" });

  // Parallax scroll values
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);


  const services = [
    {
      num: '01',
      title: 'Logo package',
      desc: 'Complete brand identity systems including primary logo variations, typography guidelines, and comprehensive brand standards documentation.'
    },
    {
      num: '02',
      title: 'Visual identity package',
      desc: 'Cohesive visual language extending across all brand touchpoints, from digital interfaces to print materials and environmental graphics.'
    },
    {
      num: '03',
      title: 'Tailored package',
      desc: 'Custom design solutions crafted specifically for your unique business requirements, combining strategic thinking with exceptional execution.'
    }
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
        <title>Turq Design - Human Design for Remarkable People</title>
        <meta name="description" content="Award-winning design studio creating exceptional digital experiences for remarkable brands" />
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
                      Design Studio — 2024
                    </span>
                  </div>
                </motion.div>

                {/* Center - Main Headlines */}
                <div className="col-span-12 lg:col-span-8">
                  <div className="space-y-2 md:space-y-4">
                    <div className="overflow-hidden">
                      <motion.h1
                        className="text-[clamp(3rem,12vw,9rem)] font-black leading-[0.85] tracking-[-0.04em]"
                        initial={{ y: 200, skewY: 7 }}
                        animate={{ y: 0, skewY: 0 }}
                        transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        Human
                      </motion.h1>
                    </div>

                    <div className="overflow-hidden flex items-baseline gap-4">
                      <motion.h1
                        className="text-[clamp(3rem,12vw,9rem)] font-black leading-[0.85] tracking-[-0.04em]"
                        initial={{ y: 200, skewY: 7 }}
                        animate={{ y: 0, skewY: 0 }}
                        transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        design
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

                    <div className="overflow-hidden">
                      <motion.h1
                        className="text-[clamp(3rem,12vw,9rem)] font-black leading-[0.85] tracking-[-0.04em]"
                        initial={{ y: 200, skewY: 7 }}
                        animate={{ y: 0, skewY: 0 }}
                        transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      >
                        for <span className="italic font-light text-[#20807e]">remarkable</span>
                      </motion.h1>
                    </div>

                    <div className="overflow-hidden">
                      <motion.h1
                        className="text-[clamp(3rem,12vw,9rem)] font-black leading-[0.85] tracking-[-0.04em]"
                        initial={{ y: 200, skewY: 7 }}
                        animate={{ y: 0, skewY: 0 }}
                        transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      >
                        people<span className="text-[#f9d412]">.</span>
                      </motion.h1>
                    </div>
                  </div>
                </div>

                {/* Right Column - Description & CTA */}
                <motion.div
                  className="col-span-12 lg:col-span-2 flex flex-col justify-end"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-sm md:text-base text-[#0a0a0a]/60 leading-relaxed mb-8 max-w-[200px]">
                    Creating exceptional digital experiences through thoughtful design.
                  </p>

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

        {/* Let's embark section */}
        <section className="py-24 md:py-32 lg:py-40">
          <div className="max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 xl:px-20">
            <div className="grid grid-cols-12 gap-4 md:gap-8">
              <div className="col-span-12 lg:col-span-10 lg:col-start-2">
                <div className="overflow-hidden mb-8">
                  <h2 className="reveal-text text-4xl md:text-6xl lg:text-8xl font-black tracking-[-0.04em] leading-[0.9]">
                    Let's embark on a
                  </h2>
                </div>
                <div className="overflow-hidden mb-12">
                  <h2 className="reveal-text text-4xl md:text-6xl lg:text-8xl font-black tracking-[-0.04em] leading-[0.9]">
                    <span className="italic font-light">creative</span> journey
                  </h2>
                </div>
                <motion.p
                  className="reveal-text text-lg md:text-xl text-[#0a0a0a]/60 max-w-2xl leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  Every great project begins with understanding. We dive deep into your vision,
                  challenges, and goals to create solutions that exceed expectations.
                </motion.p>
              </div>
            </div>
          </div>
        </section>

        {/* Selected Works - Minimal Card Design */}
        <SelectedWorks />

        {/* Popular Packages */}
        <section id="services" className="py-24 md:py-32 lg:py-40" ref={servicesRef}>
          <div className="max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 xl:px-20">

            {/* Section Header */}
            <div className="grid grid-cols-12 gap-4 md:gap-8 mb-20 md:mb-28">
              <motion.div
                className="col-span-12 md:col-span-8"
                initial={{ opacity: 0, y: 40 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1 }}
              >
                <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#0a0a0a]/40 mb-4 block">
                  Services
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.04em] leading-[0.9]">
                  Popular packages
                </h2>
              </motion.div>
            </div>

            {/* Services List */}
            <div className="border-t border-[#0a0a0a]/10">
              {services.map((service, i) => (
                <motion.div
                  key={i}
                  className="service-card group border-b border-[#0a0a0a]/10"
                  initial={{ opacity: 0, y: 30 }}
                  animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: i * 0.15 }}
                >
                  <div className="grid grid-cols-12 gap-4 md:gap-8 py-10 md:py-14 items-start cursor-pointer group-hover:opacity-60 transition-opacity duration-500">

                    {/* Number */}
                    <div className="col-span-2 md:col-span-1">
                      <span className="text-sm font-medium text-[#0a0a0a]/30 tabular-nums">
                        {service.num}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="col-span-10 md:col-span-4">
                      <h3 className="text-xl md:text-2xl font-bold tracking-[-0.02em] group-hover:text-[#20807e] transition-colors duration-300">
                        {service.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <div className="col-span-12 md:col-span-5 md:col-start-6">
                      <p className="text-sm md:text-base text-[#0a0a0a]/50 leading-relaxed">
                        {service.desc}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="hidden md:flex col-span-2 justify-end items-center">
                      <motion.div
                        className="w-10 h-10 rounded-full border border-[#0a0a0a]/10 flex items-center justify-center group-hover:border-[#20807e] group-hover:bg-[#20807e] transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          className="text-[#0a0a0a]/40 group-hover:text-white transition-colors duration-300 -rotate-45"
                        >
                          <path
                            d="M3 8h10M9 4l4 4-4 4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </motion.div>
                    </div>

                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* About */}
        <section id="about" className="py-24 md:py-32 lg:py-40 bg-[#20807e] text-white reveal-section" ref={aboutRef}>
          <div className="max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 xl:px-20">
            <div className="grid lg:grid-cols-5 gap-12 items-center">
              <motion.div
                className="lg:col-span-2"
                initial={{ opacity: 0, x: -30 }}
                animate={aboutInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 1 }}
              >
                <div className="text-xs uppercase tracking-wider text-[#f9d412] font-bold mb-4">
                  Hi there
                </div>
                <h2 className="text-4xl lg:text-6xl font-black leading-tight tracking-tighter mb-6">
                  My name is Jørr
                </h2>
                <p className="text-base text-white/80 leading-relaxed">
                  Founder of Turq Design Studio, passionate about creating meaningful digital experiences that bridge the gap between human needs and technological possibilities.
                </p>
              </motion.div>

              <motion.div
                className="lg:col-span-3"
                initial={{ opacity: 0, x: 30 }}
                animate={aboutInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <p className="text-xl md:text-2xl leading-relaxed text-white font-light mb-6">
                  I believe in the power of
                  <span className="font-black text-[#f9d412]"> extraordinary design</span> that doesn't just look beautiful—it transforms businesses and creates meaningful connections between brands and people.
                </p>
                <p className="text-base leading-relaxed text-white/80">
                  With over a decade of experience crafting digital experiences for ambitious startups and established enterprises, I've learned that the best design is purposeful, accessible, and human-centered.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-24 md:py-32 lg:py-40 bg-white" ref={contactRef}>
          <div className="max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 xl:px-20">
            <div className="grid grid-cols-12 gap-4 md:gap-8">
              <div className="col-span-12 text-center">
                <div className="overflow-hidden mb-4">
                  <motion.h2
                    className="scale-reveal text-5xl md:text-7xl lg:text-[10rem] font-black leading-[0.85] tracking-[-0.04em]"
                    initial={{ y: 100, opacity: 0 }}
                    animate={contactInView ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  >
                    Let's create
                  </motion.h2>
                </div>
                <div className="overflow-hidden mb-4">
                  <motion.h2
                    className="scale-reveal text-5xl md:text-7xl lg:text-[10rem] font-black leading-[0.85] tracking-[-0.04em]"
                    initial={{ y: 100, opacity: 0 }}
                    animate={contactInView ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    something
                  </motion.h2>
                </div>
                <div className="overflow-hidden mb-12">
                  <motion.h2
                    className="scale-reveal text-5xl md:text-7xl lg:text-[10rem] font-black leading-[0.85] tracking-[-0.04em]"
                    initial={{ y: 100, opacity: 0 }}
                    animate={contactInView ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="italic font-light text-[#20807e]">remarkable</span>
                  </motion.h2>
                </div>

                <motion.p
                  className="text-lg md:text-xl text-[#0a0a0a]/60 mb-12 max-w-xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={contactInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 1, delay: 0.4 }}
                >
                  Ready to push boundaries and build something extraordinary?
                </motion.p>

                <motion.a
                  href="mailto:hello@turqdesign.com"
                  className="magnetic-btn inline-flex items-center gap-4 bg-[#0a0a0a] text-white rounded-full font-bold text-sm md:text-base uppercase tracking-[0.2em] px-10 md:px-14 py-5 md:py-6 group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={contactInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  whileHover={{ scale: 1.05, backgroundColor: '#20807e' }}
                  whileTap={{ scale: 0.98 }}
                >
                  Let's Talk
                  <motion.span
                    className="inline-block"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.a>
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
                  Creating remarkable digital experiences for ambitious brands.
                </p>
              </div>

              {/* Social Links */}
              <div className="col-span-12 md:col-span-4">
                <div className="flex flex-wrap gap-6 md:justify-center">
                  {['Instagram', 'LinkedIn', 'Dribbble', 'Twitter'].map((social) => (
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