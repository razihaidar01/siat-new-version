import { Outlet } from "react-router-dom";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import WhatsAppButton from "./WhatsAppButton";
import AIChatWidget from "./AIChatWidget";
import OrganizationSchema from "./OrganizationSchema";
import ScrollToTopButton from "./ScrollToTopButton";
import PageTransition from "./PageTransition";

const SiteLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <OrganizationSchema />
      <SiteHeader />
      <main className="flex-1 pt-16 md:pt-20">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <SiteFooter />
      <WhatsAppButton />
      <AIChatWidget />
      <ScrollToTopButton />
    </div>
  );
};

export default SiteLayout;
