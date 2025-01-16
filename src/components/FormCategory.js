import { useForm } from 'react-hook-form'
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useItems } from '@/context/ItemContext';

export const FormCategory = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const { addCat } = useItems()

  const onSubmit = async (data) => {
    try {
      const res = await fetch('/api/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data.name
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
    <form className="w-full max-w-lg mx-auto pt-10" onSubmit={handleSubmit(onSubmit)}>

      <div className="mb-5">
        <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Create a category</label>
        <input type="text" id="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ropa"
          {...register('name', { required: true })}
        />
        {errors.name && <span className='text-xs text-red-500 mt-2 block'>Required category name</span>}
      </div>

      <button type="submit" className="text-white bg-black hover:bg-black-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Created Category</button>
    </form>
  )
}
