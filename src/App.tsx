import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import CreatePage from "./pages/CreatePage/CreatePage";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Provider>
  );
}

export default App;
