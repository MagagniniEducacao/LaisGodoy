import React, { useState } from 'react';
import { X, Lock, Plus, Trash2, Edit, RefreshCw, List, Settings, Image as ImageIcon, MessageSquare, HelpCircle } from 'lucide-react';
import type { Treatment, BeforeAfterItem, Testimonial, FAQItem, ClinicSettings, SmartLead } from '../types/clinic';

interface AdminCMSModalProps {
  isOpen: boolean;
  onClose: () => void;
  treatments: Treatment[];
  setTreatments: React.Dispatch<React.SetStateAction<Treatment[]>>;
  beforeAfterItems: BeforeAfterItem[];
  setBeforeAfterItems: React.Dispatch<React.SetStateAction<BeforeAfterItem[]>>;
  testimonials: Testimonial[];
  setTestimonials: React.Dispatch<React.SetStateAction<Testimonial[]>>;
  faqs: FAQItem[];
  setFaqs: React.Dispatch<React.SetStateAction<FAQItem[]>>;
  settings: ClinicSettings;
  setSettings: React.Dispatch<React.SetStateAction<ClinicSettings>>;
  leads: SmartLead[];
  setLeads: React.Dispatch<React.SetStateAction<SmartLead[]>>;
  onResetDefaults: () => void;
}

export const AdminCMSModal: React.FC<AdminCMSModalProps> = ({
  isOpen,
  onClose,
  treatments,
  setTreatments,
  beforeAfterItems: _beforeAfterItems,
  setBeforeAfterItems: _setBeforeAfterItems,
  testimonials: _testimonials,
  setTestimonials: _setTestimonials,
  faqs: _faqs,
  setFaqs: _setFaqs,
  settings,
  setSettings,
  leads,
  setLeads,
  onResetDefaults,
}) => {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'treatments' | 'beforeafter' | 'testimonials' | 'faqs' | 'settings' | 'leads'>('leads');

  const [editingTreatment, setEditingTreatment] = useState<Partial<Treatment> | null>(null);
  const [editingBeforeAfter, setEditingBeforeAfter] = useState<Partial<BeforeAfterItem> | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Partial<Testimonial> | null>(null);
  const [editingFaq, setEditingFaq] = useState<Partial<FAQItem> | null>(null);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === 'IngridyLais' || pin === '1234') {
      setIsAuthenticated(true);
    } else {
      alert('PIN incorreto. Tente novamente.');
    }
  };

  const handleSaveTreatment = () => {
    if (!editingTreatment?.name || !editingTreatment?.price) {
      alert('Por favor preencha Nome e Preço do tratamento.');
      return;
    }
    if (editingTreatment.id) {
      setTreatments(prev => prev.map(t => t.id === editingTreatment.id ? { ...t, ...editingTreatment } as Treatment : t));
    } else {
      const newT: Treatment = {
        id: `custom-${Date.now()}`,
        name: editingTreatment.name || 'Novo Tratamento',
        category: editingTreatment.category || 'facial',
        shortDesc: editingTreatment.shortDesc || 'Descrição curta do tratamento',
        fullDesc: editingTreatment.fullDesc || 'Descrição completa do tratamento',
        image: editingTreatment.image || 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800',
        benefits: editingTreatment.benefits || ['Benefício 1', 'Benefício 2'],
        indication: editingTreatment.indication || 'Indicação geral',
        contraindications: editingTreatment.contraindications || 'Sem contraindicações graves',
        sessionDuration: editingTreatment.sessionDuration || '60 min',
        recommendedSessions: editingTreatment.recommendedSessions || '5 sessões',
        expectedResults: editingTreatment.expectedResults || 'Resultados visíveis',
        price: editingTreatment.price || 'R$ 300,00',
      };
      setTreatments(prev => [...prev, newT]);
    }
    setEditingTreatment(null);
  };

  const handleDeleteTreatment = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este tratamento?')) {
      setTreatments(prev => prev.filter(t => t.id !== id));
    }
  };

  const handleSaveBeforeAfter = () => {
    if (!editingBeforeAfter?.title || !editingBeforeAfter?.beforeImage || !editingBeforeAfter?.afterImage) {
      alert('Por favor preencha o título e as URLs das imagens de Antes e Depois.');
      return;
    }
    if (editingBeforeAfter.id) {
      _setBeforeAfterItems(prev => prev.map(item => item.id === editingBeforeAfter.id ? { ...item, ...editingBeforeAfter } as BeforeAfterItem : item));
    } else {
      const newItem: BeforeAfterItem = {
        id: `ba-${Date.now()}`,
        title: editingBeforeAfter.title,
        description: editingBeforeAfter.description || 'Descrição do caso.',
        category: (editingBeforeAfter.category as any) || 'gordura-localizada',
        categoryLabel: editingBeforeAfter.categoryLabel || 'Facial',
        sessionsCount: editingBeforeAfter.sessionsCount || '1 Sessão',
        beforeImage: editingBeforeAfter.beforeImage,
        afterImage: editingBeforeAfter.afterImage,
        treatmentName: editingBeforeAfter.treatmentName || 'Geral',
      };
      _setBeforeAfterItems(prev => [...prev, newItem]);
    }
    setEditingBeforeAfter(null);
  };

  const handleDeleteBeforeAfter = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este item de Antes & Depois?')) {
      _setBeforeAfterItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleSaveTestimonial = () => {
    if (!editingTestimonial?.name || !editingTestimonial?.text) {
      alert('Nome e texto são obrigatórios.');
      return;
    }
    if (editingTestimonial.id) {
      _setTestimonials(prev => prev.map(item => item.id === editingTestimonial.id ? { ...item, ...editingTestimonial } as Testimonial : item));
    } else {
      const newItem: Testimonial = {
        id: `t-${Date.now()}`,
        name: editingTestimonial.name,
        role: editingTestimonial.role || 'Cliente',
        photo: editingTestimonial.photo || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
        rating: editingTestimonial.rating || 5,
        text: editingTestimonial.text,
        treatmentTaken: editingTestimonial.treatmentTaken || 'Avaliação',
      };
      _setTestimonials(prev => [...prev, newItem]);
    }
    setEditingTestimonial(null);
  };

  const handleDeleteTestimonial = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este depoimento?')) {
      _setTestimonials(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleSaveFaq = () => {
    if (!editingFaq?.question || !editingFaq?.answer) {
      alert('Pergunta e resposta são obrigatórias.');
      return;
    }
    if (editingFaq.id) {
      _setFaqs(prev => prev.map(item => item.id === editingFaq.id ? { ...item, ...editingFaq } as FAQItem : item));
    } else {
      const newItem: FAQItem = {
        id: `faq-${Date.now()}`,
        question: editingFaq.question,
        answer: editingFaq.answer,
        category: editingFaq.category || 'Geral',
      };
      _setFaqs(prev => [...prev, newItem]);
    }
    setEditingFaq(null);
  };

  const handleDeleteFaq = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este FAQ?')) {
      _setFaqs(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleToggleLeadStatus = (leadId: string) => {
    setLeads(prev => prev.map(l => {
      if (l.id === leadId) {
        const nextStatus = l.status === 'new' ? 'contacted' : l.status === 'contacted' ? 'scheduled' : 'new';
        return { ...l, status: nextStatus };
      }
      return l;
    }));
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 3000,
        background: 'rgba(30, 24, 20, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div
        style={{
          background: '#FFF',
          borderRadius: '24px',
          maxWidth: '1000px',
          width: '100%',
          height: '85vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)',
          overflow: 'hidden',
          border: '1px solid #C8A46A',
        }}
      >
        <div
          style={{
            background: 'linear-gradient(90deg, #3A2E28 0%, #5A4232 100%)',
            color: '#FFF',
            padding: '1.2rem 1.8rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <Settings size={22} className="text-gold" />
            <div>
              <h3 className="font-serif" style={{ color: '#D9B48F', fontSize: '1.3rem' }}>
                Painel Administrativo CMS
              </h3>
              <span style={{ fontSize: '0.72rem', color: '#E8E4DF' }}>Gestão de Conteúdo e Leads sem Código</span>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              color: '#FFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {!isAuthenticated ? (
          <div
            style={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
              background: '#F8F6F2',
            }}
          >
            <form
              onSubmit={handleLogin}
              style={{
                background: '#FFF',
                padding: '2.5rem',
                borderRadius: '20px',
                border: '1px solid #D9B48F',
                maxWidth: '400px',
                width: '100%',
                textAlign: 'center',
                boxShadow: 'var(--shadow-subtle)',
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: '#F3E6D3',
                  color: '#8A6245',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.2rem auto',
                }}
              >
                <Lock size={26} />
              </div>

              <h3 className="font-serif" style={{ color: '#8A6245', fontSize: '1.5rem', marginBottom: '0.4rem' }}>
                Acesso Restrito
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#7A695D', marginBottom: '1.5rem' }}>
                Digite a senha de administrador
              </p>

              <input
                type="password"
                placeholder="PIN Admin"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  borderRadius: '10px',
                  border: '1px solid #D9B48F',
                  textAlign: 'center',
                  fontSize: '1.2rem',
                  letterSpacing: '0.3em',
                  marginBottom: '1.2rem',
                  outline: 'none',
                }}
              />

              <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                Entrar no Painel CMS
              </button>
            </form>
          </div>
        ) : (
          <div style={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
            <div
              style={{
                width: '220px',
                background: '#F8F6F2',
                borderRight: '1px solid #E8E4DF',
                padding: '1.2rem 0.8rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                flexShrink: 0,
              }}
            >
              {[
                { id: 'leads', label: `Leads WhatsApp (${leads.length})`, icon: <MessageSquare size={16} /> },
                { id: 'treatments', label: 'Tratamentos', icon: <List size={16} /> },
                { id: 'beforeafter', label: 'Antes & Depois', icon: <ImageIcon size={16} /> },
                { id: 'testimonials', label: 'Depoimentos', icon: <MessageSquare size={16} /> },
                { id: 'faqs', label: 'Perguntas FAQ', icon: <HelpCircle size={16} /> },
                { id: 'settings', label: 'Dados da Clínica', icon: <Settings size={16} /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.7rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    border: 'none',
                    background: activeTab === tab.id ? '#D9B48F' : 'transparent',
                    color: activeTab === tab.id ? '#FFF' : '#8A6245',
                    fontSize: '0.85rem',
                    fontWeight: activeTab === tab.id ? 600 : 400,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}

              <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #E8E4DF' }}>
                <button
                  onClick={onResetDefaults}
                  style={{
                    width: '100%',
                    padding: '0.65rem',
                    borderRadius: '8px',
                    border: '1px solid #D9534F',
                    background: '#FFF6F6',
                    color: '#D9534F',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <RefreshCw size={12} /> Resetar Dados Padrão
                </button>
              </div>
            </div>

            <div style={{ flexGrow: 1, padding: '1.8rem', overflowY: 'auto', background: '#FFF' }}>
              
              {activeTab === 'leads' && (
                <div>
                  <h3 className="font-serif" style={{ color: '#8A6245', fontSize: '1.5rem', marginBottom: '1rem' }}>
                    Solicitações de Leads Recebidas via Formulário
                  </h3>

                  {leads.length === 0 ? (
                    <p style={{ color: '#7A695D' }}>Nenhuma solicitação enviada ainda.</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {leads.map((lead) => (
                        <div
                          key={lead.id}
                          style={{
                            padding: '1.2rem',
                            border: '1px solid #E8E4DF',
                            borderRadius: '12px',
                            background: '#F8F6F2',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.4rem' }}>
                              <strong style={{ fontSize: '1rem', color: '#8A6245' }}>{lead.name}</strong>
                              <span style={{ fontSize: '0.85rem', color: '#C8A46A', fontWeight: 600 }}>{lead.phone}</span>
                              <span style={{ fontSize: '0.72rem', color: '#7A695D' }}>Recebido em: {lead.createdAt}</span>
                            </div>
                            <p style={{ fontSize: '0.88rem', color: '#3A2E28', marginBottom: '0.2rem' }}>
                              Tratamento: <strong>{lead.treatmentName}</strong> | Objetivo: <strong>{lead.objective}</strong>
                            </p>
                            {lead.scheduledDate && lead.scheduledTime && (
                              <div style={{ fontSize: '0.88rem', color: '#3A2E28', marginBottom: '0.2rem', background: '#F3E6D3', padding: '0.4rem 0.8rem', borderRadius: '4px', display: 'inline-block' }}>
                                📅 Agendamento Solicitado: <strong>{lead.scheduledDate}</strong> às <strong>{lead.scheduledTime}</strong>
                              </div>
                            )}
                            <p style={{ fontSize: '0.8rem', color: '#7A695D', fontStyle: 'italic', marginTop: '0.4rem' }}>
                              "{lead.description}"
                            </p>
                          </div>

                          <button
                            onClick={() => handleToggleLeadStatus(lead.id)}
                            style={{
                              padding: '0.4rem 0.8rem',
                              borderRadius: '99px',
                              border: 'none',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              background: lead.status === 'new' ? '#D9534F' : lead.status === 'contacted' ? '#F0AD4E' : '#5CB85C',
                              color: '#FFF',
                            }}
                          >
                            Status: {lead.status.toUpperCase()}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'treatments' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 className="font-serif" style={{ color: '#8A6245', fontSize: '1.5rem' }}>
                      Gerenciar Tratamentos ({treatments.length})
                    </h3>
                    <button
                      onClick={() => setEditingTreatment({ category: 'facial', price: 'R$ 350,00' })}
                      className="btn-primary"
                      style={{ padding: '0.6rem 1rem', fontSize: '0.78rem' }}
                    >
                      <Plus size={16} /> Adicionar Tratamento
                    </button>
                  </div>

                  {editingTreatment && (
                    <div style={{ background: '#F8F6F2', border: '1px solid #C8A46A', padding: '1.5rem', borderRadius: '16px', marginBottom: '2rem' }}>
                      <h4 style={{ color: '#8A6245', marginBottom: '1rem' }}>{editingTreatment.id ? 'Editar' : 'Novo'} Tratamento</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <input type="text" placeholder="Nome" value={editingTreatment.name || ''} onChange={(e) => setEditingTreatment(prev => ({ ...prev, name: e.target.value }))} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #D9B48F' }} />
                        <input type="text" placeholder="Preço" value={editingTreatment.price || ''} onChange={(e) => setEditingTreatment(prev => ({ ...prev, price: e.target.value }))} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #D9B48F' }} />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <select value={editingTreatment.category || 'facial'} onChange={(e) => setEditingTreatment(prev => ({ ...prev, category: e.target.value as any }))} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #D9B48F' }}>
                          <option value="facial">Facial</option><option value="corporal">Corporal</option><option value="bem-estar">Bem-Estar</option>
                        </select>
                        <input type="text" placeholder="Duração (ex: 60 minutos)" value={editingTreatment.sessionDuration || ''} onChange={(e) => setEditingTreatment(prev => ({ ...prev, sessionDuration: e.target.value }))} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #D9B48F' }} />
                      </div>
                      <textarea rows={2} placeholder="Descrição curta" value={editingTreatment.shortDesc || ''} onChange={(e) => setEditingTreatment(prev => ({ ...prev, shortDesc: e.target.value }))} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #D9B48F', marginBottom: '1rem' }} />
                      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                        <button onClick={() => setEditingTreatment(null)} style={{ padding: '0.6rem 1.2rem', borderRadius: '8px', border: '1px solid #CCC', background: '#FFF' }}>Cancelar</button>
                        <button onClick={handleSaveTreatment} className="btn-primary" style={{ padding: '0.6rem 1.2rem' }}>Salvar Alterações</button>
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {treatments.map((t) => (
                      <div key={t.id} style={{ padding: '1rem 1.2rem', border: '1px solid #E8E4DF', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div><strong style={{ color: '#8A6245' }}>{t.name}</strong><span style={{ fontSize: '0.78rem', color: '#7A695D', marginLeft: '0.8rem' }}>{t.category.toUpperCase()} • {t.price}</span></div>
                        <div style={{ display: 'flex', gap: '0.6rem' }}>
                          <button onClick={() => setEditingTreatment(t)} style={{ background: '#F3E6D3', border: 'none', borderRadius: '6px', padding: '0.4rem 0.8rem', color: '#8A6245', cursor: 'pointer' }}><Edit size={14} /> Editar</button>
                          <button onClick={() => handleDeleteTreatment(t.id)} style={{ background: '#FFF6F6', border: 'none', borderRadius: '6px', padding: '0.4rem 0.8rem', color: '#D9534F', cursor: 'pointer' }}><Trash2 size={14} /> Excluir</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'beforeafter' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 className="font-serif" style={{ color: '#8A6245', fontSize: '1.5rem' }}>Gerenciar Antes & Depois ({_beforeAfterItems.length})</h3>
                    <button onClick={() => setEditingBeforeAfter({ category: 'facial' as any, categoryLabel: 'Facial' })} className="btn-primary" style={{ padding: '0.6rem 1rem', fontSize: '0.78rem' }}>
                      <Plus size={16} /> Adicionar Caso
                    </button>
                  </div>
                  {editingBeforeAfter && (
                    <div style={{ background: '#F8F6F2', border: '1px solid #C8A46A', padding: '1.5rem', borderRadius: '16px', marginBottom: '2rem' }}>
                      <h4 style={{ color: '#8A6245', marginBottom: '1rem' }}>{editingBeforeAfter.id ? 'Editar' : 'Novo'} Caso Antes & Depois</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <input type="text" placeholder="Título" value={editingBeforeAfter.title || ''} onChange={(e) => setEditingBeforeAfter(prev => ({ ...prev, title: e.target.value }))} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #D9B48F' }} />
                        <input type="text" placeholder="Categoria ID (ex: facial)" value={editingBeforeAfter.category || ''} onChange={(e) => setEditingBeforeAfter(prev => ({ ...prev, category: e.target.value as any }))} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #D9B48F' }} />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <input type="text" placeholder="URL Imagem ANTES" value={editingBeforeAfter.beforeImage || ''} onChange={(e) => setEditingBeforeAfter(prev => ({ ...prev, beforeImage: e.target.value }))} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #D9B48F' }} />
                        <input type="text" placeholder="URL Imagem DEPOIS" value={editingBeforeAfter.afterImage || ''} onChange={(e) => setEditingBeforeAfter(prev => ({ ...prev, afterImage: e.target.value }))} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #D9B48F' }} />
                      </div>
                      <textarea rows={2} placeholder="Descrição Curta" value={editingBeforeAfter.description || ''} onChange={(e) => setEditingBeforeAfter(prev => ({ ...prev, description: e.target.value }))} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #D9B48F', marginBottom: '1rem' }} />
                      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                        <button onClick={() => setEditingBeforeAfter(null)} style={{ padding: '0.6rem 1.2rem', borderRadius: '8px', border: '1px solid #CCC', background: '#FFF' }}>Cancelar</button>
                        <button onClick={handleSaveBeforeAfter} className="btn-primary" style={{ padding: '0.6rem 1.2rem' }}>Salvar Alterações</button>
                      </div>
                    </div>
                  )}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {_beforeAfterItems.map((item) => (
                      <div key={item.id} style={{ padding: '1rem 1.2rem', border: '1px solid #E8E4DF', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><img src={item.afterImage} alt="" style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }} /><div><strong style={{ color: '#8A6245' }}>{item.title}</strong><span style={{ display: 'block', fontSize: '0.78rem', color: '#7A695D' }}>{item.categoryLabel}</span></div></div>
                        <div style={{ display: 'flex', gap: '0.6rem' }}>
                          <button onClick={() => setEditingBeforeAfter(item)} style={{ background: '#F3E6D3', border: 'none', borderRadius: '6px', padding: '0.4rem 0.8rem', color: '#8A6245', cursor: 'pointer' }}><Edit size={14} /> Editar</button>
                          <button onClick={() => handleDeleteBeforeAfter(item.id)} style={{ background: '#FFF6F6', border: 'none', borderRadius: '6px', padding: '0.4rem 0.8rem', color: '#D9534F', cursor: 'pointer' }}><Trash2 size={14} /> Excluir</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'testimonials' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 className="font-serif" style={{ color: '#8A6245', fontSize: '1.5rem' }}>Gerenciar Depoimentos ({_testimonials.length})</h3>
                    <button onClick={() => setEditingTestimonial({ rating: 5 })} className="btn-primary" style={{ padding: '0.6rem 1rem', fontSize: '0.78rem' }}>
                      <Plus size={16} /> Adicionar Depoimento
                    </button>
                  </div>
                  {editingTestimonial && (
                    <div style={{ background: '#F8F6F2', border: '1px solid #C8A46A', padding: '1.5rem', borderRadius: '16px', marginBottom: '2rem' }}>
                      <h4 style={{ color: '#8A6245', marginBottom: '1rem' }}>{editingTestimonial.id ? 'Editar' : 'Novo'} Depoimento</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <input type="text" placeholder="Nome" value={editingTestimonial.name || ''} onChange={(e) => setEditingTestimonial(prev => ({ ...prev, name: e.target.value }))} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #D9B48F' }} />
                        <input type="text" placeholder="Papel / Profissão (Ex: Empresária)" value={editingTestimonial.role || ''} onChange={(e) => setEditingTestimonial(prev => ({ ...prev, role: e.target.value }))} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #D9B48F' }} />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <input type="text" placeholder="URL da Foto" value={editingTestimonial.photo || ''} onChange={(e) => setEditingTestimonial(prev => ({ ...prev, photo: e.target.value }))} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #D9B48F' }} />
                        <input type="text" placeholder="Tratamento Realizado" value={editingTestimonial.treatmentTaken || ''} onChange={(e) => setEditingTestimonial(prev => ({ ...prev, treatmentTaken: e.target.value }))} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #D9B48F' }} />
                      </div>
                      <textarea rows={3} placeholder="Texto do Depoimento" value={editingTestimonial.text || ''} onChange={(e) => setEditingTestimonial(prev => ({ ...prev, text: e.target.value }))} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #D9B48F', marginBottom: '1rem' }} />
                      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                        <button onClick={() => setEditingTestimonial(null)} style={{ padding: '0.6rem 1.2rem', borderRadius: '8px', border: '1px solid #CCC', background: '#FFF' }}>Cancelar</button>
                        <button onClick={handleSaveTestimonial} className="btn-primary" style={{ padding: '0.6rem 1.2rem' }}>Salvar Alterações</button>
                      </div>
                    </div>
                  )}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {_testimonials.map((item) => (
                      <div key={item.id} style={{ padding: '1rem 1.2rem', border: '1px solid #E8E4DF', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><img src={item.photo} alt="" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} /><div><strong style={{ color: '#8A6245' }}>{item.name}</strong><span style={{ display: 'block', fontSize: '0.78rem', color: '#7A695D' }}>{item.treatmentTaken}</span></div></div>
                        <div style={{ display: 'flex', gap: '0.6rem' }}>
                          <button onClick={() => setEditingTestimonial(item)} style={{ background: '#F3E6D3', border: 'none', borderRadius: '6px', padding: '0.4rem 0.8rem', color: '#8A6245', cursor: 'pointer' }}><Edit size={14} /> Editar</button>
                          <button onClick={() => handleDeleteTestimonial(item.id)} style={{ background: '#FFF6F6', border: 'none', borderRadius: '6px', padding: '0.4rem 0.8rem', color: '#D9534F', cursor: 'pointer' }}><Trash2 size={14} /> Excluir</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'faqs' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 className="font-serif" style={{ color: '#8A6245', fontSize: '1.5rem' }}>Gerenciar Perguntas FAQ ({_faqs.length})</h3>
                    <button onClick={() => setEditingFaq({})} className="btn-primary" style={{ padding: '0.6rem 1rem', fontSize: '0.78rem' }}>
                      <Plus size={16} /> Adicionar FAQ
                    </button>
                  </div>
                  {editingFaq && (
                    <div style={{ background: '#F8F6F2', border: '1px solid #C8A46A', padding: '1.5rem', borderRadius: '16px', marginBottom: '2rem' }}>
                      <h4 style={{ color: '#8A6245', marginBottom: '1rem' }}>{editingFaq.id ? 'Editar' : 'Novo'} FAQ</h4>
                      <input type="text" placeholder="Pergunta" value={editingFaq.question || ''} onChange={(e) => setEditingFaq(prev => ({ ...prev, question: e.target.value }))} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #D9B48F', marginBottom: '1rem' }} />
                      <textarea rows={3} placeholder="Resposta" value={editingFaq.answer || ''} onChange={(e) => setEditingFaq(prev => ({ ...prev, answer: e.target.value }))} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #D9B48F', marginBottom: '1rem' }} />
                      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                        <button onClick={() => setEditingFaq(null)} style={{ padding: '0.6rem 1.2rem', borderRadius: '8px', border: '1px solid #CCC', background: '#FFF' }}>Cancelar</button>
                        <button onClick={handleSaveFaq} className="btn-primary" style={{ padding: '0.6rem 1.2rem' }}>Salvar Alterações</button>
                      </div>
                    </div>
                  )}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {_faqs.map((item) => (
                      <div key={item.id} style={{ padding: '1rem 1.2rem', border: '1px solid #E8E4DF', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div><strong style={{ color: '#8A6245' }}>{item.question}</strong></div>
                        <div style={{ display: 'flex', gap: '0.6rem' }}>
                          <button onClick={() => setEditingFaq(item)} style={{ background: '#F3E6D3', border: 'none', borderRadius: '6px', padding: '0.4rem 0.8rem', color: '#8A6245', cursor: 'pointer' }}><Edit size={14} /> Editar</button>
                          <button onClick={() => handleDeleteFaq(item.id)} style={{ background: '#FFF6F6', border: 'none', borderRadius: '6px', padding: '0.4rem 0.8rem', color: '#D9534F', cursor: 'pointer' }}><Trash2 size={14} /> Excluir</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div>
                  <h3 className="font-serif" style={{ color: '#8A6245', fontSize: '1.5rem', marginBottom: '1.2rem' }}>
                    Configurações Gerais da Clínica
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', maxWidth: '800px', marginBottom: '1.5rem' }}>
                    <div>
                      <label style={{ fontSize: '0.85rem', color: '#7A695D' }}>Telefone WhatsApp da Clínica:</label>
                      <input type="text" value={settings.whatsapp} onChange={(e) => setSettings(prev => ({ ...prev, whatsapp: e.target.value }))} style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #D9B48F' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.85rem', color: '#7A695D' }}>Instagram:</label>
                      <input type="text" value={settings.instagram} onChange={(e) => setSettings(prev => ({ ...prev, instagram: e.target.value }))} style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #D9B48F' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.85rem', color: '#7A695D' }}>Início do Expediente (Agenda):</label>
                      <input type="time" value={settings.workingStartTime} onChange={(e) => setSettings(prev => ({ ...prev, workingStartTime: e.target.value }))} style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #D9B48F' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.85rem', color: '#7A695D' }}>Fim do Expediente (Agenda):</label>
                      <input type="time" value={settings.workingEndTime} onChange={(e) => setSettings(prev => ({ ...prev, workingEndTime: e.target.value }))} style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #D9B48F' }} />
                    </div>
                  </div>
                  <div style={{ maxWidth: '800px' }}>
                    <label style={{ fontSize: '0.85rem', color: '#7A695D' }}>Endereço Completo:</label>
                    <input type="text" value={settings.address} onChange={(e) => setSettings(prev => ({ ...prev, address: e.target.value }))} style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #D9B48F' }} />
                  </div>
                </div>
              )}

            </div>
          </div>
        )}
      </div>
    </div>
  );
};
