import { IdType } from "../types/BaseType";

export interface CookbookStorage<T> {
  get: (id: IdType) => Promise<T | null>;
  list: () => Promise<T[]>;
  clear: () => Promise<void>;
  save: (value: T) => Promise<T>;
  delete: (id: IdType) => Promise<T | null>;
}
