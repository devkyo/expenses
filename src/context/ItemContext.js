// Contexto para compartir el estado de los items
import React, { createContext, useState, useContext, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify'

const ItemContext = createContext();

export const ItemProvider = ({ children }) => {

  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([])
  const [total, setTotal] = useState(0)

  function sumPrices(items) {
    return items.reduce((final, item) => {
      const price = parseFloat(item.price)
      const priceDecimal = parseFloat(price.toFixed(2))
      return final + priceDecimal; // Suma el campo 'price' de cada objeto
    }, 0);
  }

  const fetchCategories = useCallback(async () => {

    const loadingCat = toast.loading('Cargando Categorias...');


    try {
      const res = await fetch("/api/category");
      const data = await res.json();

      if (res.ok) {
        toast.update(loadingCat, {
          render: 'Categoria cargada correctamente',
          type: 'success',
          autoClose: 1000
        })

        setTimeout(() => {
          toast.dismiss(loadingCat);  // Cierra el toast manualmente después del tiempo
        }, 1000);

      } else {
        toast.update(loadingCat, {
          render: data.message || 'Algo salió mal',
          type: 'error',
          autoClose: 3000,
        });
      }
      setCategories(data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);


  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch('/api/item')
      const data = await res.json()
      setItems(data.items)

      setTotal(sumPrices(data.items))


    } catch (err) {

    }
  }, [])

  const addItem = (newItem) => {
    setItems(prev => [newItem, ...prev])
  }

  const deleteItem = id => {
    setItems(prev => prev.filter(item => item.id !== id));
  }

  const addCat = (newCat) => {
    setCategories(prev => [newCat, ...prev])
  }


  return (
    <ItemContext.Provider value={{ items, addItem, categories, fetchCategories, addCat, fetchItems, total, setTotal, deleteItem }}>
      {children}
    </ItemContext.Provider>
  );
};

export const useItems = () => useContext(ItemContext);