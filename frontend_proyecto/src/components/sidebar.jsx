import { useState } from "react";

export default function Sidebar({ onFilterChange }) {
    const [filters, setFilters] = useState({
        query: "",
        marca: "",
        ram: "",
        tipo_almacenamiento: "",
        almacenamiento: "",
        precio_min: "",
        precio_max: "",
        sistema_operativo: "",
        cpu: "",
        gpu: "",
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };
    
    const handleBuscar = () => {
        onFilterChange(filters);
    };
    
    const handleLimpiar = () => {
        const filtrosLimpios = {
            marca: "",
            ram: "",
            tipo_almacenamiento: "",
            almacenamiento: "",
            precio_min: "",
            precio_max: "",
            sistema_operativo: "",
            cpu: "",
            gpu: "",
        };
        setFilters(filtrosLimpios);
        onFilterChange(filtrosLimpios);
    };
    
    return (
        <div className="w-72 bg-gray-100 p-4 h-full font-[consolas] flex flex-col gap-4 overflow-y-auto">

            <h2 className="text-lg font-bold">Filtros</h2>

            <input name="marca" placeholder="Marca" value={filters.marca} onChange={handleChange}
                className="w-full border rounded p-2" />
            <input name="ram" placeholder="RAM (GB)" value={filters.ram} onChange={handleChange}
                className="w-full border rounded p-2" />
            <input name="almacenamiento" placeholder="Almacenamiento" value={filters.almacenamiento} onChange={handleChange}
                className="w-full border rounded p-2" />
            <input name="tipo_almacenamiento" placeholder="Tipo de almacenamiento" value={filters.tipo_almacenamiento}
                onChange={handleChange} className="w-full border rounded p-2" />
            <input name="sistema_operativo" placeholder="Sistema operativo" value={filters.sistema_operativo}
                onChange={handleChange} className="w-full border rounded p-2" />
            <input name="cpu" placeholder="CPU" value={filters.cpu} onChange={handleChange}
                className="w-full border rounded p-2" />
            <input name="gpu" placeholder="GPU" value={filters.gpu} onChange={handleChange}
                className="w-full border rounded p-2" />
            <input name="precio_min" type="number" placeholder="Precio mínimo" value={filters.precio_min}
                onChange={handleChange} className="w-full border rounded p-2" />
            <input name="precio_max" type="number" placeholder="Precio máximo" value={filters.precio_max}
                onChange={handleChange} className="w-full border rounded p-2" />

            <div className="flex gap-2 mt-4">
                <button onClick={handleBuscar} className="flex-1 bg-violet-700 text-white p-2 rounded hover:bg-violet-800">
                    Buscar
                </button>
                <button onClick={handleLimpiar} className="flex-1 bg-gray-300 p-2 rounded hover:bg-gray-400">
                    Limpiar
                </button>
            </div>
        </div>
    );
}
