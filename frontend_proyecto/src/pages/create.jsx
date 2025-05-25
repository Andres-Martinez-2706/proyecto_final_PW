import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import toast from 'react-hot-toast';

export default function CreateComputer() {
    const navigate = useNavigate();
    const [previewUrl, setPreviewUrl] = useState("");
    
    const [form, setForm] = useState({
        marca: "",
        modelo: "",
        cpu: "",
        gpu: "",
        ram: "",
        tipo_almacenamiento: "",
        almacenamiento: "",
        sistema_operativo: "",
        precio: "",
        descripcion: "",
        imagen: null,
    });
    
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "imagen") {
            const file = files[0];
            setForm((prev) => ({ ...prev, imagen: file }));
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => setPreviewUrl(reader.result);
                reader.readAsDataURL(file);
            }
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validaciones básicas
        if (!form.marca || !form.modelo || !form.cpu || !form.ram || !form.precio) {
            toast.error("⚠️ Por favor completa los campos obligatorios");
            return;
        }
        
        const formData = new FormData();
        for (const key in form) {
            if (form[key] !== null && form[key] !== "") {
                formData.append(key, form[key]);
            }
        }
        
        try {
            // Aquí necesitas crear la función createComputer en tu api.js
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/computer/`, {
                method: 'POST',
                body: formData,
            });
            
            if (response.ok) {
                const newComputer = await response.json();
                toast.success("✅ Computador creado exitosamente");
                navigate(`/detalle/${newComputer.id}`);
            } else {
                const errorData = await response.json();
                console.error("Error del servidor:", errorData);
                toast.error("⚠️ Error al crear el computador");
            }
        } catch (err) {
            toast.error("⚠️ Error al crear el computador");
            console.error(err);
        }
    };
    
    const handleReset = () => {
        setForm({
            marca: "",
            modelo: "",
            cpu: "",
            gpu: "",
            ram: "",
            tipo_almacenamiento: "",
            almacenamiento: "",
            sistema_operativo: "",
            precio: "",
            descripcion: "",
            imagen: null,
        });
        setPreviewUrl("");
    };
    
    return (
        <form
            onSubmit={handleSubmit}
            className="p-6 max-w-3xl mx-auto font-[consolas] space-y-4"
        >
            <h2 className="text-2xl font-bold text-violet-800 mb-4">
                ✨ Crear Nuevo Computador
            </h2>
            
            {[
                ["marca", "Marca", "text"],
                ["modelo", "Modelo", "text"],
                ["cpu", "CPU", "text"],
                ["gpu", "GPU", "text"],
                ["ram", "RAM (GB)", "number"],
                ["tipo_almacenamiento", "Tipo de almacenamiento", "text"],
                ["almacenamiento", "Capacidad de almacenamiento", "text"],
                ["sistema_operativo", "Sistema operativo", "text"],
                ["precio", "Precio", "number"],
            ].map(([key, label, type]) => (
                <div key={key}>
                    <label className="block font-semibold mb-1">
                        {label}
                    
                    </label>
                    <input
                        name={key}
                        type={type}
                        value={form[key]}
                        onChange={handleChange}
                        className="w-full border rounded p-2 focus:border-violet-500 focus:outline-none"
                        placeholder={`Ingresa ${label.toLowerCase().replace(' *', '')}`}
                    />
                </div>
            ))}
            
            <div>
                <label className="block font-semibold mb-1">Descripción técnica</label>
                <Editor
                    apiKey="3c600zore9bakdiodduumywxob8e8kgc9w7evhz0jo6uvmf4"
                    value={form.descripcion}
                    onEditorChange={(content) =>
                        setForm((prev) => ({ ...prev, descripcion: content }))
                    }
                    init={{
                        height: 300,
                        menubar: true,
                        plugins:
                            "advlist autolink lists link image charmap print preview anchor " +
                            "searchreplace visualblocks code fullscreen insertdatetime media table emoticons",
                        toolbar:
                            "undo redo | formatselect | bold italic underline | " +
                            "alignleft aligncenter alignright alignjustify | " +
                            "bullist numlist outdent indent | link image table | emoticons | code fullscreen",
                        content_style:
                            "body { font-family:Consolas,sans-serif; font-size:14px }",
                        placeholder: "Describe las características técnicas del computador..."
                    }}
                />
            </div>
            
            <div>
                <label className="block font-semibold mb-1">
                    Imagen del computador
                </label>
                <label
                    htmlFor="imagen"
                    className="block border-dashed border-2 border-gray-400 rounded p-4 text-center cursor-pointer hover:bg-gray-100 transition"
                >
                    📷 Haga clic aquí para seleccionar una imagen
                    <input
                        id="imagen"
                        name="imagen"
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                        required
                        className="hidden"
                    />
                </label>
                <p className="mt-2 text-sm text-gray-500">
                    {form.imagen ? form.imagen.name : "No se ha seleccionado ninguna imagen"}
                </p>
            </div>
            
            {previewUrl && (
                <div>
                    <p className="mb-1 font-semibold">Vista previa:</p>
                    <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full max-w-md rounded shadow mb-4"
                    />
                </div>
            )}
            
            <div className="flex gap-4 pt-4">
                <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition-colors"
                >
                    💾 Crear computador
                </button>
                <button
                    type="button"
                    onClick={handleReset}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition-colors"
                >
                    🔄 Limpiar formulario
                </button>
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded transition-colors"
                >
                    ❌ Cancelar
                </button>
            </div>
            
        </form>
    );
}