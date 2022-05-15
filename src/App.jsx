import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Link,
  Routes,
} from "react-router-dom";

import Todo from "./pages/Todo";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
