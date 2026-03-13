export abstract class VO<T extends unknown = unknown> {
  protected abstract _value: T;

  public get v() {
    return this._value;
  }

  toString() {
    return this._value;
  }

  valueOf() {
    return this._value;
  }
}
