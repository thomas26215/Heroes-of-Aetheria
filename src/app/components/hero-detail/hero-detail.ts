import { Component, OnInit } from '@angular/core';
import { NgIf, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroInterface } from '../../data/heroInterface';
import { HeroService } from '../../services/hero-service';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [NgIf, UpperCasePipe, FormsModule],
  templateUrl: './hero-detail.html',
  styleUrls: ['./hero-detail.scss'],
})
export class HeroDetail implements OnInit {
  hero?: HeroInterface;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      // Forcer id en string, car getHero attend un string
      this.heroService.getHero(idParam).subscribe((hero) => (this.hero = hero));
    }
  }

  goBack(): void {
    this.location.back();
  }
}

