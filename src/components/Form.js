import { useItems } from '@/context/ItemContext';
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';

export const Form = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const { categories, fetchCategories, addItem } = useItems()

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);


  const onSubmit = async (data) => {

    try {
      const res = await fetch('/api/item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          categoryId: parseInt(data.categoryId),
          name: data.name,
          price: data.price
        })
      })
      const result = await res.json()
      if (res.status === 201) {
        reset()
        // toast.success({
        //   render: result.message,
        //   type: 'success',
        //   autoClosed: 2000
        // })
      }
      addItem(result.item)


    } catch (err) {
      console.log('Error clg:', err);
    }
  }


  return (

    <form className="w-full max-w-lg mx-auto pt-10" onSubmit={handleSubmit(onSubmit)}>

      <label htmlFor="categories" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categories</label>
      <select id="categories" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        {...register('categoryId', { required: true })}
        defaultValue=""
      >
        <option disabled value="">Choose a category</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}

      </select>
      {errors.categoryId && <span className="text-xs text-red-500 mt-2 block">Category is required</span>}
      <div className="mb-5 mt-5">
        <label htmlFor="name-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
        <input type="text" id="name-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register("name", { required: true })}
        />
        {errors.name && <span className='text-xs text-red-500 mt-2 block'>name is required</span>}
      </div>

      <div className="mb-5 mt-5">
        <label htmlFor="price-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
        <input type="text" id="price-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register("price", { required: true })}
        />
        {errors.price && <span className="text-xs text-red-500 mt-2 block">Field is required</span>}
      </div>


      <button type="submit" className="text-white bg-black hover:bg-black-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Agregar</button>
    </form>
  )
}