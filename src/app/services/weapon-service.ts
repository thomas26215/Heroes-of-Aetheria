import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeaponInterface } from '../data/weaponInterface';
import { MessagesService } from './messages-service';
import { Firestore, collection, collectionData, doc, docData, updateDoc, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class WeaponService {

  constructor(
    private messageService: MessagesService,
    private firestore: Firestore
  ) {}

  /** Récupère toutes les armes */
  getWeapons(): Observable<WeaponInterface[]> {
    const weaponsCollection = collection(this.firestore, 'weapons');
    this.messageService.add('WeaponService: fetched weapons from Firestore');
    return collectionData(weaponsCollection, { idField: 'id' }) as Observable<WeaponInterface[]>;
  }

  /** Récupère une arme par son ID */
  getWeapon(id: string): Observable<WeaponInterface | undefined> {
    const weaponDoc = doc(this.firestore, `weapons/${id}`);
    this.messageService.add(`WeaponService: fetched weapon id=${id} from Firestore`);
    return docData(weaponDoc, { idField: 'id' }) as Observable<WeaponInterface | undefined>;
  }

  /** Met à jour une arme existante */
  updateWeapon(weapon: WeaponInterface): Promise<void> {
    const weaponDoc = doc(this.firestore, `weapons/${weapon.id}`);
    this.messageService.add(`WeaponService: updating weapon id=${weapon.id}`);
    return updateDoc(weaponDoc, {
      name: weapon.name,
      description: weapon.description,
      attack: weapon.attack,
      type: weapon.type,
      imageUrl: weapon.imageUrl || ''
    });
  }

  /** Ajoute une nouvelle arme */
  addWeapon(weapon: WeaponInterface): Promise<void> {
    const weaponsCollection = collection(this.firestore, 'weapons');
    this.messageService.add(`WeaponService: adding new weapon "${weapon.name}"`);
    return addDoc(weaponsCollection, {
      name: weapon.name,
      description: weapon.description,
      attack: weapon.attack,
      type: weapon.type,
      imageUrl: weapon.imageUrl || ''
    })
      .then(() => this.messageService.add(`WeaponService: successfully added weapon "${weapon.name}"`))
      .catch((error: any) => {
        this.messageService.add(`WeaponService: failed to add weapon - ${error.message}`);
        throw error;
      });
  }
}

