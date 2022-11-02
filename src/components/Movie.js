import React, { Component } from 'react';

import config from '../config/config';

import Navigation from './Navigation';
import MovieInfo from './MovieInfo';
import MovieInfoBar from './MovieInfoBar';
import Grid from './Grid';
import Actor from './Actor';
import Spinner from './Spinner';
import './Movie.css';


class Movie extends Component {
    state = {
        movie: null,
        actors: null,
        directors: [],
        loading: false,
        actorsLink: null
    }

    componentDidMount() {
        if( localStorage.getItem(`${this.props.match.params.movieId}`)) {
            const state = JSON.parse(localStorage.getItem(`${this.props.match.params.movieId}`));
            this.setState({ ...state });
        } else {
            this.setState({ loading: true });
            const endpoint = `${config.API_URL}movie/${this.props.match.params.movieId}?api_key=${config.API_KEY_V3_AUTH}&language=en-US`;
            this.fetchItems(endpoint);
        }
    }

    fetchItems = (endpoint) => {
        fetch(endpoint)
            .then(result => result.json())
            .then( result => {
                console.log('result 39 ', result);
                if(result.status_code) {
                    this.setState({ loading: false });
                }
                // Movie Found proceed
                else {
                    this.setState({ movie: result },
                        // Callback function
                        () => {
                        const endpoint=`${config.API_URL}movie/${this.props.match.params.movieId}/credits?api_key=${config.API_KEY_V3_AUTH}&language=en-US`;
                        fetch(endpoint)
                            .then(result => result.json() )
                            .then(result => {
                                const directors = result.crew.filter( (member) => member.job === 'Director');

                                this.setState({
                                    actors: result.cast,
                                    directors: directors,
                                    loading: false,
                                    actorsLink: result.cast
                                }, () => {
                                    localStorage.setItem(`${this.props.match.params.movieId}`, JSON.stringify(this.state));
                                } )
                                console.log('state ', this.state)
                            })
                    } )

                }
            } )
            .catch(err => console.log("Error: ", err))

    }




    render(){
        const movieLink ='https://www.imdb.com/title/' + this.state.movie.imdb_id;
        return(
            <div className='rmdb-movie'>
                {this.state.movie ?
                    <div>
                        <Navigation movie={this.props.location.movieName} />
                        <a href={movieLink}>IMDB Profile Link</a>
                        <MovieInfo movie={this.state.movie} directors={this.state.directors} />
                        <MovieInfoBar time={this.state.movie.runtime} budget={this.state.movie.budget} revenue={this.state.movie.revenue} />
                    </div>
                    : null
                }

                {this.state.actors ?
                    <div className='rmdb-movie-grid'>
                        <Grid header={'Actors'}>
                            {this.state.actors.map( (element, i) => {
                                return <Actor key={i} actor={element}/>
                            })}
                        </Grid>
                    </div>
                    : null
                }

                {!this.state.actors && !this.state.loading ?
                    <h1>No Movie Found!!!</h1> : null
                }
                {this.state.loading ? <Spinner /> : null}

                {/*<Grid />*/}
                <Spinner />

            </div>
        )
    }
}


export default Movie;
