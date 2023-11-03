import { useDispatch, useSelector } from "react-redux";
import "./Headder.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import { ChangeEvent, useEffect } from "react";
import { setSearchValue } from "../../store/reducers/mainReducer";
import Dropdowns from "./Dropdowns/Dropdowns";
import { onSearch } from "../../helpers/SearchHelper";

const Headder: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { totalItems, SearchValue, sorting, category } = useSelector(
    (state: RootState) => state.mainReducer
  );

  useEffect(() => {
    if (location.pathname == "/") {
      onSearch(dispatch, navigate, SearchValue, sorting, category);
    }
  }, [sorting, category]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(event.target.value));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch(dispatch, navigate, SearchValue, sorting, category);
    }
  };

  return (
    <div className="Headder">
      <div className="text-search-input">
        <a href={`#`} className="logo-button">
          <div>Logo</div>
        </a>
        <input
          type="text"
          placeholder="search books"
          value={SearchValue}
          onChange={onChange}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={() =>
            onSearch(dispatch, navigate, SearchValue, sorting, category)
          }
        >
          Поиск
        </button>
      </div>
      <div className="dropdowns">
        <Dropdowns />
        {totalItems > 0 ? <p>Found {totalItems} results</p> : <></>}
      </div>
    </div>
  );
};

export default Headder;
