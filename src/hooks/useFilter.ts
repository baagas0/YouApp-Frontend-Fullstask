import React, { useRef } from 'react';

interface UseFilter<S = {}> {
  filter: S;
  setFilter: (name: keyof S, value: any) => void;
  updateMirroringFilter: () => void;
  resetFilter: () => void;
}

const useFilter = <S>(initialValue: S): UseFilter<S> => {
  const [filter, setFilter] = React.useState<S>(initialValue);
  const prevFilter = useRef(initialValue);

  const changeFilter = (name: keyof S, value: any): void => {
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetFilter = (): void => {
    setFilter(initialValue);
  };

  const updateMirroringFilter = (): void => {
    prevFilter.current = filter;
  };

  return {
    filter,
    setFilter: changeFilter,
    updateMirroringFilter,
    resetFilter,
  };
};

export default useFilter;
