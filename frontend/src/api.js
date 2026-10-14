import axios from "axios";

// La URL del backend viene de la variable de entorno VITE_API_URL (archivo .env)
const inventarioApi = axios.create({
    baseURL: "http://localhost:9000/api/productos",
    headers: {
        "Content-Type": "application/json"
    }
});

export default inventarioApi;
