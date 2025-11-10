import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HeroInterface } from '../data/heroInterface';
import { MessagesService } from './messages-service';
import { Firestore, collection, collectionData, doc, docData, updateDoc, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(
    private messageService: MessagesService,
    private firestore: Firestore
  ) {}

  /** Récupère tous les héros */
  getHeroes(): Observable<HeroInterface[]> {
    const heroesCollection = collection(this.firestore, 'heroes');
    this.messageService.add('HeroService: fetched heroes from Firestore');
    return collectionData(heroesCollection, { idField: 'id' }) as Observable<HeroInterface[]>;
  }

  /** Récupère un héros par son ID */
  getHero(id: string): Observable<HeroInterface | undefined> {
    const heroDoc = doc(this.firestore, `heroes/${id}`);
    this.messageService.add(`HeroService: fetched hero id=${id} from Firestore`);
    return docData(heroDoc, { idField: 'id' }) as Observable<HeroInterface | undefined>;
  }

  /** Met à jour un héros existant */
  updateHero(hero: HeroInterface): Promise<void> {
    const heroDoc = doc(this.firestore, `heroes/${hero.id}`);
    this.messageService.add(`HeroService: updating hero id=${hero.id} in Firestore`);
    return updateDoc(heroDoc, {
      name: hero.name,
      description: hero.description,
      attack: hero.attack,
      dodge: hero.dodge,
      healt: hero.healt,
      maximal_healt: hero.maximal_healt,
      power: hero.power,
      imageUrl: hero.imageUrl
    });
  }

  /** Ajoute un nouveau héros */
  addHero(hero: HeroInterface): Promise<void> {
    const heroesCollection = collection(this.firestore, 'heroes');
    this.messageService.add(`HeroService: adding new hero "${hero.name}"`);
    return addDoc(heroesCollection, {
      name: hero.name,
      description: hero.description,
      attack: hero.attack,
      dodge: hero.dodge,
      healt: hero.healt,
      maximal_healt: hero.maximal_healt,
      power: hero.power,
      imageUrl: hero.imageUrl || ''
    })
      .then(() => this.messageService.add(`HeroService: successfully added hero "${hero.name}"`))
      .catch((error: any) => {
        this.messageService.add(`HeroService: failed to add hero - ${error.message}`);
        throw error;
      });
  }
}

