import List from "./Component/List";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<List />} />
      </Routes>
    </Provider>
  );
}

export default App;
