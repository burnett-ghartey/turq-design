'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard } from 'swiper/modules';
import 'swiper/css';
import { HiChevronLeft, HiChevronRight, HiXMark } from 'react-icons/hi2';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'MK Petals',
    category: 'Brand Identity',
    industry: 'Plants & Home Decor',
    description: 'Cohesive brand identity for a modern plant lifestyle brand.',
    overview: 'MK Petals required a brand identity that communicated sustainability, simplicity, and the joy of bringing nature into everyday spaces. We developed a cohesive visual system that extended across logo design, packaging, and product presentation, creating a memorable unboxing experience while reinforcing the brand\'s eco-conscious values. The result was a refined identity that positioned MK Petals as a modern plant lifestyle brand with strong visual recognition.',
    deliverables: ['Logo Design', 'Brand Identity System', 'Packaging Design', 'Print Collateral', 'Product Presentation', 'Brand Guidelines', 'Typography System', 'Sustainable Packaging Strategy'],
    result: 'Customer engagement increased significantly following launch, with stronger brand recall and improved product presentation across retail and online channels. The packaging experience became a key differentiator, helping the brand stand out in a growing indoor plant market.',
    image: '/images/658931269_17884019784497783_571182024546430971_n.jpg',
    gallery: [
      '/images/658403557_17884019793497783_5454214793678055543_n.jpg'
    ],
    year: '2026'
  },
  {
    id: 2,
    title: 'Dapore Ventures Ltd.',
    category: 'Corporate Branding',
    industry: 'Construction & Engineering',
    description: 'Professional brand identity for construction and infrastructure development.',
    overview: 'Dapore Ventures Ltd. required a professional brand identity that reflected its expertise in construction, infrastructure development, and project execution. We developed a bold visual system centered around strength, precision, and reliability, combining modern typography with industry-focused imagery. The identity was applied across corporate communications and company profile materials, creating a cohesive presence that reinforced credibility with clients, partners, and stakeholders.',
    deliverables: ['Logo Design', 'Corporate Identity System', 'Company Profile Design', 'Brand Guidelines', 'Typography System', 'Print Design', 'Marketing Materials', 'Corporate Stationery'],
    result: 'The refreshed brand identity strengthened the company\'s professional image and improved consistency across marketing and business development materials. The new company profile provided a more compelling presentation of services and capabilities, helping position Dapore Ventures Ltd. as a trusted partner for construction and infrastructure projects.',
    image: '/images/645967990_17879423943497783_2163389885280786583_n.jpg',
    gallery: [
      '/images/645967990_17879423943497783_2163389885280786583_n.jpg',
      '/images/645979861_17879423952497783_8343374281226910139_n.jpg'
    ],
    year: '2026'
  },
  {
    id: 3,
    title: 'Triangle Merchants',
    category: 'Brand Identity',
    industry: 'Construction & Trading',
    description: 'Strong and professional visual identity for construction and trading.',
    overview: 'Triangle Merchants required a strong and professional visual identity that reflected reliability, safety, and excellence within the construction and trading sector. We developed a distinctive brand system centered around a bold geometric logo, modern typography, and a vibrant color palette that reinforces trust, visibility, and industry leadership. The identity was designed to maintain consistency across safety equipment, corporate materials, signage, and digital platforms while enhancing brand recognition in a competitive marketplace.',
    deliverables: ['Logo Design', 'Brand Identity System', 'Safety Equipment Branding', 'Typography System', 'Color Palette Development', 'Corporate Stationery', 'Marketing Collateral', 'Brand Guidelines', 'Vehicle & Site Signage', 'Digital Brand Assets'],
    result: 'Brand visibility increased significantly through consistent implementation across worksite assets and marketing materials, creating a stronger market presence and improved customer trust.',
    image: '/images/550673187_17859947118497783_4864168182606645507_n.jpg',
    gallery: [
      '/images/550673187_17859947118497783_4864168182606645507_n.jpg',
      '/images/551072529_17859947127497783_6796152675265179231_n.jpg',
      '/images/551285817_17859947145497783_2063559774082377149_n.jpg',
      '/images/551833947_17859947136497783_3907121450810623382_n.jpg'
    ],
    year: '2024'
  },
  {
    id: 4,
    title: 'GESENEM Limited',
    category: 'Brand Identity',
    industry: 'Corporate / Beauty & Skincare',
    description: 'Bold and modern visual identity reflecting strength and premium positioning.',
    overview: 'GESENEM Limited required a bold and modern visual identity that reflected strength, precision, and premium positioning. The goal was to create a distinctive brand system centered around a powerful monogram mark that communicates confidence, professionalism, and long-term credibility. We developed a cohesive identity system including logo design, stationery, and brand applications that ensure consistency across print and digital platforms. The deep red and white color palette reinforces authority and sophistication, while the geometric logo form conveys innovation and forward thinking.',
    deliverables: ['Logo Design', 'Visual Identity System', 'Brand Guidelines', 'Business Card Design', 'Letterhead Design', 'Print Collateral'],
    result: 'The refreshed identity strengthened brand presence, improved professional perception, and positioned GESENEM Limited as a premium and reliable company within its sector.',
    image: '/images/558022504_17861460537497783_1377270077185322879_n.jpg',
    gallery: [
      '/images/558022504_17861460537497783_1377270077185322879_n.jpg',
      '/images/558032629_17861460546497783_9028915842972317320_n .jpg'
    ],
    year: '2024'
  },
  {
    id: 5,
    title: 'Jeddean Company Ltd.',
    category: 'Brand Identity',
    industry: 'Corporate Services / Construction & Engineering',
    description: 'Professional and cohesive brand identity reflecting reliability and innovation.',
    overview: 'Jeddean Company Ltd. required a professional and cohesive brand identity that reflected reliability, innovation, and operational excellence. We developed a comprehensive visual identity system centered around the JCL logo, utilizing a strong blue-and-gold color palette to communicate trust, quality, and professionalism. The project included the design of key corporate stationery and marketing materials, ensuring a consistent brand presence across all customer and business touchpoints.',
    deliverables: ['Logo Design', 'Corporate Identity System', 'Business Card Design', 'Letterhead Design', 'Envelope Design', 'Brand Guidelines', 'Stationery Design', 'Print Collateral'],
    result: 'The new identity established a stronger corporate image, improved brand consistency across communications, and enhanced the company\'s professional presentation to clients, partners, and stakeholders.',
    image: '/images/558022504_17861460537497783_1377270077185322879_n.jpg',
    gallery: [
      '/images/558022504_17861460537497783_1377270077185322879_n.jpg'
    ],
    year: '2024'
  },
  {
    id: 6,
    title: 'Amets Dreamy Interior',
    category: 'Brand Identity',
    industry: 'Interior Design & Home Styling',
    description: 'Sophisticated visual identity reflecting elegance and premium design services.',
    overview: 'Amets Dreamy Interior required a sophisticated visual identity that reflected elegance, creativity, and premium interior design services. We developed a refined brand system centered around a custom monogram logo that combines the initials "A" and "D" into a timeless mark. The warm gold and neutral palette was carefully selected to communicate luxury, comfort, and attention to detail, creating a cohesive identity that enhances the brand\'s presence across physical and digital touchpoints.',
    deliverables: ['Logo Design', 'Brand Identity System', 'Typography System', 'Color Palette Development', 'Business Stationery', 'Signage Design', 'Brand Guidelines', 'Marketing Collateral', 'Social Media Assets', 'Interior Branding Applications'],
    result: 'The new identity established a strong premium market position, improved brand consistency across customer touchpoints, and increased client engagement through a polished and memorable visual presence.',
    image: '/images/565136351_17862647670497783_8999445553966104895_n.jpg',
    gallery: [
      '/images/565136351_17862647670497783_8999445553966104895_n.jpg',
      '/images/565561763_17862647682497783_2052828712690319846_n.jpg',
      '/images/565803681_17862647691497783_4452622439291317280_n.jpg'
    ],
    year: '2024'
  }
];

function getImages(project) {
  const all = project.gallery || [];
  return all.map((src) => ({ src, alt: project.title }));
}

function ProjectPreview({ project, onClose }) {
  const scrollRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const images = project ? getImages(project) : [];

  useEffect(() => {
    if (!project) return;
    setActiveIndex(0);
    document.body.style.overflow = 'hidden';
    if (window.lenis) window.lenis.stop();

    const el = scrollRef.current;
    const stopWheel = (e) => e.stopPropagation();
    const stopTouch = (e) => e.stopPropagation();
    if (el) {
      el.addEventListener('wheel', stopWheel, { passive: false });
      el.addEventListener('touchmove', stopTouch, { passive: false });
    }

    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = '';
      if (window.lenis) window.lenis.start();
      if (el) {
        el.removeEventListener('wheel', stopWheel);
        el.removeEventListener('touchmove', stopTouch);
      }
      window.removeEventListener('keydown', onKey);
    };
  }, [project, onClose]);

  if (typeof window === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="fixed inset-0 z-[1100] bg-[#0a0a0a]/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            ref={scrollRef}
            data-lenis-prevent
            className="fixed inset-0 z-[1101] overflow-y-auto bg-[#f1f2de]"
          >
            {/* Top bar */}
            <div className="sticky top-0 z-20 flex items-center justify-between bg-[#f1f2de]/90 backdrop-blur-md px-4 py-3 md:px-6 border-b border-[#0a0a0a]/5">
              <h2 className="text-[14px] font-medium text-[#0a0a0a] md:text-[16px]">
                {project.title}
              </h2>
              <div className="flex items-center gap-3">
                {images.length > 1 && (
                  <span className="text-[12px] tabular-nums text-[#0a0a0a]/30">
                    {activeIndex + 1} / {images.length}
                  </span>
                )}
                <button
                  onClick={onClose}
                  className="cursor-pointer rounded-full bg-[#0a0a0a]/5 p-2 text-[#0a0a0a] transition-colors hover:bg-[#0a0a0a]/10"
                >
                  <HiXMark size={20} />
                </button>
              </div>
            </div>

            {/* Image Swiper */}
            <div className="relative h-[55vh] mx-auto max-w-5xl px-6 md:px-10">
              <Swiper
                modules={[Keyboard]}
                keyboard={{ enabled: true }}
                onSwiper={setSwiperInstance}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                spaceBetween={0}
                slidesPerView={1}
                className="h-full w-full"
              >
                {images.map((img, i) => (
                  <SwiperSlide key={i}>
                    <div className="flex items-center justify-center h-full w-full">
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="max-w-full max-h-full object-contain rounded-sm"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Nav buttons */}
              {images.length > 1 && (
                <>
                  {activeIndex > 0 && (
                    <button
                      onClick={() => swiperInstance?.slidePrev()}
                      className="cursor-pointer absolute left-8 top-1/2 z-10 -translate-y-1/2 rounded-full text-white"
                      style={{ background: '#0a0a0a', width: 40, height: 40, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <HiChevronLeft size={22} />
                    </button>
                  )}
                  {activeIndex < images.length - 1 && (
                    <button
                      onClick={() => swiperInstance?.slideNext()}
                      className="cursor-pointer absolute right-8 top-1/2 z-10 -translate-y-1/2 rounded-full text-white"
                      style={{ background: '#0a0a0a', width: 40, height: 40, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <HiChevronRight size={22} />
                    </button>
                  )}
                </>
              )}
            </div>

            {/* Content */}
            <div className="mx-auto max-w-4xl px-6 pt-4 pb-10 md:px-10 md:py-16">
              {/* Meta row */}
              <div className="mb-8 flex flex-wrap gap-x-10 gap-y-4 border-b border-[#0a0a0a]/10 pb-8 text-[12px] text-[#0a0a0a]/50">
                <div>
                  <span className="mb-1 block text-[10px] uppercase tracking-widest text-[#20807e]">Category</span>
                  {project.category}
                </div>
                <div>
                  <span className="mb-1 block text-[10px] uppercase tracking-widest text-[#20807e]">Industry</span>
                  {project.industry}
                </div>
                <div>
                  <span className="mb-1 block text-[10px] uppercase tracking-widest text-[#20807e]">Year</span>
                  {project.year}
                </div>
              </div>

              {/* Overview */}
              <div className="mb-10">
                <h3 className="mb-3 text-[12px] uppercase tracking-widest text-[#20807e]">Overview</h3>
                <p className="text-[14px] leading-relaxed text-[#0a0a0a]/60 md:text-[16px] md:leading-relaxed">
                  {project.overview}
                </p>
              </div>

              {/* Result */}
              <div className="mb-10">
                <h3 className="mb-3 text-[12px] uppercase tracking-widest text-[#20807e]">Result</h3>
                <p className="text-[14px] leading-relaxed text-[#0a0a0a]/60 md:text-[16px] md:leading-relaxed">
                  {project.result}
                </p>
              </div>

              {/* Deliverables */}
              {project.deliverables?.length > 0 && (
                <div className="mb-10">
                  <h3 className="mb-3 text-[12px] uppercase tracking-widest text-[#20807e]">Deliverables</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.deliverables.map((item, i) => (
                      <span
                        key={i}
                        className="text-[12px] text-[#0a0a0a]/50 px-3 py-1.5 border border-[#0a0a0a]/10 rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

function ProjectItem({ project, index, onSelect }) {
  const itemRef = useRef(null);
  const titleRef = useRef(null);
  const underlineRef = useRef(null);
  const categoryRef = useRef(null);
  const arrowRef = useRef(null);

  useEffect(() => {
    const item = itemRef.current;

    // Initial scroll animation
    gsap.fromTo(item,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.8,
        delay: index * 0.1,
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
    gsap.to(titleRef.current, {
      x: 20,
      duration: 0.4,
      ease: 'power3.out'
    });
    gsap.to(underlineRef.current, {
      width: '100%',
      duration: 0.4,
      ease: 'power3.out'
    });
    gsap.to(categoryRef.current, {
      opacity: 1,
      duration: 0.3
    });
    gsap.to(arrowRef.current, {
      scale: 1,
      opacity: 1,
      backgroundColor: '#20807e',
      borderColor: '#20807e',
      duration: 0.3
    });
  };

  const handleMouseLeave = () => {
    gsap.to(titleRef.current, {
      x: 0,
      duration: 0.4,
      ease: 'power3.out'
    });
    gsap.to(underlineRef.current, {
      width: 0,
      duration: 0.4,
      ease: 'power3.out'
    });
    gsap.to(categoryRef.current, {
      opacity: 0.5,
      duration: 0.3
    });
    gsap.to(arrowRef.current, {
      scale: 0.8,
      opacity: 0,
      backgroundColor: 'transparent',
      borderColor: 'rgba(10,10,10,0.1)',
      duration: 0.3
    });
  };

  return (
    <div
      ref={itemRef}
      className="group block relative opacity-0 cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(project)}
    >
      {/* Main Row */}
      <div className="border-b border-[#0a0a0a]/10 py-8 md:py-12">
        <div className="grid grid-cols-12 gap-4 items-center">

          {/* Index Number */}
          <div className="col-span-2 md:col-span-1">
            <span className="text-[12px] md:text-[14px] font-medium text-[#0a0a0a]/30 tabular-nums">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Project Title */}
          <div className="col-span-10 md:col-span-5">
            <h3
              ref={titleRef}
              className="text-[22px] md:text-[31px] font-medium leading-none"
            >
              <span className="relative inline-block">
                {project.title}
                <span
                  ref={underlineRef}
                  className="absolute bottom-0 left-0 h-[2px] bg-[#20807e]"
                  style={{ width: 0 }}
                />
              </span>
            </h3>
          </div>

          {/* Category */}
          <div className="hidden md:block col-span-3">
            <span
              ref={categoryRef}
              className="text-[14px] text-[#0a0a0a]/50 font-medium"
              style={{ opacity: 0.5 }}
            >
              {project.category}
            </span>
          </div>

          {/* Year */}
          <div className="hidden md:block col-span-2">
            <span className="text-[14px] text-[#0a0a0a]/30 font-medium tabular-nums">
              {project.year}
            </span>
          </div>

          {/* Arrow */}
          <div className="hidden md:flex col-span-1 justify-end">
            <div
              ref={arrowRef}
              className="w-10 h-10 rounded-full border border-[#0a0a0a]/10 flex items-center justify-center"
              style={{ scale: 0.8, opacity: 0 }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="text-white -rotate-45"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function SelectedWorks() {
  const [selectedProject, setSelectedProject] = useState(null);
  const headerLeftRef = useRef(null);
  const headerRightRef = useRef(null);
  const viewAllRef = useRef(null);
  const viewAllLinkRef = useRef(null);

  useEffect(() => {
    // Header left animation
    gsap.fromTo(headerLeftRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: headerLeftRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none none'
        }
      }
    );

    // Header right animation
    gsap.fromTo(headerRightRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: headerRightRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none none'
        }
      }
    );

    // View all animation
    gsap.fromTo(viewAllRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: viewAllRef.current,
          start: 'top bottom-=50',
          toggleActions: 'play none none none'
        }
      }
    );

    // View all link hover
    const link = viewAllLinkRef.current;
    const handleLinkEnter = () => {
      gsap.to(link, { x: 10, duration: 0.3 });
    };
    const handleLinkLeave = () => {
      gsap.to(link, { x: 0, duration: 0.3 });
    };

    link?.addEventListener('mouseenter', handleLinkEnter);
    link?.addEventListener('mouseleave', handleLinkLeave);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      link?.removeEventListener('mouseenter', handleLinkEnter);
      link?.removeEventListener('mouseleave', handleLinkLeave);
    };
  }, []);

  return (
    <section id="work" className="py-24 md:py-32 lg:py-40 bg-[#f1f2de]">
      <div className="max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 xl:px-20">

        {/* Section Header - Minimal */}
        <div className="mb-16 md:mb-24 grid grid-cols-12 gap-4">
          <div
            ref={headerLeftRef}
            className="col-span-12 md:col-span-6 opacity-0"
          >
            <span className="text-[12px] font-normal tracking-[0.3em] uppercase text-[#20807e] mb-6 block">
              Selected Work
            </span>
            <h2 className="text-[25px] md:text-[39px] font-medium leading-[1.15]">
              Featured<br />
              <span className="text-[#0a0a0a]/20">Projects</span>
            </h2>
          </div>

          <div
            ref={headerRightRef}
            className="col-span-12 md:col-span-4 md:col-start-9 flex items-end opacity-0"
          >
            <p className="text-[14px] text-[#0a0a0a]/50 leading-relaxed">
              Selected projects showcasing our approach to branding, digital design, and visual storytelling.
            </p>
          </div>
        </div>

        {/* Projects List */}
        <div className="border-t border-[#0a0a0a]/10">
          {projects.map((project, index) => (
            <ProjectItem key={project.id} project={project} index={index} onSelect={setSelectedProject} />
          ))}
        </div>

        {/* View All */}
        <div
          ref={viewAllRef}
          className="mt-16 md:mt-24 opacity-0"
        >
          <a
            ref={viewAllLinkRef}
            href="#"
            className="group inline-flex items-center gap-6"
          >
            <span className="text-[14px] font-medium text-[#0a0a0a]/40 uppercase tracking-[0.15em] group-hover:text-[#0a0a0a] transition-colors duration-300">
              View all projects
            </span>
            <span className="w-12 h-px bg-[#0a0a0a]/20 group-hover:w-20 group-hover:bg-[#20807e] transition-all duration-300"></span>
          </a>
        </div>

      </div>

      {/* Project Preview Modal */}
      <ProjectPreview
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
