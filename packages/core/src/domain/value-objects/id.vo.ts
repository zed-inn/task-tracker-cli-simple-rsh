import { VO } from "./base.vo";

export class Id<T extends string> extends VO<number> {
  protected readonly __type!: T;
  protected _value: number;

  constructor(id: number) {
    super();
    this._value = id;
  }

  isSame(other: Id<any>) {
    return this._value === other._value;
  }

  isDifferent(other: Id<any>) {
    return this._value !== other._value;
  }
}
