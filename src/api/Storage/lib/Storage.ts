import {BaseType, IdType} from "../types/BaseType";
import {CookbookStorage} from "../types/CookBookStorage";
import {getBlockedQueue} from "./BlockedQueue";
import {addToIndex, deleteAllIndexes, deleteFromIndex, getIndexes} from "./StorageIndexes";
import {StorageSerializer} from "../types/StorageSerializer";
import {getStorageForSerializer} from "./StorageWrapper";

const generateUUID = ():string => {
  let
    d = new Date().getTime(),
    d2 = (performance && performance.now && (performance.now() * 1000)) || 0;
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    let r = Math.random() * 16;
    if (d > 0) {
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === 'x' ? r : (r & 0x7 | 0x8)).toString(16);
  });
};

const resolveSerializer = <T>(serializer?: StorageSerializer<T>): StorageSerializer<T> => {
  if (serializer) return serializer;
  return {
    serialize: (value: T) => {
      return JSON.stringify(value);
    },
    deSerialize: (value: string) => {
      return JSON.parse(value) as T;
    }
  } as StorageSerializer<T>;
};

export const StorageBase = <T extends BaseType>(name: string, serializer?: StorageSerializer<T>): CookbookStorage<T> => {
  const queue = getBlockedQueue();
  const storage = getStorageForSerializer<T>(name, resolveSerializer(serializer));
  const save = async (value: T) : Promise<T> => {
    if (!value.id) {
      value.id = generateUUID();
    }
    await storage.put(value.id, value);
    await addToIndex(name, value.id);
    return value;
  };

  const remove = async (id: IdType) : Promise<T | null> => {
    await deleteFromIndex(name, id);
    return await storage.delete(id);
  };

  const list = async (): Promise<T[]> => {
    const result:T[] = [];
    const indexes = await getIndexes(name);
    let id = indexes.shift();
    while(id !== undefined) {
      const value = await storage.get(id);
      if (value) result.push(value);
      id = indexes.shift();
    }
    return result;
  };

  const clear = async (): Promise<void> => {
    const indexes = await deleteAllIndexes(name);
    let id = indexes.shift();
    while(id !== undefined) {
      const value = await storage.delete(id);
      id = indexes.shift();
    }
  };

  return {
    get: (id: string) => { return queue(async () => storage.get(id)) },
    save: (value: T) => { return queue( async () => save(value)) },
    delete: (id: string) => { return queue( async () => remove(id)) },
    list: () => { return queue( async () => list()) },
    clear: () => { return queue(async () => clear())}
  };
}
