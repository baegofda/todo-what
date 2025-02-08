import { useCallback, useEffect, useState } from 'react';

const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F,
) => {
  const stableStore = useCallback(store, []);
  const result = stableStore(callback) as F;
  const [data, setData] = useState<F>();

  useEffect(() => {
    setData(result);
  }, [result]);

  return { store: data, isLoadingStore: data === undefined };
};

export default useStore;
