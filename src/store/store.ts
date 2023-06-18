import { configureStore, createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: {
    step1Values: {
      nickname: "",
      name: "",
      surname: "",
      sex: "Не выбрано",
      phone: "",
      email: "",
    },
    step2Values: {
      advantages: ["", "", ""],
      checkboxGroup: [0, 0, 0],
      radioGroup: "",
    },
    step3Values: {
      about: "",
      characterCount: 0,
    },
  },
  reducers: {
    updateStep1Values: (state, action) => {
      state.step1Values = { ...state.step1Values, ...action.payload };
    },
    updateStep2Values: (state, action) => {
      state.step2Values = { ...state.step2Values, ...action.payload };
    },
    updateStep3Values: (state, action) => {
      state.step3Values = { ...state.step3Values, ...action.payload };
    },
  },
});

export const { updateStep1Values, updateStep2Values, updateStep3Values } =
  formSlice.actions;

const store = configureStore({
  reducer: {
    form: formSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
