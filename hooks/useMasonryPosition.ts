import { useEffect } from 'react';
import { create } from 'zustand';

export const usePositionStore = create<{
  position: number;
  setPosition: (position: number) => void;
}>((set) => ({
  position: 0,
  setPosition: (position) => set({ position }),
}));

export const useResetToPreviousPosition = () => {
  const position = usePositionStore((state) => state.position);
  useEffect(() => {
    if (position !== 0) {
      window.scrollTo({ top: position });
    }
  }, []);
};

export const useSetMasonryPosition = () => {
  const setPosition = usePositionStore((state) => state.setPosition);
  return setPosition;
};
