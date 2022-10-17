import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const char_limit = 12;

export const fetchCharacters = createAsyncThunk('characters/getCharacters', async (page) => {
    const response = await axios(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/characters?limit=${char_limit}&offset=${
        page * char_limit
      }`,
    );
    return response.data;
  });

export const charactersSlice = createSlice({
  // export ediyorum ki, diğer dosyalarda da kullanabileyim.
  name: "characters",
  initialState: {
    items: [],
    isLoading: false,
    page: 0, // sıfırıncı sayfadan başlıyorum.
    hasNextPage: true,
  },
  reducers: {},
  extraReducers: {
    [fetchCharacters.pending]: (state,action) =>{ // pending: işlem başladığında çalışır.
      state.isLoading = true
    },
    [fetchCharacters.fulfilled]: (state, action) => { // fulfilled: işlem başarılı olduğunda çalışır.
      state.items = [...state.items, ...action.payload];
      state.isLoading = false;
      state.page += 1;
   
      if(action.payload.length < char_limit){
        state.hasNextPage = false;
      }

    },
    [fetchCharacters.rejected]: (state,action) =>{ // rejected: işlem başarısız olduğunda çalışır.
      state.isLoading = false
      state.error = action.error.message
    }

  },
});

export default charactersSlice.reducer; // export ediyorum ki, diğer dosyalarda da kullanabileyim.
