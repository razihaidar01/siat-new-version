import { useParams, Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, CheckCircle2, ChevronRight } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { getRhProjectBySlug, rhProjects } from "@/data/rhProjects";
import {
  RH_BASE_URL, rhOrganizationSchema, rhBreadcrumb, rhServiceSchema,
} from "@/lib/rhSeo";

const RHCaseStudyPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getRhProjectBySlug(slug) : null;
  if (!project) return <Navigate to="/rhsoftware/portfolio" replace />;

  const url = `${RH_BASE_URL}/rhsoftware/portfolio/${project.slug}`;
  const related = rhProjects.filter((p) => p.slug !== project.slug).slice(0, 3);

  useSEO({
    title: `${project.title} — ${project.industry} Case Study | RH Software`,
    description: `${project.outcome} Built by RH Software (by SIAT) for a ${project.industry.toLowerCase()} client. Stack: ${project.stack.join(", ")}.`,
    keywords: `${project.title} case study, ${project.industry} software development, ${project.category} case study bihar, RH Software portfolio, ${project.serviceType ?? ""}`,
    canonical: url,
    ogImage: project.image,
    ogType: "article",
    schema: [
      rhOrganizationSchema,
      rhBreadcrumb([
        { name: "Home", url: RH_BASE_URL },
        { name: "RH Software", url: `${RH_BASE_URL}/rhsoftware` },
        { name: "Portfolio", url: `${RH_BASE_URL}/rhsoftware/portfolio` },
        { name: project.title, url },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "@id": `${url}#case-study`,
        name: project.title,
        headline: `${project.title} — ${project.industry} Case Study`,
        description: project.outcome,
        url,
        image: project.image,
        about: project.industry,
        keywords: [project.category, project.industry, ...project.stack].join(", "),
        creator: { "@id": `${RH_BASE_URL}/rhsoftware#organization` },
        publisher: { "@id": `${RH_BASE_URL}/rhsoftware#organization` },
      },
      project.serviceType
        ? rhServiceSchema(project.serviceType, project.solution, url)
        : null,
    ].filter(Boolean) as object[],
  });

  return (
    <div className="px-6 md:px-10 py-12 md:py-16">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[12px] text-white/40 mb-8 flex-wrap">
          <Link to="/rhsoftware" className="hover:text-white/70">RH Software</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/rhsoftware/portfolio" className="hover:text-white/70">Portfolio</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white/70">{project.title}</span>
        </nav>

        <Link to="/rhsoftware/portfolio" className="inline-flex items-center gap-1.5 text-[13px] text-white/50 hover:text-white mb-6">
          <ArrowLeft className="w-3.5 h-3.5" /> All case studies
        </Link>

        <span className="rh-eyebrow"><span className="dot" />{project.category} · {project.industry}</span>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[36px] md:text-[56px] leading-[1.05] font-semibold tracking-[-0.02em] mt-5"
        >
          {project.title}
        </motion.h1>
        <p className="mt-5 text-[16px] md:text-[18px] rh-text-muted max-w-3xl leading-relaxed">{project.outcome}</p>

        {/* Hero image */}
        <div className="relative mt-10 rounded-2xl overflow-hidden border border-white/[0.06] aspect-[16/9]">
          <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-20`} />
          <img src={project.image} alt={`${project.title} — ${project.industry} project by RH Software`} loading="lazy" className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity" />
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-3 md:gap-5 mt-10">
          {project.metrics.map((m) => (
            <div key={m.label} className="rh-surface p-5 text-center">
              <div className="text-[22px] md:text-[28px] font-semibold tracking-tight">{m.value}</div>
              <div className="text-[11px] rh-text-dim mt-1 leading-tight">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Body */}
        <div className="mt-14 space-y-12">
          <section>
            <h2 className="text-[22px] md:text-[26px] font-semibold tracking-tight">The challenge</h2>
            <p className="mt-3 rh-text-muted leading-relaxed text-[15.5px] max-w-3xl">{project.challenge}</p>
          </section>
          <section>
            <h2 className="text-[22px] md:text-[26px] font-semibold tracking-tight">Our solution</h2>
            <p className="mt-3 rh-text-muted leading-relaxed text-[15.5px] max-w-3xl">{project.solution}</p>
          </section>
          <section>
            <h2 className="text-[22px] md:text-[26px] font-semibold tracking-tight">Outcome</h2>
            <p className="mt-3 rh-text-muted leading-relaxed text-[15.5px] max-w-3xl">{project.outcome}</p>
            <ul className="mt-5 grid sm:grid-cols-2 gap-2 max-w-2xl">
              {project.metrics.map((m) => (
                <li key={m.label} className="flex items-center gap-2 text-[14px] text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{m.label}: <span className="font-semibold text-white">{m.value}</span></span>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-[22px] md:text-[26px] font-semibold tracking-tight">Tech stack</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((t) => (
                <span key={t} className="text-[12.5px] px-3 py-1.5 rounded-md border border-white/[0.08] bg-white/[0.03] text-white/75">{t}</span>
              ))}
            </div>
          </section>
        </div>

        {/* CTA */}
        <div className="rh-surface-elevated p-8 md:p-10 mt-14 text-center">
          <h3 className="text-[24px] md:text-[28px] font-semibold tracking-tight">Want a result like this?</h3>
          <p className="rh-text-muted mt-3 text-[14.5px]">Tell us about your project — we'll come back with a roadmap in 24 hours.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/rhsoftware/contact" className="rh-btn rh-btn-primary">Book a strategy call <ArrowUpRight className="w-4 h-4" /></Link>
            <Link to="/rhsoftware/portfolio" className="rh-btn rh-btn-ghost">More case studies</Link>
          </div>
        </div>

        {/* Related */}
        <div className="mt-16">
          <h3 className="text-[18px] font-semibold mb-5">More work from RH Software</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {related.map((r) => (
              <Link key={r.slug} to={`/rhsoftware/portfolio/${r.slug}`} className="rh-surface rh-card-hover p-5 block">
                <div className="text-[11px] rh-text-dim uppercase tracking-[0.16em]">{r.category}</div>
                <div className="text-[15px] font-semibold mt-2">{r.title}</div>
                <div className="text-[12px] rh-text-muted mt-1.5 line-clamp-2">{r.outcome}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RHCaseStudyPage;
