'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Luxe Botanics',
    category: 'Brand Identity',
    description: 'Complete brand identity for a premium skincare line.',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1200&q=80',
    year: '2024'
  },
  {
    id: 2,
    title: 'Horizon Tech',
    category: 'Digital Design',
    description: 'Modern website and UI design for an innovative tech startup.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80',
    year: '2024'
  },
  {
    id: 3,
    title: 'Artisan Coffee',
    category: 'Visual Identity',
    description: 'Warm and inviting brand system for a specialty coffee roaster.',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&q=80',
    year: '2024'
  },
  {
    id: 4,
    title: 'Verde Studio',
    category: 'Brand Strategy',
    description: 'Strategic rebrand for an architecture firm.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80',
    year: '2023'
  },
  {
    id: 5,
    title: 'Nomad Travel',
    category: 'Digital Platform',
    description: 'Immersive digital experience for a luxury travel agency.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=80',
    year: '2023'
  }
];

function ProjectItem({ project, index }) {
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
    <a
      ref={itemRef}
      href="#"
      className="group block relative opacity-0"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
    </a>
  );
}

export default function SelectedWorks() {
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
            <ProjectItem key={project.id} project={project} index={index} />
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
    </section>
  );
}
