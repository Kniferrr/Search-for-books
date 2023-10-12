import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchRequestState {
  query: string;
}

const initialState: SearchRequestState = {
  query: "",
};

const searchRequestSlice = createSlice({
  name: "searchRequest",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
});

export const { setQuery } = searchRequestSlice.actions;

export default searchRequestSlice.reducer;
