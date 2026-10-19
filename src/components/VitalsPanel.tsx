import React from 'react';

interface VitalsProps {
  hunger: number;
  energy: number;
  health: number;
  isSick: boolean;
  logs: string[];
  onNap: () => void;
  onMedicine: () => void;
}

export const VitalsPanel: React.FC<VitalsProps> = ({
  hunger,
  energy,
  health,
  isSick,
  logs,
  onNap,
  onMedicine
}) => {
  return (
    <div style={{
      background: '#1e293b',
      padding: '20px',
      borderRadius: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px'
    }}>
      <h3>📊 Vitals</h3>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
          <span>🍖 Hunger</span><span>{hunger}%</span>
        </div>
        <div style={{ background: '#334155', height: '8px', borderRadius: '4px', overflow: 'hidden', marginTop: '4px' }}>
          <div style={{ width: `${hunger}%`, background: '#f59e0b', height: '100%' }} />
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
          <span>⚡ Energy</span><span>{energy}%</span>
        </div>
        <div style={{ background: '#334155', height: '8px', borderRadius: '4px', overflow: 'hidden', marginTop: '4px' }}>
          <div style={{ width: `${energy}%`, background: '#3b82f6', height: '100%' }} />
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
          <span>❤️ Health</span><span>{health}%</span>
        </div>
        <div style={{ background: '#334155', height: '8px', borderRadius: '4px', overflow: 'hidden', marginTop: '4px' }}>
          <div style={{ width: `${health}%`, background: '#ef4444', height: '100%' }} />
        </div>
      </div>

      <button onClick={onNap} style={{ padding: '10px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
        💤 Nap (+40 Energy)
      </button>

      {isSick && (
        <button onClick={onMedicine} style={{ padding: '10px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
          💊 Medicine (50 🪙)
        </button>
      )}

      <h4>📜 Log</h4>
      <div style={{ background: '#09090b', padding: '10px', borderRadius: '8px', fontSize: '11px', flex: 1, overflowY: 'auto' }}>
        {logs.map((m, i) => (
          <div key={i} style={{ marginBottom: '4px', color: '#cbd5e1' }}>• {m}</div>
        ))}
      </div>
    </div>
  );
};