import React from 'react';
import { ShopItem } from '../types/game';

interface PandaAvatarProps {
  scale: number;
  stageTitle: string;
  shirt: ShopItem | null;
  hat: ShopItem | null;
  glasses: ShopItem | null;
}

export const PandaAvatar: React.FC<PandaAvatarProps> = ({
  scale,
  stageTitle,
  shirt,
  hat,
  glasses
}) => {
  return (
    <div style={{
      background: 'radial-gradient(circle, #1e3a8a 0%, #0f172a 100%)',
      borderRadius: '16px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ transform: `scale(${scale})`, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <svg width="200" height="240" viewBox="0 0 220 260" fill="none">
          <circle cx="55" cy="45" r="22" fill="#1e293b" />
          <circle cx="165" cy="45" r="22" fill="#1e293b" />
          <ellipse cx="110" cy="180" rx="65" ry="60" fill="#f8fafc" />
          <ellipse cx="110" cy="190" rx="45" ry="40" fill={shirt ? shirt.color : '#e2e8f0'} />
          <circle cx="45" cy="170" r="22" fill="#1e293b" />
          <circle cx="175" cy="170" r="22" fill="#1e293b" />
          <circle cx="65" cy="230" r="22" fill="#1e293b" />
          <circle cx="155" cy="230" r="22" fill="#1e293b" />
          <circle cx="110" cy="90" r="60" fill="#f8fafc" />
          <ellipse cx="85" cy="85" rx="16" ry="20" fill="#1e293b" transform="rotate(-15 85 85)" />
          <ellipse cx="135" cy="85" rx="16" ry="20" fill="#1e293b" transform="rotate(15 135 85)" />
          <circle cx="87" cy="83" r="5" fill="#ffffff" />
          <circle cx="133" cy="83" r="5" fill="#ffffff" />
          <ellipse cx="110" cy="102" rx="8" ry="6" fill="#1e293b" />
          <path d="M104 112 Q110 118 116 112" stroke="#1e293b" strokeWidth="3" fill="none" />
        </svg>

        {hat && <div style={{ position: 'absolute', top: '-10px', fontSize: '50px' }}>{hat.emoji}</div>}
        {glasses && <div style={{ position: 'absolute', top: '45px', fontSize: '38px' }}>{glasses.emoji}</div>}
        {shirt && <div style={{ position: 'absolute', top: '125px', fontSize: '32px' }}>{shirt.emoji}</div>}
      </div>
      <h2 style={{ marginTop: '20px' }}>{stageTitle}</h2>
    </div>
  );
};