import React, { useState, useEffect } from 'react';
import { ShopItem } from './types/game';
import { Header } from './components/Header';
import { VitalsPanel } from './components/VitalsPanel';
import { PandaAvatar } from './components/PandaAvatar';
import { TabModules } from './components/TabModules';

const ITEMS: ShopItem[] = [
  { id: 's1', name: 'Red Shirt', price: 100, type: 'shirt', emoji: '👕', color: '#ef4444' },
  { id: 's2', name: 'Suit', price: 300, type: 'shirt', emoji: '👔', color: '#1e293b' },
  { id: 's3', name: 'Ninja Hoodie', price: 500, type: 'shirt', emoji: '🥷', color: '#09090b' },
  { id: 'h1', name: 'Cap', price: 80, type: 'hat', emoji: '🧢' },
  { id: 'h2', name: 'Crown', price: 750, type: 'hat', emoji: '👑' },
  { id: 'g1', name: 'Shades', price: 150, type: 'glasses', emoji: '🕶️' },
  { id: 'g2', name: 'VR Set', price: 450, type: 'glasses', emoji: '🥽' },
  { id: 'f1', name: 'Bamboo', price: 20, type: 'food', emoji: '🎍' },
  { id: 'f2', name: 'Ramen', price: 50, type: 'food', emoji: '🍜' }
];

export default function App() {
  const [coins, setCoins] = useState(250);
  const [gems, setGems] = useState(10);
  const [bamboo, setBamboo] = useState(5);
  const [price, setPrice] = useState(20);

  const [hunger, setHunger] = useState(85);
  const [energy, setEnergy] = useState(90);
  const [health, setHealth] = useState(100);
  const [isSick, setIsSick] = useState(false);

  const [str, setStr] = useState(5);
  const [int, setInt] = useState(5);
  const [agi, setAgi] = useState(5);

  const [shirt, setShirt] = useState<ShopItem | null>(null);
  const [hat, setHat] = useState<ShopItem | null>(null);
  const [glasses, setGlasses] = useState<ShopItem | null>(null);
  const [inv, setInv] = useState<string[]>([]);

  const [days, setDays] = useState(0);
  const [logs, setLogs] = useState<string[]>(['Welcome to Panda Empire!']);
  const [tab, setTab] = useState<'shop' | 'rpg' | 'market' | 'stats'>('shop');

  const addLog = (msg: string) => setLogs((prev) => [msg, ...prev.slice(0, 5)]);

  useEffect(() => {
    const savedBirth = localStorage.getItem('p_birth');
    if (savedBirth) {
      setDays(Math.floor((Date.now() - Number(savedBirth)) / 86400000));
    } else {
      localStorage.setItem('p_birth', String(Date.now()));
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setHunger((h) => Math.max(0, h - 2));
      setEnergy((e) => Math.max(0, e - 1));
      if (hunger < 20 && Math.random() < 0.2) {
        setIsSick(true);
        setHealth((h) => Math.max(10, h - 5));
      }
      setPrice((p) => Math.max(5, Math.min(100, p + Math.floor(Math.random() * 11) - 5)));
    }, 4000);
    return () => clearInterval(timer);
  }, [hunger]);

  const getStage = () => {
    if (days < 2) return { title: 'Baby Cub 🍼', scale: 0.8 };
    if (days < 5) return { title: 'Toddler Panda 🎒', scale: 1.0 };
    if (days < 10) return { title: 'Teen Panda 🎧', scale: 1.15 };
    return { title: 'Adult Giant Panda 🐼👑', scale: 1.3 };
  };
  const stage = getStage();

  const handleBuy = (item: ShopItem) => {
    if (item.type === 'food') {
      if (coins < item.price) return addLog('❌ Need more coins!');
      setCoins((c) => c - item.price);
      setHunger((h) => Math.min(100, h + 35));
      return addLog(`😋 Ate ${item.name}!`);
    }

    if (!inv.includes(item.id)) {
      if (coins < item.price) return addLog('❌ Need more coins!');
      setCoins((c) => c - item.price);
      setInv((prev) => [...prev, item.id]);
      addLog(`🛍️ Bought ${item.name}!`);
    }

    if (item.type === 'shirt') setShirt(shirt?.id === item.id ? null : item);
    if (item.type === 'hat') setHat(hat?.id === item.id ? null : item);
    if (item.type === 'glasses') setGlasses(glasses?.id === item.id ? null : item);
  };

  const train = (stat: 'str' | 'int' | 'agi') => {
    if (energy < 20) return addLog('😴 Too tired!');
    setEnergy((e) => e - 20);
    if (stat === 'str') { setStr((s) => s + 2); addLog('🏋️ Strength +2!'); }
    if (stat === 'int') { setInt((i) => i + 2); addLog('📚 Intellect +2!'); }
    if (stat === 'agi') { setAgi((a) => a + 2); addLog('🥷 Agility +2!'); }
  };

  const dungeon = () => {
    if (energy < 30 || isSick) return addLog('❌ Need health & energy!');
    setEnergy((e) => e - 30);
    const power = str + int + agi;
    if (Math.random() < Math.min(0.85, power / 40)) {
      const reward = 120 + power * 6;
      setCoins((c) => c + reward);
      setGems((g) => g + 2);
      addLog(`⚔️ Won Dungeon! +${reward}💰 +2💎`);
    } else {
      setHealth((h) => Math.max(10, h - 25));
      addLog('💥 Dungeon Failed!');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: '#f8fafc', padding: '20px', fontFamily: 'sans-serif' }}>
      <Header stageTitle={stage.title} daysAlive={days} isSick={isSick} coins={coins} gems={gems} bamboo={bamboo} />

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr 340px', gap: '20px', minHeight: '500px' }}>
        <VitalsPanel hunger={hunger} energy={energy} health={health} isSick={isSick} logs={logs} onNap={() => setEnergy((e) => Math.min(100, e + 40))} onMedicine={() => { setCoins((c) => c - 50); setIsSick(false); setHealth(100); }} />

        <PandaAvatar scale={stage.scale} stageTitle={stage.title} shirt={shirt} hat={hat} glasses={glasses} />

        <TabModules tab={tab} setTab={setTab} items={ITEMS} inv={inv} coins={coins} bamboo={bamboo} price={price} str={str} int={int} agi={agi} onBuy={handleBuy} onTrain={train} onDungeon={dungeon} onBuyBamboo={() => { if (coins >= price) { setCoins((c) => c - price); setBamboo((b) => b + 1); addLog('📈 Bought Bamboo'); } }} onSellBamboo={() => { if (bamboo > 0) { setBamboo((b) => b - 1); setCoins((c) => c + price); addLog('📉 Sold Bamboo'); } }} />
      </div>
    </div>
  );
}