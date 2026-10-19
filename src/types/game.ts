export interface ShopItem {
  id: string;
  name: string;
  price: number;
  type: 'shirt' | 'hat' | 'glasses' | 'food';
  emoji: string;
  color?: string;
  bonus?: string;
}

export interface GrowthStage {
  title: string;
  scale: number;
}