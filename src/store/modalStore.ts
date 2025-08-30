import { create } from "zustand";
import { Movie } from "@/types";

// تعریف اینترفیس برای state و action های ما
export interface ModalStoreInterface {
  movie?: Movie;
  isOpen: boolean;
  openModal: (movie: Movie) => void;
  closeModal: () => void;
}

// ایجاد store
const useMovieModal = create<ModalStoreInterface>((set) => ({
  movie: undefined,
  isOpen: false,
  openModal: (movie: Movie) => set({ isOpen: true, movie }),
  closeModal: () => set({ isOpen: false, movie: undefined }),
}));

export default useMovieModal;
