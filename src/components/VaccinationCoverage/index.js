// Write your code here

import './index.css'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const VaccinationCoverage = props => {
  const {resultObject} = props
  const {last7DaysVaccination} = resultObject

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 100).toString()}k`
    }
    return number.toString()
  }

  return (
    <div className="first-chart">
      <h1 className="title">Vaccination Coverage</h1>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={last7DaysVaccination}
          margin={{
            top: 5,
          }}
          width={1000}
          height={300}
        >
          <XAxis
            dataKey="vaccineDate"
            tick={{
              stroke: 'gray',
              strokeWidth: 1,
            }}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{
              stroke: 'gray',
              strokeWidth: 0,
            }}
          />
          <Legend
            wrapperStyle={{
              padding: 30,
            }}
          />
          <Bar
            dataKey="dose1"
            name="Dose1"
            radius={[10, 10, 0, 0]}
            fill="#5a8dee"
            barSize="10%"
          />
          <Bar
            dataKey="dose2"
            name="Dose2"
            radius={[10, 10, 0, 0]}
            fill="#f54394"
            barSize="10%"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
export default VaccinationCoverage
