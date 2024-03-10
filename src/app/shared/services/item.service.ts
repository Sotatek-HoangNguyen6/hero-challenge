export abstract class ItemService<T extends { id: number }> {
  private data: T[];
  constructor(data: T[]) {
    this.data = data;
  }
  get(): T[] {
    return this.data;
  }

  getItemById(id: number): T {
    const armor = this.data.find((armor) => armor.id === id)!;
    return armor;
  }
}
