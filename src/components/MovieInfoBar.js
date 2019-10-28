import React from 'react';
import { Link } from 'react-router-dom';
import { calcTime, convertMoney } from "./helpers";

import FontAwesome from 'react-fontawesome';



const MovieInfoBar = (props) => {
    return (
        <div className='rmdb-movieinfobar'>
            <div className='rmdb-movieinfo-content'>

                <div className='rmdb-movieinfobar-content-col'>
                    <FontAwesome className='fa-time' name='clock-o' size='2x'/>
                    <span className='rmdb-movieinfobar-info'>
                        Running Time: {calcTime(props.time)}
                    </span>
                </div>

                <div className='rmdb-movieinfobar-content-col'>
                    <FontAwesome className='fa-budget' name='money' size='2x'/>
                    <span className='rmdb-movieinfobar-info'>
                        Budget: {convertMoney(props.budget)}
                    </span>
                </div>

                <div className='rmdb-movieinfobar-content-col'>
                    <FontAwesome className='fa-revenue' name='ticket' size='2x'/>
                    <span className='rmdb-movieinfobar-info'>
                        Revenue: {convertMoney(props.revenue)}
                    </span>
                </div>

            </div>

        </div>
    )
}

export default MovieInfoBar;