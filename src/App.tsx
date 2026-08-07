import { useState, useEffect } from 'react';
import './styles/theme.css';
import {
  INITIAL_CLINIC_SETTINGS,
  INITIAL_TREATMENTS,
  INITIAL_BEFORE_AFTER,
  INITIAL_TESTIMONIALS,
  INITIAL_FAQS,
} from './data/initialData';
import type { Treatment, BeforeAfterItem, Testimonial, FAQItem, ClinicSettings, SmartLead } from './types/clinic';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { StatsSection } from './components/StatsSection';
import { TreatmentCatalog } from './components/TreatmentCatalog';
import { TreatmentModal } from './components/TreatmentModal';
import { BeforeAfterGallery } from './components/BeforeAfterGallery';
import { Testimonials } from './components/Testimonials';
import { SmartWhatsAppForm } from './components/SmartWhatsAppForm';
import { FAQSection } from './components/FAQSection';
import { ContactFooter } from './components/ContactFooter';
import { AdminCMSModal } from './components/AdminCMSModal';

export function App() {
  // Persistent State via localStorage
  const [settings, setSettings] = useState<ClinicSettings>(() => {
    const saved = localStorage.getItem('lg_clinic_settings');
    if (!saved) return INITIAL_CLINIC_SETTINGS;
    try {
      const parsed = JSON.parse(saved);
      return { ...INITIAL_CLINIC_SETTINGS, ...parsed };
    } catch {
      return INITIAL_CLINIC_SETTINGS;
    }
  });

  const [treatments, setTreatments] = useState<Treatment[]>(() => {
    const saved = localStorage.getItem('lg_treatments');
    return saved ? JSON.parse(saved) : INITIAL_TREATMENTS;
  });

  const [beforeAfterItems, setBeforeAfterItems] = useState<BeforeAfterItem[]>(() => {
    const saved = localStorage.getItem('lg_before_after');
    return saved ? JSON.parse(saved) : INITIAL_BEFORE_AFTER;
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem('lg_testimonials');
    return saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
  });

  const [faqs, setFaqs] = useState<FAQItem[]>(() => {
    const saved = localStorage.getItem('lg_faqs');
    return saved ? JSON.parse(saved) : INITIAL_FAQS;
  });

  const [leads, setLeads] = useState<SmartLead[]>(() => {
    const saved = localStorage.getItem('lg_leads');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 'lead-1',
            createdAt: new Date().toLocaleDateString('pt-BR'),
            name: 'Ana Paula Ramos',
            phone: '(11) 99876-5432',
            treatmentName: 'Ultrassom + Corrente Russa',
            objective: 'Reduzir medidas',
            description: 'Interesse na redução de flacidez abdominal pós-emagrecimento.',
            status: 'new',
          },
        ];
  });

  // UI Modals state
  const [selectedTreatmentModal, setSelectedTreatmentModal] = useState<Treatment | null>(null);
  const [smartFormPreselectedTreatment, setSmartFormPreselectedTreatment] = useState<string | undefined>(undefined);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('lg_clinic_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('lg_treatments', JSON.stringify(treatments));
  }, [treatments]);

  useEffect(() => {
    localStorage.setItem('lg_before_after', JSON.stringify(beforeAfterItems));
  }, [beforeAfterItems]);

  useEffect(() => {
    localStorage.setItem('lg_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('lg_faqs', JSON.stringify(faqs));
  }, [faqs]);

  useEffect(() => {
    localStorage.setItem('lg_leads', JSON.stringify(leads));
  }, [leads]);

  const handleOpenSmartForm = (treatmentName?: string) => {
    if (treatmentName) {
      setSmartFormPreselectedTreatment(treatmentName);
    }
    const targetSection = document.getElementById('solicitacao');
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddLead = (leadData: Omit<SmartLead, 'id' | 'createdAt' | 'status'>) => {
    const newLead: SmartLead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      status: 'new',
    };
    setLeads((prev) => [newLead, ...prev]);
  };

  const handleResetDefaults = () => {
    if (confirm('Deseja restaurar todas as informações e tratamentos padrão?')) {
      localStorage.clear();
      setSettings(INITIAL_CLINIC_SETTINGS);
      setTreatments(INITIAL_TREATMENTS);
      setBeforeAfterItems(INITIAL_BEFORE_AFTER);
      setTestimonials(INITIAL_TESTIMONIALS);
      setFaqs(INITIAL_FAQS);
      setLeads([]);
      alert('Dados restaurados para as configurações originais!');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Header
        settings={settings}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenSmartForm={handleOpenSmartForm}
      />

      {/* Main Sections */}
      <main style={{ flexGrow: 1 }}>
        <Hero settings={settings} onOpenSmartForm={() => handleOpenSmartForm()} />
        <AboutSection settings={settings} />
        <StatsSection settings={settings} />
        <TreatmentCatalog
          treatments={treatments}
          onSelectTreatment={(t) => setSelectedTreatmentModal(t)}
          onRequestWhatsApp={(tName) => handleOpenSmartForm(tName)}
        />
        <BeforeAfterGallery items={beforeAfterItems} />
        <Testimonials testimonials={testimonials} />
        <SmartWhatsAppForm
          treatments={treatments}
          settings={settings}
          preselectedTreatment={smartFormPreselectedTreatment}
          leads={leads}
          onAddLead={handleAddLead}
        />
        <FAQSection faqs={faqs} />
      </main>

      {/* Footer */}
      <ContactFooter 
        settings={settings} 
        onOpenSmartForm={() => handleOpenSmartForm()} 
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Treatment Detail Popup Modal */}
      <TreatmentModal
        treatment={selectedTreatmentModal}
        onClose={() => setSelectedTreatmentModal(null)}
        onRequestWhatsApp={(tName) => handleOpenSmartForm(tName)}
      />

      {/* Admin CMS Modal */}
      <AdminCMSModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        treatments={treatments}
        setTreatments={setTreatments}
        beforeAfterItems={beforeAfterItems}
        setBeforeAfterItems={setBeforeAfterItems}
        testimonials={testimonials}
        setTestimonials={setTestimonials}
        faqs={faqs}
        setFaqs={setFaqs}
        settings={settings}
        setSettings={setSettings}
        leads={leads}
        setLeads={setLeads}
        onResetDefaults={handleResetDefaults}
      />
    </div>
  );
}

export default App;
