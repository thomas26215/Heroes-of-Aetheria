import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { WeaponService } from '../../../services/weapon-service';
import { MessagesService } from '../../../services/messages-service';
import { WeaponInterface } from '../../../data/weaponInterface';
import { getStorage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-add-weapon',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add.html',
  styleUrls: ['./add.scss']
})
export class AddWeaponComponent implements OnInit {

  weaponForm!: FormGroup;
  submitting = false;
  selectedFile?: File;

  weaponTypes = [
    { value: 'oneHand', label: 'Une main' },
    { value: 'twoHands', label: 'Deux mains' },
    { value: 'bow', label: 'Arc' }
  ];

  constructor(
    private fb: FormBuilder,
    private weaponService: WeaponService,
    public messageService: MessagesService
  ) {}

  ngOnInit(): void {
    this.weaponForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      attack: [10, [Validators.required, Validators.min(1), Validators.max(200)]],
      type: ['oneHand', Validators.required],
      imageUrl: ['']
    });
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  async addWeapon(): Promise<void> {
    if (this.weaponForm.invalid) {
      this.weaponForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const newWeapon: WeaponInterface = { ...this.weaponForm.value };

    try {
      // Upload de l'image vers Firebase Storage
      if (this.selectedFile) {
        const storage = getStorage();
        const storageRef = ref(storage, `weapons/${Date.now()}_${this.selectedFile.name}`);
        await uploadBytes(storageRef, this.selectedFile);
        newWeapon.imageUrl = await getDownloadURL(storageRef);
      }

      await this.weaponService.addWeapon(newWeapon);
      this.messageService.add(`✅ Arme "${newWeapon.name}" ajoutée avec succès !`);

      // Reset du formulaire
      this.weaponForm.reset({ attack: 10, type: 'oneHand' });
      this.selectedFile = undefined;
    } catch (error: any) {
      console.error(error);
      this.messageService.add(`❌ Erreur lors de l’ajout de l’arme : ${error.message || error}`);
    } finally {
      this.submitting = false;
    }
  }
}

