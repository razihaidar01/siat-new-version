import { Outlet } from "react-router-dom";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import WhatsAppButton from "./WhatsAppButton";
import AIChatWidget from "./AIChatWidget";
import ScrollToTopButton from "./ScrollToTopButton";

const SiteLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 pt-16 md:pt-20">
        <Outlet />
      </main>
      <SiteFooter />
      <WhatsAppButton />
      <AIChatWidget />
      <ScrollToTopButton />
    </div>
  );
};

export default SiteLayout;
