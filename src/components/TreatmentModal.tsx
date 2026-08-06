import React from 'react';
import { X, Clock, Calendar, CheckCircle2, AlertTriangle, MessageCircle } from 'lucide-react';
import type { Treatment } from '../types/clinic';

interface TreatmentModalProps {
  treatment: Treatment | null;
  onClose: () => void;
  onRequestWhatsApp: (treatmentName: string) => void;
}

export const TreatmentModal: React.FC<TreatmentModalProps> = ({
  treatment,
  onClose,
  onRequestWhatsApp,
}) => {
  if (!treatment) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(58, 46, 40, 0.65)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        overflowY: 'auto',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#FFF',
          borderRadius: '24px',
          maxWidth: '750px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid #D9B48F',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.2rem',
            right: '1.2rem',
            zIndex: 10,
            background: '#F8F6F2',
            border: '1px solid #D9B48F',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#8A6245',
            transition: 'all 0.2s ease',
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Header Image */}
        <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
          <img
            src={treatment.image}
            alt={treatment.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, transparent 40%, rgba(58, 46, 40, 0.8) 100%)',
            }}
          />
          <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem', color: '#FFF' }}>
            <span
              style={{
                background: '#C8A46A',
                color: '#FFF',
                fontSize: '0.7rem',
                letterSpacing: '0.15em',
                padding: '0.2rem 0.8rem',
                borderRadius: '99px',
                textTransform: 'uppercase',
                fontWeight: 600,
                display: 'inline-block',
                marginBottom: '0.4rem',
              }}
            >
              {treatment.category}
            </span>
            <h2 className="font-serif" style={{ color: '#FFF', fontSize: '1.8rem' }}>
              {treatment.name}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div style={{ padding: '2rem' }}>
          {/* Price & Duration Header Pill */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.5rem',
              background: '#F8F6F2',
              padding: '1rem 1.5rem',
              borderRadius: '16px',
              border: '1px solid #E8E4DF',
              marginBottom: '1.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={18} className="text-gold" />
              <div>
                <span style={{ fontSize: '0.75rem', color: '#7A695D', display: 'block' }}>Duração da Sessão</span>
                <strong style={{ fontSize: '0.9rem', color: '#8A6245' }}>{treatment.sessionDuration}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={18} className="text-gold" />
              <div>
                <span style={{ fontSize: '0.75rem', color: '#7A695D', display: 'block' }}>Recomendado</span>
                <strong style={{ fontSize: '0.9rem', color: '#8A6245' }}>{treatment.recommendedSessions}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: 'auto' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#7A695D', display: 'block' }}>Investimento</span>
                <strong style={{ fontSize: '1.1rem', color: '#C8A46A' }}>{treatment.price}</strong>
              </div>
            </div>
          </div>

          <p style={{ fontSize: '1rem', color: '#3A2E28', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            {treatment.fullDesc}
          </p>

          {/* Benefits */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.95rem', color: '#8A6245', fontWeight: 600, marginBottom: '0.8rem' }}>
              Principais Benefícios:
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.6rem' }}>
              {treatment.benefits.map((benefit, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} className="text-gold" />
                  <span style={{ fontSize: '0.85rem', color: '#7A695D' }}>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Indications & Expected Results */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem', marginBottom: '1.5rem' }}>
            <div style={{ background: '#F8F6F2', padding: '1rem', borderRadius: '12px', border: '1px solid #E8E4DF' }}>
              <strong style={{ fontSize: '0.85rem', color: '#8A6245', display: 'block', marginBottom: '0.3rem' }}>
                Indicação:
              </strong>
              <p style={{ fontSize: '0.82rem', color: '#7A695D' }}>{treatment.indication}</p>
            </div>

            <div style={{ background: '#F8F6F2', padding: '1rem', borderRadius: '12px', border: '1px solid #E8E4DF' }}>
              <strong style={{ fontSize: '0.85rem', color: '#8A6245', display: 'block', marginBottom: '0.3rem' }}>
                Resultados Esperados:
              </strong>
              <p style={{ fontSize: '0.82rem', color: '#7A695D' }}>{treatment.expectedResults}</p>
            </div>
          </div>

          {/* Contraindications */}
          <div
            style={{
              background: '#FFF6F6',
              border: '1px solid #F5C6C6',
              padding: '0.9rem 1.2rem',
              borderRadius: '12px',
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.8rem',
            }}
          >
            <AlertTriangle size={18} style={{ color: '#D9534F', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ fontSize: '0.82rem', color: '#D9534F', display: 'block' }}>Contraindicações:</strong>
              <span style={{ fontSize: '0.8rem', color: '#7A695D' }}>{treatment.contraindications}</span>
            </div>
          </div>

          {/* WhatsApp CTA Action Button */}
          <button
            onClick={() => {
              onClose();
              onRequestWhatsApp(treatment.name);
            }}
            className="btn-primary"
            style={{ width: '100%', padding: '1.1rem', fontSize: '0.9rem' }}
          >
            <MessageCircle size={18} />
            Solicitar Informações pelo WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};
