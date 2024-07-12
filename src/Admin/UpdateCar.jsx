import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { Header } from "../Header/Header";
import { Footer } from '../Footer/Footer';

export const UpdateCar = () => {
    const location = useLocation();
    const idReturned = location.pathname.slice(11);
    
    const API_URL = `https://carshowroom-backend.onrender.com/api/v1/car/update/${idReturned}`;

    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        let userRole = JSON.parse(localStorage.getItem('user'));
        if (userRole == null || userRole.foundedUser.role !== 'Admin') {
            navigate('/home');
        }
    }, [navigate]);

    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState('');
    const [color, setColor] = useState('');
    const [transmission, setTransmission] = useState('');
    const [engineSize, setEngineSize] = useState('');
    const [horsePower, setHorsePower] = useState('');
    const [seats, setSeats] = useState('');
    const [airBags, setAirbags] = useState('');
    const [type, setType] = useState('');
    const [maxSpeed, setMaxSpeed] = useState('');
    const [acceleration, setAcceleration] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            'name': name, 'brand': brand, 'price': price,
            'color': color, 'transmission': transmission, 'engineSize': engineSize,
            'horsePower': horsePower, 'seats': seats, 'airBags': airBags,
            'type': type, 'maxSpeed': maxSpeed, 'acceleration': acceleration
        };

        fetch(API_URL, {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 202) {
                    response.json()
                        .then(data => {
                            console.log(data);
                            navigate('/Home');
                        })
                        .catch(error => {
                            setErrorMessage("Failed to parse the response.");
                            console.error(error);
                        });
                } else {
                    setErrorMessage("Failed to update the car. Please try again.");
                }
            })
            .catch(error => {
                setErrorMessage("An error occurred. Please try again.");
                console.error(error);
            });
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handleBrandChange = (event) => {
        setBrand(event.target.value);
    };
    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };
    const handleColorChange = (event) => {
        setColor(event.target.value);
    };
    const handleTransmissionChange = (event) => {
        setTransmission(event.target.value);
    };
    const handleEngineSizeChange = (event) => {
        setEngineSize(event.target.value);
    };
    const handleHorsePowerChange = (event) => {
        setHorsePower(event.target.value);
    };
    const handleSeatsChange = (event) => {
        setSeats(event.target.value);
    };
    const handleAirBagsChange = (event) => {
        setAirbags(event.target.value);
    };
    const handleMaxSpeedChange = (event) => {
        setMaxSpeed(event.target.value);
    };
    const handleTypeChange = (event) => {
        setType(event.target.value);
    };
    const handleAccelerationChange = (event) => {
        setAcceleration(event.target.value);
    };

    return (
        <>
            <Header />
            <div id="main" className="alt">
                <section id="one">
                    <div className="inner row">
                        <header className="major col-12">
                            <h1>Update Car</h1>
                        </header>

                        <form onSubmit={handleSubmit} className="row">
                            <div className="form-floating mb-3 col-lg-4">
                                <label htmlFor="carBrand">Brand</label>
                                <input type="text" name="brand" onChange={handleBrandChange} id="carBrand" className="form-control" placeholder="Enter Car Brand" />
                            </div>
                            <div className="form-floating mb-3 col-lg-4">
                                <label htmlFor="carName">Name</label>
                                <input type="text" id="carName" name="name" onChange={handleNameChange} className="form-control" placeholder="Enter Car Name" />
                            </div>
                            <div className="form-floating mb-3 col-lg-4">
                                <label htmlFor="carPrice">Price</label>
                                <input type="text" name="price" onChange={handlePriceChange} id="carPrice" className="form-control" placeholder="example: 100,000 L.E" />
                            </div>
                            <div className="form-floating mb-3 col-lg-4">
                                <label htmlFor="carColor">Color</label>
                                <input type="text" name="color" onChange={handleColorChange} id="carColor" className="form-control" placeholder="Enter Car Color" />
                            </div>
                            <div className="form-floating mb-3 col-lg-4">
                                <label htmlFor="carTransmission">Transmission</label>
                                <input type="text" name="transmission" onChange={handleTransmissionChange} id="carTransmission" className="form-control" placeholder="Automatic - Manual" />
                            </div>
                            <div className="form-floating mb-3 col-lg-4">
                                <label htmlFor="carEngineSize">Engine Size</label>
                                <input type="text" name="engineSize" onChange={handleEngineSizeChange} id="carEngineSize" className="form-control" placeholder="example: 1200 cc" />
                            </div>
                            <div className="form-floating mb-3 col-lg-4">
                                <label htmlFor="carHorsePower">Horse Power</label>
                                <input type="text" name="horsePower" onChange={handleHorsePowerChange} id="carHorsePower" className="form-control" placeholder="Car Horse Power" />
                            </div>
                            <div className="form-floating mb-3 col-lg-4">
                                <label htmlFor="carSeats">Seats</label>
                                <input type="text" name="seats" onChange={handleSeatsChange} id="carSeats" className="form-control" placeholder="Number of Seats" />
                            </div>
                            <div className="form-floating mb-3 col-lg-4">
                                <label htmlFor="carMaxSpeed">Max Speed</label>
                                <input type="text" name="maxSpeed" onChange={handleMaxSpeedChange} id="carMaxSpeed" className="form-control" placeholder="example: 150 kmph" />
                            </div>
                            <div className="form-floating mb-3 col-lg-4">
                                <label htmlFor="carAirBags">AirBags</label>
                                <input type="text" name="airBags" onChange={handleAirBagsChange} id="carAirBags" className="form-control" placeholder="Number of AirBags" />
                            </div>
                            <div className="form-floating mb-3 col-lg-4">
                                <label htmlFor="carType">Car Type</label>
                                <input type="text" name="type" onChange={handleTypeChange} id="carType" className="form-control" placeholder="example: Suv" />
                            </div>
                            <div className="form-floating mb-3 col-lg-12">
                                <label htmlFor="carAcceleration">Acceleration</label>
                                <input type="text" name="acceleration" onChange={handleAccelerationChange} id="carAcceleration" className="form-control" placeholder="How many seconds from 0-100 kmph" />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                        <div>
                            {errorMessage && <p className="text-danger">{errorMessage}</p>}
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}
