import {
  createSlice,
  configureStore,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import thunk from "redux-thunk";

const todoAdapter = createEntityAdapter({
  selectId: (todos) => todos.key,
});

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  return await axios
    .get("http://127.0.0.1:8000/api/task/", {
      headers: { Authorization: `Token ${localStorage.getItem("token")}` },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
});

const todoSlice = createSlice({
  name: "todos",
  initialState: todoAdapter.getInitialState({ entities: [] }),
  reducers: {},
  extraReducers: {
    [fetchTodos.fulfilled]: (state, action) => {
      todoAdapter.setAll(state, action.payload)
    },
  },
});

export default todoSlice.reducer;
export const { actions } = todoSlice;
export const store = configureStore({
  reducer: {
    todos: todoSlice.reducer,
  },
  middleware: [thunk],
});

export const todosSelectors = todoAdapter.getSelectors((state) => state.todos);
