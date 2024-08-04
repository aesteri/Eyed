import React, { useState } from "react";

import './css/bucketlist.css';
import { Helmet } from 'react-helmet'
 
const BucketList = () => {
    return (
        <div className="BucketList">
            <Helmet>
                <title>BucketList</title>
            </Helmet>
            <div  className="bbbb">experiences or achievements that a person hopes to have or accomplish during their lifetime</div>
            <div className="list">
                <div className="a2">
                    <video src="/pictures/bucketlist/mrdc.mp4" width="320" autoPlay loop muted/>
                    <img src="/pictures/bucketlist/car4.jpg" alt="Italian Trulli"/>
                </div> 
            </div>
            <div className="b1">
                    <img className= "imgcar"src="/pictures/bucketlist/car1.jpg" />
                    <img className= "imgcar1"src="/pictures/bucketlist/car2.jpg" />
                    <img className= "imgcar1"src="/pictures/bucketlist/car3.jpg" />
                    <img className= "imgcar"src="/pictures/bucketlist/daq.jpg" />
                    <img className= "imgcar1"src="/pictures/bucketlist/me.jpg" />
                    <img className= "imgcar"src="/pictures/bucketlist/me4.jpg" />
                    <img className= "imgcar1"src="/pictures/bucketlist/team.jpg" />
                </div>
        </div>
    );
};
 
export default BucketList;