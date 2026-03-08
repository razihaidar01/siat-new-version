import { useState, useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

const GalleryPage = () => {
  const [images, setImages] = useState<any[]>([]);
  const [category, setCategory] = useState("all");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("images").select("*").order("created_at", { ascending: false });
      if (data) setImages(data);
    };
    load();
  }, []);

  const categories = ["all", ...new Set(images.map((i) => i.category).filter(Boolean))];
  const filtered = category === "all" ? images : images.filter((i) => i.category === category);

  return (
    <>
      <SEOHead title="Photo Gallery – SIAT Training Institute Bihar" description="Browse SIAT's photo gallery showcasing our training labs, classrooms, events, and student activities in Saharsa, Bihar." />
      <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mb-6">
              Our <span className="gradient-text">Gallery</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              SIAT ki labs, events, training sessions aur infrastructure ki photos dekhein.
            </p>
          </motion.div>
        </div>
      </section>

      <section ref={ref} className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  category === cat ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-primary/10"
                }`}
              >
                {cat === "all" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">No images yet. Check back soon!</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((img, i) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="glass-card-hover overflow-hidden group"
                >
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={img.file_url}
                      alt={img.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div>
                        <p className="text-background font-medium text-sm">{img.title}</p>
                        <p className="text-background/70 text-xs">{img.category}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default GalleryPage;
