import { useState, useEffect, useRef } from "react";
import SEOHead from "@/components/SEOHead";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { X, Play } from "lucide-react";

const GalleryPage = () => {
  const [items, setItems] = useState<any[]>([]);
  const [category, setCategory] = useState("all");
  const [mediaFilter, setMediaFilter] = useState<"all" | "image" | "video">("all");
  const [lightbox, setLightbox] = useState<any>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("images").select("*").order("created_at", { ascending: false });
      if (data) setItems(data);
    };
    load();

    // realtime keeps gallery in sync
    const channel = supabase
      .channel("gallery-items")
      .on("postgres_changes", { event: "*", schema: "public", table: "images" }, () => load())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const categories = ["all", ...Array.from(new Set(items.map((i) => i.category).filter(Boolean)))];
  const filtered = items
    .filter((i) => mediaFilter === "all" || (i.media_type ?? "image") === mediaFilter)
    .filter((i) => category === "all" || i.category === category);

  return (
    <>
      <SEOHead
        title="Photo & Video Gallery – SIAT Training Institute Bihar"
        description="Browse SIAT's photo and video gallery showcasing our training labs, classrooms, events, and student activities in Saharsa, Bihar."
      />
      <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mb-6">
              Our <span className="gradient-text">Gallery</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              SIAT ki labs, events, training sessions aur infrastructure ki photos & videos dekhein.
            </p>
          </motion.div>
        </div>
      </section>

      <section ref={ref} className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          {/* Media-type filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {(["all", "image", "video"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setMediaFilter(t)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  mediaFilter === t ? "bg-foreground text-background" : "bg-secondary text-secondary-foreground hover:bg-primary/10"
                }`}
              >
                {t === "all" ? "All Media" : t === "image" ? "Photos" : "Videos"}
              </button>
            ))}
          </div>

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
            <p className="text-center text-muted-foreground py-12">No items yet. Check back soon!</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((item, i) => {
                const isVideo = (item.media_type ?? "image") === "video";
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: Math.min(i, 12) * 0.04 }}
                    className="glass-card-hover overflow-hidden group cursor-pointer"
                    onClick={() => setLightbox(item)}
                  >
                    <div className="aspect-square relative overflow-hidden bg-black">
                      {isVideo ? (
                        <>
                          <video
                            src={item.file_url}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            muted
                            playsInline
                            preload="metadata"
                            poster={item.thumbnail_url || undefined}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                            <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                              <Play className="w-6 h-6 text-foreground translate-x-0.5" fill="currentColor" />
                            </div>
                          </div>
                          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 text-white text-[10px] font-bold uppercase tracking-wider">
                            Video
                          </div>
                        </>
                      ) : (
                        <img
                          src={item.file_url}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 pointer-events-none">
                        <div>
                          <p className="text-background font-medium text-sm">{item.title}</p>
                          <p className="text-background/70 text-xs">{item.category}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 text-white/80 hover:text-white z-50 p-2"
              aria-label="Close"
            >
              <X className="w-8 h-8" />
            </button>
            {(lightbox.media_type ?? "image") === "video" ? (
              <motion.video
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                src={lightbox.file_url}
                controls
                autoPlay
                playsInline
                className="max-w-full max-h-[85vh] rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                src={lightbox.file_url}
                alt={lightbox.title}
                className="max-w-full max-h-[85vh] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
            )}
            <div className="absolute bottom-6 text-center text-white pointer-events-none">
              <p className="font-medium">{lightbox.title}</p>
              {lightbox.category && <p className="text-sm text-white/60">{lightbox.category}</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GalleryPage;
