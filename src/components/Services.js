'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: '01',
    title: 'Brand Identity',
    description: 'We craft distinctive brand foundations that define how your business looks, feels, and communicates across every touchpoint.',
    capabilities: ['Brand Strategy', 'Logo Design', 'Visual Identity', 'Brand Guidelines']
  },
  {
    id: '02',
    title: 'Digital Design',
    description: 'Thoughtfully designed digital experiences that balance aesthetics with usability, creating lasting impressions.',
    capabilities: ['Web Design', 'UI/UX Design', 'Design Systems', 'Prototyping']
  },
  {
    id: '03',
    title: 'Creative Direction',
    description: 'Strategic visual guidance ensuring your brand maintains consistency and intention across all platforms.',
    capabilities: ['Art Direction', 'Visual Strategy', 'Campaign Design', 'Brand Evolution']
  },
  {
    id: '04',
    title: 'Graphic Design',
    description: 'High-impact visual assets that elevate your marketing, communications, and brand presence.',
    capabilities: ['Print Design', 'Marketing Materials', 'Presentations', 'Social Media']
  }
];

function ServiceItem({ service, index }) {
  const itemRef = useRef(null);
  const numberRef = useRef(null);
  const titleRef = useRef(null);
  const underlineRef = useRef(null);
  const descRef = useRef(null);
  const capsRef = useRef(null);
  const arrowRef = useRef(null);

  const isDesktop = typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches;

  useEffect(() => {
    const item = itemRef.current;

    // On desktop, hide description/caps/arrow by default (revealed on hover)
    if (isDesktop) {
      gsap.set(descRef.current, { opacity: 0, y: 10 });
      gsap.set(capsRef.current, { opacity: 0, y: 10 });
      gsap.set(arrowRef.current, { scale: 0.5, opacity: 0, rotation: -45 });
    }

    gsap.fromTo(item,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: index * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top bottom-=100',
          toggleActions: 'play none none none'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === item) {
          trigger.kill();
        }
      });
    };
  }, [index]);

  const handleMouseEnter = () => {
    if (!isDesktop) return;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to(numberRef.current, {
      color: '#20807e',
      duration: 0.3
    }, 0)
    .to(titleRef.current, {
      x: 20,
      color: '#20807e',
      duration: 0.4
    }, 0)
    .to(underlineRef.current, {
      scaleX: 1,
      duration: 0.4
    }, 0)
    .to(descRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.4
    }, 0.1)
    .to(capsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.4
    }, 0.15)
    .to(arrowRef.current, {
      scale: 1,
      opacity: 1,
      rotation: 0,
      duration: 0.3
    }, 0.1);
  };

  const handleMouseLeave = () => {
    if (!isDesktop) return;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to(numberRef.current, {
      color: 'rgba(10, 10, 10, 0.2)',
      duration: 0.3
    }, 0)
    .to(titleRef.current, {
      x: 0,
      color: '#0a0a0a',
      duration: 0.4
    }, 0)
    .to(underlineRef.current, {
      scaleX: 0,
      duration: 0.4
    }, 0)
    .to(descRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.3
    }, 0)
    .to(capsRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.3
    }, 0)
    .to(arrowRef.current, {
      scale: 0.5,
      opacity: 0,
      rotation: -45,
      duration: 0.3
    }, 0);
  };

  return (
    <a
      ref={itemRef}
      href="#"
      className="block opacity-0 group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="border-b border-[#0a0a0a]/10 py-10 md:py-16">
        <div className="grid grid-cols-12 gap-4 md:gap-8">

          {/* Number */}
          <div className="col-span-2 md:col-span-1">
            <span
              ref={numberRef}
              className="text-[36px] md:text-[60px] lg:text-[96px] font-bold tabular-nums"
              style={{ color: 'rgba(10, 10, 10, 0.2)' }}
            >
              {service.id}
            </span>
          </div>

          {/* Title & Content */}
          <div className="col-span-10 md:col-span-10 lg:col-span-5">
            <h3
              ref={titleRef}
              className="text-[22px] md:text-[31px] font-medium leading-none mb-4 relative inline-block"
            >
              {service.title}
              <span
                ref={underlineRef}
                className="absolute bottom-0 left-0 w-full h-[3px] bg-[#20807e] origin-left"
                style={{ transform: 'scaleX(0)' }}
              />
            </h3>

            {/* Description - Always visible on mobile, revealed on hover on desktop */}
            <p
              ref={descRef}
              className="text-[14px] md:text-[16px] text-[#0a0a0a]/60 leading-relaxed max-w-md mt-4"
            >
              {service.description}
            </p>
          </div>

          {/* Capabilities */}
          <div className="hidden lg:block col-span-4">
            <div
              ref={capsRef}
              className="flex flex-wrap gap-2"
            >
              {service.capabilities.map((cap, i) => (
                <span
                  key={i}
                  className="text-[12px] font-medium text-[#0a0a0a]/50 px-3 py-1.5 border border-[#0a0a0a]/10 rounded-full"
                >
                  {cap}
                </span>
              ))}
            </div>
          </div>

          {/* Arrow */}
          <div className="hidden md:flex col-span-1 lg:col-span-2 justify-end items-start">
            <div
              ref={arrowRef}
              className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-[#20807e] flex items-center justify-center"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 16 16"
                fill="none"
                className="text-white"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

        </div>
      </div>
    </a>
  );
}

export default function Services() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top bottom-=100',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo(subtitleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: 'top bottom-=100',
            toggleActions: 'play none none none'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-24 md:py-32 lg:py-40 bg-[#f1f2de]">
      <div className="max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 xl:px-20">

        {/* Section Header */}
        <div className="grid grid-cols-12 gap-4 md:gap-8 mb-16 md:mb-24">
          <div className="col-span-12 md:col-span-7">
            <div ref={headerRef} className="opacity-0">
              <span className="text-[12px] font-normal tracking-[0.3em] uppercase text-[#20807e] mb-6 block">
                Services
              </span>
              <h2 className="text-[25px] md:text-[39px] font-medium leading-[1.15]">
                What we<br />
                <span className="text-[#0a0a0a]/20">do best</span>
              </h2>
            </div>
          </div>

          <div className="col-span-12 md:col-span-4 md:col-start-9 flex items-end">
            <p
              ref={subtitleRef}
              className="text-[14px] md:text-[16px] text-[#0a0a0a]/50 leading-relaxed opacity-0"
            >
              We partner with ambitious brands to create meaningful experiences through strategy, design, and creative excellence.
            </p>
          </div>
        </div>

        {/* Services List */}
        <div className="border-t border-[#0a0a0a]/10">
          {services.map((service, index) => (
            <ServiceItem key={service.id} service={service} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}
