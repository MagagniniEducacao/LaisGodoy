import React, { useState, useEffect } from 'react';
import { Sparkles, MessageCircle, CheckCircle, User, Target, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { Treatment, ClinicSettings, SmartLead } from '../types/clinic';

interface SmartFormProps {
  treatments: Treatment[];
  settings: ClinicSettings;
  preselectedTreatment?: string;
  onAddLead: (lead: Omit<SmartLead, 'id' | 'createdAt' | 'status'>) => void;
}

export const SmartWhatsAppForm: React.FC<SmartFormProps> = ({
  treatments,
  settings,
  preselectedTreatment,
  onAddLead,
}) => {
  const [selectedTreatment, setSelectedTreatment] = useState<string>(
    preselectedTreatment || treatments[0]?.name || 'Ultrassom + Corrente Russa'
  );
  const [name, setName] = useState('');
  const [goal, setGoal] = useState<string>('Reduzir medidas');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedTreatment) {
      setSelectedTreatment(preselectedTreatment);
    }
  }, [preselectedTreatment]);

  const goalsList = [
    'Reduzir medidas',
    'Emagrecer',
    'Combater Flacidez',
    'Tratar Celulite',
    'Limpeza & Viço Facial',
    'Rejuvenescimento & Colágeno',
    'Relaxamento & Bem-estar',
    'Outro',
  ];

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert('Por favor, informe seu nome.');
      return;
    }

    // Trigger Confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C8A46A', '#D9B48F', '#A97A54', '#8A6245'],
    });

    // Save lead entry in local CMS
    onAddLead({
      name,
      phone: 'Não fornecido',
      treatmentName: selectedTreatment,
      objective: goal,
      description: description || 'Nenhuma observação adicional',
    });

    // Format WhatsApp message text
    const messageText = `Olá!\n\nMeu nome é *${name}*.\n\nTenho interesse no procedimento:\n*${selectedTreatment}*\n\nObjetivo principal:\n✔ *${goal}*\n\n${description ? `Descrição do meu caso:\n"${description}"\n\n` : ''}Gostaria de agendar uma avaliação.`;

    const encodedMsg = encodeURIComponent(messageText);
    const cleanPhone = settings.whatsapp.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;

    setSubmitted(true);

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 600);
  };

  return (
    <section id="solicitacao" className="section-padding bg-organic-pattern" style={{ position: 'relative' }}>
      <div className="container" style={{ maxWidth: '820px' }}>
        <div className="card-luxury" style={{ padding: '2.5rem', background: '#FFFFFF', border: '1px solid #D9B48F' }}>
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div className="glass-pill" style={{ marginBottom: '0.8rem' }}>
              <Sparkles size={14} className="text-gold" />
              <span>Solicitação Inteligente via WhatsApp</span>
            </div>
            <h2 className="font-serif" style={{ color: '#8A6245', fontSize: '2.2rem', marginBottom: '0.6rem' }}>
              Monte Seu Atendimento Personalizado
            </h2>
            <p style={{ color: '#7A695D', fontSize: '0.92rem' }}>
              Preencha rapidamente os campos abaixo para enviarmos uma proposta customizada direto no seu WhatsApp.
            </p>
          </div>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: '#F3E6D3',
                  color: '#C8A46A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.2rem auto',
                }}
              >
                <CheckCircle size={36} />
              </div>
              <h3 className="font-serif" style={{ color: '#8A6245', fontSize: '1.8rem', marginBottom: '0.5rem' }}>
                Solicitação Enviada com Sucesso!
              </h3>
              <p style={{ color: '#7A695D', marginBottom: '1.5rem' }}>
                Você foi redirecionada para o WhatsApp da clínica. Nossa equipe responde em minutos!
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="btn-secondary"
                style={{ fontSize: '0.8rem' }}
              >
                Fazer Nova Solicitação
              </button>
            </div>
          ) : (
            <form onSubmit={handleSendWhatsApp} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Step 1: Select Treatment */}
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: '#8A6245', fontSize: '0.9rem', marginBottom: '0.6rem' }}>
                  <Sparkles size={16} className="text-gold" />
                  1. Escolha o Tratamento Desejado:
                </label>
                <select
                  value={selectedTreatment}
                  onChange={(e) => setSelectedTreatment(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.9rem 1rem',
                    borderRadius: '12px',
                    border: '1px solid #D9B48F',
                    background: '#F8F6F2',
                    color: '#3A2E28',
                    fontSize: '0.95rem',
                    outline: 'none',
                    fontFamily: 'inherit',
                  }}
                >
                  {treatments.map((t) => (
                    <option key={t.id} value={t.name}>
                      {t.name} ({t.category.toUpperCase()})
                    </option>
                  ))}
                  <option value="Outro Procedimento Customizado">Outro Procedimento / Avaliação Geral</option>
                </select>
              </div>

              {/* Step 2: Name & Phone */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.2rem' }}>
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: '#8A6245', fontSize: '0.9rem', marginBottom: '0.4rem' }}>
                    <User size={16} className="text-gold" />
                    Seu Nome Completo:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Ana Silva"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '12px',
                      border: '1px solid #D9B48F',
                      background: '#F8F6F2',
                      fontSize: '0.92rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Step 3: Objective Selection */}
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: '#8A6245', fontSize: '0.9rem', marginBottom: '0.6rem' }}>
                  <Target size={16} className="text-gold" />
                  3. Qual o Seu Principal Objetivo?
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                  {goalsList.map((g) => (
                    <button
                      type="button"
                      key={g}
                      onClick={() => setGoal(g)}
                      style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '99px',
                        border: goal === g ? '1px solid #C8A46A' : '1px solid #E8E4DF',
                        background: goal === g ? '#F3E6D3' : '#FFF',
                        color: goal === g ? '#8A6245' : '#7A695D',
                        fontWeight: goal === g ? 600 : 400,
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {goal === g ? '✔ ' : ''}{g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 4: Optional Case Description */}
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: '#8A6245', fontSize: '0.9rem', marginBottom: '0.4rem' }}>
                  <FileText size={16} className="text-gold" />
                  4. Descreva Seu Caso ou Dúvida (Opcional):
                </label>
                <textarea
                  rows={3}
                  placeholder="Ex: Gostaria de reduzir a flacidez abdominal pós-emagrecimento e saber valores de pacotes..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    borderRadius: '12px',
                    border: '1px solid #D9B48F',
                    background: '#F8F6F2',
                    fontSize: '0.9rem',
                    outline: 'none',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              {/* Live Preview Box */}
              <div
                style={{
                  background: '#F3E6D3',
                  border: '1px stroke #D9B48F',
                  borderRadius: '14px',
                  padding: '1rem 1.2rem',
                  fontSize: '0.82rem',
                  color: '#8A6245',
                }}
              >
                <strong>Preview da mensagem a ser gerada:</strong>
                <p style={{ margin: '0.4rem 0 0 0', fontStyle: 'italic', whiteSpace: 'pre-line', color: '#5A4232' }}>
                  Olá! Meu nome é {name || '[Seu Nome]'}. Tenho interesse no procedimento {selectedTreatment}. Objetivo: {goal}.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', padding: '1.1rem', fontSize: '0.92rem' }}
              >
                <MessageCircle size={20} />
                Enviar Solicitação Direto para o WhatsApp
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
