import React, { useState, useEffect, useMemo } from 'react';
import { Sparkles, MessageCircle, CheckCircle, User, Target, FileText, Calendar, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { parse, addMinutes, format } from 'date-fns';
import type { Treatment, ClinicSettings, SmartLead } from '../types/clinic';

interface SmartFormProps {
  treatments: Treatment[];
  settings: ClinicSettings;
  preselectedTreatment?: string;
  leads?: SmartLead[];
  onAddLead: (lead: Omit<SmartLead, 'id' | 'createdAt' | 'status'>) => void;
}

export const SmartWhatsAppForm: React.FC<SmartFormProps> = ({
  treatments,
  settings,
  preselectedTreatment,
  leads = [],
  onAddLead,
}) => {
  const [selectedTreatment, setSelectedTreatment] = useState<string>(
    preselectedTreatment || treatments[0]?.name || 'Ultrassom + Corrente Russa'
  );
  const [name, setName] = useState('');
  const [goal, setGoal] = useState<string>('Reduzir medidas');
  const [description, setDescription] = useState('');
  
  // Calendar States
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  
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

  // Helper to parse "90 minutos" -> 90
  const getTreatmentDurationMinutes = (tName: string) => {
    const treatment = treatments.find(t => t.name === tName);
    if (!treatment) return 30;
    const sessionDurationStr = treatment.sessionDuration || '30 minutos';
    const match = sessionDurationStr.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 30;
  };

  // Generate available time slots based on intelligent calendar rules
  const availableSlots = useMemo(() => {
    if (!selectedDate) return [];

    const parts = selectedDate.split('-');
    if (parts.length !== 3) return [];
    const [year, month, day] = parts.map(Number);
    if (isNaN(year) || isNaN(month) || isNaN(day)) return [];

    const dateObj = new Date(year, month - 1, day);
    if (isNaN(dateObj.getTime())) {
      return [];
    }
    
    const dayOfWeek = dateObj.getDay();

    const workingDays = settings.workingDays || [1, 2, 3, 4, 5, 6];
    if (!workingDays.includes(dayOfWeek)) {
      return []; 
    }

    const durationMinutes = getTreatmentDurationMinutes(selectedTreatment);
    const blocksNeeded = Math.ceil(durationMinutes / 30);

    const startTimeStr = settings.workingStartTime || '09:00';
    const endTimeStr = settings.workingEndTime || '18:00';

    const [startH, startM] = startTimeStr.split(':').map(Number);
    const [endH, endM] = endTimeStr.split(':').map(Number);
    
    let currentSlot = new Date(dateObj);
    currentSlot.setHours(startH, startM, 0, 0);

    const endTime = new Date(dateObj);
    endTime.setHours(endH, endM, 0, 0);

    const allSlots: string[] = [];
    while (currentSlot < endTime) {
      if (isNaN(currentSlot.getTime())) break;
      allSlots.push(format(currentSlot, 'HH:mm'));
      currentSlot = addMinutes(currentSlot, 30);
    }

    const bookedBlocks = new Set<string>();
    leads.forEach(lead => {
      if (lead.scheduledDate === selectedDate && lead.scheduledTime && lead.status !== 'contacted') {
        const leadDuration = getTreatmentDurationMinutes(lead.treatmentName);
        const leadBlocks = Math.ceil(leadDuration / 30);
        let leadSlot = parse(lead.scheduledTime, 'HH:mm', dateObj);
        
        if (!isNaN(leadSlot.getTime())) {
          for (let i = 0; i < leadBlocks; i++) {
            if (isNaN(leadSlot.getTime())) break;
            bookedBlocks.add(format(leadSlot, 'HH:mm'));
            leadSlot = addMinutes(leadSlot, 30);
          }
        }
      }
    });

    const finalSlots = allSlots.filter((_, index) => {
      if (index + blocksNeeded > allSlots.length) return false;
      for (let i = 0; i < blocksNeeded; i++) {
        if (bookedBlocks.has(allSlots[index + i])) {
          return false;
        }
      }
      return true;
    });

    return finalSlots;
  }, [selectedDate, selectedTreatment, settings, leads, treatments]);

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert('Por favor, informe seu nome.');
      return;
    }

    if (!selectedDate || !selectedTime) {
      alert('Por favor, escolha uma data e horário para a avaliação.');
      return;
    }

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C8A46A', '#D9B48F', '#A97A54', '#8A6245'],
    });

    onAddLead({
      name,
      phone: 'Não fornecido',
      treatmentName: selectedTreatment,
      objective: goal,
      description: description || 'Nenhuma observação adicional',
      scheduledDate: selectedDate,
      scheduledTime: selectedTime,
    });

    const parts = selectedDate.split('-');
    if (parts.length !== 3) {
      alert('Por favor, insira uma data válida.');
      return;
    }
    const [year, month, day] = parts.map(Number);
    const dateObj = new Date(year, month - 1, day);
    if (isNaN(dateObj.getTime())) {
      alert('Por favor, insira uma data válida.');
      return;
    }
    const formattedDate = format(dateObj, 'dd/MM/yyyy');

    const messageText = `Olá!\n\nMeu nome é *${name}*.\n\nTenho interesse no procedimento:\n*${selectedTreatment}*\n\nObjetivo principal:\n✔ *${goal}*\n\n📅 Data escolhida: *${formattedDate}*\n⏰ Horário: *${selectedTime}*\n\n${description ? `Descrição do meu caso:\n"${description}"\n\n` : ''}Gostaria de confirmar meu agendamento.`;

    const encodedMsg = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/5511961849094?text=${encodedMsg}`;

    setSubmitted(true);

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 600);
  };

  const todayStr = format(new Date(), 'yyyy-MM-dd');

  return (
    <section id="solicitacao" className="section-padding bg-organic-pattern" style={{ position: 'relative' }}>
      <div className="container" style={{ maxWidth: '820px' }}>
        <div className="card-luxury" style={{ padding: '2.5rem', background: '#FFFFFF', border: '1px solid #D9B48F' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div className="glass-pill" style={{ marginBottom: '0.8rem' }}>
              <Sparkles size={14} className="text-gold" />
              <span>Agendamento Inteligente via WhatsApp</span>
            </div>
            <h2 className="font-serif" style={{ color: '#8A6245', fontSize: '2.2rem', marginBottom: '0.6rem' }}>
              Monte Seu Atendimento Personalizado
            </h2>
            <p style={{ color: '#7A695D', fontSize: '0.92rem' }}>
              Preencha os campos abaixo para selecionar seu horário e enviar sua solicitação direto para nossa equipe.
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
                Você foi redirecionada para o WhatsApp da clínica. Nossa equipe confirmará seu horário em minutos!
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
              
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: '#8A6245', fontSize: '0.9rem', marginBottom: '0.6rem' }}>
                  <Sparkles size={16} className="text-gold" />
                  1. Escolha o Tratamento Desejado:
                </label>
                <select
                  value={selectedTreatment}
                  onChange={(e) => {
                    setSelectedTreatment(e.target.value);
                    setSelectedTime('');
                  }}
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
                      {t.name} ({(t.category || 'facial').toUpperCase()}) - Duração aprox: {t.sessionDuration || '30 minutos'}
                    </option>
                  ))}
                  <option value="Outro Procedimento Customizado">Outro Procedimento / Avaliação Geral</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.2rem' }}>
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: '#8A6245', fontSize: '0.9rem', marginBottom: '0.4rem' }}>
                    <Calendar size={16} className="text-gold" />
                    2. Escolha a Data:
                  </label>
                  <input
                    type="date"
                    required
                    min={todayStr}
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      setSelectedTime('');
                    }}
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
                
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: '#8A6245', fontSize: '0.9rem', marginBottom: '0.4rem' }}>
                    <Clock size={16} className="text-gold" />
                    3. Horários Disponíveis:
                  </label>
                  {selectedDate ? (
                    availableSlots.length > 0 ? (
                      <select
                        required
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.85rem 1rem',
                          borderRadius: '12px',
                          border: '1px solid #D9B48F',
                          background: '#F8F6F2',
                          fontSize: '0.92rem',
                          outline: 'none',
                        }}
                      >
                        <option value="" disabled>Selecione um horário</option>
                        {availableSlots.map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    ) : (
                      <div style={{ padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #E8E4DF', background: '#FFF6F6', color: '#D9534F', fontSize: '0.85rem' }}>
                        Nenhum horário disponível para esta data ou duração insuficiente para o tratamento.
                      </div>
                    )
                  ) : (
                    <div style={{ padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #E8E4DF', background: '#F8F6F2', color: '#7A695D', fontSize: '0.85rem' }}>
                      Selecione uma data primeiro.
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: '#8A6245', fontSize: '0.9rem', marginBottom: '0.4rem' }}>
                  <User size={16} className="text-gold" />
                  4. Seu Nome Completo:
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

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: '#8A6245', fontSize: '0.9rem', marginBottom: '0.6rem' }}>
                  <Target size={16} className="text-gold" />
                  5. Qual o Seu Principal Objetivo?
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

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: '#8A6245', fontSize: '0.9rem', marginBottom: '0.4rem' }}>
                  <FileText size={16} className="text-gold" />
                  6. Descreva Seu Caso ou Dúvida (Opcional):
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

              <div
                style={{
                  background: '#F3E6D3',
                  border: '1px solid #D9B48F',
                  borderRadius: '14px',
                  padding: '1rem 1.2rem',
                  fontSize: '0.82rem',
                  color: '#8A6245',
                }}
              >
                <strong>Preview da solicitação:</strong>
                <p style={{ margin: '0.4rem 0 0 0', fontStyle: 'italic', whiteSpace: 'pre-line', color: '#5A4232' }}>
                  Nome: {name || '[Seu Nome]'}. 
                  Procedimento: {selectedTreatment}. 
                  {(() => {
                    if (selectedDate && selectedTime) {
                      const parts = selectedDate.split('-');
                      if (parts.length === 3) {
                        const [year, month, day] = parts.map(Number);
                        if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
                          const d = new Date(year, month - 1, day);
                          if (!isNaN(d.getTime())) {
                            return ` Agendamento: ${format(d, 'dd/MM/yyyy')} às ${selectedTime}.`;
                          }
                        }
                      }
                    }
                    return ' (Selecione Data e Horário)';
                  })()}
                </p>
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', padding: '1.1rem', fontSize: '0.92rem' }}
              >
                <MessageCircle size={20} />
                Confirmar Agendamento no WhatsApp
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
