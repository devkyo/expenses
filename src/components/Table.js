
import { useItems } from '@/context/ItemContext';
import { useEffect } from 'react';
import moment from 'moment'
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';

export const Table = () => {

  const { items, fetchItems, total, deleteItem } = useItems()

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch('/api/item', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      })
      const result = await res.json()
      console.log(result);
      deleteItem(id)
      toast.success('Item eliminado')
    } catch (err) {

    }
  }
  return (

    <div className="relative overflow-x-auto">
      <div className="flex justify-center items-center">
        <p className="text-xl font-bold p-5">TOTAL gastado S/{parseFloat(total.toFixed(2))}</p>
      </div>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              id
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>

            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Option
            </th>
          </tr>
        </thead>
        <tbody>
          {
            items.map(item => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={item.id}>
                <td className="px-6 py-4">
                  {item.id}
                </td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.category.name}
                </th>
                <td className="px-6 py-4">
                  {item.name}
                </td>
                <td className="px-6 py-4">
                  s/{item.price}
                </td>
                <td className="px-6 py-4">
                  {moment(item.created_at).format('DD-MM-YYYY')}
                </td>
                <td className="px-6 py-4 flex justify-center">
                  <button onClick={() => handleDelete(item.id)}><MdDelete style={{ textAlign: 'center', color: '#000', fontSize: 20 }} /></button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>

  )
}

