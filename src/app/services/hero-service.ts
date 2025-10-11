import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HeroInterface } from '../data/heroInterface';
import { MessagesService } from './messages-service';
import { Firestore, collection, collectionData, doc, docData, updateDoc } from '@angular/fire/firestore';

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
    this.messageService.add('HeroService: fetched heroes from Firestore 1');
    return collectionData(heroesCollection, { idField: 'id' }) as Observable<HeroInterface[]>;
  }

  /** Récupère un héros par son ID */
  getHero(id: string): Observable<HeroInterface | undefined> {
    this.messageService.add(`HeroService: fetched hero id=${id} from Firestore 2`);
    const heroDoc = doc(this.firestore, `heroes/${id}`);
    return docData(heroDoc, { idField: 'id' }) as Observable<HeroInterface | undefined>;
  }

  /** Met à jour un héros existant */
  updateHero(hero: HeroInterface): Promise<void> {
    const heroDoc = doc(this.firestore, `heroes/${hero.id}`);
    this.messageService.add(`HeroService: updating hero id=${hero.id} in Firestore`);
    return updateDoc(heroDoc, {
      name: hero.name,
      power: hero.description,
      // ajoutez ici tous les champs que vous souhaitez mettre à jour
    });
  }
}

