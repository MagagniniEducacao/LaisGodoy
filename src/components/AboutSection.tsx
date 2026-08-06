import React from 'react';
import { Sparkles, HeartHandshake, Microchip, Clock, Award } from 'lucide-react';
import type { ClinicSettings } from '../types/clinic';

interface AboutProps {
  settings: ClinicSettings;
}

export const AboutSection: React.FC<AboutProps> = ({ settings }) => {
  const differentials = [
    {
      icon: <Microchip size={22} className="text-gold" />,
      title: 'Alta Tecnologia Integrada',
      desc: 'Equipamentos médicos certificados pela ANVISA para Ultrassom, Radiofrequência e Corrente Russa.',
    },
    {
      icon: <HeartHandshake size={22} className="text-gold" />,
      title: 'Atendimento Humanizado',
      desc: 'Anamnese profunda e acolhedora em um ambiente boutique silencioso e privado.',
    },
    {
      icon: <Award size={22} className="text-gold" />,
      title: 'Protocolos Exclusivos',
      desc: 'Combinações de ativos bioestimuladores formulados sob medida para seu objetivo.',
    },
    {
      icon: <Clock size={22} className="text-gold" />,
      title: 'Resultados Naturais',
      desc: 'Valorização da sua beleza estrutural sem exageros ou feições artificiais.',
    },
  ];

  return (
    <section id="sobre" className="section-padding" style={{ background: '#FFF', position: 'relative' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '4rem',
            alignItems: 'center',
          }}
        >
          {/* Photos Collage */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', position: 'relative' }}>
            <div style={{ borderRadius: '16px', overflow: 'hidden', height: '280px', boxShadow: 'var(--shadow-subtle)' }}>
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600"
                alt="Dra. Lais Godoy Atendimento"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ borderRadius: '16px', overflow: 'hidden', height: '280px', marginTop: '2rem', boxShadow: 'var(--shadow-subtle)' }}>
              <img
                src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=600"
                alt="Equipamento Estético de Alta Tecnologia"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Text Content */}
          <div>
            <div className="glass-pill" style={{ marginBottom: '1rem' }}>
              <Sparkles size={14} className="text-gold" />
              <span>Conheça a Dra. Lais Godoy</span>
            </div>

            <h2 className="font-serif" style={{ color: '#8A6245', marginBottom: '1.2rem' }}>
              Ciência, Tecnologia e Excelência em Estética Avançada
            </h2>

            <div className="gold-divider" style={{ margin: '0 0 1.5rem 0' }} />

            <p style={{ marginBottom: '1.2rem', lineHeight: 1.7 }}>
              {settings.draLaisBio}
            </p>

            <p style={{ marginBottom: '2rem', lineHeight: 1.7 }}>
              Acreditamos que cuidar da pele e do corpo vai além de tratamentos estéticos pontuais: é um ritual de reconexão, saúde e elevação da autoestima feminina com segurança e rigor técnico.
            </p>

            {/* Differential Items Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
              {differentials.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '1rem',
                    background: '#F8F6F2',
                    borderRadius: '12px',
                    border: '1px solid #E8E4DF',
                  }}
                >
                  <div style={{ marginBottom: '0.4rem' }}>{item.icon}</div>
                  <h4 style={{ fontSize: '0.88rem', color: '#8A6245', fontWeight: 600, marginBottom: '0.2rem' }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '0.75rem', color: '#7A695D', lineHeight: 1.4 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
