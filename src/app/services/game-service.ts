import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HeroInterface } from '../data/heroInterface';
import { EnemyInterface } from '../data/enemyInterface';
import { Firestore, doc, setDoc, collection, collectionData, deleteDoc, updateDoc, getDocs, arrayUnion } from '@angular/fire/firestore';

export interface GameHero {
  id: number;
  heroData: HeroInterface;
  hp: number;
  attack: number;
  inventory: string[];
  skills: string[];
}

export interface GameEnemy {
  id: number;
  enemyData: EnemyInterface;
  hp: number;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private firestore: Firestore) {}

  /** Initialise le héros dans la partie */
  async setHero(
    hero: HeroInterface,
    hp?: number,
    attack?: number,
    inventory: string[] = [],
    skills: string[] = []
  ): Promise<void> {
    const gameHero: GameHero = {
      id: Number(hero.id),
      heroData: hero,
      hp: hp ?? hero.healt ?? 0,
      attack: attack ?? hero.attack ?? 0,
      inventory,
      skills
    };

    const heroDocRef = doc(this.firestore, 'game/hero');
    await setDoc(heroDocRef, gameHero, { merge: true });
  }

  /** Récupère le héros actuel */
  getHero(): Observable<GameHero | undefined> {
    const heroDocRef = doc(this.firestore, 'game/hero');
    return collectionData(collection(this.firestore, 'game'), { idField: 'id' }) as unknown as Observable<GameHero | undefined>;
  }

  /** Ajoute un ennemi à la room */
  async addEnemy(enemy: EnemyInterface, hp?: number): Promise<void> {
    const enemiesCollection = collection(this.firestore, 'game/enemies');
    const enemyDocRef = doc(this.firestore, `game/enemies/${enemy.id}`);
    const gameEnemy: GameEnemy = {
      id: Number(enemy.id),
      enemyData: enemy,
      hp: hp ?? enemy.base_hp ?? 0
    };
    await setDoc(enemyDocRef, gameEnemy, { merge: true });
  }

  /** Récupère la liste des ennemis de la room */
  getEnemies(): Observable<GameEnemy[]> {
    const enemiesCollection = collection(this.firestore, 'game/enemies');
    return collectionData(enemiesCollection, { idField: 'id' }) as Observable<GameEnemy[]>;
  }

  /** Supprime un ennemi par ID */
  async removeEnemy(enemyId: number): Promise<void> {
    const enemyDocRef = doc(this.firestore, `game/enemies/${enemyId}`);
    await deleteDoc(enemyDocRef);
  }

  /** Met à jour les PV d’un ennemi */
  async updateEnemyHp(enemyId: number, hp: number): Promise<void> {
    const enemyDocRef = doc(this.firestore, `game/enemies/${enemyId}`);
    await updateDoc(enemyDocRef, { hp });
  }

  /** Met à jour les PV du héros */
  async updateHeroHp(hp: number): Promise<void> {
    const heroDocRef = doc(this.firestore, 'game/hero');
    await updateDoc(heroDocRef, { hp });
  }

  /** Ajoute un item dans l’inventaire du héros */
  async addItem(item: string): Promise<void> {
    const heroDocRef = doc(this.firestore, 'game/hero');
    await updateDoc(heroDocRef, {
      inventory: arrayUnion(item)
    });
  }

  /** Ajoute une compétence au héros */
  async addSkill(skill: string): Promise<void> {
    const heroDocRef = doc(this.firestore, 'game/hero');
    await updateDoc(heroDocRef, {
      skills: arrayUnion(skill)
    });
  }

  /** Réinitialise la room (supprime tous les ennemis + reset du héros) */
  async resetRoom(): Promise<void> {
    // Supprime tous les ennemis
    const enemiesCollection = collection(this.firestore, 'game/enemies');
    const snapshot = await getDocs(enemiesCollection);
    snapshot.forEach(async docSnap => {
      await deleteDoc(docSnap.ref);
    });

    // Réinitialise le héros
    const heroDocRef = doc(this.firestore, 'game/hero');
    await updateDoc(heroDocRef, {
      hp: 0,
      inventory: [],
      skills: []
    });
  }
}

