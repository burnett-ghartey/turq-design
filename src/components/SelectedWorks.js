import { motion } from 'framer-motion';
import { useState } from 'react';

const projects = [
  {
    id: 1,
    title: 'Elusive',
    category: 'Brand Identity',
    description: 'Complete rebrand and digital transformation for a cutting-edge fintech startup.',
    image: '/Logo_default_dark.png',
    color: '#1a1a2e',
    year: '2024'
  },
  {
    id: 2,
    title: 'Allies of Skin',
    category: 'E-commerce',
    description: 'Revolutionary shopping experience combining minimalist design with powerful functionality.',
    image: '/Logo_default_light.png',
    color: '#e8e4df',
    year: '2024'
  },
  {
    id: 3,
    title: 'The Official Agency',
    category: 'Digital Platform',
    description: 'Award-winning portfolio site for a creative agency with bold layouts and dynamic animations.',
    image: '/Logo_default_dark.png',
    color: '#0f0f0f',
    year: '2023'
  }
];

export default function SelectedWorks() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section id="work" className="py-24 md:py-32 lg:py-40 bg-[#fafafa]">
      <div className="max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 xl:px-20">

        {/* Section Header - Minimal Style */}
        <div className="mb-16 md:mb-20">
          <motion.p
            className="text-sm text-[#0a0a0a]/40 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Selected work
          </motion.p>
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.04em] leading-[1.1]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            See more of our<br />
            <span className="text-[#0a0a0a]/30">creative projects.</span>
          </motion.h2>
        </div>

        {/* Projects Grid - Card Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true, margin: "-50px" }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <a href="#" className="block">
                {/* Card Container */}
                <motion.div
                  className="relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer"
                  style={{ backgroundColor: project.color }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Background Pattern/Image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-24 h-24 md:w-32 md:h-32 object-contain opacity-20"
                      animate={{
                        scale: hoveredId === project.id ? 1.1 : 1,
                        opacity: hoveredId === project.id ? 0.3 : 0.2,
                      }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>

                  {/* Category Badge */}
                  <motion.div
                    className="absolute top-4 left-4"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <span className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-[#0a0a0a] text-xs font-medium px-3 py-1.5 rounded-full">
                      <span className="w-1.5 h-1.5 bg-[#20807e] rounded-full"></span>
                      {project.category}
                    </span>
                  </motion.div>

                  {/* Project Info Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <motion.div
                      className="relative"
                      animate={{
                        y: hoveredId === project.id ? 0 : 10,
                        opacity: hoveredId === project.id ? 1 : 0.9,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Year */}
                      <span className="text-xs text-white/50 font-medium mb-2 block">
                        {project.year}
                      </span>

                      {/* Title */}
                      <h3 className="text-2xl md:text-3xl font-bold text-white tracking-[-0.02em] mb-2">
                        {project.title}
                      </h3>

                      {/* Description - Shows on hover */}
                      <motion.p
                        className="text-sm text-white/70 leading-relaxed line-clamp-2"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{
                          opacity: hoveredId === project.id ? 1 : 0,
                          height: hoveredId === project.id ? 'auto' : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {project.description}
                      </motion.p>
                    </motion.div>
                  </div>

                  {/* Hover Gradient Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                    animate={{
                      opacity: hoveredId === project.id ? 1 : 0.7,
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Arrow Icon - Shows on hover */}
                  <motion.div
                    className="absolute top-4 right-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: hoveredId === project.id ? 1 : 0,
                      scale: hoveredId === project.id ? 1 : 0.8,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="-rotate-45"
                      >
                        <path
                          d="M3 8h10M9 4l4 4-4 4"
                          stroke="#0a0a0a"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </motion.div>
                </motion.div>
              </a>
            </motion.article>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          className="mt-16 md:mt-20 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="#"
            className="group inline-flex items-center gap-3 text-sm font-medium text-[#0a0a0a]/60 hover:text-[#0a0a0a] transition-colors duration-300"
            whileHover={{ x: 5 }}
          >
            View all projects
            <span className="w-6 h-px bg-current transition-all duration-300 group-hover:w-10"></span>
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
