// src/components/MemoryViewer.tsx
import React, { useState } from 'react';
import { useMemoryStore } from '../store/memoryStore';

export default function MemoryViewer(): JSX.Element {
  const { memories, set, ...store } = useMemoryStore() as any;
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  // Forget all memories
  const forgetAll = () => {
    if (confirm('Clear all stored memories?')) {
      store.memories.length = 0;
      // Trigger Zustand update manually
      set({ memories: [] });
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={toggle}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 999999,
          background: open
            ? 'rgba(180, 83, 9, 0.9)'
            : 'rgba(147, 51, 234, 0.9)',
          color: '#fff',
          border: 'none',
          borderRadius: 12,
          padding: '10px 14px',
          cursor: 'pointer',
          fontSize: 13,
          fontWeight: 600,
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        }}
      >
        🧠 {open ? 'Hide Memories' : 'View Memories'}
      </button>

      {/* Memory Panel */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: 70,
            right: 24,
            zIndex: 999998,
            width: 380,
            maxHeight: 400,
            overflowY: 'auto',
            background: 'rgba(2,6,23,0.95)',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 12,
            padding: 12,
            boxShadow: '0 8px 20px rgba(0,0,0,0.6)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            <div style={{ fontWeight: 700 }}>🧠 AI Memory Viewer</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={forgetAll}
                style={{
                  background: 'rgba(239,68,68,0.8)',
                  border: 'none',
                  borderRadius: 6,
                  padding: '4px 8px',
                  fontSize: 12,
                  cursor: 'pointer',
                  color: '#fff',
                }}
              >
                Forget All
              </button>
              <button
                onClick={toggle}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(255,255,255,0.6)',
                  cursor: 'pointer',
                  fontSize: 16,
                  lineHeight: 1,
                }}
              >
                ✖
              </button>
            </div>
          </div>

          {memories.length === 0 ? (
            <div
              style={{
                fontSize: 13,
                color: 'rgba(255,255,255,0.6)',
                textAlign: 'center',
              }}
            >
              No memories yet.
            </div>
          ) : (
            memories
              .slice()
              .reverse()
              .slice(0, 20)
              .map((m) => {
                const importance = m.importance || 0;
                const emotional = m.emotionalWeight || 0;

                // Glow based on emotional intensity or importance
                const bgGlow =
                  importance > 0.8
                    ? 'rgba(59,130,246,0.25)'
                    : emotional > 0.7
                    ? 'rgba(236,72,153,0.25)'
                    : 'rgba(255,255,255,0.05)';

                return (
                  <div
                    key={m.id}
                    style={{
                      background: bgGlow,
                      borderRadius: 8,
                      padding: 8,
                      marginBottom: 6,
                      fontSize: 13,
                      transition: 'background 0.3s ease',
                    }}
                  >
                    <div style={{ fontWeight: 600, marginBottom: 4 }}>
                      {m.content}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: 'rgba(255,255,255,0.6)',
                      }}
                    >
                      🕓 {new Date(m.timestamp).toLocaleTimeString()} | 💭{' '}
                      Importance: {(importance * 100).toFixed(0)}% | ❤️ Emotional:{' '}
                      {(emotional * 100).toFixed(0)}%
                    </div>
                  </div>
                );
              })
          )}
        </div>
      )}
    </>
  );
}
