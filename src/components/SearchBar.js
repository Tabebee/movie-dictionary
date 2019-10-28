import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

// Controlled Component
class SearchBar extends Component {
    state = {
        value: ''
    }

    timeout = null;

    searchThis = (event) => {
        this.setState({ value: event.target.value })
        clearTimeout(this.timeout)
        this.timeout = setTimeout( () => {
            this.props.callback(this.state.value);
        }, 500);
    }

    render(){
        console.log(this.props);
        return(
            <div className='rmdb-searchbar'>
                <div className='rmdb-searchbar-content'>
                    <FontAwesome
                        className='rmdb-fa-search'
                        name='search'
                        size='2x'
                    />
                    <input
                        type='text'
                        className='rmdb-searchbar-input'
                        placeholder='Search'
                        onChange={this.searchThis}
                        value={this.state.value}
                    />
                </div>
            </div>
        )
    }
}

export default SearchBar;