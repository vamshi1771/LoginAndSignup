import React, { useEffect, useState } from 'react';
import Piechart from '../charts/PieCharts';
import Bigchart from '../charts/BarCharts';
import useAxiosInstance from '../axios/axiosInterceptors';
import { useDispatch, useSelector } from 'react-redux';
import './Components.css';
import { openSnackBar } from '../redux/actions/snackbaractions';
import LineCharts from '../charts/LineCharts';

const AnalyticsPage = () => {

    const token = useSelector((state) => state.user.token);
    const axiosInstance = useAxiosInstance(token);
    const [restaurantsAverage, setRestaurantsAverage] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [restaurantTypes, setRestaurantTypes] = useState([]);
    const [IndividualData, setIndividualData] = useState([]);
    const [IndividualAverageData, setIndividualAverageData] = useState([]);
    const [year, setYear] = useState(0);
    const [yearForAverage, setYearForAverage] = useState(0);
    const [isOverall, setOverAll] = useState(false);
    const [restaurantId, setRestaurantId] = useState(null);
    const [restaurantIdForAverage, setRestaurantIdForAverage] = useState(null);
    const disPatch = useDispatch();


    const fetchRestaurantsAverage = async () => {
        try {
            const response = await axiosInstance.get('average-orders-month');
            if (response.status == 200) {
                setRestaurantsAverage(response.data);
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    const   handleYearSelection = (e) => {
        setYear(e.target.value);
    }
    const handlerestaurantSelection = (e) => {
        setRestaurantId(e.target.value);
    }

    const   handleYearSelectionForAverage = (e) => {
        setYearForAverage(e.target.value);
    }
    const handlerestaurantSelectionForAverage = (e) => {
        console.log("restarant avarage",e.target.value);
        setRestaurantIdForAverage(e.target.value);
    }

    const handleShowLineChartData = () => {
        if (year === null || restaurantId == null) {
            disPatch(openSnackBar({ severity: 'error', message: year == null ? "Please select Year" : "Please Select Restaurant" }));
            return;
        }
        fetchIndividualData("total",year, restaurantId);
    }
    const handleShowLineChartDataAverage = () => {
        if (yearForAverage === null || restaurantIdForAverage == null) {
            disPatch(openSnackBar({ severity: 'error', message: year == null ? "Please select Year" : "Please Select Restaurant" }));
            return;
        }
        fetchIndividualData("average",yearForAverage, restaurantIdForAverage);
    }

    const fetchRestaurants = async () => {
        try {
            const response = await axiosInstance.get('/get-restaurants');
            if (response.status === 200) {
                setRestaurants(response.data);
                const typeCountMap = new Map();
                response.data.forEach((item) => {
                    if (typeCountMap.has(item.restaurantType)) {
                        typeCountMap.set(item.restaurantType, typeCountMap.get(item.restaurantType) + 1);
                    } else {
                        typeCountMap.set(item.restaurantType, 1);
                    }
                });
                const typesArray = Array.from(typeCountMap, ([restaurantType, count]) => ({ restaurantType, count }));
                console.log(typesArray);
                setRestaurantTypes(typesArray);
            } else {
                disPatch(openSnackBar({ severity: 'error', message: response.data.message }));
            }
        } catch (error) {
            console.error(error);
        }
    }


    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'Nov', 'Dec'
    ];

    const setMonthsInIndividualData = (data) => {
        return data.map(item => ({
            ...item,
            month: monthNames[item.month - 1]
        }));
    };
    const fetchIndividualData = async (key,year, restaurantId) => {
        try {
            const response = await axiosInstance.get(`get-performance-metrics/${year}/${restaurantId}`);

            if (response.status === 200) {
                const monthWiseData = setMonthsInIndividualData(response.data[0]?.monthOrderCounts)
                console.log("monthwisaeData", monthWiseData);
                if(key == "total")setIndividualData(monthWiseData);
                else setIndividualAverageData(monthWiseData);
            }

        }
        catch (e) {
            console.log(e);
        }

    }

    useEffect(() => {
        fetchRestaurants();
        fetchRestaurantsAverage();
    }, [isOverall])

    return (
        <div className='analytics-page'>
            <div className='left-container text-align-left'>
                <h3 className='font-semibold text-cyan-600 ms-2 font-serif '>Analysis</h3>
                <h4 className={`mt-4 cm-pointer ms-3 font-serif text-teal-600  ${isOverall === false ? "font-semibold" :""  }`} onClick={() => setOverAll(false)}> Overall Analysis</h4>
                <h4 className={`mt-4 cm-pointer ms-3 font-serif text-teal-600 ${isOverall === false ? "" : "font-semibold" }`} onClick={() => setOverAll(true)}>Solo Metrics</h4>

            </div>
            <div className='right-container '>
                {isOverall == true ? <div className='mt-10 mb-5 d-flex flex-col gap-5'>
                    <LineCharts data={IndividualData} handleYearSelection={handleYearSelection}
                        handlerestaurantSelection={handlerestaurantSelection} restaurants={restaurants} handleShowData={handleShowLineChartData}
                        title="Total Order Per Month"  Parameter = "orderCount"/>

                    <LineCharts data={IndividualAverageData} handleYearSelection={handleYearSelectionForAverage}
                        handlerestaurantSelection={handlerestaurantSelectionForAverage} restaurants={restaurants} handleShowData={handleShowLineChartDataAverage}
                        title="Average Order Amount Per Month" Parameter = "averageOrderAmount" />
                </div> :
                <div className='d-flex justify-around'>
                    <Piechart data={restaurantsAverage} title="Average Orders per month" dataKey="totalMonths" secondKey = "totalOrderCount" />
                     <Piechart data={restaurantTypes} title="Types of Restaurants" dataKey="restaurantType"  secondKey = "count"/>
                </div>}
            </div>
        </div>
    );
};

export default AnalyticsPage;