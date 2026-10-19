import React from 'react';
import { ShopItem } from '../types/game';

interface TabModulesProps {
  tab: 'shop' | 'rpg' | 'market' | 'stats';
  setTab: (t: 'shop' | 'rpg' | 'market' | 'stats') => void;
  items: ShopItem[];
  inv: string[];
  coins: number;
  bamboo: number;
  price: number;
  str: number;
  int: number;
  agi: number;
  onBuy: (item: ShopItem) => void;
  onTrain: (stat: 'str' | 'int' | 'agi') => void;
  onDungeon: () => void;
  onBuyBamboo: () => void;
  onSellBamboo: () => void;
}

export const TabModules: React.FC<TabModulesProps> = ({
  tab, setTab, items, inv, coins, bamboo, price, str, int, agi,
  onBuy, onTrain, onDungeon, onBuyBamboo, onSellBamboo
}) => {
  return (
    <div style={{ background: '#1e293b', padding: '20px', borderRadius: '16px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', gap: '5px', marginBottom: '15px' }}>
        {(['shop', 'rpg', 'market', 'stats'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              flex: 1, padding: '8px 2px', borderRadius: '8px', border: 'none',
              background: tab === t ? '#3b82f6' : 'rgba(255,255,255,0.05)',
              color: tab === t ? '#fff' : '#94a3b8', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer'
            }}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {tab === 'shop' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {items.map((item) => (
              <div key={item.id} style={{ background: '#09090b', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '26px' }}>{item.emoji}</div>
                <div style={{ fontSize: '11px', fontWeight: 'bold' }}>{item.name}</div>
                <button onClick={() => onBuy(item)} style={{ width: '100%', marginTop: '6px', padding: '4px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' }}>
                  {item.type === 'food' ? `${item.price}💰` : inv.includes(item.id) ? 'Equip' : `${item.price}💰`}
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === 'rpg' && (
          <div style={{ textAlign: 'center', padding: '10px' }}>
            <h3>🏰 Dungeon Raid</h3>
            <p style={{ fontSize: '12px', color: '#94a3b8' }}>Raid dungeons for huge rewards!</p>
            <div style={{ background: '#09090b', padding: '10px', borderRadius: '8px', margin: '15px 0', fontSize: '12px', textAlign: 'left' }}>
              <p>💪 Total Power: {str + int + agi}</p>
              <p>⚡ Energy Cost: 30</p>
            </div>
            <button onClick={onDungeon} style={{ width: '100%', padding: '10px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
              ⚔️ Fight Boss
            </button>
          </div>
        )}

        {tab === 'market' && (
          <div style={{ textAlign: 'center', padding: '10px' }}>
            <h3>📈 Bamboo Stock</h3>
            <div style={{ fontSize: '26px', fontWeight: 'bold', color: '#10b981', margin: '15px 0' }}>
              💰 {price} / Bamboo
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={onBuyBamboo} style={{ flex: 1, padding: '10px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Buy</button>
              <button onClick={onSellBamboo} style={{ flex: 1, padding: '10px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Sell</button>
            </div>
          </div>
        )}

        {tab === 'stats' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ background: '#09090b', padding: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>🏋️ STR: {str}</span>
              <button onClick={() => onTrain('str')} style={{ padding: '4px 8px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Train (-20⚡)</button>
            </div>
            <div style={{ background: '#09090b', padding: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>📚 INT: {int}</span>
              <button onClick={() => onTrain('int')} style={{ padding: '4px 8px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Study (-20⚡)</button>
            </div>
            <div style={{ background: '#09090b', padding: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>🥷 AGI: {agi}</span>
              <button onClick={() => onTrain('agi')} style={{ padding: '4px 8px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Practice (-20⚡)</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};