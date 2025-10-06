import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HeroInterface } from '../data/heroInterface';
import { MessagesService } from './messages-service';
import { Firestore, collection, collectionData, doc, docData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesCollection;

  constructor(
    private messageService: MessagesService,
    private firestore: Firestore
  ) {
    this.heroesCollection = collection(this.firestore, 'heroes');
  }

  /** Récupère tous les héros */
  getHeroes(): Observable<HeroInterface[]> {
    this.messageService.add('HeroService: fetched heroes from Firestore');
    // récupère tous les documents dans la collection 'heroes' avec leur id injecté dans le champ 'id'
    return collectionData(this.heroesCollection, { idField: 'id' }) as Observable<HeroInterface[]>;
  }

  /** Récupère un héros par son ID */
  getHero(id: string): Observable<HeroInterface | undefined> {
    this.messageService.add(`HeroService: fetched hero id=${id} from Firestore`);
    const heroDoc = doc(this.firestore, `heroes/${id}`);
    // récupère le document 'id_hero' dans 'heroes' en injectant l’id dans le champ 'id'
    return docData(heroDoc, { idField: 'id' }) as Observable<HeroInterface | undefined>;
  }
}

