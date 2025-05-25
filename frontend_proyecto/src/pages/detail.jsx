import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getComputerById, deleteComputer } from "../api/api";
import { motion } from "framer-motion";
import toast from 'react-hot-toast';

export default function Detail() {
    const { id } = useParams();
    const [computer, setComputer] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    useEffect(() => {
        getComputerById(id)
        .then((data) => {
            setComputer(data);
            setLoading(false);
        })
        .catch((err) => {
            console.error("Error al cargar el portátil:", err);
            toast.error("❌ Error al cargar el computador");
            setLoading(false);
        });
    }, [id]);
    
    const handleDelete = async () => {
        if (confirm("¿Estás seguro que querés eliminar este computador? 🚨")) {
            try {
                await deleteComputer(id);
                toast.success("✅ Computador eliminado correctamente");
                navigate("/");
            } catch (err) {
                console.error("Error al eliminar:", err);
                toast.error("❌ Error al eliminar el computador");
            }
        }
    };
    
    if (loading) {
        return (
            <div className="p-6 max-w-5xl mx-auto">
                <motion.div 
                    className="bg-white shadow-lg rounded-2xl p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="w-full lg:w-1/2 h-75 bg-gray-200 rounded-xl animate-pulse"></div>
                        <div className="flex-1 space-y-4">
                            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                            <div className="space-y-2">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }
    
    if (!computer) {
        return (
            <motion.div 
                className="p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <p className="text-6xl mb-4">😵</p>
                <h2 className="text-2xl font-bold text-red-500 mb-2">Computador no encontrado</h2>
                <p className="text-gray-600 mb-6">El computador que buscas no existe o fue eliminado</p>
                <motion.button
                    onClick={() => navigate("/")}
                    className="bg-violet-700 hover:bg-violet-800 text-white px-6 py-3 rounded-lg font-[consolas]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    🏠 Volver al inicio
                </motion.button>
            </motion.div>
        );
    }
    
    return (
        <motion.div 
            className="p-6 font-[consolas] max-w-5xl mx-auto" 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.4 }}
        >
            <motion.div 
                className="flex flex-col lg:flex-row gap-8 bg-white shadow-lg rounded-2xl p-6"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
            >
                <motion.img 
                    src={computer.imagen} 
                    alt={computer.modelo}
                    className="w-full lg:w-1/2 h-75 object-cover rounded-xl shadow"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                />
                
                <div className="flex-1 flex flex-col gap-2">
                    <motion.h1 
                        className="text-2xl lg:text-3xl font-bold text-violet-800 mb-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {computer.marca} {computer.modelo}
                    </motion.h1>
                    
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, staggerChildren: 0.1 }}
                    >
                        <p><strong>💻 CPU:</strong> {computer.cpu}</p>
                        {computer.gpu && <p><strong>🎮 GPU:</strong> {computer.gpu}</p>}
                        <p><strong>🧠 RAM:</strong> {computer.ram} GB</p>
                        <p><strong>💾 Almacenamiento:</strong> {computer.tipo_almacenamiento} {computer.almacenamiento}</p>
                        <p><strong>🖥 Sistema operativo:</strong> {computer.sistema_operativo}</p>
                        <motion.p 
                            className="text-violet-800 font-bold text-xl"
                            whileHover={{ scale: 1.05, color: "#5B21B6" }}
                        >
                            <strong>💰 Precio:</strong> $ {parseInt(computer.precio).toLocaleString()}
                        </motion.p>
                    </motion.div>
                    
                    <motion.a 
                        href={`https://www.google.com/search?q=${encodeURIComponent(`${computer.marca} ${computer.modelo}`)}`}
                        target="_blank" 
                        rel="noreferrer"
                        className="mt-4 inline-block bg-violet-700 text-white px-6 py-2 rounded hover:bg-violet-800 transition-colors text-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        🛒 Comprar en tienda oficial
                    </motion.a>
                    
                    <motion.div 
                        className="mt-6 flex gap-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <motion.button
                            onClick={() => navigate(`/editar/${id}`)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            ✏️ Editar
                        </motion.button>
                        <motion.button
                            onClick={handleDelete}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            🗑️ Eliminar
                        </motion.button>
                    </motion.div>
                </div>
            </motion.div>
            
            <motion.div 
                className="mt-8 bg-gray-100 p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
                <motion.h2 
                    className="text-xl font-bold mb-2 text-violet-800"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                >
                    📋 Descripción técnica
                </motion.h2>
                <motion.div 
                    dangerouslySetInnerHTML={{ __html: computer.descripcion }} 
                    className="text-sm leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                />
            </motion.div>
        </motion.div>
    );
}