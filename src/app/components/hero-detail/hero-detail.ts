import { Component, OnInit } from '@angular/core';
import { NgIf, UpperCasePipe } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroInterface } from '../../data/heroInterface';
import { HeroService } from '../../services/hero-service';
import { MessagesService } from '../../services/messages-service';
import { MessagesComponent } from '../messages/messages';
import { GameService } from '../../services/game-service';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [NgIf, UpperCasePipe, ReactiveFormsModule, MessagesComponent],
  templateUrl: './hero-detail.html',
  styleUrls: ['./hero-detail.scss'],
})
export class HeroDetail implements OnInit {
  hero?: HeroInterface;
  heroForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    public messageService: MessagesService,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.heroService.getHero(idParam).subscribe((hero) => {
        this.hero = hero;
        if (hero) {
          this.initForm(hero);
          this.messageService.add('Image URL du héros: ' + (hero.imageUrl || 'undefined'));
        }
      });
    }
  }

  /** Initialise le formulaire réactif à partir du héros */
  initForm(hero: HeroInterface): void {
    this.heroForm = new FormGroup({
      name: new FormControl(hero.name, [Validators.required, Validators.minLength(2)]),
      description: new FormControl(hero.description),
      attack: new FormControl(hero.attack),
      dodge: new FormControl(hero.dodge),
      healt: new FormControl(hero.healt),
      maximal_healt: new FormControl(hero.maximal_healt),
      power: new FormControl(hero.power),
      imageUrl: new FormControl(hero.imageUrl),
    });
  }

  goBack(): void {
    this.location.back();
  }

  /** Met à jour le héros à partir du formulaire */
  updateHero(): void {
    if (!this.hero || !this.heroForm.valid) {
      this.messageService.add('Formulaire invalide ou héros non chargé.');
      setTimeout(() => this.messageService.clear(), 3000);
      return;
    }

    const updatedHero = { ...this.hero, ...this.heroForm.value };

    this.heroService
      .updateHero(updatedHero)
      .then(() => {
        this.messageService.add(`Hero "${updatedHero.name}" updated successfully!`);
        setTimeout(() => this.messageService.clear(), 3000);
      })
      .catch(() => {
        this.messageService.add('Update failed. Try again.');
        setTimeout(() => this.messageService.clear(), 3000);
      });
  }

  /** Lance une partie avec le héros courant */
  startGame(): void {
    if (this.hero) {
      this.gameService.setHero(
        this.hero,
        this.hero.healt,
        this.hero.attack,
        [],
        []
      );
      this.messageService.add('Game started with hero: ' + this.hero.name);
    } else {
      this.messageService.add('No hero selected to start the game.');
    }
  }
}

