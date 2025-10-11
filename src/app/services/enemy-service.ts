import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnemyInterface } from '../data/enemyInterface';
import { MessagesService } from './messages-service';
import { Firestore, collection, collectionData, doc, docData, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EnemyService {

  constructor(
    private messageService: MessagesService,
    private firestore: Firestore
  ) {}

  /** Récupère tous les ennemis */
  getEnemies(): Observable<EnemyInterface[]> {
    const enemiesCollection = collection(this.firestore, 'ennemis');
    this.messageService.add('EnemyService: fetched enemies from Firestore');
    return collectionData(enemiesCollection, { idField: 'id' }) as Observable<EnemyInterface[]>;
  }

  /** Récupère un ennemi par son ID */
  getEnemy(id: string): Observable<EnemyInterface | undefined> {
    this.messageService.add(`EnemyService: fetched enemy id=${id} from Firestore`);
    const enemyDoc = doc(this.firestore, `ennemis/${id}`);
    return docData(enemyDoc, { idField: 'id' }) as Observable<EnemyInterface | undefined>;
  }

  /** Met à jour un ennemi existant */
  updateEnemy(enemy: EnemyInterface): Promise<void> {
    const enemyDoc = doc(this.firestore, `ennemis/${enemy.id}`);
    this.messageService.add(`EnemyService: updating enemy id=${enemy.id} in Firestore`);
    return updateDoc(enemyDoc, {
      name: enemy.name,
      description: enemy.description,
      base_attack: enemy.base_attack,
      base_hp: enemy.base_hp,
      imageUrl: enemy.imageUrl
    });
  }
}

