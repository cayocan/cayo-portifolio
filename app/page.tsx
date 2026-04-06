"use client";

import { motion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  Bot,
  Brain,
  Boxes,
  Briefcase,
  Code2,
  Cpu,
  Database,
  Github,
  Layers,
  Linkedin,
  Mail,
  Shield,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import ProjectCard from "../components/ProjectCard";
import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  kicker: string;
  icon: LucideIcon;
  children: ReactNode;
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const skills = [
  {
    title: "Backend",
    icon: Database,
    items: ["C#", ".NET", "Entity Framework", "Flask", "SQL & APIs"],
  },
  {
    title: "Frontend",
    icon: Code2,
    items: ["Next.js", "React Native", "Tailwind CSS", "TypeScript", "Angular"],
  },
  {
    title: "AI / DevOps",
    icon: Cpu,
    items: ["Copilot", "Docker", "CI/CD", "Prompt Engineering", "ML Integration"],
  },
  {
    title: "Specialized",
    icon: Boxes,
    items: ["Unity", "Blockchain", "Realtime Systems", "AI Automation", "Data Ops"],
  },
];

const projects = [
  {
    title: "Apex AI",
    description:
      "Sim racing telemetry platform delivering real-time coaching, lap delta insights, and predictive performance cues.",
    tags: ["C#", ".NET", "Realtime", "Telemetry"],
    icon: Activity,
    category: "backend" as const,
    imageSrc: "/gifs/apex-ai.gif",
    imageAlt: "Preview do projeto Apex AI",
  },
  {
    title: "Argus Bot",
    description:
      "ML-driven crypto trading stack with automated data engineering pipelines, signal scoring, and risk controls.",
    tags: ["Python", "ML", "Data Engineering", "Automation"],
    icon: Bot,
    category: "ai" as const,
    imageSrc: "/gifs/argus-bot.gif",
    imageAlt: "Preview do projeto Argus Bot",
  },
  {
    title: "FishDex",
    description:
      "AI-powered marine species identification with smart capture workflows and taxonomy enrichment.",
    tags: ["AI", "Vision", "Mobile", "Product"],
    icon: Sparkles,
    category: "ai" as const,
    imageSrc: "/gifs/fishdex.gif",
    imageAlt: "Preview do projeto FishDex",
  },
  {
    title: "Arbitrage Bot",
    description:
      "Spot/Future and Future/Future high-frequency arbitrage engine with latency-aware execution logic.",
    tags: ["HFT", "Risk", "Execution", "Strategy"],
    icon: Shield,
    category: "web3" as const,
    imageSrc: "/gifs/arbitrage-bot.gif",
    imageAlt: "Preview do projeto Arbitrage Bot",
  },
];

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com/",
    icon: Github,
  },
  {
    label: "Email",
    href: "mailto:cayocan@gmail.com",
    icon: Mail,
  },
];

function Section({ id, title, kicker, icon: Icon, children }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
      className="mx-auto w-full max-w-6xl px-6 py-20"
    >
      <motion.div variants={fadeUp} className="flex items-center gap-4">
        <span className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sky-300">
          <Icon className="h-6 w-6" />
        </span>
        <div>
          <p className="text-xs uppercase tracking-[0.36em] text-slate-400">{kicker}</p>
          <h2 className="text-3xl font-semibold text-white md:text-4xl">{title}</h2>
        </div>
      </motion.div>
      <motion.div variants={fadeUp} className="mt-10">
        {children}
      </motion.div>
    </motion.section>
  );
}

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#050608] text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(163,230,53,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:64px_64px] opacity-30" />
      </div>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        variants={stagger}
        className="relative mx-auto grid w-full max-w-6xl gap-12 px-6 pb-16 pt-24 md:grid-cols-[1.2fr_0.8fr]"
      >
        <motion.div variants={fadeUp} className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-300">
            <Sparkles className="h-4 w-4 text-sky-300" />
            Disponivel para contratacao
          </div>
          <div className="space-y-6">
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-6xl">
              Cayo Aguiar do Nascimento
            </h1>
            <p className="text-lg text-slate-300 md:text-xl">
              Full Stack Developer | C# & .NET Specialist | AI & Unity Developer
            </p>
            <p className="max-w-xl text-base leading-relaxed text-slate-400">
              Ajudo empresas a construir plataformas resilientes e experiências inteligentes que entregam performance, escala e clareza de uso. Combino rigor de backend, interfaces modernas e automação com IA para acelerar resultados.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
            >
              Ver projetos
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
            >
              Vamos Conversar
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-slate-400">
            <span className="inline-flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-sky-300" />
              Disponivel para oportunidades full stack
            </span>
            <span className="inline-flex items-center gap-2">
              <Brain className="h-4 w-4 text-lime-300" />
              Foco em produtos com IA e automacao
            </span>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="relative flex items-center justify-center"
          style={{ perspective: "1200px" }}
        >
          <motion.div
            animate={{
              y: [0, -12, 0],
              rotateX: [0, 8, 0],
              rotateY: [0, -6, 0],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative w-full max-w-sm rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/60 backdrop-blur"
          >
            <div className="absolute inset-0 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent" />
            <div className="relative space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.28em] text-slate-400">Signature Stack</span>
                <Layers className="h-5 w-5 text-sky-300" />
              </div>
              <div className="space-y-3">
                {[
                  "C#/.NET Systems",
                  "Next.js Interfaces",
                  "AI & Prompt Pipelines",
                  "Unity Simulations",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200"
                  >
                    {item}
                    <span className="h-2 w-2 rounded-full bg-sky-400" />
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-sky-500/20 via-white/5 to-lime-400/20 p-4 text-sm text-slate-200">
                Entregando sistemas confiaveis, rapidos e prontos para escala.
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      <Section id="skills" title="Competencias-chave" kicker="Skills" icon={Code2}>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {skills.map((skill) => (
            <motion.div
              key={skill.title}
              variants={fadeUp}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <div className="flex items-center gap-3">
                <span className="rounded-xl border border-white/10 bg-white/5 p-2 text-sky-300">
                  <skill.icon className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-semibold text-white">{skill.title}</h3>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                {skill.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="projects" title="Projetos em destaque" kicker="Trabalhos" icon={Sparkles}>
        <div className="grid gap-6">
          {projects.map((project, index) => (
            <motion.div key={project.title} variants={fadeUp} className="h-full">
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="contact" title="Pronto para contribuir com sua equipe" kicker="Contato" icon={Mail}>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.form
            variants={fadeUp}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm text-slate-300">
                Name
                <input
                  type="text"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400"
                  placeholder="Your name"
                />
              </label>
              <label className="text-sm text-slate-300">
                Email
                <input
                  type="email"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400"
                  placeholder="you@email.com"
                />
              </label>
            </div>
            <label className="mt-4 block text-sm text-slate-300">
              Como posso ajudar
              <textarea
                rows={4}
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400"
                placeholder="Conte sobre a vaga, stack, desafios e objetivos."
              />
            </label>
            <button
              type="submit"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
            >
              Enviar mensagem
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </motion.form>

          <motion.div variants={fadeUp} className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h3 className="text-xl font-semibold text-white">Contato direto</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Disponivel para conversar sobre oportunidades, projetos desafiadores e produtos com IA.
              </p>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-sky-300" />
                  cayocan@gmail.com
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h3 className="text-xl font-semibold text-white">Redes</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-white/30 hover:bg-white/10"
                  >
                    <social.icon className="h-4 w-4 text-sky-300" />
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Section>
    </main>
  );
}
