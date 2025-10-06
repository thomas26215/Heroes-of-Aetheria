***

## Heroes of Aetheria - Document très complet

***

### 1. Concept général

Jeu roguelite RPG textuel à choix bouton. Un héros, défini par race et classe, explore des donjons générés aléatoirement, affronte monstres et boss, améliore ses compétences et équipements. Système de progression à prise de décision qui génère une expérience stratégique profonde et un fort potentiel de rejouabilité.

***

### 2. Héros : caractéristiques détaillées

- Attributs :  
  - Attaque
  - Défense
  - Dodge (esquive)
  - Santé
  - Santé maximale
  - Mana (pour classes magiques)
  - Vitesse (pour ordre des tours)
  - Critique (chance de coup critique)
- Inventaire équipé : armes, protections, accessoires
- Liste des compétences actives/passives
- Liste d'alliés recrutés/invoqués
- Or et ressources diverses (minerais, essences, fragments etc.)
- Système de combos d'équipements (voir section 6)

***

### 3. Races et classes

- Chaque race confère des bonus passifs aux stats et permet certains types d’équipements.
- Chaque classe détermine les compétences disponibles et les types d’armes/armures utilisables.

Exemples :

| Race   | Bonus passif                   | Équipements autorisés    |
|--------|-------------------------------|-------------------------|
| Elfe   | +15% dodge, +10 agilité        | Armure légère, arcs     |
| Nain   | +20% défense, +5 force         | Armure lourde, haches  |
| Mort-vivant | Résistance magique accrue      | Capes, amulettes       |

| Classe    | Style                | Armes autorisées          |
|-----------|----------------------|---------------------------|
| Guerrier  | Mêlée physique       | Épée, bouclier            |
| Mage      | Magie offensive       | Bâtons, sceptres          |
| Archer    | Distance, agilité     | Arcs, dagues              |
| Voleur    | Attaque rapide        | Dagues, armes légères     |

***

### 4. Équipement et inventaire

- **Armes, protections, accessoires** avec stats fixes + effets spéciaux
- **Rareté** : commun, rare, épique, légendaire
- **Améliorations** : ajouts de bonus (force +5, vitesse +2, chance critique, etc.)
- **Système de combos d’équipements** (voir section 6)

***

### 5. Système de combat (boutons)

- Actions disponibles chaque tour:
  - Attaquer (arme sélectionnée)
  - Esquiver (taux de succès selon dodge)
  - Utiliser compétence (coût mana ou cooldown)
  - Utiliser objet (potion, buff)
  - Appeler un allié (si disponible)
- Retour textuel précis sur les dégâts, effets spéciaux, changements de statut

***

### 6. Système de combos d’équipements (inspiré de Balatro)

Le joueur peut équiper plusieurs objets ayant des **tags compatibles**. Lorsque certains ensembles sont complets, un combo est activé, multipliant ou modifiant significativement les stats du héros.

#### Exemples de combos

| Équipements combinés                  | Bonus combo                                |
|-------------------------------------|--------------------------------------------|
| Épée de feu + Bouclier solaire       | +25% attaque + effet brûlure prolongée    |
| Arc sylvestre + Cape d’ombre          | +30% dodge + attaque à distance accrue    |
| Amulette d’acier + Armure lourde      | +40% défense + réduction dégâts magiques  |

#### Fonctionnement

- Chaque équipement a des tags (ex : "feu", "lumière", "ombre", "acier")
- Le joueur voit visuellement les combos actifs via l'interface.
- À chaque item ajouté ou retiré, le jeu recalcule les combos actifs.
- Les combos agissent comme de puissants multiplicateurs ou buffs tactiques.

***

### 7. Progression, scaling et rejouabilité

- Arbre de compétences à choisir à chaque niveau
- Système de reliques/passifs permettant de garder une partie de la progression entre runs
- Difficulté croissante des donjons, boss plus complexes
- Choix de salles risquées avec meilleures récompenses
- Boutique gacha pour équipement rare ou alliés
- Mode infini avec objectifs en scores
- Succès et déblocages de contenu supplémentaires

***

### 8. Alliés et invocations

- Chaque allié a ses propres stats et compétences
- Peut agir en combat (boutons dédiés)
- Évolutifs en couleur de stats et équipement

***

### 9. Organisation de la structure interne (pseudo-code Dart)

```dart
class Hero {
  String name;
  String race;
  String classe;
  int attaque;
  int defense;
  int dodge;
  int hp;
  int hpMax;
  int mana;
  int vitesse;
  double critique;
  List<Skill> skills;
  List<Equipment> equipment;
  List<Ally> allies;
  List<Passive> passives;
  int gold;
  int resources;

  Map<String, int> calculateStatsWithCombos() {
    // Combinaison des stats de base + équipements + combos
  }
}

class Equipment {
  String name;
  String type; // arme, protection, accessoire
  int attaqueBonus;
  int defenseBonus;
  double dodgeBonus;
  double vitesseBonus;
  double critiqueBonus;
  List<String> tags; // pour combos
  String rarete;
  List<Effect> effetsSpeciaux;
}

class Combo {
  String nom;
  List<String> requiredTags;
  Map<String, double> statMultipliers;
  String description;
}

// Fonctions pour vérifier combos actifs sur hero
List<Combo> getActiveCombos(Hero hero) {
  // Vérifie par tags d'équipements les combos actifs
}

class Skill {
  String nom;
  String description;
  String type;  // actif, passif
  int niveau;
  Map<String, int> bonusStats;
}

class Ally {
  String name;
  Map<String, int> stats;
  List<Skill> skills;
  List<Equipment> equipment;
}
```

***

### 10. Exemple d’expérience utilisateur en run

- Combat simple avec boutons  
- Choix de compétence après niveau gagné  
- Activation automatique des combos d’équipement (affiché avec explications en texte)  
- Boutique entre étages avec gacha et amélioration  
- Décision stratégique de prendre ou pas une salle risquée avec double loot possible  

***

Avec ce système, le joueur est invité à penser sa build en combinant habilement équipements et compétences, lui permettant de démultiplier sa force via combos, tout en jouant avec le système roguelite textuel à choix de boutons, garantissant une expérience riche, profonde et très rejouable.  