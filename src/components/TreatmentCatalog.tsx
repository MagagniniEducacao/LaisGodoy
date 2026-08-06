import React, { useState } from 'react';
import { Sparkles, Clock, ArrowRight, Star } from 'lucide-react';
import { Treatment, CategoryType } from '../types/clinic';

interface CatalogProps {
  treatments: Treatment[];
  onSelectTreatment: (treatment: Treatment) => void;
  onRequestWhatsApp: (treatmentName: string) => void;
}

export const TreatmentCatalog: React.FC<CatalogProps> = ({
  treatments,
  onSelectTreatment,
  onRequestWhatsApp,
}) => {
  const [activeCategory, setActiveCategory] = useState<'todos' | CategoryType>('todos');

  const filteredTreatments = activeCategory === 'todos'
    ? treatments
    : treatments.filter((t) => t.category === activeCategory);

  const categories = [
    { key: 'todos', label: 'Todos os Tratamentos' },
    { key: 'facial', label: 'Facial' },
    { key: 'corporal', label: 'Corporal' },
    { key: 'bem-estar', label: 'Bem-Estar' },
  ];

  return (
    <section id="tratamentos" className="section-padding bg-organic-pattern">
      <div className="container">
        {/* Section Title */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3rem auto' }}>
          <div className="glass-pill" style={{ marginBottom: '1rem' }}>
            <Sparkles size={14} className="text-gold" />
            <span>Catálogo de Procedimentos</span>
          </div>
          <h2 className="font-serif" style={{ color: '#8A6245', marginBottom: '1rem' }}>
            Protocolos Exclusivos Desenvolvidos para Sua Necessidade
          </h2>
          <p style={{ color: '#7A695D' }}>
            Tecnologia médica avançada e cuidados personalizados para resultados visíveis, seguros e naturais.
          </p>
          <div className="gold-divider" />
        </div>

        {/* Filter Category Tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.8rem',
            flexWrap: 'wrap',
            marginBottom: '3rem',
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key as any)}
              style={{
                padding: '0.65rem 1.4rem',
                borderRadius: '99px',
                border: activeCategory === cat.key ? '1px solid #C8A46A' : '1px solid #E8E4DF',
                background: activeCategory === cat.key
                  ? 'linear-gradient(135deg, #D9B48F 0%, #C8A46A 100%)'
                  : '#FFF',
                color: activeCategory === cat.key ? '#FFF' : '#8A6245',
                fontSize: '0.85rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: activeCategory === cat.key ? 'var(--shadow-gold)' : 'none',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Treatments Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '2rem',
          }}
        >
          {filteredTreatments.map((treatment) => (
            <div
              key={treatment.id}
              className="card-luxury"
              style={{
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              {/* Image Occupying 50% of the Card */}
              <div
                style={{
                  height: '240px',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
                onClick={() => onSelectTreatment(treatment)}
              >
                <img
                  src={treatment.image}
                  alt={treatment.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                
                {/* Category Badge */}
                <span
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    background: 'rgba(248, 246, 242, 0.9)',
                    backdropFilter: 'blur(8px)',
                    color: '#8A6245',
                    fontSize: '0.7rem',
                    letterSpacing: '0.12em',
                    padding: '0.25rem 0.7rem',
                    borderRadius: '99px',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    border: '1px solid #D9B48F',
                  }}
                >
                  {treatment.category}
                </span>

                {treatment.isPopular && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      background: 'linear-gradient(135deg, #C8A46A 0%, #A97A54 100%)',
                      color: '#FFF',
                      fontSize: '0.68rem',
                      letterSpacing: '0.1em',
                      padding: '0.25rem 0.6rem',
                      borderRadius: '99px',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.2rem',
                    }}
                  >
                    <Star size={12} fill="#FFF" /> Destaque
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3 className="font-serif" style={{ fontSize: '1.35rem', color: '#8A6245', marginBottom: '0.5rem' }}>
                  {treatment.name}
                </h3>

                <p style={{ fontSize: '0.88rem', color: '#7A695D', marginBottom: '1.2rem', flexGrow: 1, lineHeight: 1.5 }}>
                  {treatment.shortDesc}
                </p>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '1rem',
                    borderTop: '1px solid #E8E4DF',
                    marginBottom: '1.2rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#7A695D', fontSize: '0.8rem' }}>
                    <Clock size={14} className="text-gold" />
                    <span>{treatment.sessionDuration}</span>
                  </div>

                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#C8A46A' }}>
                    {treatment.price}
                  </span>
                </div>

                {/* Actions */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                  <button
                    onClick={() => onSelectTreatment(treatment)}
                    style={{
                      padding: '0.6rem 0.8rem',
                      borderRadius: '99px',
                      border: '1px solid #D9B48F',
                      background: '#F8F6F2',
                      color: '#8A6245',
                      fontSize: '0.78rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.3rem',
                    }}
                  >
                    Ver Detalhes
                  </button>

                  <button
                    onClick={() => onRequestWhatsApp(treatment.name)}
                    className="btn-primary"
                    style={{ padding: '0.6rem 0.8rem', fontSize: '0.75rem' }}
                  >
                    Solicitar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
