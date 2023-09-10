import CategoryChart from '@components/Categories/CategoryChart'
import ListHeader from '@components/Products/ListHeader'
import NewProduct from '@components/Products/NewProduct'
import Pagination from '@components/Products/Pagination'
import SkeletonProduct from '@components/Products/SkeletonProduct'
import Modal from '@components/common/Modal'

import useFetchProducts from '@hooks/Products/useFetchProducts'
import { useEffect, useState } from 'react'
export default function Dashboard() {
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [openModal, setOpenModal] = useState(false)
  const { products, allProducts, setAllProducts } = useFetchProducts(offset, limit)
  const [totalProducts, setTotalProducts] = useState(undefined)
  const countByCategory = products
    .map((product) => product.category)
    .map((category) => category.name)
    .reduce((obj, value) => {
      if (!obj[value]) {
        obj[value] = 1
      } else {
        obj[value] = obj[value] + 1
      }
      return obj
    }, {})
  const categoriesData = {
    datasets: [
      {
        label: '',
        data: countByCategory,
        borderWidth: 2,
        backgroundColor: ['#056483', '#0093c6', '#249fb3', '#5ab0f5', '#a1ade3', '#93e6e8'],
      },
    ],
  }
  useEffect(() => {
    setAllProducts(allProducts)
  }, [allProducts])
  return (
    <>
      <CategoryChart className="mb-8 mt-8" categoriesData={categoriesData} />
      <ListHeader setOpenModal={setOpenModal} />
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Edit
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products?.map((product) => (
                    <tr key={`product-item-${product.id}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={product.images[0]} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.title}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product?.category?.name}</div>
                        <div className="text-sm text-gray-500">Category id {product?.category?.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{`$ ${product.price}`}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">{product?.id}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                        <button type="button" className="text-indigo-600 hover:text-indigo-900">
                          Edit
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                        <button type="button" className="text-red-600 hover:text-red-900">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Pagination offset={offset} setOffset={setOffset} limit={limit} setLimit={setLimit} currentPage={currentPage} setCurrentPage={setCurrentPage} totalProducts={allProducts} />
      <Modal open={openModal} setOpen={setOpenModal} modalTitle={'Add a new product'}>
        <NewProduct setTotalProducts={setAllProducts} setOpenModal={setOpenModal} />
      </Modal>
    </>
  )
}
