CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    precio NUMERIC(10, 2) CHECK (precio > 0),
    stock INTEGER DEFAULT 0 CHECK (stock >= 0)
);


