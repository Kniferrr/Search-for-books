import React, { ChangeEvent, useEffect } from "react";
import { fetchBooks } from "../servises/Fetch/FetchBookData";
import { useDispatch, useSelector } from "react-redux";
import {
  setError,
  setLoading,
  setSearchResults,
  setSearchValue,
} from "../store/reducers/searchResultsReducer";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import Dropdowns from "./Dropdowns";
import "./Headder.scss";

const Headder: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalItems = useSelector(
    (state: RootState) => state.searchResultsSlice.totalItems
  );
  const SearchValue = useSelector(
    (state: RootState) => state.searchResultsSlice.SearchValue
  );

  const sorting = useSelector(
    (state: RootState) => state.searchResultsSlice.sorting
  );

  const category = useSelector(
    (state: RootState) => state.searchResultsSlice.category
  );

  useEffect(() => {
    onSearch();
  }, [sorting, category]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(event.target.value));
  };

  const onSearch = async () => {
    if (SearchValue !== "") {
      try {
        dispatch(setLoading(true));
        const data = await fetchBooks(1, SearchValue, sorting, category);
        if (data !== undefined) dispatch(setSearchResults(data));
        navigate("/");
      } catch (error) {
        const errorString = String(error);
        dispatch(setError(errorString));
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="Headder">
      <div className="text-search-input">
        <a href={`#`}>
          <div className="logo-button">Logo</div>
        </a>
        <input
          type="text"
          placeholder="search books"
          value={SearchValue}
          onChange={onChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={onSearch}>Поиск</button>
      </div>
      <div className="dropdowns">
        <Dropdowns />
        {totalItems > 0 ? <p>Found {totalItems} results</p> : <></>}
      </div>
    </div>
  );
};

export default Headder;
