import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SiteLayout from "./components/SiteLayout";
import RHLayout from "./components/rh/RHLayout";
import ScrollToTop from "./components/ScrollToTop";
import LoadingScreen from "./components/LoadingScreen";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import MobileRepairingPage from "./pages/MobileRepairingPage";
import ACRepairingPage from "./pages/ACRepairingPage";
import LaptopRepairingPage from "./pages/LaptopRepairingPage";
import CCTVInstallationPage from "./pages/CCTVInstallationPage";
import WebDevelopmentPage from "./pages/WebDevelopmentPage";
import AppDevelopmentPage from "./pages/AppDevelopmentPage";
import AIDevelopmentPage from "./pages/AIDevelopmentPage";
import MBBSAdmissionPage from "./pages/MBBSAdmissionPage";
import ISOCertificationPage from "./pages/ISOCertificationPage";
import GovSkillTrainingPage from "./pages/GovSkillTrainingPage";
import VerifyCertificatePage from "./pages/VerifyCertificatePage";
import GalleryPage from "./pages/GalleryPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminPanelPage from "./pages/AdminPanelPage";
import RHSoftwarePage from "./pages/RHSoftwarePage";
import RHServicesPage from "./pages/RHServicesPage";
import RHPricingPage from "./pages/RHPricingPage";
import RHPortfolioPage from "./pages/RHPortfolioPage";
import RHContactPage from "./pages/RHContactPage";
import RHBlogPage from "./pages/RHBlogPage";
import NotFound from "./pages/NotFound";

// Hub pages
import TrainingInstitutePage from "./pages/TrainingInstitutePage";
import ConsultancyServicesPage from "./pages/ConsultancyServicesPage";
import GovernmentProjectsPage from "./pages/GovernmentProjectsPage";

// Training subpages
import ShortTermCoursesPage from "./pages/ShortTermCoursesPage";
import TechnicalTrainingPage from "./pages/TechnicalTrainingPage";
import CourseFeesPage from "./pages/CourseFeesPage";
import PlacementSupportPage from "./pages/PlacementSupportPage";
import StudentTestimonialsPage from "./pages/StudentTestimonialsPage";

// Consultancy subpages
import BestCollegePage from "./pages/BestCollegePage";
import BTechAdmissionPage from "./pages/BTechAdmissionPage";
import BCACollegePage from "./pages/BCACollegePage";
import NursingCollegePage from "./pages/NursingCollegePage";
import AdmissionAfter12thPage from "./pages/AdmissionAfter12thPage";
import BiharStudentCreditCardPage from "./pages/BiharStudentCreditCardPage";
import MSMERegistrationPage from "./pages/MSMERegistrationPage";

// Government subpages
import PMKVYPage from "./pages/PMKVYPage";
import MSMEEducationTenderPage from "./pages/MSMEEducationTenderPage";
import SkillIndiaPage from "./pages/SkillIndiaPage";
import CSREducationPage from "./pages/CSREducationPage";
import CapabilityStatementPage from "./pages/CapabilityStatementPage";
import EmpanelmentPage from "./pages/EmpanelmentPage";

// Misc pages
import ChairmanMessagePage from "./pages/ChairmanMessagePage";
import OurTeamPage from "./pages/OurTeamPage";
import InfrastructurePage from "./pages/InfrastructurePage";
import CertificationsPage from "./pages/CertificationsPage";
import BrochurePage from "./pages/BrochurePage";
import AdmissionFormPage from "./pages/AdmissionFormPage";
import FAQsPage from "./pages/FAQsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsConditionsPage from "./pages/TermsConditionsPage";
import DisclaimerPage from "./pages/DisclaimerPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LoadingScreen />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* SIAT Main Site */}
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/about-us" element={<AboutPage />} />
            <Route path="/contact-us" element={<ContactPage />} />

            {/* Training Institute */}
            <Route path="/training-institute" element={<TrainingInstitutePage />} />
            <Route path="/training-institute/mobile-repairing-course-bihar" element={<MobileRepairingPage />} />
            <Route path="/training-institute/ac-repairing-course-bihar" element={<ACRepairingPage />} />
            <Route path="/training-institute/laptop-repairing-course-bihar" element={<LaptopRepairingPage />} />
            <Route path="/training-institute/cctv-installation-training-bihar" element={<CCTVInstallationPage />} />
            <Route path="/training-institute/short-term-job-courses-bihar" element={<ShortTermCoursesPage />} />
            <Route path="/training-institute/technical-training-institute-saharsa" element={<TechnicalTrainingPage />} />
            <Route path="/training-institute/course-fees" element={<CourseFeesPage />} />
            <Route path="/training-institute/placement-support" element={<PlacementSupportPage />} />
            <Route path="/training-institute/student-testimonials" element={<StudentTestimonialsPage />} />
            <Route path="/training-institute/gallery" element={<Navigate to="/gallery" replace />} />

            {/* Consultancy */}
            <Route path="/consultancy-services" element={<ConsultancyServicesPage />} />
            <Route path="/consultancy-services/best-college-in-bihar" element={<BestCollegePage />} />
            <Route path="/consultancy-services/mbbs-admission-bihar" element={<MBBSAdmissionPage />} />
            <Route path="/consultancy-services/btech-admission-bihar" element={<BTechAdmissionPage />} />
            <Route path="/consultancy-services/bca-college-bihar" element={<BCACollegePage />} />
            <Route path="/consultancy-services/nursing-college-bihar" element={<NursingCollegePage />} />
            <Route path="/consultancy-services/admission-after-12th-bihar" element={<AdmissionAfter12thPage />} />
            <Route path="/consultancy-services/bihar-student-credit-card-admission" element={<BiharStudentCreditCardPage />} />
            <Route path="/consultancy-services/iso-certification-bihar" element={<ISOCertificationPage />} />
            <Route path="/consultancy-services/msme-registration" element={<MSMERegistrationPage />} />

            {/* Government Projects */}
            <Route path="/government-projects" element={<GovernmentProjectsPage />} />
            <Route path="/government-projects/government-skill-training-bihar" element={<GovSkillTrainingPage />} />
            <Route path="/government-projects/pmkvy-training-center-bihar" element={<PMKVYPage />} />
            <Route path="/government-projects/msme-education-tender" element={<MSMEEducationTenderPage />} />
            <Route path="/government-projects/skill-india-training-partner" element={<SkillIndiaPage />} />
            <Route path="/government-projects/csr-education-projects" element={<CSREducationPage />} />
            <Route path="/government-projects/capability-statement" element={<CapabilityStatementPage />} />
            <Route path="/government-projects/empanelment" element={<EmpanelmentPage />} />

            {/* Other pages */}
            <Route path="/verify-certificate" element={<VerifyCertificatePage />} />
            <Route path="/verify" element={<VerifyCertificatePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/chairman-message" element={<ChairmanMessagePage />} />
            <Route path="/our-team" element={<OurTeamPage />} />
            <Route path="/infrastructure" element={<InfrastructurePage />} />
            <Route path="/certifications" element={<CertificationsPage />} />
            <Route path="/downloads/brochure" element={<BrochurePage />} />
            <Route path="/downloads/admission-form" element={<AdmissionFormPage />} />
            <Route path="/faqs" element={<FAQsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-conditions" element={<TermsConditionsPage />} />
            <Route path="/disclaimer" element={<DisclaimerPage />} />
            <Route path="/opening" element={<OpeningPage />} />
          </Route>

          {/* RH Software — separate dark-themed layout */}
          <Route element={<RHLayout />}>
            <Route path="/rhsoftware" element={<RHSoftwarePage />} />
            <Route path="/rh-software" element={<Navigate to="/rhsoftware" replace />} />
            <Route path="/rhsoftware/services" element={<RHServicesPage />} />
            <Route path="/rhsoftware/website-development-company-bihar" element={<RHServicesPage />} />
            <Route path="/rhsoftware/app-development-company-bihar" element={<RHServicesPage />} />
            <Route path="/rhsoftware/software-development-company-bihar" element={<RHServicesPage />} />
            <Route path="/rhsoftware/ai-development-company-bihar" element={<RHServicesPage />} />
            <Route path="/rhsoftware/erp-crm-development" element={<RHServicesPage />} />
            <Route path="/rhsoftware/portfolio" element={<RHPortfolioPage />} />
            <Route path="/rhsoftware/case-studies" element={<RHPortfolioPage />} />
            <Route path="/rhsoftware/pricing" element={<RHPricingPage />} />
            <Route path="/rhsoftware/contact" element={<RHContactPage />} />
            <Route path="/rhsoftware/blog" element={<RHBlogPage />} />
          </Route>

          {/* Admin routes */}
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route path="/adminarea" element={<AdminPanelPage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
