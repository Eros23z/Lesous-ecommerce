import { useState, useEffect, useCallback } from "react";

// Definimos la interfaz aquí para no repetirla (o impórtala si ya la tienes en otro lado)
interface Product {
  id: string;
  name: string;
  price: number;
  category: { name: string } | null;
  imageUrl?: string;
  stock?: number;
  description?: string;
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Usamos useCallback para que la función no se recree en cada render
  // y podamos usarla manualmente (ej: botón "Recargar")
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Error al conectar con el grimorio");
      
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("No se pudieron invocar los artefactos.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Se ejecuta automáticamente al montar
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { 
    products, 
    loading, 
    error, 
    refresh: fetchProducts, // ¡Bonus! Una función para recargar datos sin refrescar la página
    setProducts // Exportamos esto por si necesitas borrar uno manualmente (optimistic UI)
  };
}