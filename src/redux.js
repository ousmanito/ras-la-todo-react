import {
  createSlice,
  configureStore,
  createAsyncThunk,
  createEntityAdapter,
  combineReducers,
} from "@reduxjs/toolkit";
import axios from "axios";
import thunk from "redux-thunk";

const todoAdapter = createEntityAdapter({
  selectId: (todo) => {
  return(todo.key)
  },
});

const categoryAdapter = createEntityAdapter({
  selectId: (category) => {
  return(category.id || category.key)
  },});

export const addTodos = createAsyncThunk(
  "todos/addTodos",
  async ({ title, description, date, category }, { rejectWithValue }) => {
    return await axios
      .post(
        "http://127.0.0.1:8000/api/task/",
        {
          category: category,
          title: title,
          description: description,
          date: date,
          user: JSON.parse(localStorage.getItem("user_details")).id,
        },
        {
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  }
);

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  return await axios
    .get("http://127.0.0.1:8000/api/task/", {
      headers: { Authorization: `Token ${localStorage.getItem("token")}` },
    })
    .then((res) => {
      let tasks = res.data.filter((task) => {
        return task.user == JSON.parse(localStorage.getItem("user_details")).id;
      });
      return tasks;
    })
    .catch((err) => console.log(err));
});

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    return await axios
      .get("http://127.0.0.1:8000/api/category/", {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        let categories = res.data.filter((category) => {
          return (
            category.user == JSON.parse(localStorage.getItem("user_details")).id
          );
        });
        return categories;
      })
      .catch((err) => console.log(err));
  }
);

export const deleteTodos = createAsyncThunk(
  "todos/deleteTodos",
  async (id, { rejectWithValue }) => {
    return await axios
      .delete(`http://127.0.0.1:8000/api/task/${id}`, {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      })
      .then(() => id)
      .catch((err) => err);
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: todoAdapter.getInitialState({ entities: [] , ids: []}),
  reducers: {},
  extraReducers: {
    [fetchTodos.fulfilled]: (state, action) => {
      todoAdapter.setAll(state, action.payload);
    },
    [fetchTodos.rejected]: (state, { payload }) => {},
    [fetchTodos.fulfilled]: (state, action) => {
      todoAdapter.setAll(state, action.payload);
    },
    [deleteTodos.fulfilled]: (state, { payload }) => {
      todoAdapter.removeOne(state, payload);
    },
    [deleteTodos.rejected]: (state, { payload }) => {},
    [addTodos.fulfilled]: (state, { payload }) => {
      todoAdapter.addOne(state, payload);
    },
    [addTodos.rejected]: (state, { payload }) => {},
  },
});

const categorySlice = createSlice({
  name: "categories",
  initialState: categoryAdapter.getInitialState({ entities: [], ids: []}),
  reducers: {},
  extraReducers: {
    [fetchCategories.fulfilled]: (state, action) => {
      categoryAdapter.setAll(state, action.payload);
    },
  },
});

export const store = configureStore({
  reducer: combineReducers({
    todos: todoSlice.reducer,
    categories: categorySlice.reducer
  }),
  middleware: [thunk],
});

export const todosSelectors = todoAdapter.getSelectors((state) => {
  return(state.todos)
});


export const categoriesSelectors = categoryAdapter.getSelectors((state) => 
{
  return(state.categories)

}  
  );