import { BrowserRouter, Routes, Route } from "react-router";
import Inventario from "./pages/Inventario";
import EditarProducto from "./pages/EditarProducto";

import { InventarioProvider } from "./context/inventarioContext";
import { CrearProducto } from "./pages/CreaProducto";
import "./App.css"
function App() {
  return (
    <InventarioProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inventario />} />
          <Route path="/crear" element={<CrearProducto />} />
          <Route path="/editar/:id" element={<EditarProducto />} />
        </Routes>
      </BrowserRouter>
    </InventarioProvider>
  );
}

export default App;
