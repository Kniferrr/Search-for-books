import { configureStore } from "@reduxjs/toolkit";
import searchResultsSlice from "./reducers/searchResultsReducer";
import selectedBookSlice from "./reducers/selectedBookReducer";
import searchRequestSlice from "./reducers/searchRequestReducer";

const store = configureStore({
  reducer: {
    searchResultsSlice: searchResultsSlice,
    selectedBookSlice: selectedBookSlice,
    searchRequestSlice: searchRequestSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
