import React from "react";
import Button from 'react-bootstrap/Button';

export default function ProblemScreen() {
    return(
        <div className="home-screen">
            <div className="home-screen-header">
                <h1 className="primary-header">LeetCode Tracker</h1>
                <img className="checkmark-logo" src={require('../images/checkmark.png')} alt="checkmark"/>
            </div>
            <div className="home-screen-subheader">
                <h2 className="secondary-header">121. Best Time to Buy and Sell Stock</h2>
            </div>
            <p className="textbox">
                You are given an array <code>prices</code> where <code>prices[i]</code> is the price of a given stock on the <code>ith</code> day.

                You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

                Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.
            </p>
            <div className="tertiary-header">

            </div>
        </div>
    )
}