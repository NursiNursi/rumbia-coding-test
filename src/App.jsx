import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProductList from "./components/ProductList";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<ProductList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
