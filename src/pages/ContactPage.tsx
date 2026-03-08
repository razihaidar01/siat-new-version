import ContactSection from "@/components/home/ContactSection";
import SEOHead from "@/components/SEOHead";

const ContactPage = () => {
  return (
    <>
      <SEOHead title="Contact SIAT – Training Institute in Saharsa, Bihar" description="Get in touch with SIAT for admissions, course inquiries, consultancy services, and government project partnerships in Bihar." />
      <section className="section-padding pb-0" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Contact Us</span>
          <h1 className="text-4xl md:text-6xl font-display font-black text-foreground mt-4 mb-4">
            Let's <span className="gradient-text">Connect</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Have questions about our courses, services, or partnerships? We'd love to hear from you.
          </p>
        </div>
      </section>
      <ContactSection />
    </>
  );
};

export default ContactPage;
