import React from 'react';
import config from '../config/config';
import { Link } from 'react-router-dom';

const Actor = (props) => {

    const POSTER_SIZE = "w154";

    const link = 'https://www.themoviedb.org/person/' + props.actor.id;
    console.log('act ',link);

    return (
        <div className="rmdb-actor">
            <img
                src={props.actor.profile_path ? `${config.API_IMAGE_BASE}${config.POSTER_SIZE}${props.actor.profile_path}` : './images/no_image.jpg'}
                alt="actorthumb"
            />
            <span className="rmdb-actor-name">{props.actor.name}</span>
            <span className="rmdb-actor-character">{props.actor.character}</span>
            <a className='rmdb-actor-character linkTo' href={link} target='_blank' >Link</a>
        </div>
    )
}

export default Actor;