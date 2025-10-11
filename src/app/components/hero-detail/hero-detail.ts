import { Component, OnInit } from '@angular/core';
import { NgIf, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroInterface } from '../../data/heroInterface';
import { HeroService } from '../../services/hero-service';
import { MessagesService } from '../../services/messages-service';
import { MessagesComponent } from '../messages/messages';
import { GameService } from '../../services/game-service'; // 🔹 Importer GameService

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [NgIf, UpperCasePipe, FormsModule, MessagesComponent],
  templateUrl: './hero-detail.html',
  styleUrls: ['./hero-detail.scss'],
})
export class HeroDetail implements OnInit {
  hero?: HeroInterface;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    public messageService: MessagesService,
    private gameService: GameService // 🔹 Injecter GameService
  ) {}

  ngOnInit(): void {
    this.messageService.add("imageUrl du hero: " + (this.hero?.imageUrl || 'undefined'));
    this.getHero();
  }

  getHero(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.heroService.getHero(idParam).subscribe((hero) => (this.hero = hero));
      console.log("imageUrl du hero après fetch: " + (this.hero?.imageUrl || 'undefined'));
    }
  }

  goBack(): void {
    this.location.back();
  }

  updateHero(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .then(() => {
          this.messageService.add(`Hero "${this.hero?.name}" updated successfully!`);
          setTimeout(() => this.messageService.clear(), 3000);
        })
        .catch(() => {
          this.messageService.add('Update failed. Try again.');
          setTimeout(() => this.messageService.clear(), 3000);
        });
    }
  }

  /** 🔹 Start game avec ajout dans GameService */
  startGame(): void {
    if (this.hero) {
      this.gameService.setHero(
        this.hero,
        this.hero.healt,   // PV actuel
        this.hero.attack,  // attaque
        [],                // inventaire initial vide
        []                 // compétences initiales vides
      );
      this.messageService.add('Game started with hero: ' + this.hero.name);
    } else {
      this.messageService.add('No hero selected to start the game.');
    }
  }
}

