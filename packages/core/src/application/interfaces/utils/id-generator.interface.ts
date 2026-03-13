export interface IdGenerator {
  generateInt(): Promise<number>;
}
