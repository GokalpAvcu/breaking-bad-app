import {createSlice} from "@reduxjs/toolkit";

export const charactersSlice = createSlice({  // export ediyorum ki, diğer dosyalarda da kullanabileyim.
    name: "character",
    initialState: {
        items: [],
    },
    reducers: {},
});

export default charactersSlice.reducer; // export ediyorum ki, diğer dosyalarda da kullanabileyim.