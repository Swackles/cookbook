export type StorageSerializer<T> = {
  serialize: (value: T) => string;
  deSerialize: (value: string) => T;
}
