import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Home from './pages/home'
import Navbar from './components/navbar'
import Sidebar from './components/sidebar'
import Detail from './pages/detail';
import EditComputer from './pages/edit';
import CreateComputer from './pages/create';

function App() {
	const [filtros, setFiltros] = useState({});

	const handleFilterChange = (newFilters) => {
		setFiltros(newFilters);
	};

	return (
		<Router>
			<div className='flex flex-col h-screen'>
				<Navbar />
				<div className='flex flex-1 overflow-hidden'>
					<Sidebar onFilterChange={handleFilterChange} />
						<main className='flex-1 overflow-y-auto p-4'>
						<Routes>
							<Route path="/" element={<Home filtros={filtros} />} />
							<Route path="/detalle/:id" element={<Detail />} />
							<Route path="/editar/:id" element={<EditComputer />} />
							<Route path="/nuevo" element={<CreateComputer />} />
						</Routes>
					</main>
				</div>
			</div>
			
			{/* Toast container */}
			<Toaster
				position="top-right"
				toastOptions={{
					duration: 4000,
					style: {
						background: '#363636',
						color: '#fff',
						fontFamily: 'Consolas, monospace',
					},
					success: {
						iconTheme: {
							primary: '#10B981',
							secondary: '#fff',
						},
					},
					error: {
						iconTheme: {
							primary: '#EF4444',
							secondary: '#fff',
						},
					},
				}}
			/>
		</Router>
	)
}

export default App