import React from 'react';
import { useMemoryStore } from '../store/memoryStore';
import { useAIStore } from '../store/aiStore';

export function ClearMemoryButton(): JSX.Element {
  const clearAllMemories = useMemoryStore((s) => s.clearAll);
  const clearMessages = useAIStore((s) => s.clearMessages);

  const handleClear = () => {
    if (!confirm('🧠 Clear all memories, connections, and chat history? This cannot be undone.')) return;

    // Fade out optional effect before clearing
    document.body.style.transition = 'filter 0.6s ease';
    document.body.style.filter = 'blur(5px) brightness(0.4)';

    setTimeout(() => {
      clearAllMemories();
      clearMessages();
      document.body.style.filter = '';
    }, 600);
  };

  return (
    <div
      style={{
        position: 'fixed',
        right: 18,
        bottom: 18,
        zIndex: 999999,
        pointerEvents: 'auto',
      }}
    >
      <button
        onClick={handleClear}
        style={{
          background: 'linear-gradient(180deg,#111827,#0b1220)',
          color: '#f8fafc',
          borderRadius: 12,
          padding: '10px 14px',
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: '0 6px 20px rgba(2,6,23,0.6)',
          cursor: 'pointer',
          fontWeight: 700,
        }}
      >
        🧠 Clear Memory
      </button>
    </div>
  );
}

export default ClearMemoryButton;
