import {createSlice} from "@reduxjs/toolkit";

export const characterSlice = createSlice({  // export ediyorum ki, diğer dosyalarda da kullanabileyim.
    name: "character",
    initialState: {
        items: [],
    },
    reducers: {},
});

export default characterSlice.reducer; // export ediyorum ki, diğer dosyalarda da kullanabileyim.