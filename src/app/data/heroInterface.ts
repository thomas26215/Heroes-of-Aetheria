export interface HeroInterface {
  id: string;
  name: string;
  description: string;
  attack?: number;
  dodge?: number;
  healt?: number;
  maximal_healt?: number;
  power?: string;
  imageUrl?: string; // Champ pour l'URL de l'image
}

