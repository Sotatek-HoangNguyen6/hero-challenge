import { Armor } from '../models/armor';
import { Hero } from '../models/hero';
import { Weapon } from '../models/weapon';

export const HEROES: Hero[] = [
  {
    id: 1,
    name: 'Goku',
    health: 100,
    damage: 1,
    imageSrc: 'assets/hero/goku.png',
  },
  {
    id: 2,
    name: 'Vegeta',
    health: 120,
    damage: 2,
    imageSrc: 'assets/hero/vegeta.png',
  },
  {
    id: 3,
    name: 'Piccolo',
    health: 130,
    damage: 3,
    imageSrc: 'assets/hero/piccolo.png',
  },
  {
    id: 4,
    name: 'Gohan',
    health: 140,
    damage: 4,
    imageSrc: 'assets/hero/gohan.png',
  },
  {
    id: 5,
    name: 'Trunk',
    health: 150,
    damage: 5,
    imageSrc: 'assets/hero/trunk.png',
  },
];

export const WEAPONS: Weapon[] = [
  {
    id: 1,
    name: 'Kamehameha',
    damage: 1,
    imageSrc: 'assets/skill/kamehameha.png',
  },
  {
    id: 2,
    name: 'Hakai',
    damage: 2,
    imageSrc: 'assets/skill/hakai.png',
  },
  {
    id: 3,
    name: 'Fire ball',
    damage: 3,
    imageSrc: 'assets/skill/fireball.png',
  },
  {
    id: 4,
    name: 'FireWorks',
    damage: 4,
    imageSrc: 'assets/skill/fireworks.png',
  },
];

export const ARMORS: Armor[] = [
  {
    id: 1,
    name: 'Saiyan Armor 1',
    health: 10,
    imageSrc: 'assets/armors/saiyan_1.webp',
  },
  {
    id: 2,
    name: 'Saiyan Armor 2',
    health: 20,
    imageSrc: 'assets/armors/saiyan_2.webp',
  },
  {
    id: 3,
    name: 'Saiyan Armor 3',
    health: 30,
    imageSrc: 'assets/armors/saiyan_3.jpeg',
  },
  {
    id: 4,
    name: 'Saiyan Armor 4',
    health: 40,
    imageSrc: 'assets/armors/saiyan_4.jpeg',
  },
];
