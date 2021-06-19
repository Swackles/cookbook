type BlockedQueueVals<T> = {
  method: () => Promise<T>;
  accept: (result: T) => void;
  reject: (reason?: any) => void;
}

export const getBlockedQueue = () => {
  let isWorking = false;
  const queue: BlockedQueueVals<any>[] = [];

  const resolveQueue = async () => {
    isWorking = true;
    try {
      let job = queue.shift();
      while (job !== undefined) {
        try {
          const result = await job.method();
          job.accept(result);
        } catch (e) {
          try {
            job.reject(e);
          } catch (e) {
            console.log("Unresolved error!");
          }
        } finally {
          job = queue.shift();
        }
      }
    } finally {
      isWorking = false;
    }
  };

  return async <T>(method : () => Promise<T>) => {
    return new Promise<T>((accept, reject) => {
      queue.push( { method, accept, reject });
      if (isWorking) {
        return;
      }
      resolveQueue();
    });
  }
};
