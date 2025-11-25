import useGamesStore, { gameSelectors } from "@/stores/games";
import Dropdown from "../ui/dropdown";

interface FilterProps {
  className?: string;
}

const Filter = ({ className }: FilterProps) => {
  const { setCurrentFilter, currentFilter, setCurrentPage } = useGamesStore();
  const filters = useGamesStore(gameSelectors.selectFilters);

  const handleOnChange = (value: string) => {
    setCurrentFilter(value);
    setCurrentPage(1)
  };
  return (
    <Dropdown
      items={filters}
      selectedValue={currentFilter}
      onChange={handleOnChange}
      className={className}
      size={'md'}
    />
  );
};

export default Filter;
