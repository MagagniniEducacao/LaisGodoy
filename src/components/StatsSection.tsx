import React from 'react';
import { Users, Calendar, Award, Heart } from 'lucide-react';
import { ClinicSettings } from '../types/clinic';

interface StatsProps {
  settings: ClinicSettings;
}

export const StatsSection: React.FC<StatsProps> = ({ settings }) => {
  const stats = [
    {
      icon: <Users size={28} className="text-gold" />,
      value: settings.patientsCount,
      label: 'Pacientes Satisfeitas',
      subtext: 'Resultados Comprovados',
    },
    {
      icon: <Calendar size={28} className="text-gold" />,
      value: `${settings.experienceYears}+ Anos`,
      label: 'De Experiência',
      subtext: 'Evolução e Técnica',
    },
    {
      icon: <Award size={28} className="text-gold" />,
      value: `${settings.protocolsCount}+`,
      label: 'Protocolos Exclusivos',
      subtext: 'Alta Tecnologia',
    },
    {
      icon: <Heart size={28} className="text-gold" />,
      value: '100%',
      label: 'Atendimento Personalizado',
      subtext: 'Foco na Sua Necessidade',
    },
  ];

  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #F3E6D3 0%, #F8F6F2 50%, #E8E4DF 100%)',
        padding: '3.5rem 0',
        borderTop: '1px solid #D9B48F',
        borderBottom: '1px solid #D9B48F',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2rem',
            textAlign: 'center',
          }}
        >
          {stats.map((stat, idx) => (
            <div
              key={idx}
              style={{
                padding: '1.5rem',
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(8px)',
                borderRadius: '16px',
                border: '1px solid rgba(200, 164, 106, 0.3)',
                boxShadow: 'var(--shadow-subtle)',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.8rem' }}>
                {stat.icon}
              </div>
              <h3 className="font-serif" style={{ fontSize: '2.2rem', color: '#8A6245', marginBottom: '0.2rem' }}>
                {stat.value}
              </h3>
              <p style={{ fontWeight: 600, color: '#3A2E28', fontSize: '0.9rem', marginBottom: '0.2rem' }}>
                {stat.label}
              </p>
              <span style={{ fontSize: '0.75rem', color: '#7A695D', letterSpacing: '0.05em' }}>
                {stat.subtext}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
