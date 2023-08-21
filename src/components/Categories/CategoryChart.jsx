import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const CategoryChart = ({ categoriesData }) => {
  return (
    <>
      <Bar
        data={categoriesData}
        options={{
          plugins: {
            title: {
              display: true,
              text: 'Products by category',
              font: {
                size: 20,
              },
            },
            legend: {
              display: true,
              position: 'right',
            },
          },
        }}
      />
    </>
  )
}
export default CategoryChart
