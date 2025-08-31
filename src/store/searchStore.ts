import { create } from 'zustand'

export interface SearchStoreInterface {
  isOpen: boolean
  openSearch: () => void
  closeSearch: () => void
}

const useSearchModal = create<SearchStoreInterface>((set) => ({
  isOpen: false,
  openSearch: () => set({ isOpen: true }),
  closeSearch: () => set({ isOpen: false }),
}))

export default useSearchModal