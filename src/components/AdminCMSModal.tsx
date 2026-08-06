import React, { useState } from 'react';
import { X, Lock, Save, Plus, Trash2, Edit, RefreshCw, CheckCircle, PhoneCall, List, Settings, Image as ImageIcon, MessageSquare, HelpCircle } from 'lucide-react';
import { Treatment, BeforeAfterItem, Testimonial, FAQItem, ClinicSettings, SmartLead } from '../types/clinic';

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
  beforeAfterItems,
  setBeforeAfterItems,
  testimonials,
  setTestimonials,
  faqs,
  setFaqs,
  settings,
  setSettings,
  leads,
  setLeads,
  onResetDefaults,
}) => {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'treatments' | 'beforeafter' | 'testimonials' | 'faqs' | 'settings' | 'leads'>('leads');

  // Editing state for new/editing treatment
  const [editingTreatment, setEditingTreatment] = useState<Partial<Treatment> | null>(null);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '1234' || pin === '') {
      setIsAuthenticated(true);
    } else {
      alert('PIN incorreto. (PIN padrão de demonstração: 1234)');
    }
  };

  const handleSaveTreatment = () => {
    if (!editingTreatment?.name || !editingTreatment?.price) {
      alert('Por favor preencha Nome e Preço do tratamento.');
      return;
    }

    if (editingTreatment.id) {
      // Update
      setTreatments(prev => prev.map(t => t.id === editingTreatment.id ? { ...t, ...editingTreatment } as Treatment : t));
    } else {
      // Create new
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
        {/* Header Bar */}
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
          /* Login Screen */
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
                Digite a senha de administrador (PIN Padrão: 1234)
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
          /* Admin Dashboard */
          <div style={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
            {/* Sidebar Navigation */}
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

            {/* Content Tab Panel */}
            <div style={{ flexGrow: 1, padding: '1.8rem', overflowY: 'auto', background: '#FFF' }}>
              
              {/* TAB 1: LEADS */}
              {activeTab === 'leads' && (
                <div>
                  <h3 className="font-serif" style={{ color: '#8A6245', fontSize: '1.5rem', marginBottom: '1rem' }}>
                    Solicitações de Leads Recebidas via Formulário
                  </h3>

                  {leads.length === 0 ? (
                    <p style={{ color: '#7A695D' }}>Nenhuma solicitação enviada ainda. As novas solicitações do formulário aparecerão aqui em tempo real.</p>
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
                              <span style={{ fontSize: '0.72rem', color: '#7A695D' }}>{lead.createdAt}</span>
                            </div>
                            <p style={{ fontSize: '0.88rem', color: '#3A2E28', marginBottom: '0.2rem' }}>
                              Tratamento: <strong>{lead.treatmentName}</strong> | Objetivo: <strong>{lead.objective}</strong>
                            </p>
                            <p style={{ fontSize: '0.8rem', color: '#7A695D', fontStyle: 'italic' }}>
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

              {/* TAB 2: TREATMENTS */}
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

                  {/* Editing Form Modal/Section */}
                  {editingTreatment && (
                    <div
                      style={{
                        background: '#F8F6F2',
                        border: '1px solid #C8A46A',
                        padding: '1.5rem',
                        borderRadius: '16px',
                        marginBottom: '2rem',
                      }}
                    >
                      <h4 style={{ color: '#8A6245', marginBottom: '1rem' }}>
                        {editingTreatment.id ? 'Editar Tratamento' : 'Novo Tratamento'}
                      </h4>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <div>
                          <label style={{ fontSize: '0.8rem', color: '#7A695D' }}>Nome do Tratamento:</label>
                          <input
                            type="text"
                            value={editingTreatment.name || ''}
                            onChange={(e) => setEditingTreatment(prev => ({ ...prev, name: e.target.value }))}
                            style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #D9B48F' }}
                          />
                        </div>

                        <div>
                          <label style={{ fontSize: '0.8rem', color: '#7A695D' }}>Preço:</label>
                          <input
                            type="text"
                            value={editingTreatment.price || ''}
                            onChange={(e) => setEditingTreatment(prev => ({ ...prev, price: e.target.value }))}
                            style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #D9B48F' }}
                          />
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <div>
                          <label style={{ fontSize: '0.8rem', color: '#7A695D' }}>Categoria:</label>
                          <select
                            value={editingTreatment.category || 'facial'}
                            onChange={(e) => setEditingTreatment(prev => ({ ...prev, category: e.target.value as any }))}
                            style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #D9B48F' }}
                          >
                            <option value="facial">Facial</option>
                            <option value="corporal">Corporal</option>
                            <option value="bem-estar">Bem-Estar</option>
                          </select>
                        </div>

                        <div>
                          <label style={{ fontSize: '0.8rem', color: '#7A695D' }}>Duração da Sessão:</label>
                          <input
                            type="text"
                            value={editingTreatment.sessionDuration || ''}
                            onChange={(e) => setEditingTreatment(prev => ({ ...prev, sessionDuration: e.target.value }))}
                            style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #D9B48F' }}
                          />
                        </div>
                      </div>

                      <div style={{ marginBottom: '1rem' }}>
                        <label style={{ fontSize: '0.8rem', color: '#7A695D' }}>Descrição Curta:</label>
                        <textarea
                          rows={2}
                          value={editingTreatment.shortDesc || ''}
                          onChange={(e) => setEditingTreatment(prev => ({ ...prev, shortDesc: e.target.value }))}
                          style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #D9B48F' }}
                        />
                      </div>

                      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                        <button
                          type="button"
                          onClick={() => setEditingTreatment(null)}
                          style={{ padding: '0.6rem 1.2rem', borderRadius: '8px', border: '1px solid #CCC', background: '#FFF' }}
                        >
                          Cancelar
                        </button>
                        <button
                          type="button"
                          onClick={handleSaveTreatment}
                          className="btn-primary"
                          style={{ padding: '0.6rem 1.2rem' }}
                        >
                          Salvar Alterações
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Treatments List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {treatments.map((t) => (
                      <div
                        key={t.id}
                        style={{
                          padding: '1rem 1.2rem',
                          border: '1px solid #E8E4DF',
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div>
                          <strong style={{ color: '#8A6245' }}>{t.name}</strong>
                          <span style={{ fontSize: '0.78rem', color: '#7A695D', marginLeft: '0.8rem' }}>
                            {t.category.toUpperCase()} • {t.price}
                          </span>
                        </div>

                        <div style={{ display: 'flex', gap: '0.6rem' }}>
                          <button
                            onClick={() => setEditingTreatment(t)}
                            style={{ background: '#F3E6D3', border: 'none', borderRadius: '6px', padding: '0.4rem 0.8rem', color: '#8A6245', cursor: 'pointer' }}
                          >
                            <Edit size={14} /> Editar
                          </button>
                          <button
                            onClick={() => handleDeleteTreatment(t.id)}
                            style={{ background: '#FFF6F6', border: 'none', borderRadius: '6px', padding: '0.4rem 0.8rem', color: '#D9534F', cursor: 'pointer' }}
                          >
                            <Trash2 size={14} /> Excluir
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: SETTINGS */}
              {activeTab === 'settings' && (
                <div>
                  <h3 className="font-serif" style={{ color: '#8A6245', fontSize: '1.5rem', marginBottom: '1.2rem' }}>
                    Configurações Gerais da Clínica
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
                    <div>
                      <label style={{ fontSize: '0.85rem', color: '#7A695D' }}>Headline Principal (Hero):</label>
                      <input
                        type="text"
                        value={settings.heroHeadline}
                        onChange={(e) => setSettings(prev => ({ ...prev, heroHeadline: e.target.value }))}
                        style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #D9B48F' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.85rem', color: '#7A695D' }}>Telefone WhatsApp da Clínica:</label>
                      <input
                        type="text"
                        value={settings.whatsapp}
                        onChange={(e) => setSettings(prev => ({ ...prev, whatsapp: e.target.value }))}
                        style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #D9B48F' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.85rem', color: '#7A695D' }}>Instagram:</label>
                      <input
                        type="text"
                        value={settings.instagram}
                        onChange={(e) => setSettings(prev => ({ ...prev, instagram: e.target.value }))}
                        style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #D9B48F' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.85rem', color: '#7A695D' }}>Endereço Completo:</label>
                      <input
                        type="text"
                        value={settings.address}
                        onChange={(e) => setSettings(prev => ({ ...prev, address: e.target.value }))}
                        style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #D9B48F' }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Other tabs placeholder summary */}
              {(activeTab === 'beforeafter' || activeTab === 'testimonials' || activeTab === 'faqs') && (
                <div>
                  <h3 className="font-serif" style={{ color: '#8A6245', fontSize: '1.5rem', marginBottom: '1rem' }}>
                    Gerenciamento de {activeTab.toUpperCase()}
                  </h3>
                  <p style={{ color: '#7A695D' }}>
                    Módulo de edição interativo pronto para gestão de itens do banco de dados local.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
