import React from 'react';
import { Sparkles, Star, Quote } from 'lucide-react';
import type { Testimonial } from '../types/clinic';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  return (
    <section id="depoimentos" className="section-padding bg-beige-subtle" style={{ position: 'relative' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3rem auto' }}>
          <div className="glass-pill" style={{ marginBottom: '1rem' }}>
            <Sparkles size={14} className="text-gold" />
            <span>Depoimentos & Experiências</span>
          </div>
          <h2 className="font-serif" style={{ color: '#8A6245', marginBottom: '1rem' }}>
            O Que Dizem Nossas Pacientes
          </h2>
          <p style={{ color: '#7A695D' }}>
            Depoimentos reais de quem vivenciou a transformação e o cuidado exclusivo da clínica Dra. Lais Godoy.
          </p>
          <div className="gold-divider" />
        </div>

        {/* Testimonials Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
          }}
        >
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="card-luxury"
              style={{
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                background: '#FFFFFF',
              }}
            >
              <Quote
                size={36}
                style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  color: '#F3E6D3',
                  opacity: 0.8,
                }}
              />

              <div>
                {/* Rating Stars */}
                <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '1rem' }}>
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} size={16} fill="#C8A46A" color="#C8A46A" />
                  ))}
                </div>

                {/* Quote Text */}
                <p style={{ fontSize: '0.92rem', color: '#3A2E28', fontStyle: 'italic', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  "{item.text}"
                </p>
              </div>

              {/* Client Info */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.9rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid #E8E4DF',
                }}
              >
                <img
                  src={item.photo}
                  alt={item.name}
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid #C8A46A',
                  }}
                />
                <div>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 600, color: '#8A6245' }}>{item.name}</h4>
                  <span style={{ fontSize: '0.75rem', color: '#7A695D', display: 'block' }}>
                    {item.role} • {item.treatmentTaken}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
