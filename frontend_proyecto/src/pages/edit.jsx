import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getComputerById, updateComputer } from "../api/api";
import { Editor } from "@tinymce/tinymce-react";

export default function EditComputer() {
    const { id } = useParams();
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
    
    useEffect(() => {
        getComputerById(id).then((data) => {
            setForm({
                marca: data.marca,
                modelo: data.modelo,
                cpu: data.cpu,
                gpu: data.gpu || "",
                ram: data.ram,
                tipo_almacenamiento: data.tipo_almacenamiento,
                almacenamiento: data.almacenamiento,
                sistema_operativo: data.sistema_operativo,
                precio: data.precio,
                descripcion: data.descripcion,
                imagen: null,
            });
            setPreviewUrl(data.imagen);
        });
    }, [id]);
    
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
        
        const formData = new FormData();
        for (const key in form) {
            if (form[key] !== null) {
                formData.append(key, form[key]);
            }
        }
        
        try {
            await updateComputer(id, formData);
            navigate(`/detalle/${id}`);
        } catch (err) {
            alert("⚠️ Error al guardar");
            console.error(err);
        }
    };
    
    return (
        <form
        onSubmit={handleSubmit}
        className="p-6 max-w-3xl mx-auto font-[consolas] space-y-4"
        >
        <h2 className="text-2xl font-bold text-violet-800 mb-4">
        Editar Computador
        </h2>
        
        {[
            ["marca", "Marca"],
            ["modelo", "Modelo"],
            ["cpu", "CPU"],
            ["gpu", "GPU"],
            ["ram", "RAM (GB)", "number"],
            ["tipo_almacenamiento", "Tipo de almacenamiento"],
            ["almacenamiento", "Capacidad de almacenamiento"],
            ["sistema_operativo", "Sistema operativo"],
            ["precio", "Precio", "number"],
        ].map(([key, label, type = "text"]) => (
            <div key={key}>
            <label className="block font-semibold mb-1">{label}</label>
            <input
            name={key}
            type={type}
            value={form[key]}
            onChange={handleChange}
            className="w-full border rounded p-2"
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
        }}
        />
        </div>
        
        <div>
        <label className="block font-semibold mb-1">Imagen del computador</label>
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
        className="hidden"
        />
        </label>
        <p className="mt-2 text-sm text-gray-500">
        {form.imagen ? form.imagen.name : "No se ha seleccionado ninguna imagen nueva"}
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
        
        <div className="flex gap-4">
        <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
        💾 Guardar cambios
        </button>
        <button
        type="button"
        onClick={() => navigate(-1)}
        className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
        >
        ❌ Cancelar
        </button>
        </div>
        </form>
    );
}
