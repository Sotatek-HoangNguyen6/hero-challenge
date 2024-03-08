import { Hero } from './hero';
import { Monster } from './monster';

export interface Item {
  listHero: Hero[];
  monsters: Monster[];
}
