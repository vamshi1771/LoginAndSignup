import React from 'react';
import Piechart from '../charts/PieCharts';
import Bigchart from '../charts/BarCharts';
import './Components.css';
const AnalyticsPage = () => {

    const restaurantData = [
        { restaurantId: 1, restaurantName: 'Restaurant A', averageOrderCountPerMonth: 30 },
        { restaurantId: 2, restaurantName: 'Restaurant B', averageOrderCountPerMonth: 45 },
        { restaurantId: 3, restaurantName: 'Restaurant C', averageOrderCountPerMonth: 25 },
        { restaurantId: 4, restaurantName: 'Restaurant D', averageOrderCountPerMonth: 50 },
        { restaurantId: 5, restaurantName: 'Restaurant E', averageOrderCountPerMonth: 35 },
      ];

    return (
        <div className='analytics-page'>
            <div className='left-container text-align-left'>
                <h3 className='font-semibold text-cyan-600 ms-2 font-serif '>Analysis</h3>

            </div>
            <div className='right-container'>
                <div className='d-flex justify-around'>
                    <Piechart data={restaurantData} title="Types of Restaurants Registered" dataKey="averageOrderCountPerMonth" />
                    <Piechart data={restaurantData} title="Types of Restaurants Registered" dataKey="averageOrderCountPerMonth" />
                    {/* <Bigchart
                        data={data}
                        title="Product Availability and Requirements"
                        grid
                    /> */}
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;