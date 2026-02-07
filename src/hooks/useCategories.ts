import { useState, useEffect, useCallback } from "react";

// Definimos la interfaz aquí para no repetirla (o impórtala si ya la tienes en otro lado)
interface Category {
  id: number; // Asegúrate de que sea number si tu DB usa Int
  name: string;
  _count?: { products: number }; // <--- AGREGA ESTO
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Usamos useCallback para que la función no se recree en cada render
  // y podamos usarla manualmente (ej: botón "Recargar")
  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/categories");
      if (!res.ok) throw new Error("Error al conectar con las categorias");
      
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("No se pudieron invocar las categorias.");
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Se ejecuta automáticamente al montar
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { 
    categories, 
    loading, 
    error, 
    refresh: fetchCategories, // ¡Bonus! Una función para recargar datos sin refrescar la página
    setCategories // Exportamos esto por si necesitas borrar una categoria manualmente (optimistic UI)
  };

}