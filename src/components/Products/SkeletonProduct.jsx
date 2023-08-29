const SkeletonProduct = () => {
  return (
    <tr className="animate-pulse">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="rounded-full bg-slate-700 h-10 w-10"></div>
          <div className="ml-4">
            <div className=" h-2 w-96 bg-slate-700 rounded"></div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-col justify-between">
          <div className="h-2 w-10 bg-slate-700 rounded"></div>
          <div className="h-2 w-10 bg-slate-700 rounded"> </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"></span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20"></span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
        <button type="button" className="text-indigo-600 hover:text-indigo-900"></button>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
        <button type="button" className="text-red-600 hover:text-red-900"></button>
      </td>
    </tr>
  )
}

export default SkeletonProduct
