import React from 'react';

interface HeaderProps {
  stageTitle: string;
  daysAlive: number;
  isSick: boolean;
  coins: number;
  gems: number;
  bamboo: number;
}

export const Header: React.FC<HeaderProps> = ({
  stageTitle,
  daysAlive,
  isSick,
  coins,
  gems,
  bamboo
}) => {
  return (
    <div style={{
      background: '#1e293b',
      padding: '16px 24px',
      borderRadius: '16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px'
    }}>
      <div>
        <h1 style={{ margin: 0, fontSize: '22px' }}>
          🐼 Panda Empire{' '}
          <span style={{ fontSize: '13px', background: '#3b82f6', padding: '2px 8px', borderRadius: '8px' }}>
            {stageTitle}
          </span>
        </h1>
        <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#94a3b8' }}>
          Age: {daysAlive} Days | Status: {isSick ? '🤢 Sick' : '🟢 Healthy'}
        </p>
      </div>
      <div style={{ display: 'flex', gap: '20px', fontWeight: 'bold' }}>
        <span>🪙 {coins}</span>
        <span>💎 {gems}</span>
        <span>🎍 {bamboo}</span>
      </div>
    </div>
  );
};