import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HeroService } from '../../services/hero-service';
import { MessagesService } from '../../services/messages-service';
import { HeroInterface } from '../../data/heroInterface';
import { getStorage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-add-hero',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-hero.html',
  styleUrls: ['./add-hero.scss']
})
export class AddHeroComponent implements OnInit {

  heroForm!: FormGroup;
  submitting = false;
  selectedFile?: File;

  constructor(
    private fb: FormBuilder,
    private heroService: HeroService,
    public messageService: MessagesService
  ) {}

  ngOnInit(): void {
    this.heroForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      attack: [50, [Validators.required, Validators.min(10), Validators.max(100)]],
      dodge: [50, [Validators.required, Validators.min(10), Validators.max(100)]],
      healt: [100, [Validators.required, Validators.min(1)]],
      maximal_healt: [100, [Validators.required, Validators.min(1)]],
      power: ['', Validators.required],
      imageUrl: ['']
    });
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  private createBalancedHero(): HeroInterface {
    const hero = this.heroForm.value;
    const totalStats = hero.attack + hero.dodge;

    if (totalStats > 120) {
      hero.attack = Math.round(hero.attack * 0.8);
      hero.dodge = Math.round(hero.dodge * 0.8);
    }

    if (hero.healt > hero.maximal_healt) {
      hero.healt = hero.maximal_healt;
    }

    return hero;
  }

  async addHero(): Promise<void> {
    if (this.heroForm.invalid) {
      this.heroForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const newHero = this.createBalancedHero();

    try {
      // Upload fichier dans Firebase Storage
      if (this.selectedFile) {
        const storage = getStorage();
        const storageRef = ref(storage, `heroes/${Date.now()}_${this.selectedFile.name}`);
        await uploadBytes(storageRef, this.selectedFile);
        newHero.imageUrl = await getDownloadURL(storageRef);
      }

      await this.heroService.addHero(newHero);
      this.messageService.add(`✅ Héros "${newHero.name}" ajouté avec succès !`);
      this.heroForm.reset({ attack: 50, dodge: 50, healt: 100, maximal_healt: 100 });
      this.selectedFile = undefined;
    } catch (error: any) {
      console.error(error);
      this.messageService.add(`❌ Erreur lors de l’ajout du héros : ${error.message || error}`);
    } finally {
      this.submitting = false;
    }
  }
}

