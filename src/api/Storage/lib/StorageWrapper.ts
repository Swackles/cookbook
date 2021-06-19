import {Storage} from "@capacitor/storage";
import {StorageSerializer} from "../types/StorageSerializer";

export const getStringFromStorage = async(name: string): Promise<string | null> => {
  const result = await Storage.get({key: name});
  if (result?.value !== undefined && result?.value !== null) {
    return result.value;
  }
  return null;
};

export const deleteFromStorage = async (name: string): Promise<string | null> => {
  const result = await Storage.get({key: name});
  if (result?.value !== undefined && result?.value !== null) {
    await Storage.remove({key: name});
    return result.value;
  }
  return null;
};

export const setStringToStorage = async(name: string, value?: string) => {
  if (value) {
    await Storage.set({key: name, value: value})
    return;
  }
  await deleteFromStorage(name);
};

export const getStorageForSerializer = <T>(name: string, serializer: StorageSerializer<T>) => {
  const getId = (id: string) => `${name}_${id}`;
  return {
    get: async (id: string) => {
      const result = await getStringFromStorage(getId(id));
      if (!result) return null;
      return serializer.deSerialize(result);
    },
    put: async (id: string, value: T) =>  setStringToStorage(getId(id), serializer.serialize(value)),
    delete: async (id: string) => {
      const result = await deleteFromStorage(getId(id));
      if (!result) return null;
      return serializer.deSerialize(result);
    }
  };
};
