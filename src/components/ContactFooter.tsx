import React from 'react';
import { MapPin, Phone, Instagram, Clock, MessageCircle, ShieldCheck, Heart } from 'lucide-react';
import { ClinicSettings } from '../types/clinic';

interface ContactFooterProps {
  settings: ClinicSettings;
  onOpenSmartForm: () => void;
}

export const ContactFooter: React.FC<ContactFooterProps> = ({ settings, onOpenSmartForm }) => {
  return (
    <footer id="contato" style={{ background: '#3A2E28', color: '#F8F6F2', paddingTop: '5rem' }}>
      <div className="container">
        
        {/* Contact Header Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3rem',
            paddingBottom: '4rem',
            borderBottom: '1px solid rgba(217, 180, 143, 0.25)',
          }}
        >
          {/* Col 1: Brand Info */}
          <div>
            <span className="font-serif" style={{ fontSize: '1.6rem', color: '#D9B48F', fontWeight: 600, letterSpacing: '0.08em', display: 'block' }}>
              {settings.brandName.toUpperCase()}
            </span>
            <span style={{ fontSize: '0.68rem', color: '#C8A46A', letterSpacing: '0.28em', textTransform: 'uppercase', display: 'block', marginBottom: '1.2rem' }}>
              {settings.subTitle}
            </span>

            <p style={{ color: '#E8E4DF', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Clínica boutique referência em tratamentos faciais e corporais de alta tecnologia e resultados naturais.
            </p>

            <button onClick={onOpenSmartForm} className="btn-primary" style={{ padding: '0.75rem 1.4rem', fontSize: '0.78rem' }}>
              <MessageCircle size={16} />
              Falar com a Equipe no WhatsApp
            </button>
          </div>

          {/* Col 2: Info & Hours */}
          <div>
            <h4 style={{ color: '#D9B48F', fontSize: '1.1rem', marginBottom: '1.2rem', fontFamily: 'Cormorant Garamond, serif' }}>
              Horários & Localização
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', fontSize: '0.88rem', color: '#E8E4DF' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                <MapPin size={18} className="text-gold" style={{ flexShrink: 0, marginTop: '3px' }} />
                <div>
                  <strong>{settings.address}</strong>
                  <span style={{ display: 'block', fontSize: '0.8rem', color: '#D9B48F' }}>{settings.cityState}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                <Clock size={18} className="text-gold" style={{ flexShrink: 0, marginTop: '3px' }} />
                <div>
                  <span>{settings.workingHours}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Phone size={18} className="text-gold" />
                <span>{settings.phone}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Instagram size={18} className="text-gold" />
                <a
                  href={`https://instagram.com/${settings.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: '#D9B48F', textDecoration: 'none' }}
                >
                  {settings.instagram}
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Map Preview Visual */}
          <div>
            <h4 style={{ color: '#D9B48F', fontSize: '1.1rem', marginBottom: '1.2rem', fontFamily: 'Cormorant Garamond, serif' }}>
              Nosso Endereço
            </h4>
            <div
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid rgba(200, 164, 106, 0.3)',
                height: '180px',
                position: 'relative',
                background: '#4A3B34',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '1rem',
              }}
            >
              <div>
                <MapPin size={32} className="text-gold" style={{ marginBottom: '0.5rem' }} />
                <strong style={{ display: 'block', fontSize: '0.88rem', color: '#FFF' }}>Itaim Bibi - São Paulo</strong>
                <span style={{ fontSize: '0.75rem', color: '#D9B48F' }}>Valet & Estacionamento no Local</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar & LGPD */}
        <div
          style={{
            padding: '1.8rem 0',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.78rem',
            color: '#D9B48F',
          }}
        >
          <div>
            © {new Date().getFullYear()} {settings.brandName} - {settings.subTitle}. Todos os direitos reservados.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <ShieldCheck size={14} /> Em conformidade com a LGPD
            </span>
            <a href="#hero" style={{ color: '#D9B48F', textDecoration: 'underline' }}>
              Política de Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
