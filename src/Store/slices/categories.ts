import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface IData {
  name: string;
  checked: boolean;
  id: number;
}

interface ICategories {
  data: IData[];
  error?: string | null;
  isLoading?: boolean;
}

const initialState: ICategories = {
  data: [],
  error: null,
  isLoading: false,
};

const slice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setCategories: (state, action) => {
      state.data = action.payload;
    },
    categoryCheckedToggle: (state, action) => {
      state.data = state.data
        .map((item) => {
          if (item.id === action.payload) {
            return { ...item, checked: !item.checked };
          }
          return item;
        })
        .sort((a, b) => {
          if (a.checked === b.checked) {
            return a.id - b.id;
          }
          return a.checked ? -1 : 1;
        });
    },
  },
});

export const { setLoading, setError, setCategories, categoryCheckedToggle } =
  slice.actions;
export default slice.reducer;

export const getCategories = () => async (dispatch: any) => {
  dispatch(setLoading(true));
  await axios
    .get("/assets/items.json")
    .then(({ data }) => {
      dispatch(
        setCategories(
          data.data.map((item: string, key: number) => ({
            name: item,
            checked: false,
            id: key + 1,
          }))
        )
      );
    })
    .catch((error) => {
      dispatch(setError(error.message));
    });
  dispatch(setLoading(false));
};
