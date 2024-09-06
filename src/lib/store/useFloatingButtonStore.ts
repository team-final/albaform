import { create } from 'zustand';

interface FloatingButtonState {
  size: 'small' | 'medium';
  setSize: (size: 'small' | 'medium') => void;
}

const useFloatingButton = create<FloatingButtonState>((set) => ({
  size: 'medium',
  setSize: (size) => set({ size }),
}));

export default useFloatingButton;
