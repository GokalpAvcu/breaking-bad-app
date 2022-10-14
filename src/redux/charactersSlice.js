import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCharacters = createAsyncThunk(
  "characters/getCharacters",
  async () => {
    const response = await axios(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/characters?limit=10`
    );
    return response.data;
  }
);

export const charactersSlice = createSlice({
  // export ediyorum ki, diğer dosyalarda da kullanabileyim.
  name: "characters",
  initialState: {
    items: [],
  },
  reducers: {},
  extraReducers: {
    [fetchCharacters.fulfilled]: (state, action) => {
      state.items = action.payload;
      console.log(state.items);
    },
  },
});

export default charactersSlice.reducer; // export ediyorum ki, diğer dosyalarda da kullanabileyim.
