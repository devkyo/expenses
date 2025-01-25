import { useItems } from '@/context/ItemContext'
import { useState, useEffect } from 'react';
import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const Chart = ()=> {
  const { categories, fetchItems, items } = useItems()
  const [category, setCategory] = useState([])
  const [total, setTotal] = useState([])
  const [colores, setColores] = useState([])


  useEffect( ()=> {
    

    
    const general = Object.entries(items.reduce((acc, item) => {
      if (acc[item.category.name]) {
        acc[item.category.name].total += item.price; // Sumar el precio
      } else {
        acc[item.category.name] = {
          total: item.price,
          color: item.category.color
        };
      }
      return acc;
    }, {})).map( ([name,{ total, color}]) => ({name,total,color}))


    const titlesCat = general.map( cat => cat.name )
    const pricesTotal = general.map(price => parseFloat(price.total))
    const colorCategory = general.map( cat => cat.color )
    


    setCategory(titlesCat.reverse())
    setTotal(pricesTotal.reverse())
    setColores(colorCategory.reverse())

   

  },[categories,items])



  const data = {
    labels: category,
    datasets: [
      {
        label: "Total expenses s/",
        data: total,
        backgroundColor: colores,
        borderColor: colores,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "center",
      },
      title: {
        display: true,
        text: "Expenses to month",
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Asegura que el eje Y comience en 0
      },
      x: {
        
      }
    },
  };


  return (
    <div style={{ width: "100%", height: "400px", margin: "0 auto" }}  className="p-8">
      <h3 className='text-[24px] text-left font-bold pb-4 '>Stats</h3>
      <Bar data={data} options={options} />
    </div>
  )
}
