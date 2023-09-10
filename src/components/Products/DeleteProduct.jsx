import { CheckIcon, TrashIcon } from '@heroicons/react/outline'
import { deleteProduct } from '@services/storeAPI/products'
import { useState } from 'react'

const DeleteProduct = ({ id, closeModal, setAllProducts }) => {
  const [deleteSuccess, setDeleteSuccess] = useState(false)
  const [deleteError, setDeleteError] = useState(false)
  const handleDeleteProduct = () => {
    const deletedProduct = deleteProduct(id, setDeleteError)
    if (deletedProduct) {
      setDeleteSuccess('The product was deleted successfully')
      setAllProducts((allProducts) => allProducts - 1)
      setTimeout(() => {
        closeModal((prev) => !prev)
      }, 2000)
    }
  }
  const handleKeepProduct = () => {
    closeModal((prev) => !prev)
  }
  return (
    <section>
      <h1> You are about to delete the product with id: {id}. Are you sure?</h1>
      <p className="mt-4 text-red-600 font-bold">
        {' '}
        Reminder: This action <span className="text-red-900 font-extrabold">CANNOT</span> be undone.
      </p>
      <div className="flex justify-between mt-5">
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          onClick={handleDeleteProduct}
        >
          <TrashIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
          Yes, proceed
        </button>
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          onClick={handleKeepProduct}
        >
          <CheckIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
          No, keep it
        </button>
      </div>
      {deleteSuccess && (
        <div className="p-3 my-5 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
          <span className="font-medium">{deleteSuccess}</span>
        </div>
      )}
      {deleteError && (
        <div className="p-3 my-5 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
          <span className="font-medium">{deleteError}</span>
        </div>
      )}
    </section>
  )
}

export default DeleteProduct
