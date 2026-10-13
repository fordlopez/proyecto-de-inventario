
import axios from "axios";

const inventarioApi = axios.create({
    baseURL: "http://localhost:9000/api/inventario",
    headers: {
        "Content-Type": "application/json"
    }
});

export default inventarioApi;