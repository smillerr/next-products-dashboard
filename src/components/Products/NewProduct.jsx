import Modal from '@components/common/Modal'
import useFetchCategories from '@hooks/Products/useFetchCategories'
import { MAX_DESCRIPTION_LENGTH, MAX_PRICE, MAX_TITLE_LENGTH, MIN_DESCRIPTION_LENGTH, MIN_PRICE, MIN_TITLE_LENGTH } from '@utils/constants'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

const NewProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const categoriesList = useFetchCategories()
  const handleCreateProduct = (data) => {
    console.log('Form fields', data)
  }
  return (
    <form id="create-product-form" onSubmit={handleSubmit(handleCreateProduct, (err) => console.log('There was an unexpected error', err))}>
      <div className="overflow-hidden">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                {...register('title', { required: true, minLength: MIN_TITLE_LENGTH, maxLength: MAX_TITLE_LENGTH })}
                id="title"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
              {(errors?.title?.type === 'required' && <span>This field is required</span>) ||
                (errors?.title?.type === 'minLength' && <span>The title has to be at least {MIN_TITLE_LENGTH} characters</span>) ||
                (errors?.title?.type === 'maxLength' && <span>The title must be less than {MAX_TITLE_LENGTH} characters</span>)}
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                {...register('price', { required: true, min: MIN_PRICE, max: MAX_PRICE })}
                id="price"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
              {(errors?.price?.type === 'required' && <span>This field is required</span>) ||
                (errors?.price?.type === 'min' && <span>The minimun price is {MIN_PRICE} </span>) ||
                (errors?.price?.type === 'max' && <span>The maximum price is {MAX_PRICE} </span>)}
            </div>
            <div className="col-span-6">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              {categoriesList.length !== 0 ? (
                <select
                  id="category"
                  {...register('category', { required: true })}
                  autoComplete="category-name"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  {categoriesList?.map((category) => (
                    <option key={`category-${category?.name}-${category?.id}`} value={`${category?.id}`}>
                      {category?.name}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="mt-1">There was an error getting the categories from our server, please try again later</p>
              )}
            </div>

            <div className="col-span-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                {...register('description', { required: true, minLength: MIN_DESCRIPTION_LENGTH, maxLength: MAX_DESCRIPTION_LENGTH })}
                id="description"
                autoComplete="description"
                rows="3"
                className="form-textarea mt-1 block w-full mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Cover photo</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="images"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input id="images" {...register('images', { required: true })} type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                  {errors?.images?.type === 'required' && <span>You must select a file to continue</span>}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create
          </button>
        </div>
      </div>
    </form>
  )
}

export default NewProduct
