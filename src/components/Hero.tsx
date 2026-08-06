import React from 'react';
import { Sparkles, Calendar, ChevronRight, Award, ShieldCheck, Star } from 'lucide-react';
import { ClinicSettings } from '../types/clinic';

interface HeroProps {
  settings: ClinicSettings;
  onOpenSmartForm: () => void;
}

export const Hero: React.FC<HeroProps> = ({ settings, onOpenSmartForm }) => {
  return (
    <section id="hero" className="bg-organic-pattern" style={{ position: 'relative', overflow: 'hidden', padding: '4rem 0 6rem 0' }}>
      
      {/* Decorative Organic Circles & Golden Line Art SVG Background */}
      <svg
        style={{
          position: 'absolute',
          top: '-5%',
          right: '-5%',
          width: '500px',
          height: '500px',
          pointerEvents: 'none',
          opacity: 0.25,
        }}
        viewBox="0 0 500 500"
        fill="none"
      >
        <circle cx="250" cy="250" r="200" stroke="#C8A46A" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="250" cy="250" r="230" stroke="#D9B48F" strokeWidth="1.5" />
        <path d="M150 250 C 200 150, 300 350, 350 250" stroke="#C8A46A" strokeWidth="1" />
      </svg>

      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3.5rem',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Copy & CTAs */}
          <div style={{ zIndex: 2 }}>
            <div className="glass-pill" style={{ marginBottom: '1.2rem' }}>
              <Sparkles size={14} className="text-gold" />
              <span>Clínica Boutique & Estética de Alto Padrão</span>
            </div>

            <h1 className="font-serif" style={{ marginBottom: '1.2rem', color: '#8A6245' }}>
              {settings.heroHeadline}
            </h1>

            <p style={{ fontSize: '1.1rem', color: '#7A695D', marginBottom: '2rem', maxWidth: '540px', lineHeight: 1.6 }}>
              {settings.heroTagline}
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
              <button onClick={onOpenSmartForm} className="btn-primary">
                <Calendar size={16} />
                Agendar Avaliação
              </button>

              <a href="#tratamentos" className="btn-secondary">
                Ver Tratamentos
                <ChevronRight size={16} />
              </a>
            </div>

            {/* Trust Badges */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.8rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid rgba(217, 180, 143, 0.4)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{ background: '#F3E6D3', padding: '0.4rem', borderRadius: '50%', color: '#C8A46A' }}>
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#8A6245' }}>Protocolos Exclusivos</h4>
                  <p style={{ fontSize: '0.75rem', color: '#7A695D' }}>100% Personalizados</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{ background: '#F3E6D3', padding: '0.4rem', borderRadius: '50%', color: '#C8A46A' }}>
                  <Star size={18} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#8A6245' }}>Avaliação 5 Estrelas</h4>
                  <p style={{ fontSize: '0.75rem', color: '#7A695D' }}>+1.500 Pacientes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Frame */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            {/* Background Decorative Gold Frame */}
            <div
              style={{
                position: 'absolute',
                top: '-15px',
                right: '-15px',
                width: '100%',
                height: '100%',
                maxWidth: '460px',
                border: '2px solid #C8A46A',
                borderRadius: '24px',
                zIndex: 0,
                opacity: 0.5,
              }}
            />

            {/* Main Image Frame */}
            <div
              style={{
                position: 'relative',
                zIndex: 1,
                width: '100%',
                maxWidth: '460px',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(138, 98, 69, 0.25)',
                background: '#FFFFFF',
                border: '4px solid #FFF',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=900"
                alt="Lais Godoy Estética Avançada Ambiente"
                style={{
                  width: '100%',
                  height: '480px',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />

              {/* Floating Glass Accent Badge */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  right: '20px',
                  background: 'rgba(248, 246, 242, 0.92)',
                  backdropFilter: 'blur(10px)',
                  padding: '1rem 1.2rem',
                  borderRadius: '16px',
                  border: '1px solid rgba(200, 164, 106, 0.3)',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                }}
              >
                <div
                  style={{
                    background: 'linear-gradient(135deg, #D9B48F 0%, #C8A46A 100%)',
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFF',
                    flexShrink: 0,
                  }}
                >
                  <Award size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.9rem', color: '#8A6245', fontWeight: 600 }}>Tecnologia & Ciência</h4>
                  <p style={{ fontSize: '0.78rem', color: '#7A695D' }}>Remodelação tecidual sem agressão</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
