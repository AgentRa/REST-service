export class BaseDataAccessObject<Entity extends EntityWithId> {
  private readonly records: Array<Entity>;

  constructor() {
    this.records = [];
  }

  create(record: Entity) {
    this.records.push(record);
    return record;
  }

  findAll(): Entity[] {
    return this.records;
  }

  findBy(id: string) {
    return this.records.find((item) => item.id === id);
  }

  update(record: Entity) {
    const index = this.records.findIndex((item) => item.id === record.id);
    this.records[index] = record;
    return record;
  }

  remove(id: string) {
    const foundIndex = this.records.findIndex((item) => item.id === id);
    this.records.splice(foundIndex, 1);
  }
}

interface EntityWithId {
  id: string;
}
