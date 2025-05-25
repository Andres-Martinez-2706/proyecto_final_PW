import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Card({ item }) {
    return (
        <Link to={`/detalle/${item.id}`} className="block h-full">
            <motion.div 
                className="flex flex-col h-full bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden relative"
                whileHover={{ 
                    scale: 1.02,
                    y: -5 
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                    duration: 0.3,
                    hover: { duration: 0.2 }
                }}
            >

                {item.precio > 7000000 && (
                    <motion.span 
                        className="absolute top-2 left-2 bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-bold z-10"
                        initial={{ scale: 0, rotate: 12 }}
                        animate={{ scale: 1, rotate: 12 }}
                        transition={{ delay: 0.2, type: "spring" }}
                    >
                        ⭐ Premium
                    </motion.span>
                )}
                
                <motion.img
                    src={item.imagen}
                    alt={`${item.marca} ${item.modelo}`}
                    className="w-full h-48 object-cover flex-shrink-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                />
                
                <div className="flex flex-col flex-1 p-4 font-[consolas]">
                    <div className="flex-grow">
                        <motion.h2 
                            className="text-lg font-bold leading-tight line-clamp-2 mb-2"
                            whileHover={{ color: "#7C3AED" }}
                            transition={{ duration: 0.2 }}
                        >
                            {item.marca} {item.modelo}
                        </motion.h2>
                        <p className="text-sm text-gray-600 mb-1">
                            {item.cpu} — {item.ram}GB RAM
                        </p>
                        {item.gpu && 
                            <p className="text-sm text-gray-600 mb-3">{item.gpu}</p>
                        }
                    </div>
                    

                    <div className="mt-auto">
                        <div className="text-sm space-y-1 mb-3">
                            <p><strong>💾</strong> {item.tipo_almacenamiento} {item.almacenamiento}</p>
                            <p><strong>🖥</strong> {item.sistema_operativo}</p>
                        </div>
                        
                        <motion.p 
                            className="text-violet-800 font-bold text-lg"
                            whileHover={{ 
                                scale: 1.05,
                                color: "#5B21B6" 
                            }}
                            transition={{ duration: 0.2 }}
                        >
                            ${parseInt(item.precio).toLocaleString()}
                        </motion.p>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}