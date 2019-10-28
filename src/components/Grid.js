import React from 'react';
import PropTypes from 'prop-types';


const Grid = (props) => {

    const renderGridElements = () => {
        const gridElements = props.children.map( (element, i) => {
            return(
                <div key={i} className='rmdb-grid-element'>
                    {element}
                </div>
            )
        } )
        return gridElements;
    }




    return(
        <div className='rmdb-grid'>
            {props.header && !props.loading ?
                <h1>{props.header}</h1> : null
            }
            <div className='rmdb-grid-content'>
                {renderGridElements()}
            </div>
        </div>
    )
}

Grid.propTypes = {
    header: PropTypes.string,
    loading: PropTypes.bool.isRequired
}

export default Grid;

