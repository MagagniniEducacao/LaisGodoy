import React, { useState } from 'react';
import { Sparkles, Maximize2, X, MoveHorizontal } from 'lucide-react';
import type { BeforeAfterItem } from '../types/clinic';

interface BeforeAfterProps {
  items: BeforeAfterItem[];
}

export const BeforeAfterGallery: React.FC<BeforeAfterProps> = ({ items }) => {
  const [activeFilter, setActiveFilter] = useState<string>('todos');
  const [selectedFullscreen, setSelectedFullscreen] = useState<BeforeAfterItem | null>(null);
  const [sliderPositions, setSliderPositions] = useState<{ [key: string]: number }>({});

  const filterOptions = [
    { key: 'todos', label: 'Todos os Casos' },
    { key: 'gordura-localizada', label: 'Gordura Localizada' },
    { key: 'flacidez', label: 'Flacidez' },
    { key: 'celulite', label: 'Celulite' },
    { key: 'limpeza-de-pele', label: 'Limpeza de Pele' },
  ];

  const filteredItems = activeFilter === 'todos'
    ? items
    : items.filter((item) => item.category === activeFilter);

  const handleSliderMove = (id: string, value: number) => {
    setSliderPositions((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <section id="antes-depois" className="section-padding" style={{ background: '#FFF' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3rem auto' }}>
          <div className="glass-pill" style={{ marginBottom: '1rem' }}>
            <Sparkles size={14} className="text-gold" />
            <span>Resultados Reais</span>
          </div>
          <h2 className="font-serif" style={{ color: '#8A6245', marginBottom: '1rem' }}>
            Transformações Antes & Depois
          </h2>
          <p style={{ color: '#7A695D' }}>
            Arraste o divisor horizontal para visualizar a transformação obtida com nossos protocolos exclusivos.
          </p>
          <div className="gold-divider" />
        </div>

        {/* Filters */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.8rem',
            flexWrap: 'wrap',
            marginBottom: '3rem',
          }}
        >
          {filterOptions.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              style={{
                padding: '0.65rem 1.4rem',
                borderRadius: '99px',
                border: activeFilter === filter.key ? '1px solid #C8A46A' : '1px solid #E8E4DF',
                background: activeFilter === filter.key
                  ? 'linear-gradient(135deg, #D9B48F 0%, #C8A46A 100%)'
                  : '#F8F6F2',
                color: activeFilter === filter.key ? '#FFF' : '#8A6245',
                fontSize: '0.85rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Gallery Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '2rem',
          }}
        >
          {filteredItems.map((item) => {
            const pos = sliderPositions[item.id] ?? 50;

            return (
              <div
                key={item.id}
                className="card-luxury"
                style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
              >
                {/* Interactive Split Image Comparison Container */}
                <div
                  style={{
                    position: 'relative',
                    height: '280px',
                    width: '100%',
                    overflow: 'hidden',
                    userSelect: 'none',
                  }}
                >
                  {/* After Image (Background) */}
                  <img
                    src={item.afterImage}
                    alt={`${item.title} Depois`}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      background: 'rgba(200, 164, 106, 0.9)',
                      color: '#FFF',
                      fontSize: '0.68rem',
                      letterSpacing: '0.12em',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '99px',
                      fontWeight: 600,
                      zIndex: 2,
                    }}
                  >
                    DEPOIS
                  </span>

                  {/* Before Image (Clipped Overlay) */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      bottom: 0,
                      width: `${pos}%`,
                      overflow: 'hidden',
                      zIndex: 3,
                      borderRight: '2px solid #C8A46A',
                    }}
                  >
                    <img
                      src={item.beforeImage}
                      alt={`${item.title} Antes`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        minWidth: '340px', // Prevent squishing
                      }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        background: 'rgba(58, 46, 40, 0.85)',
                        color: '#FFF',
                        fontSize: '0.68rem',
                        letterSpacing: '0.12em',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '99px',
                        fontWeight: 600,
                      }}
                    >
                      ANTES
                    </span>
                  </div>

                  {/* Draggable Slider Control Line & Knob */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={pos}
                    onChange={(e) => handleSliderMove(item.id, Number(e.target.value))}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      opacity: 0,
                      cursor: 'ew-resize',
                      zIndex: 10,
                    }}
                  />

                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: `${pos}%`,
                      transform: 'translate(-50%, -50%)',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: '#FFF',
                      border: '2px solid #C8A46A',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#8A6245',
                      pointerEvents: 'none',
                      zIndex: 5,
                    }}
                  >
                    <MoveHorizontal size={18} />
                  </div>

                  {/* Fullscreen Trigger */}
                  <button
                    onClick={() => setSelectedFullscreen(item)}
                    style={{
                      position: 'absolute',
                      bottom: '1rem',
                      right: '1rem',
                      background: 'rgba(255, 255, 255, 0.85)',
                      backdropFilter: 'blur(4px)',
                      border: '1px solid #D9B48F',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#8A6245',
                      cursor: 'pointer',
                      zIndex: 6,
                    }}
                    title="Ver em Tela Cheia"
                  >
                    <Maximize2 size={14} />
                  </button>
                </div>

                {/* Info Footer */}
                <div style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <span style={{ fontSize: '0.72rem', color: '#C8A46A', letterSpacing: '0.1em', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                    {item.categoryLabel} • {item.sessionsCount}
                  </span>
                  <h4 className="font-serif" style={{ fontSize: '1.2rem', color: '#8A6245', marginBottom: '0.4rem' }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: '#7A695D', lineHeight: 1.5 }}>
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedFullscreen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2000,
            background: 'rgba(0,0,0,0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
          }}
          onClick={() => setSelectedFullscreen(null)}
        >
          <div
            style={{
              maxWidth: '900px',
              width: '100%',
              background: '#FFF',
              borderRadius: '20px',
              overflow: 'hidden',
              padding: '1.5rem',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedFullscreen(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: '#F8F6F2',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={20} />
            </button>

            <h3 className="font-serif" style={{ fontSize: '1.5rem', color: '#8A6245', marginBottom: '1rem' }}>
              {selectedFullscreen.title}
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#8A6245', marginBottom: '0.4rem' }}>ANTES</span>
                <img src={selectedFullscreen.beforeImage} alt="Antes" style={{ width: '100%', borderRadius: '12px', height: '350px', objectFit: 'cover' }} />
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#C8A46A', marginBottom: '0.4rem' }}>DEPOIS</span>
                <img src={selectedFullscreen.afterImage} alt="Depois" style={{ width: '100%', borderRadius: '12px', height: '350px', objectFit: 'cover' }} />
              </div>
            </div>

            <p style={{ fontSize: '0.9rem', color: '#7A695D' }}>{selectedFullscreen.description}</p>
          </div>
        </div>
      )}
    </section>
  );
};
