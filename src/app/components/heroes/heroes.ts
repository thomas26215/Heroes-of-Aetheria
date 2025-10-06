// heroes.component.ts (correspondant à votre `Heroes` standalone component)
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroInterface } from '../../data/heroInterface';
import { HeroService } from '../../services/hero-service';
import { MessagesComponent } from '../messages/messages';
import { MessagesService } from '../../services/messages-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [CommonModule, RouterModule, MessagesComponent],
  templateUrl: './heroes.html',
  styleUrls: ['./heroes.scss'],
})
export class Heroes implements OnInit {
  heroes: HeroInterface[] = [];

  constructor(
    private heroService: HeroService,
    private messageService: MessagesService
  ) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => {
      this.heroes = heroes;
      this.messageService.add('Heroes component: loaded heroes from Firestore');
    });
  }

  trackByHeroId(index: number, hero: HeroInterface): number {
    return hero.id;
  }
}

