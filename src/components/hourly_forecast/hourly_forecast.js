import './hourly_forecast.css'
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJs,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip
} from 'chart.js'

ChartJs.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip
)

const HourlyForecast = (data) => {
    let listHour = data.data.list
    let dataChart = {
        labels: [],
        datasets: [{
            label: 'Temperature',
            data: [],
            backgroundColor: '#ffcc0033',
            borderColor: '#ffcc00',
            pointBorderColor: '',
            fill: true,
            tension: 0.4
        }]
    }
    console.log(data.list)
    for(let i = 0; i<7;i++){
        let time = listHour[i].dt_txt.split(" ")
        dataChart.labels.push(time[1])
        dataChart.datasets[0].data.push(Math.round(listHour[i].main.temp))
    }
    let minValue = Math.min(...dataChart.datasets[0].data)
    let maxValue = Math.max(...dataChart.datasets[0].data)
    // const dataChart = {
    //     labels: ['Mon', 'Tue', 'wed'],
    //     datasets: [
    //         {
    //             label: 'Temperature',
    //             data: [6,3,9],
    //             backgroundColor: 'aqua',
    //             borderColor: 'black',
    //             pointBorderColor: 'aqua',
    //             fill: true,
    //             tension: 0.4,
    //         }
    //     ]
    // }

    const options = {
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                min: minValue - 3,
                max: maxValue + 3
            }
        }
    }

    return (
        <div className='hourly_forecast'>
            {/* <span>
                {dataHourly}
            </span> */}
            {/* <h1>Chart js and react introduction | chartjs3</h1> */}
            <div className='chart_container'>
                <Line
                    data = {dataChart}
                    options = {options}
                ></Line>
            </div>

        </div>
    )
}

export default HourlyForecast;