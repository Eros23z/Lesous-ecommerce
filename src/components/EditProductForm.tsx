"use client";

import React, { useEffect, useState } from "react";
import CategorySelector from "@/components/CategorySelector";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaGem, FaDollarSign, FaImage, FaLayerGroup, FaSave, FaBoxOpen, FaTrash } from "react-icons/fa";
import { Cinzel, Cormorant_Garamond } from 'next/font/google';

// --- FUENTES MÍSTICAS ---
const cinzel = Cinzel({ 
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-cinzel',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-cormorant',
});

export default function EditProductForm({ product }: { product: any }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Inicializamos el estado con los datos que vinieron de la base de datos
    const [formData, setFormData] = useState({
        name: product.name,
        price: product.price,
        description: product.description,
        imageUrl: product.imageUrl,
        category: product.categoryName, // Usamos el nombre que pasamos desde el server
        stock: product.stock
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // PUT a la API con el ID del producto original
            const response = await fetch(`/api/products/${product.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    price: Number(formData.price),
                    stock: Number(formData.stock)
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Error al actualizar");
            }

            router.push("/admin/dashboard");
            router.refresh(); 
        } catch (err) {
            setError("No se pudo re-inscribir el artefacto. El ritual falló.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={`min-h-screen bg-[#020202]/60 text-[#E0E0E0] flex items-center justify-center p-4 relative overflow-hidden ${cinzel.variable} ${cormorant.variable} font-serif pt-24 pb-20`}>
            
            {/* --- FONDO ATMOSFÉRICO --- */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }} />
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#B3945B] rounded-full blur-[150px] opacity-[0.05]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-[#1A1A1A] rounded-full blur-[100px] opacity-[0.2]" />
            </div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.5 }}
                className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 z-10"
            >
                {/* --- COLUMNA IZQUIERDA: FORMULARIO (PERGAMINO) --- */}
                <div className="bg-[#050505] border border-[#1A1A1A] p-8 md:p-10 relative group">
                    
                    {/* Decoración de esquinas */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#B3945B]/40" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#B3945B]/40" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#B3945B]/40" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#B3945B]/40" />

                    <div className="flex items-center gap-4 mb-8 border-b border-[#B3945B]/10 pb-6">
                        <Link href="/admin/dashboard">
                            <button className="w-8 h-8 flex items-center justify-center rounded-sm border border-[#333] text-[#666] hover:text-[#B3945B] hover:border-[#B3945B] transition-colors">
                                <FaArrowLeft size={10} />
                            </button>
                        </Link>
                        <div>
                            <p className="text-[#B3945B] text-[10px] uppercase tracking-[0.2em] font-bold" style={{ fontFamily: 'var(--font-cinzel)' }}>
                                Modificar Registro
                            </p>
                            <h1 className="text-2xl font-bold text-[#EAEAEA] uppercase tracking-widest" style={{ fontFamily: 'var(--font-cinzel)' }}>
                                Editar Artefacto
                            </h1>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* Nombre */}
                        <div className="relative group/input">
                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-[#555] group-focus-within/input:text-[#B3945B] transition-colors">
                                <FaGem className="text-xs" />
                            </div>
                            <input 
                                type="text" 
                                name="name" 
                                value={formData.name} 
                                onChange={handleChange} 
                                placeholder="Nombre del Artefacto" 
                                required
                                className="w-full bg-[#0a0a0a] border border-[#333] text-[#E0E0E0] pl-10 pr-4 py-3 focus:outline-none focus:border-[#B3945B] transition-colors placeholder-[#444] text-lg font-light"
                                style={{ fontFamily: 'var(--font-cormorant)' }}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            {/* Precio */}
                            <div className="relative group/input">
                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-[#555] group-focus-within/input:text-[#B3945B] transition-colors">
                                    <FaDollarSign className="text-xs" />
                                </div>
                                <input 
                                    type="number" 
                                    name="price" 
                                    value={formData.price} 
                                    onChange={handleChange} 
                                    placeholder="Valor" 
                                    required
                                    min="0"
                                    step="0.01"
                                    className="w-full bg-[#0a0a0a] border border-[#333] text-[#E0E0E0] pl-10 pr-4 py-3 focus:outline-none focus:border-[#B3945B] transition-colors placeholder-[#444] text-lg font-light"
                                    style={{ fontFamily: 'var(--font-cormorant)' }}
                                />
                            </div>
                            {/* Stock */}
                            <div className="relative group/input">
                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-[#555] group-focus-within/input:text-[#B3945B] transition-colors">
                                    <FaBoxOpen className="text-xs" />
                                </div>
                                <input 
                                    type="number" 
                                    name="stock" 
                                    value={formData.stock} 
                                    onChange={handleChange} 
                                    placeholder="Cantidad" 
                                    required
                                    min="0"
                                    className="w-full bg-[#0a0a0a] border border-[#333] text-[#E0E0E0] pl-10 pr-4 py-3 focus:outline-none focus:border-[#B3945B] transition-colors placeholder-[#444] text-lg font-light"
                                    style={{ fontFamily: 'var(--font-cormorant)' }}
                                />
                            </div>
                        </div>

                        {/* Categoría */}
                        <CategorySelector 
                            value={formData.category}
                            onChange={handleChange}
                        />

                        {/* URL Imagen */}
                        <div className="relative group/input">
                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-[#555] group-focus-within/input:text-[#B3945B] transition-colors">
                                <FaImage className="text-xs" />
                            </div>
                            <input 
                                type="url" 
                                name="imageUrl" 
                                value={formData.imageUrl} 
                                onChange={handleChange} 
                                placeholder="URL de la imagen" 
                                required
                                className="w-full bg-[#0a0a0a] border border-[#333] text-[#E0E0E0] pl-10 pr-4 py-3 focus:outline-none focus:border-[#B3945B] transition-colors placeholder-[#444] text-lg font-light"
                                style={{ fontFamily: 'var(--font-cormorant)' }}
                            />
                        </div>

                        {/* Descripción */}
                        <textarea 
                            name="description" 
                            value={formData.description} 
                            onChange={handleChange} 
                            placeholder="Descripción oculta..." 
                            rows={4} 
                            className="w-full bg-[#0a0a0a] border border-[#333] text-[#E0E0E0] p-4 focus:outline-none focus:border-[#B3945B] transition-colors placeholder-[#444] text-lg font-light resize-none"
                            style={{ fontFamily: 'var(--font-cormorant)' }}
                        />

                        {error && (
                            <div className="text-red-400 text-sm text-center bg-red-900/10 py-2 border border-red-900/20" style={{ fontFamily: 'var(--font-cinzel)' }}>
                                {error}
                            </div>
                        )}

                        <div className="flex gap-4 pt-4">
                            <Link href="/admin/dashboard" className="w-1/3">
                                <button type="button" className="w-full py-4 border border-[#333] text-[#666] hover:text-[#E0E0E0] hover:border-[#E0E0E0] transition-colors uppercase text-xs tracking-widest font-bold" style={{ fontFamily: 'var(--font-cinzel)' }}>
                                    Cancelar
                                </button>
                            </Link>
                            <button 
                                type="submit" 
                                disabled={loading} 
                                className="w-2/3 bg-[#B3945B] hover:bg-[#C5A56A] text-[#050505] py-4 font-bold uppercase tracking-[0.2em] text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group/btn"
                                style={{ fontFamily: 'var(--font-cinzel)' }}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    {loading ? "Re-inscribiendo..." : (
                                        <>
                                            <FaSave /> Guardar Cambios
                                        </>
                                    )}
                                </span>
                                {/* Brillo al hover */}
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                            </button>
                        </div>
                    </form>
                </div>

                {/* --- COLUMNA DERECHA: VISTA PREVIA --- */}
                <div className="flex flex-col justify-start pt-10">
                    <motion.div 
                         initial={{ opacity: 0, x: 20 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ delay: 0.2 }}
                         className="sticky top-24"
                    >
                        <h3 className="text-[#B3945B] text-xs uppercase tracking-[0.3em] mb-6 text-center font-bold" style={{ fontFamily: 'var(--font-cinzel)' }}>
                            Previsualización del Cambio
                        </h3>
                        
                        {/* Simulación de MagicCard */}
                        <div className="bg-[#050505] border border-[#1A1A1A] max-w-sm mx-auto overflow-hidden relative group shadow-2xl">
                            
                            {/* Imagen */}
                            <div className="aspect-[4/5] bg-[#0a0a0a] relative flex items-center justify-center overflow-hidden">
                                {formData.imageUrl ? (
                                    <img 
                                        src={formData.imageUrl} 
                                        alt="Preview" 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = "";
                                        }}
                                    />
                                ) : (
                                    <div className="text-[#333] flex flex-col items-center gap-2">
                                        <FaImage size={30} className="opacity-20" />
                                        <span className="text-[10px] uppercase tracking-widest opacity-40 font-cinzel">Sin Imagen</span>
                                    </div>
                                )}
                                
                                {/* Overlay gradiente */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                                {/* Badge de Stock */}
                                <div className="absolute top-3 right-3">
                                    <span className={`px-2 py-1 text-[10px] font-bold tracking-widest border ${Number(formData.stock) > 0 ? 'bg-[#1a1a1a]/80 text-[#888] border-[#333]' : 'bg-red-900/20 text-red-500 border-red-900/30'}`}>
                                        {Number(formData.stock) > 0 ? "EN STOCK" : "AGOTADO"}
                                    </span>
                                </div>
                            </div>
                            
                            {/* Info */}
                            <div className="p-6 relative text-center">
                                {/* Línea decorativa */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[1px] bg-[#B3945B]" />

                                <span className="text-[10px] text-[#B3945B] font-bold uppercase tracking-[0.2em] block mb-2" style={{ fontFamily: 'var(--font-cinzel)' }}>
                                    {formData.category || "Sin Clase"}
                                </span>
                                
                                <h2 className="text-xl text-[#E0E0E0] mb-3 truncate" style={{ fontFamily: 'var(--font-cinzel)' }}>
                                    {formData.name || "Nombre Oculto"}
                                </h2>
                                
                                <p className="text-[#888] text-sm line-clamp-2 mb-4 h-10 font-light italic" style={{ fontFamily: 'var(--font-cormorant)' }}>
                                    {formData.description || "Descripción..."}
                                </p>
                                
                                <div className="pt-4 border-t border-[#1a1a1a]">
                                    <span className="text-xl text-[#EAEAEA] font-light" style={{ fontFamily: 'var(--font-cormorant)' }}>
                                        ${formData.price ? Number(formData.price).toFixed(2) : "0.00"}
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-8 text-center border-t border-[#B3945B]/10 pt-4 w-full max-w-sm mx-auto">
                            <p className="text-[#444] text-[10px] uppercase tracking-widest">
                                ID Original: <span className="text-[#666] font-mono">{product.id.slice(0, 8)}...</span>
                            </p>
                        </div>
                    </motion.div>
                </div>

            </motion.div>
        </div>
    );
}