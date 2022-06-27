import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Tasks from "./components/Tasks/Tasks";
import TodayTasks from "./components/TodayTasks/TodayTasks";
import AllTasks from "./components/AllTasks/AllTasks";
import { store } from "./redux";
import { Provider } from "react-redux";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="tasks/" element={<Tasks />}>
              <Route path="all" element={<AllTasks />}></Route>
              <Route path="today" element={<TodayTasks />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
