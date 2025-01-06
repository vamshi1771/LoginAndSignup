import React, { useState,PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "./PieCharts.css";

const LineCharts = ({data,handleYearSelection, handlerestaurantSelection,restaurants,handleShowData,title,Parameter}) => {

    const [year,setYear] = useState(null);
    const years = [2021,2022,2023,2024,2025];
    const [RestaurantId,setRestaurantId] = useState(null);
    return (
        <div>
            <h1 className='mb-4 font-semibold text-yellow-600'>{title}</h1>
        <div className="ms-6 bigchartSelect">
        <h5 className='font-sans text-green-500'>Year</h5>
        <select onChange={handleYearSelection}>
          {<option value="">Select Year</option>}
          {years.map((e) => {
            return (
              <option key={e} value={e}>
                {e}
              </option>
            )
          })}
        </select>
        <h5 className='font-sans text-green-500'>Restaurants</h5>
        <select onChange={handlerestaurantSelection}>
          {<option value="">Select Restaurant</option>}
          {restaurants.length != 0 ? restaurants?.map((e) => {
            return (
              <option key={e.restaurantId} value={e.restaurantId}>
                {e.restaurantName}
              </option>
            )
          }) : <option value="">No Restaurants Available</option>}
        </select>
        <button onClick={handleShowData}>Show Data</button>
      </div>
      {data?.length ? null : (
          <h6 className="errordata">No data available to show</h6>
        )}
            <ResponsiveContainer width= "100%" height={400}>
                <LineChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey={Parameter} stroke="#8884d8" activeDot={{ r: 8 }} />
                    {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default LineCharts;