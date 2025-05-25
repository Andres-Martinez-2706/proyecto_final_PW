import { useEffect, useState } from "react";
import Card from "../components/card.jsx";
import { getComputers } from "../api/api";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// Componente Loading Skeleton
const LoadingSkeleton = () => (
	<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
		{[...Array(8)].map((_, i) => (
			<motion.div
				key={i}
				className="bg-white rounded-2xl shadow-md overflow-hidden h-full"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: i * 0.1 }}
			>
				<div className="w-full h-48 bg-gray-200 animate-pulse"></div>
				<div className="p-4 space-y-3 flex-1">
					<div className="h-4 bg-gray-200 rounded animate-pulse"></div>
					<div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse"></div>
					<div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
					<div className="space-y-2 pt-2">
						<div className="h-3 bg-gray-200 rounded animate-pulse"></div>
						<div className="h-3 bg-gray-200 rounded animate-pulse"></div>
						<div className="h-5 bg-gray-200 rounded w-1/3 animate-pulse mt-3"></div>
					</div>
				</div>
			</motion.div>
		))}
	</div>
);

// Componente Estado Vacío
const EmptyState = ({ hasFilters, onClearFilters }) => (
	<motion.div 
		className="text-center py-16"
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5 }}
	>
		<motion.div
			animate={{ 
				rotate: [0, 10, -10, 0],
				scale: [1, 1.1, 1]
			}}
			transition={{ 
				duration: 2,
				repeat: Infinity,
				repeatDelay: 3
			}}
		>
			<p className="text-8xl mb-4">🔍</p>
		</motion.div>
		
		<h3 className="text-2xl font-bold text-gray-700 mb-2 font-[consolas]">
			{hasFilters ? "No encontramos resultados" : "No hay computadores disponibles"}
		</h3>
		
		<p className="text-gray-500 mb-6 font-[consolas]">
			{hasFilters 
				? "Intenta ajustar los filtros de búsqueda" 
				: "Sé el primero en agregar un computador"
			}
		</p>
		
		<div className="flex gap-4 justify-center">
			{hasFilters && (
				<motion.button
					onClick={onClearFilters}
					className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg font-[consolas] transition-colors"
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					🧹 Limpiar filtros
				</motion.button>
			)}
			
			<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
				<Link
					to="/nuevo"
					className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-[consolas] transition-colors inline-block"
				>
					✨ Agregar computador
				</Link>
			</motion.div>
		</div>
	</motion.div>
);

export default function Home({ filtros }) {
	const [computers, setComputers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [ordenarPor, setOrdenarPor] = useState('');
	const [ordenDescendente, setOrdenDescendente] = useState(false);
	const [pagina, setPagina] = useState(1);
	const [paginacion, setPaginacion] = useState({ next: null, previous: null, count: 0 });

	const cargarComputadoras = (filtros) => {
		const filtrosPlanos = { ...filtros };

		if (ordenarPor) {
			filtrosPlanos.ordering = ordenDescendente ? `-${ordenarPor}` : ordenarPor;
		}
		filtrosPlanos.page = pagina;

		console.log("Filtros enviados al backend:", filtrosPlanos);
		console.log("URL que se generará:", new URLSearchParams(filtrosPlanos).toString());

		setLoading(true);
		getComputers(filtrosPlanos)
			.then((data) => {
				console.log("Respuesta de la API:", data);
				setComputers(data.items);
				setPaginacion({ next: data.next, previous: data.previous, count: data.count });
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error al obtener computadoras:", error);
				setLoading(false);
			});
	};

	useEffect(() => {
		cargarComputadoras(filtros);
	}, [filtros, ordenarPor, ordenDescendente, pagina]);

	// Verificar si hay filtros aplicados
	const hasFilters = Object.values(filtros).some(value => value && value.toString().trim() !== '');

	const clearAllFilters = () => {
		window.location.reload(); // Forma simple de limpiar todo
	};

	return (
		<div className="flex h-full">
			<main className="flex-1 p-4 overflow-y-auto">
				<motion.div 
					className="flex flex-wrap justify-end gap-4 mb-4 font-[consolas] text-sm"
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3 }}
				>
					<div>
						<label className="mr-2 font-semibold">Ordenar por:</label>
						<select
							value={ordenarPor}
							onChange={(e) => setOrdenarPor(e.target.value)}
							className="border rounded px-2 py-1 focus:border-violet-500 focus:outline-none"
						>
							<option value="">-- Seleccionar --</option>
							<option value="precio">Precio</option>
							<option value="ram">RAM</option>
							<option value="almacenamiento">Almacenamiento</option>
							<option value="fecha_publicacion">Fecha de publicación</option>
						</select>
					</div>
					<div>
						<label className="mr-2 font-semibold">Dirección:</label>
						<select
							value={ordenDescendente ? 'desc' : 'asc'}
							onChange={(e) => setOrdenDescendente(e.target.value === 'desc')}
							className="border rounded px-2 py-1 focus:border-violet-500 focus:outline-none"
						>
							<option value="asc">Ascendente</option>
							<option value="desc">Descendente</option>
						</select>
					</div>
				</motion.div>

				<motion.div 
					className="flex justify-end mb-4"
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.3, delay: 0.1 }}
				>
					<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
						<Link
							to="/nuevo"
							className="bg-violet-700 hover:bg-violet-800 text-white px-4 py-2 rounded font-[consolas] shadow transition-colors"
						>
							✚ Nuevo computador
						</Link>
					</motion.div>
				</motion.div>

				<AnimatePresence mode="wait">
					{loading ? (
						<LoadingSkeleton key="loading" />
					) : computers.length === 0 ? (
						<EmptyState 
							key="empty" 
							hasFilters={hasFilters} 
							onClearFilters={clearAllFilters}
						/>
					) : (
						<motion.div
							key="content"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
						>
							<motion.div 
								className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.5, staggerChildren: 0.1 }}
							>
								{computers.map((item, index) => (
									<motion.div
										key={item.id}
										className="h-full"
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: index * 0.05 }}
									>
										<Card item={item} />
									</motion.div>
								))}
							</motion.div>

							{/* Paginación */}
							{paginacion.count > 10 && (
								<motion.div 
									className="mt-8 flex flex-col items-center gap-4"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.3 }}
								>
									<p className="text-sm text-gray-600 font-[consolas]">
										Mostrando página {pagina} de {Math.ceil(paginacion.count / 10)} — {paginacion.count} resultados
									</p>

									<div className="inline-flex gap-4">
										<motion.button 
											onClick={() => setPagina((p) => Math.max(p - 1, 1))}
											disabled={!paginacion.previous}
											className={`px-4 py-2 rounded transition-colors font-[consolas] ${
												paginacion.previous
													? 'bg-violet-700 text-white hover:bg-violet-800'
													: 'bg-gray-300 text-gray-500 cursor-not-allowed'
											}`}
											whileHover={paginacion.previous ? { scale: 1.05 } : {}}
											whileTap={paginacion.previous ? { scale: 0.95 } : {}}
										>
											⬅️ Anterior
										</motion.button>

										<motion.button 
											onClick={() => setPagina((p) => p + 1)}
											disabled={!paginacion.next}
											className={`px-4 py-2 rounded transition-colors font-[consolas] ${
												paginacion.next
													? 'bg-violet-700 text-white hover:bg-violet-800'
													: 'bg-gray-300 text-gray-500 cursor-not-allowed'
											}`}
											whileHover={paginacion.next ? { scale: 1.05 } : {}}
											whileTap={paginacion.next ? { scale: 0.95 } : {}}
										>
											Siguiente ➡️
										</motion.button>
									</div>
								</motion.div>
							)}
						</motion.div>
					)}
				</AnimatePresence>
			</main>
		</div>
	);
}