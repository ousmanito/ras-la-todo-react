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
    return todo.id || todo.key;
  },
});

const categoryAdapter = createEntityAdapter({
  selectId: (category) => {
    return category.id || category.key;
  },
});

const taskCategoryAdapter = createEntityAdapter({
  selectId: (taskCategory) => {
    return taskCategory.id;
  },
});

export const addTodos = createAsyncThunk(
  "todos/addTodos",
  async (
    { title, description, pythonDate, categories },
    { rejectWithValue, dispatch }
  ) => {
    return await axios
      .post(
        "http://127.0.0.1:8000/api/task/",
        {
          title: title,
          description: description,
          date: pythonDate,
          user: JSON.parse(localStorage.getItem("user_details")).id,
        },
        {
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
        }
      )
      .then(async (res) => {
        const taskId = res.data.key;
        if (categories.length > 0) {
          for (const category of categories) {
            console.log("ADD TC");
            await dispatch(addTaskCategories({ taskId, category }));
          }
        }
        if (categories.length == 0) {
          console.log("SEND EMPTY CAT");
          await dispatch(addTaskCategories({ taskId, category: null }));
        }
        return res.data;
      })
      .catch((err) => {
        throw err.message
      });
  }
);

export const fetchTaskCategories = createAsyncThunk(
  "taskCategories/fetchTaskCategories",
  async () => {
    return await axios
      .get("http://127.0.0.1:8000/api/task-category/", {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        let taskCategories = res.data.filter((taskCategory) => {
          return (
            taskCategory.user ==
            JSON.parse(localStorage.getItem("user_details")).id
          );
        });
        return taskCategories;
      })
      .catch((err) => {
        throw err.message;
      });
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
    .catch((err) => {
      throw err.message;
    });
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
      .catch((err) => {
        throw err.message;
      });
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
      .catch((err) => {
        throw err.message;
      });
  }
);

export const deleteCategories = createAsyncThunk(
  "categories/deleteCategories",
  async (id, { rejectWithValue }) => {
    return await axios
      .delete(`http://127.0.0.1:8000/api/category/${id}`, {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      })
      .then(() => id)
      .catch((err) => {
        throw err.message;
      });
  }
);

export const addTaskCategories = createAsyncThunk(
  "taskCategories/addTaskCategories",
  async ({ taskId, category }) => {
    console.log({ taskId, category });
    return await axios
      .post(
        "http://127.0.0.1:8000/api/task-category/",
        {
          category: category || null,
          task: taskId,
          user: JSON.parse(localStorage.getItem("user_details")).id,
        },
        {
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => res.data)
      .catch((err) => {
        throw err.message;
      });
  }
);

export const addCategories = createAsyncThunk(
  "categories/addCategories",
  async (title) => {
    if (title) {
      return await axios
        .post(
          "http://127.0.0.1:8000/api/category/",
          {
            title: title,
            user: JSON.parse(localStorage.getItem("user_details")).id,
          },
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          throw err.message;
        });
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: todoAdapter.getInitialState({
    entities: [],
    ids: [],
    error: null,
  }),
  reducers: {},
  extraReducers: {
    [fetchTodos.fulfilled]: (state, action) => {
      todoAdapter.setAll({ ...state, error: null }, action.payload);
    },
    [fetchTodos.rejected]: (state, { payload }) => {
      return { ...state, error: true };
    },
    [deleteTodos.fulfilled]: (state, { payload }) => {
      todoAdapter.removeOne(state, payload);
    },
    [deleteTodos.rejected]: (state, { payload }) => {
      return { ...state, error: true };
    },
    [addTodos.fulfilled]: (state, { payload }) => {
      todoAdapter.addOne(state, payload);
    },
    [addTodos.rejected]: (state, { payload }) => {
      return { ...state, error: true };
    },
  },
});

const categorySlice = createSlice({
  name: "categories",
  initialState: categoryAdapter.getInitialState({
    entities: [],
    ids: [],
    error: null,
  }),
  reducers: {},
  extraReducers: {
    [fetchCategories.fulfilled]: (state, action) => {
      categoryAdapter.setAll({ ...state, error: null }, action.payload);
    },
    [fetchCategories.rejected]: (state) => {
      return { ...state, error: true };
    },
    [addCategories.fulfilled]: (state, action) => {
      categoryAdapter.addOne(state, action.payload);
    },
    [addCategories.rejected]: (state) => {
      return { ...state, error: true };
    },
    [deleteCategories.fulfilled]: (state, action) => {
      categoryAdapter.removeOne(state, action.payload);
    },
    [deleteCategories.rejected]: (state) => {
      return { ...state, error: true };
    },
  },
});

const taskCategorySlice = createSlice({
  name: "taskCategories",
  initialState: taskCategoryAdapter.getInitialState({
    entities: [],
    ids: [],
    error: null,
  }),
  reducers: {},
  extraReducers: {
    [fetchTaskCategories.fulfilled]: (state, action) => {
      taskCategoryAdapter.setAll({ ...state, error: null }, action.payload);
    },
    [fetchTaskCategories.rejected]: (state) => {
      return { ...state, error: true };
    },
    [addTaskCategories.fulfilled]: (state, action) => {
      taskCategoryAdapter.addOne(state, action.payload);
    },
    [addTaskCategories.rejected]: (state) => {
      return { ...state, error: true };
    },
  },
});

export const store = configureStore({
  reducer: combineReducers({
    todos: todoSlice.reducer,
    categories: categorySlice.reducer,
    taskCategories: taskCategorySlice.reducer,
  }),
  middleware: [thunk],
});

export const todosSelectors = todoAdapter.getSelectors((state) => {
  return state.todos;
});

export const categoriesSelectors = categoryAdapter.getSelectors((state) => {
  return state.categories;
});

export const taskCategoriesSelectors = taskCategoryAdapter.getSelectors(
  (state) => {
    return state.taskCategories;
  }
);
