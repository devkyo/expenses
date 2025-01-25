import { useForm } from 'react-hook-form'
import { useEffect, useState  } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useItems } from '@/context/ItemContext';
import { GithubPicker   } from 'react-color';

export const FormCategory = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const { addCat } = useItems()

  const [color, setColor] = useState("#000");
  

  const handleColorChange = (color) => {
    setColor(color.hex);
    console.log(color.hex);
    // Actualiza el valor del formulario
  };

  const onSubmit = async (data) => {
    try {
      const res = await fetch('/api/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          color: color
        })
      })
      const result = await res.json()

      if (res.status === 201) {
        reset()
        toast.success({
          render: result.message,
          type: 'success',
          autoClose: 3000
        })
      }
      console.log(result.category);
      addCat(result.category)
    } catch (err) {
      console.log('Error clg:', err);
    }
  }

  return (
    <form className="w-full  lg:grid grid-cols-[60%_40%]" onSubmit={handleSubmit(onSubmit)}>

      <div className="mb-5">
        <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Create a category</label>
        <input type="text" id="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ropa" 
          {...register('name', { required: true })}
        />
        <div className="full-width mt-2 h-[30px] rounded-[4px]" style={{backgroundColor: color}}></div>
        {errors.name && <span className='text-xs text-red-500 mt-2 block'>Required category name</span>} 
      </div>

      <div className="mb-5 p-4 flex justify-center">
       
        <GithubPicker   
          color={color} 
          onChangeComplete={handleColorChange}
        />
      </div>

      <button type="submit" className="text-white bg-black hover:bg-black-800 focus:ring-4  focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" >Created Category</button>
    </form>
  )
}
