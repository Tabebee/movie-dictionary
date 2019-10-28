import React, { Component } from 'react';
import ActorImage from './ActorImage';
import SearchBar from './SearchBar';
import Grid from './Grid';
import MovieThumb from './MovieThumb';
import MoreButton from './MoreButton';
import Spinner from './Spinner';

import config from '../config/config';

class Home extends Component {
    state = {
        movies: [],
        ActorImage: null,
        loading: false,
        currentPage: 0,
        totalPages: 0,
        searchItem: ''
    }

    componentDidMount() {
        if(localStorage.getItem('HomePageState')) {
            const state = JSON.parse(localStorage.getItem('HomePageState'));
            this.setState ({ ...state })
        } else {
            this.setState({ loading: true });
            const endPoint = `${config.API_URL}movie/popular?api_key=${config.API_KEY_V3_AUTH}&language=en-US&page=1`;
            this.fetchItems(endPoint);
        }
    }

    fetchItems = (endpoint) => {
        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                console.log(result);
                this.setState({
                    movies: [...this.state.movies, ...result.results],
                    ActorImage: this.state.ActorImage || result.results[0],
                    loading: false,
                    currentPage: result.page,
                    totalPages: result.total_pages
                }, () => {
                    // Only save to loval storage awhen not doing search
                    if (this.state.searchItem === "") {
                        localStorage.setItem('HopePageState', JSON.stringify(this.state) )
                    }
                } )
            })
    }

    SearchMovies = (searchItem) => {
        console.log(searchItem);
        let endpoint = '';
        this.setState({
            movies: [],
            loading: true,
            searchItem
        })

        if (searchItem === '') {
            endpoint = `${config.API_URL}movie/popular?api_key=${config.API_KEY_V3_AUTH}&language=en-US&page=1`;
        } else {
            endpoint = `${config.API_URL}search/movie?api_key=${config.API_KEY_V3_AUTH}&language=en-US&query=${searchItem}`;
            console.log(endpoint);
        }

        this.fetchItems(endpoint);

    }

    loadMoreButton = () => {
        let endpoint = '';
        this.setState({ loading: true });
        console.log('h')
        if(this.state.searchItem === '') {
            endpoint = `${config.API_URL}movie/popular?api_key=${config.API_KEY_V3_AUTH}&language=en-US&page=${this.state.currentPage + 1}`
        } else {
            endpoint = `${config.API_URL}search/movie?api_key=${config.API_KEY_V3_AUTH}&language=en-US&query=${this.state.searchItem}&page=${this.state.currentPage + 1}`
        }

        this.fetchItems(endpoint);

    }

    render() {
        return(
            <div className='rmdb-home'>
                { this.state.ActorImage ?
                <div>
                    <ActorImage
                        image={`${config.API_IMAGE_BASE}${config.BD_SIZE}${this.state.ActorImage.backdrop_path}`}
                        title={this.state.ActorImage.original_title}
                        text={this.state.ActorImage.overview}
                    />
                    <SearchBar callback={this.SearchMovies} />
                </div> : null }
                <div className='rmdb-home-grid'>
                    <Grid
                        header={this.state.searchItem ? 'Search Result': 'Popular Movies'}
                        loading={this.state.loading}
                    >
                    {this.state.movies.map( (element, i) => {
                        // console.log(element.poster_path);
                        return (
                            <MovieThumb
                                key={i}
                                clickable={true}
                                image={element.poster_path ? `${config.API_IMAGE_BASE}${config.POSTER_SIZE}${element.poster_path}` :
                                    './images/no_image.jpg'
                                }
                                MovieId={element.id}
                                MovieName={element.original_title}
                            />
                        )
                    } )}
                    </Grid>
                    { this.state.loading ? <Spinner /> : null }
                    { (this.state.currentPage < this.state.totalPages && !this.state.loading) ?
                        <MoreButton text="Load More" onClick={this.loadMoreButton} /> : null
                    }
                </div>
            </div>
        )
    }
}

export default Home;