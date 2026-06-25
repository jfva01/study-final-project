import { useSearchStore } from '../../../store/useSearchStore';

export const SearchButton = () => {
  const openModal = useSearchStore((state) => state.openModal);

  return <button className="cursor-pointer font-bold text-slate-600 hover:text-black" onClick={openModal}>Search</button>;
};
