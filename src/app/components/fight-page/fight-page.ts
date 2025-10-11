import { Component, OnInit } from '@angular/core';
import { EnemyService } from '../../services/enemy-service';
import { HeroService } from '../../services/hero-service';
import { EnemyInterface } from '../../data/enemyInterface';
import { HeroInterface } from '../../data/heroInterface';
import { MessagesService } from '../../services/messages-service';
import { NgIf, NgForOf } from '@angular/common';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-fight-page',
  templateUrl: './fight-page.html',
  styleUrls: ['./fight-page.scss'],
  standalone: true,
  imports: [NgIf, NgForOf]
})
export class FightPage implements OnInit {
  enemy?: EnemyInterface;
  hero?: HeroInterface;
  enemyHp?: number;
  heroHp?: number;

  constructor(
    private enemyService: EnemyService,
    private heroService: HeroService,
    public messageService: MessagesService
  ) {}

  ngOnInit() {
    this.enemyService.getEnemies().subscribe(enemies => {
      if (enemies.length > 0) {
        this.enemy = enemies[0];
        this.enemyHp = enemies[0].base_hp ?? 0;
      }
    });
    this.heroService.getHeroes().subscribe(heroes => {
      if (heroes.length > 0) {
        this.hero = heroes[0];
        this.heroHp = heroes[0].healt ?? 0;
      }
    });
  }

  attackEnemy() {
    if (this.enemy && this.hero) {
      const attack = this.hero.attack ?? 0;
      this.enemyHp = Math.max(0, (this.enemyHp ?? 0) - attack);
      this.messageService.add(`${this.hero.name} attaque ! ${this.enemy?.name} perd ${attack} PV.`);

      const enemyEl = document.querySelector('.enemy-img');
      if (enemyEl) {
        enemyEl.classList.add('hit');
        setTimeout(() => enemyEl.classList.remove('hit'), 300);
      }

      if (this.enemyHp === 0) this.messageService.add(`${this.enemy?.name} est vaincu !`);
    }
  }

  enemyAttack() {
    if (this.enemy && this.hero) {
      const attack = this.enemy.base_attack ?? 0;
      this.heroHp = Math.max(0, (this.heroHp ?? 0) - attack);
      this.messageService.add(`${this.enemy.name} attaque ! ${this.hero?.name} perd ${attack} PV.`);

      const heroEl = document.querySelector('.hero-img');
      if (heroEl) {
        heroEl.classList.add('hit');
        setTimeout(() => heroEl.classList.remove('hit'), 300);
      }

      if (this.heroHp === 0) this.messageService.add(`${this.hero?.name} est KO !`);
    }
  }

  dodge() {
  this.messageService.add(`${this.hero?.name} tente d'esquiver !`);

  const heroEl = document.querySelector('.hero-img');
  if (heroEl) {
    heroEl.classList.add('dodge');
    setTimeout(() => heroEl.classList.remove('dodge'), 300);
  }
}


  heal() {
  if (this.hero) {
    this.heroHp = Math.min((this.hero?.maximal_healt ?? 0), (this.heroHp ?? 0) + 10);
    this.messageService.add(`${this.hero?.name} regagne 10 PV !`);

    const heroEl = document.querySelector('.hero-img');
    if (heroEl) {
      heroEl.classList.add('heal');
      setTimeout(() => heroEl.classList.remove('heal'), 500);
    }
  }
}

}

