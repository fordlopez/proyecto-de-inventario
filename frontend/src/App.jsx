
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { InventarioProvider } from "./context/InventarioContext";

import Inventario from "./pages/Inventario";
import CrearProducto from "./pages/CrearProducto";
import EditarProducto from "./pages/EditarProducto";

function App() {
  return (
    <InventarioProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inventario />} />

          <Route
            path="/crear"
            element={<CrearProducto />}
          />

          <Route
            path="/editar/:id"
            element={<EditarProducto />}
          />
        </Routes>
      </BrowserRouter>
    </InventarioProvider>
  );
}

export default App;