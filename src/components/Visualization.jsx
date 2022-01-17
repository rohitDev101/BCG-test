import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import './Visualization.css';
import { baseUrl } from './PolicyData';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const regions = ['North', 'South', 'East', 'West']
function Visualise() {

    const [data, setData] = useState([]);
    const [region, setRegion] = useState(regions[0]);
    useEffect(() => {
        (async function fetchData() {
            let res = await axios.get(baseUrl + 'visualdata');
            let dataObj = {}
            res.data.forEach(el => {
                if (!dataObj[el.Customer_Region]) {
                    dataObj[el.Customer_Region] = [[months[el.month.split('/')[0] - 1], el.No_of_policies]]
                } else {
                    dataObj[el.Customer_Region].push([months[el.month.split('/')[0] - 1], el.No_of_policies])
                }
            })
            setData(dataObj);
        })();
    }, [])

    function getData(data) {
        if (!data || (data && data.length === 0)) return []
        return data.map(function (month, i) {
            return {
                name: month[0],
                y: month[1],
                // color: countries[i].color
            };
        });
    }
    const comparefunc = (a, b) => {
        return months.indexOf(a.name) - months.indexOf(b.name);
    }

    const options = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Policy data chart'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Total number of policies'
            },
        },
        series: [{
            name: region,
            id: 'main',
            dataSorting: {
                matchByName: true
            },
            dataLabels: [{
                style: {
                    fontSize: '16px'
                }
            }],
            data: getData(data[region]).sort(comparefunc).slice()
        }]
    };

    

    return (
        <div>
            <h5 className='display-4'>Visualization of Policy Data<sup>(using HighCharts)</sup> </h5>
            <div className="btn-group w-auto my-3" role="group" aria-label="Basic radio toggle button group">
                {regions.map(el => (
                    <div key={el}>
                        <input type="radio" className="btn-check" value={el} onClick={()=> setRegion(el)} name="btnradio" id={el} defaultChecked={el===regions[0]} />
                        <label className="btn btn-outline-primary mx-1" htmlFor={el}>{el}</label>
                    </div>
                ))}
            </div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    )
}

export default Visualise;