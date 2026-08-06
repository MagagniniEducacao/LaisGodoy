import React, { useState } from 'react';
import { Sparkles, ChevronDown, HelpCircle } from 'lucide-react';
import { FAQItem } from '../types/clinic';

interface FAQProps {
  faqs: FAQItem[];
}

export const FAQSection: React.FC<FAQProps> = ({ faqs }) => {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="section-padding" style={{ background: '#FFF' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="glass-pill" style={{ marginBottom: '1rem' }}>
            <Sparkles size={14} className="text-gold" />
            <span>Tire Suas Dúvidas</span>
          </div>
          <h2 className="font-serif" style={{ color: '#8A6245', marginBottom: '1rem' }}>
            Perguntas Frequentes
          </h2>
          <p style={{ color: '#7A695D' }}>
            Esclareça as principais dúvidas sobre nossas avaliações, horários, formas de pagamento e tratamentos.
          </p>
          <div className="gold-divider" />
        </div>

        {/* Accordions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                style={{
                  border: isOpen ? '1px solid #C8A46A' : '1px solid #E8E4DF',
                  borderRadius: '16px',
                  background: isOpen ? '#F8F6F2' : '#FFF',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  boxShadow: isOpen ? 'var(--shadow-subtle)' : 'none',
                }}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  style={{
                    width: '100%',
                    padding: '1.2rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ fontSize: '1rem', fontWeight: 500, color: '#8A6245' }}>
                    {faq.question}
                  </span>
                  <div
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      color: '#C8A46A',
                      flexShrink: 0,
                    }}
                  >
                    <ChevronDown size={20} />
                  </div>
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: '0 1.5rem 1.2rem 1.5rem',
                      color: '#7A695D',
                      fontSize: '0.92rem',
                      lineHeight: 1.6,
                      borderTop: '1px stroke rgba(217, 180, 143, 0.3)',
                    }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
