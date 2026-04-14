import { motion } from 'framer-motion';
import BackgroundParticles from '../components/BackgroundParticles';
import {
  containerStagger,
  fadeSlideLeft,
  fadeSlideRight,
  fadeSlideUp,
} from '../animations/variants';

const headline = 'Designing Digital Experiences in Motion';

const services = [
  {
    title: 'Brand Experiences',
    description: 'Narrative-rich web systems that feel cinematic and polished across every touchpoint.',
  },
  {
    title: 'Interactive Frontends',
    description: 'High-performance React interfaces with meaningful micro-interactions and fluid navigation.',
  },
  {
    title: 'Motion Systems',
    description: 'Reusable animation primitives and transitions that scale elegantly with growing products.',
  },
];

const projects = [
  {
    title: 'Nova Commerce',
    category: 'Ecommerce Platform',
    image:
      'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Helix Finance',
    category: 'Fintech Dashboard',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Pulse Media',
    category: 'Creative Studio',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
  },
];

const socialLinks = ['Dribbble', 'LinkedIn', 'Github'];

export default function HomePage() {
  return (
    <div id="home" className="relative">
      <section className="relative flex min-h-screen items-center overflow-hidden px-6 pb-20 pt-28 sm:px-8 lg:px-16">
        <BackgroundParticles />
        <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <motion.div variants={containerStagger} initial="hidden" animate="visible" className="space-y-8">
            <motion.p variants={fadeSlideUp} className="text-xs tracking-[0.34em] text-cyan-300 uppercase">
              Senior Frontend Engineer × Motion Designer
            </motion.p>
            <motion.h1 className="text-4xl font-semibold leading-tight text-white sm:text-6xl">
              {headline.split('').map((char, index) => (
                <motion.span
                  key={`${char}-${index}`}
                  variants={fadeSlideUp}
                  className="inline-block"
                  style={{ marginRight: char === ' ' ? '0.4rem' : 0 }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>
            <motion.p variants={fadeSlideUp} className="max-w-2xl text-base text-slate-300 sm:text-lg">
              I craft premium portfolio and product experiences with immersive interaction design, expressive
              motion, and production-ready frontend engineering.
            </motion.p>
            <motion.a
              variants={fadeSlideUp}
              href="#projects"
              whileHover={{ scale: 1.06, boxShadow: '0 0 32px rgba(34,211,238,0.55)' }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex rounded-full border border-cyan-300/40 bg-cyan-400/10 px-7 py-3 text-sm font-semibold tracking-wide text-cyan-100"
            >
              Explore Work
            </motion.a>
          </motion.div>

          <motion.div
            variants={fadeSlideRight}
            initial="hidden"
            animate="visible"
            className="glass relative mx-auto h-[360px] w-full max-w-md rounded-3xl p-5 shadow-glow"
          >
            <div className="absolute inset-5 rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/30 via-cyan-400/10 to-pink-500/20" />
            <motion.div
              animate={{ y: [0, -14, 0], rotate: [0, 2, 0, -2, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              className="relative h-full rounded-2xl border border-white/10 bg-slate-900/70 p-6"
            >
              <p className="text-sm text-slate-300">Featured Stack</p>
              <div className="mt-8 grid gap-3">
                {['React + Vite', 'Tailwind CSS', 'Framer Motion', 'Type-safe Components'].map((item) => (
                  <div key={item} className="glass rounded-xl px-4 py-3 text-sm text-cyan-100">
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:px-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <motion.div
            variants={fadeSlideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
          >
            <h2 className="section-title">About</h2>
            <p className="section-subtitle">
              I combine engineering discipline with cinematic motion design to ship interfaces that feel alive.
              From interaction architecture to final polish, each detail is designed for delight and clarity.
            </p>
          </motion.div>
          <motion.div
            variants={fadeSlideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            className="glass overflow-hidden rounded-3xl p-3"
          >
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
              alt="Designer collaborating"
              className="h-[320px] w-full rounded-2xl object-cover"
            />
          </motion.div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:px-16">
        <motion.div
          variants={containerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <h2 className="section-title">Services</h2>
          <p className="section-subtitle">Premium frontend delivery from concept to launch-ready implementation.</p>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {services.map((service) => (
              <motion.article
                key={service.title}
                variants={fadeSlideUp}
                whileHover={{ scale: 1.04, rotate: -1.1, boxShadow: '0 0 28px rgba(59,130,246,0.35)' }}
                transition={{ ease: 'easeInOut', duration: 0.35 }}
                className="glass rounded-2xl p-6"
              >
                <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{service.description}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="projects" className="mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:px-16">
        <motion.div
          variants={containerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">Selected client builds with modern visuals, motion, and performance.</p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {projects.map((project) => (
              <motion.article
                key={project.title}
                variants={fadeSlideUp}
                whileHover={{ rotateX: 4, rotateY: -7, y: -8 }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
                style={{ transformStyle: 'preserve-3d' }}
                className="group glass relative overflow-hidden rounded-3xl"
              >
                <div className="overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="h-64 w-full object-cover"
                  />
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/30 to-transparent p-6"
                >
                  <p className="text-xs tracking-[0.2em] text-cyan-200 uppercase">{project.category}</p>
                  <h3 className="mt-2 text-xl text-white">{project.title}</h3>
                </motion.div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-6 pb-24 pt-20 sm:px-8 lg:px-16">
        <motion.div
          variants={fadeSlideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="glass rounded-3xl p-6 sm:p-10"
        >
          <h2 className="section-title">Contact</h2>
          <p className="section-subtitle">Let’s create a standout digital experience together.</p>
          <form className="mt-10 grid gap-5 sm:grid-cols-2">
            {['Name', 'Email'].map((field) => (
              <motion.input
                key={field}
                type={field === 'Email' ? 'email' : 'text'}
                placeholder={field}
                whileFocus={{ scale: 1.01, boxShadow: '0 0 0 1px rgba(34,211,238,0.6)' }}
                className="rounded-xl border border-white/15 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none"
              />
            ))}
            <motion.textarea
              rows="5"
              placeholder="Tell me about your project"
              whileFocus={{ scale: 1.01, boxShadow: '0 0 0 1px rgba(34,211,238,0.6)' }}
              className="sm:col-span-2 rounded-xl border border-white/15 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none"
            />
            <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-4">
              <motion.button
                type="button"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-900"
              >
                Send Message
              </motion.button>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social}
                    href="#"
                    whileHover={{ y: -4, scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    className="glass rounded-full px-4 py-2 text-xs tracking-widest text-cyan-100 uppercase"
                  >
                    {social}
                  </motion.a>
                ))}
              </div>
            </div>
          </form>
        </motion.div>
      </section>
    </div>
  );
}
