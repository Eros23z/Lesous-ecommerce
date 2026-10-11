"use client";

import { useState } from "react";
import Image from "next/image";
import { FaCloudUploadAlt, FaSpinner, FaTrash, FaImage } from "react-icons/fa";
import { createClient } from "@/lib/supabase-browser";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  disabled?: boolean;
}

export default function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const supabase = createClient();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = e.target.files?.[0];
      if (!file) return;

      // 1. Validaciones de seguridad de archivo
      const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
      if (file.size > MAX_FILE_SIZE) {
        alert("La imagen excede el tamaño máximo permitido de 2MB.");
        return;
      }

      const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
      if (!ALLOWED_TYPES.includes(file.type)) {
        alert("Formato de imagen inválido. Solo se admiten JPG, PNG y WEBP.");
        return;
      }

      const fileExt = file.name.split('.').pop()?.toLowerCase();
      if (!fileExt || !["jpg", "jpeg", "png", "webp"].includes(fileExt)) {
        alert("Extensión de archivo no admitida.");
        return;
      }

      // 2. Crear nombre único criptográficamente seguro para el archivo
      const randomId = typeof crypto !== 'undefined' && crypto.randomUUID 
        ? crypto.randomUUID() 
        : Math.random().toString(36).substring(2);
      const fileName = `${randomId}.${fileExt}`;
      const filePath = `${fileName}`;

      // 3. Subir a Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // 4. Obtener URL Pública
      const { data } = supabase.storage.from('products').getPublicUrl(filePath);
      
      // 5. Devolver la URL al formulario padre
      onChange(data.publicUrl);

    } catch (error) {
      console.error("Error subiendo imagen:", error);
      alert("Error al subir la imagen al baúl.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
      onChange(""); // Limpiamos el valor
  };

  return (
    <div className="w-full">
        {/* Si ya hay imagen, mostramos PREVIEW */}
        {value ? (
            <div className="relative w-full h-64 bg-[#0a0a0a] border border-[#333] rounded-sm overflow-hidden group">
                <Image 
                    src={value} 
                    alt="Preview" 
                    fill 
                    className="object-cover"
                />
                {/* Overlay para borrar */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                        type="button"
                        onClick={handleRemove}
                        disabled={disabled}
                        className="bg-red-900/80 text-white p-3 rounded-full hover:bg-red-700 transition-colors"
                    >
                        <FaTrash />
                    </button>
                </div>
            </div>
        ) : (
            // Si no hay imagen, mostramos INPUT DE SUBIDA
            <div className="w-full">
                <label className={`
                    flex flex-col items-center justify-center w-full h-40 
                    border-2 border-dashed border-[#333] bg-[#050505] 
                    hover:border-[#c28c28] hover:bg-[#c28c28]/5 transition-all cursor-pointer
                    ${disabled || uploading ? "opacity-50 cursor-not-allowed" : ""}
                `}>
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-[#666]">
                        {uploading ? (
                            <>
                                <FaSpinner className="animate-spin text-2xl text-[#c28c28] mb-2" />
                                <p className="text-sm">Invocando imagen...</p>
                            </>
                        ) : (
                            <>
                                <FaCloudUploadAlt className="text-3xl mb-3 text-[#c28c28]" />
                                <p className="text-sm font-light"><span className="font-bold">Click para subir</span> o arrastra aquí</p>
                                <p className="text-xs text-[#444] mt-1">PNG, JPG, WEBP (MAX. 2MB)</p>
                            </>
                        )}
                    </div>
                    <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleUpload}
                        disabled={disabled || uploading}
                    />
                </label>
            </div>
        )}
    </div>
  );
}