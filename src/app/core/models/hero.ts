export interface Hero {
  id: number;
  name: string;
  health: number;
  imageSrc?: string;
  damage: number;
  weaponId?: number;
  armorId?: number;
}
