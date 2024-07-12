import React from "react";

export const Footer = () => {
  return (
    <div className="f-distributed">

      <div className="f-left">
        <img src="assets/images/Group 1.png" alt="Car Horizon Logo" />

        <p className="f-company-name">
          Copyright © 2021 <strong>CarHorizonX</strong> All rights reserved
        </p>
      </div>

      <div className="f-center">
        <div>
          <i className="fa fa-map-marker"></i>
          <p><span>Panaji (HEAD OFFICE)</span> GOA</p>
        </div>

        <div>
          <i className="fa fa-phone"></i>
          <p>+91 7429425812</p>
        </div>

        <div>
          <i className="fa fa-envelope"></i>
          <p><a href="mailto:CarHorizonX@gmail.com">CarHorizonX@gmail.com</a></p>
        </div>
      </div>

      <div className="f-right">
        <p className="f-company-about">
          <span>About the company</span>
          <strong>CarHorizonX</strong> where passion for automobiles meets unparalleled service. Since 2010, we've been a trusted destination in Goa, offering a diverse range of vehicles to suit every lifestyle. Our commitment to quality is unwavering, ensuring that each car in our showroom meets the highest standards of performance and reliability.
        </p>
        
        <div className="f-icons">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook"></i></a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><i className="fa fa-instagram"></i></a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fa fa-linkedin"></i></a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter"></i></a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer"><i className="fa fa-youtube"></i></a>
        </div>
      </div>

    </div>
  );
};
