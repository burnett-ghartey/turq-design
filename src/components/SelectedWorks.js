'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Luxe Botanics',
    category: 'Brand Identity',
    industry: 'Beauty & Skincare',
    description: 'Complete brand identity for a premium skincare line.',
    overview: 'Luxe Botanics needed a visual identity that conveyed luxury, sustainability, and the science behind their plant-based formulations. We developed a comprehensive brand system from logo to packaging that elevated their presence in a crowded market.',
    deliverables: ['Logo Design', 'Packaging', 'Brand Guidelines', 'Typography System', 'Print Collateral'],
    result: 'Brand recognition increased 140% within 6 months of relaunch.',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80'
    ],
    year: '2024'
  },
  {
    id: 2,
    title: 'Horizon Tech',
    category: 'Digital Design',
    industry: 'Technology',
    description: 'Modern website and UI design for an innovative tech startup.',
    overview: 'Horizon Tech was launching their AI-powered analytics platform and needed a digital presence that felt cutting-edge without alienating non-technical users. We crafted an intuitive website and product UI that balanced sophistication with clarity.',
    deliverables: ['Web Design', 'UI/UX Design', 'Design System', 'Prototyping', 'Motion Design'],
    result: 'Conversion rate improved 85% compared to the previous site.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80'
    ],
    year: '2024'
  },
  {
    id: 3,
    title: 'Artisan Coffee',
    category: 'Visual Identity',
    industry: 'Food & Beverage',
    description: 'Warm and inviting brand system for a specialty coffee roaster.',
    overview: 'Artisan Coffee wanted to stand out from the minimalist trend dominating specialty coffee. We created a rich, textured visual identity that tells the story of their sourcing process and honors the craft behind every roast.',
    deliverables: ['Visual Identity', 'Packaging Design', 'Menu Design', 'Signage', 'Social Templates'],
    result: 'Retail sales grew 60% following the brand refresh.',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80',
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80'
    ],
    year: '2024'
  },
  {
    id: 4,
    title: 'Verde Studio',
    category: 'Brand Strategy',
    industry: 'Architecture',
    description: 'Strategic rebrand for an architecture firm.',
    overview: 'Verde Studio had outgrown their original identity after a decade of award-winning work. We led a strategic rebrand that repositioned them as leaders in sustainable architecture, aligning their visual language with their environmental values.',
    deliverables: ['Brand Strategy', 'Logo Redesign', 'Brand Guidelines', 'Website Design', 'Presentation Templates'],
    result: 'Secured 3 major institutional clients within the first quarter post-rebrand.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
      'https://images.unsplash.com/photo-1448630360428-65456659e233?w=800&q=80'
    ],
    year: '2023'
  },
  {
    id: 5,
    title: 'Nomad Travel',
    category: 'Digital Platform',
    industry: 'Travel & Hospitality',
    description: 'Immersive digital experience for a luxury travel agency.',
    overview: 'Nomad Travel envisioned a digital platform that felt like the beginning of the journey itself. We designed an immersive, story-driven experience that showcases destinations through rich visuals and seamless booking flows.',
    deliverables: ['Platform Design', 'UX Strategy', 'Interactive Maps', 'Booking UI', 'Mobile App Design'],
    result: 'Average session duration increased 3x and bookings up 120%.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80',
      'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&q=80'
    ],
    year: '2023'
  }
];

function ProjectPreview({ project, onClose, onNavigate }) {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const detailsRef = useRef(null);
  const galleryRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') onNavigate(1);
      if (e.key === 'ArrowLeft') onNavigate(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project.id]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    if (window.lenis) window.lenis.stop();

    const tl = gsap.timeline();
    tl.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' }
    );
    tl.fromTo(contentRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
      '-=0.2'
    );
    tl.fromTo(imageRef.current,
      { scale: 1.1, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    );
    tl.fromTo(detailsRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
      '-=0.2'
    );
    if (galleryRef.current) {
      tl.fromTo(galleryRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power2.out' },
        '-=0.2'
      );
    }

    return () => {
      document.body.style.overflow = '';
      if (window.lenis) window.lenis.start();
    };
  }, [project.id]);

  const handleClose = () => {
    const tl = gsap.timeline({
      onComplete: onClose
    });
    tl.to(contentRef.current, { y: 40, opacity: 0, duration: 0.3, ease: 'power2.in' });
    tl.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in' }, '-=0.15');
  };

  const currentIndex = projects.findIndex(p => p.id === project.id);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50"
      style={{ opacity: 0 }}
    >
      {/* Backdrop - click to close */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(10, 10, 10, 0.85)', backdropFilter: 'blur(8px)' }}
        onClick={handleClose}
      />
      {/* Content panel - scrollable */}
      <div
        ref={contentRef}
        data-lenis-prevent
        className="absolute inset-4 md:inset-y-8 md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-[1100px] bg-[#f1f2de] rounded-sm overflow-y-auto overscroll-contain"
        style={{ opacity: 0 }}
      >
        {/* Top Bar: Close + Navigation */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-[#f1f2de]/90 backdrop-blur-sm">
          <span className="text-xs text-[#0a0a0a]/30 font-medium tabular-nums">
            {String(currentIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </span>
          <div className="flex items-center gap-3">
            {/* Prev */}
            <button onClick={() => onNavigate(-1)} className="p-1">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}>
                <path d="M15 6l-6 6 6 6" stroke="#0a0a0a" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {/* Next */}
            <button onClick={() => onNavigate(1)} className="p-1">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}>
                <path d="M9 6l6 6-6 6" stroke="#0a0a0a" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {/* Close */}
            <button onClick={handleClose} className="p-1 ml-1">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}>
                <path d="M6 6l12 12M18 6L6 18" stroke="#0a0a0a" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div ref={imageRef} className="w-full max-h-[45vh] overflow-hidden" style={{ opacity: 0 }}>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div ref={detailsRef} className="p-8 md:p-12" style={{ opacity: 0 }}>
          <div className="grid grid-cols-12 gap-6 md:gap-8">

            {/* Left: Title + Overview */}
            <div className="col-span-12 md:col-span-7">
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#20807e] mb-3 block">
                {project.category}
              </span>
              <h3 className="text-3xl md:text-5xl font-black tracking-[-0.03em] leading-[0.95] mb-6">
                {project.title}
              </h3>
              <p className="text-base md:text-lg text-[#0a0a0a]/60 leading-relaxed">
                {project.overview}
              </p>
            </div>

            {/* Right: Meta Info */}
            <div className="col-span-12 md:col-span-4 md:col-start-9 flex flex-row flex-wrap md:flex-col gap-6 md:gap-6 mt-2 md:mt-0">
              <div>
                <span className="text-xs text-[#0a0a0a]/30 uppercase tracking-[0.2em] block mb-1">Year</span>
                <span className="text-sm font-medium text-[#0a0a0a]/70">{project.year}</span>
              </div>
              <div>
                <span className="text-xs text-[#0a0a0a]/30 uppercase tracking-[0.2em] block mb-1">Industry</span>
                <span className="text-sm font-medium text-[#0a0a0a]/70">{project.industry}</span>
              </div>
              <div>
                <span className="text-xs text-[#0a0a0a]/30 uppercase tracking-[0.2em] block mb-1">Deliverables</span>
                <div className="flex flex-wrap gap-2 mt-1.5">
                  {project.deliverables.map((item) => (
                    <span
                      key={item}
                      className="text-xs font-medium text-[#0a0a0a]/50 px-3 py-1 border border-[#0a0a0a]/10 rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="mt-10 pt-8 border-t border-[#0a0a0a]/10">
            <div className="flex items-start gap-4">
              <span className="text-xs text-[#0a0a0a]/30 uppercase tracking-[0.2em] shrink-0 mt-0.5">Result</span>
              <p className="text-sm md:text-base font-medium text-[#0a0a0a]/70">{project.result}</p>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div ref={galleryRef} className="px-8 md:px-12 pb-10 md:pb-14 grid grid-cols-3 gap-3 md:gap-4">
          {project.gallery.map((img, i) => (
            <div key={i} className="aspect-[4/3] overflow-hidden rounded-sm">
              <img
                src={img}
                alt={`${project.title} detail ${i + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="px-8 md:px-12 pb-10 md:pb-14">
          <a
            href="#contact"
            onClick={handleClose}
            className="inline-flex items-center gap-4 text-sm font-medium uppercase tracking-[0.2em] text-[#20807e] hover:text-[#0a0a0a] transition-colors duration-300 group"
          >
            <span>Start a similar project</span>
            <span className="w-8 h-px bg-current group-hover:w-14 transition-all duration-300"></span>
          </a>
        </div>
      </div>
    </div>
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
            <span className="text-xs md:text-sm font-medium text-[#0a0a0a]/30 tabular-nums">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Project Title */}
          <div className="col-span-10 md:col-span-5">
            <h3
              ref={titleRef}
              className="text-2xl md:text-4xl lg:text-5xl font-black tracking-[-0.03em] leading-none"
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
              className="text-sm text-[#0a0a0a]/50 font-medium"
              style={{ opacity: 0.5 }}
            >
              {project.category}
            </span>
          </div>

          {/* Year */}
          <div className="hidden md:block col-span-2">
            <span className="text-sm text-[#0a0a0a]/30 font-medium tabular-nums">
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
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#20807e] mb-6 block">
              Selected Work
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.04em] leading-[0.9]">
              Featured<br />
              <span className="text-[#0a0a0a]/20">Projects</span>
            </h2>
          </div>

          <div
            ref={headerRightRef}
            className="col-span-12 md:col-span-4 md:col-start-9 flex items-end opacity-0"
          >
            <p className="text-sm text-[#0a0a0a]/50 leading-relaxed">
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
            <span className="text-sm font-medium text-[#0a0a0a]/40 uppercase tracking-[0.2em] group-hover:text-[#0a0a0a] transition-colors duration-300">
              View all projects
            </span>
            <span className="w-12 h-px bg-[#0a0a0a]/20 group-hover:w-20 group-hover:bg-[#20807e] transition-all duration-300"></span>
          </a>
        </div>

      </div>

      {/* Project Preview Modal */}
      {selectedProject && (
        <ProjectPreview
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onNavigate={(direction) => {
            const currentIdx = projects.findIndex(p => p.id === selectedProject.id);
            const nextIdx = (currentIdx + direction + projects.length) % projects.length;
            setSelectedProject(projects[nextIdx]);
          }}
        />
      )}
    </section>
  );
}
