"use client";

import React, { useState, useEffect } from "react";
import { FaLayerGroup, FaSpinner } from "react-icons/fa";
import { useCategories } from "@/hooks/useCategories";

interface CategorySelectorProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  name?: string;
  required?: boolean;
}

export default function CategorySelector({ 
  value, 
  onChange, 
  name = "category", 
  required = true 
}: CategorySelectorProps) {
  
  const { categories, loading } = useCategories();

  return (
    <div className="relative group/input">
      {/* Icono */}
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-[#555] group-focus-within/input:text-[#c28c28] transition-colors">
        {loading ? <FaSpinner className="animate-spin text-xs" /> : <FaLayerGroup className="text-xs" />}
      </div>

      {/* Select */}
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={loading}
        className="w-full bg-[#0a0a0a] border border-[#333] text-[#E0E0E0] pl-10 pr-4 py-3 focus:outline-none focus:border-[#c28c28] transition-colors appearance-none cursor-pointer text-lg font-light disabled:opacity-50"
        style={{ fontFamily: 'var(--font-cormorant)' }}
      >
        <option value="" className="bg-[#050505] text-[#666]">
          {loading ? "Cargando clases..." : "Seleccionar Clase..."}
        </option>
        
        {categories.map((cat) => (
          <option key={cat.id} value={cat.name} className="bg-[#050505]">
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
}