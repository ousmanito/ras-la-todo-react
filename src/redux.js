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

export const addTodos = createAsyncThunk("todos/addTodos", async ({title, description, date}, {rejectWithValue}) => {
  return await axios
  .post("http://127.0.0.1:8000/api/task/", {
    title: title,
    description: description,
    date: date,
    user: JSON.parse(localStorage.getItem('user_details')).id
  }, {
    headers: {Authorization: `Token ${localStorage.getItem("token")}`}
  })
  .then(res => {
    console.log(res)
    return res.data
  })
  .catch(err => rejectWithValue(err))
})


export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  return await axios
    .get("http://127.0.0.1:8000/api/task/", {
      headers: { Authorization: `Token ${localStorage.getItem("token")}` },
    })
    .then((res) => {
      console.log(res)
      let tasks = res.data.filter((task) => {
        return task.user == JSON.parse(localStorage.getItem('user_details')).id
      })
      console.log('res data',tasks)
      return tasks
    })
    .catch((err) => err);
});

export const deleteTodos = createAsyncThunk("todos/deleteTodos", async (id, {rejectWithValue}) => {
  return await axios
  .delete(`http://127.0.0.1:8000/api/task/${id}`, {
    headers : {Authorization: `Token ${localStorage.getItem('token')}`}
  })
  .then(() => id)
  .catch(err => err)
})


const todoSlice = createSlice({
  name: "todos",
  initialState: todoAdapter.getInitialState({ entities: [] }),
  reducers: {},
  extraReducers: {
    [fetchTodos.fulfilled]: (state, action) => {
      todoAdapter.setAll(state, action.payload)
    },
    [fetchTodos.rejected]: (state, {payload}) => {
    },
    [deleteTodos.fulfilled]: (state, {payload}) => {
      todoAdapter.removeOne(state, payload)
    },
    [deleteTodos.rejected]: (state, {payload}) => {

    },
    [addTodos.fulfilled]: (state, {payload}) => {
      todoAdapter.addOne(state, payload)
    },
    [addTodos.rejected]: (state, {payload}) => {
    }
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
