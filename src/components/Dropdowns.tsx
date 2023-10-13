import {
  setCategory,
  setSorting,
} from "../store/reducers/searchResultsReducer";
import { RootState } from "../store/store";
import "./Dropdowns.scss";
import { useDispatch, useSelector } from "react-redux";

const Dropdowns = () => {
  const dispatch = useDispatch();

  const sorting = useSelector(
    (state: RootState) => state.searchResultsSlice.sorting
  );

  const category = useSelector(
    (state: RootState) => state.searchResultsSlice.category
  );

  const handleSortingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSorting(event.target.value));
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(setCategory(event.target.value));
  };

  return (
    <div className="dropdown-container">
      <div className="dropdown">
        <label>Sorting:</label>
        <select value={sorting} onChange={handleSortingChange}>
          <option value="relevance">Relevance</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      <div className="dropdown">
        <label>Category:</label>
        <select value={category} onChange={handleCategoryChange}>
          <option value="all">All</option>
          <option value="art">Art</option>
          <option value="biography">Biography</option>
          <option value="computers">Computers</option>
          <option value="history">History</option>
          <option value="medical">Medical</option>
          <option value="poetry">Poetry</option>
        </select>
      </div>
    </div>
  );
};

export default Dropdowns;
