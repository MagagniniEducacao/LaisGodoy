import React, { useState, useEffect } from 'react';
import { Calendar, Settings, Menu, X, PhoneCall } from 'lucide-react';
import type { ClinicSettings } from '../types/clinic';

interface HeaderProps {
  settings: ClinicSettings;
  onOpenAdmin: () => void;
  onOpenSmartForm: (treatmentName?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ settings, onOpenAdmin, onOpenSmartForm }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início', href: '#hero' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Tratamentos', href: '#tratamentos' },
    { label: 'Antes & Depois', href: '#antes-depois' },
    { label: 'Depoimentos', href: '#depoimentos' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contato', href: '#contato' },
  ];

  return (
    <>
      {/* Top Banner Notice */}
      <div style={{
        background: 'linear-gradient(90deg, #A97A54 0%, #C8A46A 50%, #8A6245 100%)',
        color: '#FFF',
        fontSize: '0.75rem',
        letterSpacing: '0.12em',
        padding: '0.4rem 1rem',
        textAlign: 'center',
        fontWeight: 500,
        textTransform: 'uppercase'
      }}>
        ✨ Atendimento Boutique Exclusivo com Horário Marcado | Agende sua Avaliação Personalizada
      </div>

      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: isScrolled ? 'rgba(248, 246, 242, 0.95)' : 'rgba(248, 246, 242, 0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: isScrolled ? '1px solid rgba(200, 164, 106, 0.25)' : '1px solid transparent',
          transition: 'all 0.3s ease',
          padding: isScrolled ? '0.8rem 0' : '1.2rem 0',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <a href="#hero" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
            <span className="font-serif" style={{ fontSize: '1.4rem', color: '#8A6245', fontWeight: 600, letterSpacing: '0.08em' }}>
              {settings.brandName.toUpperCase()}
            </span>
            <span style={{ fontSize: '0.65rem', color: '#A97A54', letterSpacing: '0.28em', textTransform: 'uppercase', marginTop: '-2px' }}>
              {settings.subTitle}
            </span>
          </a>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="desktop-only">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  color: '#3A2E28',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 400,
                  letterSpacing: '0.05em',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#C8A46A')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#3A2E28')}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <button
              onClick={onOpenAdmin}
              title="Abrir Painel Administrativo CMS"
              style={{
                background: 'rgba(243, 230, 211, 0.7)',
                border: '1px solid #D9B48F',
                borderRadius: '50%',
                width: '38px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#8A6245',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#D9B48F')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(243, 230, 211, 0.7)')}
            >
              <Settings size={18} />
            </button>

            <button
              onClick={() => onOpenSmartForm()}
              className="btn-primary"
              style={{ padding: '0.65rem 1.4rem', fontSize: '0.78rem' }}
            >
              <Calendar size={15} />
              Agendar Avaliação
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-only"
              style={{
                background: 'none',
                border: 'none',
                color: '#8A6245',
                cursor: 'pointer',
                padding: '0.5rem',
              }}
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div
            style={{
              background: '#F8F6F2',
              borderTop: '1px solid #E8E4DF',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.2rem',
              textAlign: 'center',
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  color: '#8A6245',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: 500,
                }}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSmartForm();
              }}
              className="btn-primary"
              style={{ width: '100%', marginTop: '0.5rem' }}
            >
              <PhoneCall size={16} />
              Solicitar pelo WhatsApp
            </button>
          </div>
        )}
      </header>

      <style>{`
        @media (max-width: 900px) {
          .desktop-only { display: none !important; }
        }
        @media (min-width: 901px) {
          .mobile-only { display: none !important; }
        }
      `}</style>
    </>
  );
};
