export class ArrayMutator<T> {
  private array: Array<T>;

  constructor(array: Array<T>) {
    this.array = array;
  }

  get() {
    return this.array;
  }

  at(index: number) {
    const current = [...this.array];

    if (index < 0) {
      return current.find((_, i) => i === current.length + index);
    }

    return current.find((_, i) => i === index);
  }

  isEmpty() {
    const current = [...this.array];

    return current.length === 0;
  }

  clear() {
    this.array.length = 0;

    return this;
  }

  unique() {
    const current = [...this.array];

    const uniqueArray = current.filter(
      (value, index) => current.indexOf(value) === index
    );

    this.array = uniqueArray;

    return this;
  }

  replace(index: number, value: T) {
    const current = [...this.array];

    current.splice(index, 1, value);

    this.array = current;

    return this;
  }

  remove(index: number) {
    const current = [...this.array];

    current.splice(index, 1);

    this.array = current;

    return this;
  }
}
