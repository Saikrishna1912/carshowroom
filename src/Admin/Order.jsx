import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import axios from "axios";

export const Order = () => {
    const API_URL = `https://carshowroom-backend.onrender.com/api/v1/order`;

    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let userRole = JSON.parse(localStorage.getItem('user'));
        if (userRole == null || userRole.foundedUser.role !== 'Admin') {
            navigate('/home');
        }
    }, [navigate]);

    useEffect(() => {
        axios.get(API_URL)
            .then(response => {
                setData(response.data.orders);
            })
            .catch(error => {
                console.log(error);
            });

    }, [API_URL]);

    let deleteBTN = (event) => {
        let orderId = event.target.id;
        console.log(orderId);
        axios.delete(`https://carshowroom-backend.onrender.com/api/v1/order/${orderId}`)
            .then(response => {
                console.log(response.data);
                setData(data.filter(order => order._id !== orderId));
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <>
            <Header />
            <div id="main" className="alt">
                <section id='one'>
                    <div className="inner row">
                        <table className="table table-striped table-dark">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Order Items</th>
                                    <th scope="col">Total Price</th>
                                    <th scope="col">User Email</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((order, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <ul className='list-unstyled'>
                                                {order.cart.cars.map((subItem, subIndex) => (
                                                    <li key={subIndex}>{subItem.quantity}x {subItem.carId.brand} {subItem.carId.name}</li>
                                                ))}
                                            </ul>
                                        </td>
                                        <td>{order.totalPrice}</td>
                                        <td>{order.createdBy.email}</td>
                                        <td>
                                            <button id={order._id} onClick={deleteBTN} className='m-2 btn btn-danger order-delete'>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    )
}
