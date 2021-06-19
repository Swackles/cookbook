import {deleteFromStorage, getStringFromStorage, setStringToStorage} from "./StorageWrapper";

export const getIndexes = async (name: string): Promise<string[]> => {
  const result = await getStringFromStorage(name);
  if (!result) return [];
  return result.split(",");
};

const doWithIndex = async (name: string, value: string,
                           callable: (indexes: string[], index: number) => Promise<boolean>): Promise<string[]> => {
  const result = await getIndexes(name);
  const index = result.indexOf(value);
  const doUpdate = await callable(result, index);
  if (doUpdate) {
    if (result.length === 0) {
      await deleteFromStorage(name);
    }
    await setStringToStorage(name, result.join(","));
  }
  return result;
}

export const addToIndex = async (name: string, value: string): Promise<string[]> => {
  return await doWithIndex(name, value, async (indexes, index) => {
    if (index >= 0) return false;
    indexes.push(value);
    return true;
  });
}

export const deleteFromIndex = async (name: string, value: string): Promise<string[]> => {
  return await doWithIndex(name, value, async (indexes, index) => {
    if (index < 0) return false;
    indexes.splice(index, 1);
    return true;
  });
};

export const deleteAllIndexes = async (name: string): Promise<string[]> => {
  const result = await getIndexes(name);
  await deleteFromStorage(name);
  return result;
};
