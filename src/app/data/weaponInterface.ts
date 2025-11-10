export interface WeaponInterface {
  id?: string;
  name: string;
  description: string;
  attack: number;
  type: 'oneHand' | 'twoHands' | 'bow';
  imageUrl?: string;
}

