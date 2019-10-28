import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import  Header from './components/Header';
import Home from './components/Home';
import Movie from './components/Movie';
import NotFound from './components/NotFound';


const App = () => {
    return (
        <div className="">

            <BrowserRouter>
                <React.Fragment>
                    <Header />
                    {/*<Home />*/}
                    <Switch>
                        <Route path="/" component={Home} exact />
                        <Route path="/:movieId" component={Movie} exact />
                        <Route component={NotFound} />
                    </Switch>
                </React.Fragment>
            </BrowserRouter>

        </div>
    );
}

export default App;
