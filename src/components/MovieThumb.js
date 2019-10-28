import React from 'react';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const MovieThumb = (props) => {
    // console.log(props)
    return(
        <div className='rmdb-moviethumb'>
            {props.clickable ?
                <Link to={{ pathname: `/${props.MovieId}`, MovieName: `${props.MovieName}` }}>
                    <img src={props.image} alt="moviethumb" />
                </Link>
                :
                <img src={props.image} alt="moviethumb" />
            }

        </div>
    )
}

MovieThumb.propTypes = {
    image: PropTypes.string,
    MovieId: PropTypes.number,
    MovieName: PropTypes.string
}

export default MovieThumb;

