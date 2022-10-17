import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const char_limit = 12;

export const fetchCharacters = createAsyncThunk('characters/getCharacters', async (page) => { // async şu işe yarar: fetchCharacters fonksiyonu çalıştığında, async sayesinde, fetchCharacters fonksiyonu içindeki kodlar çalışır. fetchCharacters fonksiyonu içindeki kodlar çalıştıktan sonra, fetchCharacters fonksiyonu döndürür.
    const response = await axios(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/characters?limit=${char_limit}&offset=${
        page * char_limit
      }`,
    );
    return response.data;
  });

  // characterSlice fonksiyonu tanımladım çünkü, store üzerindeki bir veriyi değiştirmek için createSlice fonksiyonunu kullanacağım.
export const charactersSlice = createSlice({
  // export ediyorum ki, diğer dosyalarda da kullanabileyim.
  name: "characters",
  initialState: {
    items: [],
    status: "idle", // status false ise, status componentini gösterme.
    page: 0, // sıfırıncı sayfadan başlıyorum.
    hasNextPage: true, 
  },
  reducers: {}, 
  // extraReducers, createAsyncThunk fonksiyonu ile oluşturduğumuz fonksiyonları kullanabilmemizi sağlar.
  extraReducers: {
    [fetchCharacters.pending]: (state,action) => { // pending: işlem başladığında çalışır.
      state.status = "loading"; // status componentini göster.
    },
    [fetchCharacters.fulfilled]: (state, action) => { // fulfilled: işlem başarılı olduğunda çalışır.
      state.items = [...state.items, ...action.payload]; // ...state.items ile, state.items'ın içindeki tüm elemanları alıp, ...action.payload ile, action.payload'ın içindeki tüm elemanları alıp, birleştiriyorum.
      state.status = "succeeded"; // işlem başarılı olduğu için, status componentini gösterme.
      state.page += 1;  // sayfayı bir arttırıyorum.
   
      if(action.payload.length < char_limit){ // action.payload'ın içindeki eleman sayısı, char_limit'ten küçükse, daha fazla sayfa yok demektir.
        state.hasNextPage = false; // daha fazla sayfa yoksa, hasNextPage'i false yaparak, daha fazla sayfa yok demek oluyor.
      }

    },
    [fetchCharacters.rejected]: (state,action) =>{ // rejected: işlem başarısız olduğunda çalışır.
      state.status = "failed"; // işlem başarısız olduğunda, isLoading'i false yaparak, Loading componentini göstermemeyi sağlıyorum.
      state.error = action.error.message; // error'u, action.error.message ile, action'un içindeki error'un mesajını alıyorum.
    }

  },
});

export default charactersSlice.reducer; // export ediyorum ki, diğer dosyalarda da kullanabileyim.
