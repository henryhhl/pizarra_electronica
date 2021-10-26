
import React from 'react';
import '../css/loading.css';

export const LoadingPage = () => {

    return (
        <div className="contenedor"> 
            <div className="group"> 
                <div className="bigSqr">
                    <div className="square first"></div>
                    <div className="square second"></div>
                    <div className="square third"></div>
                    <div className="square fourth"></div>
                </div>
                <div className="text">loading</div>
            </div>
        </div>
    );
};
