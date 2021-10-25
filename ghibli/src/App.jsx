import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

const App = () => {
    const [films, setFilms] = useState([]);
    const [loadFilms, setLoadFilms] = useState(false);
    const [people, setPeople] = useState([]);
    const [loadPeople, setLoadPeople] = useState(false);

    useEffect(() => {
        if (loadFilms) {
            fetch("https://ghibliapi.herokuapp.com/films")
                .then(res => res.json())
                .then(films => setFilms(films))
                .catch(err => console.log(err));
        }
    }, [loadFilms]);

    useEffect(() => {
        if (loadPeople) {
            fetch("https://ghibliapi.herokuapp.com/people")
                .then(res => res.json())
                .then(people => setPeople(people))
                .catch(err => console.log(err));
        }
    }, [loadPeople]);

    const handleLoadFilms = () => {
        setLoadFilms(true);
        setLoadPeople(false)
    }

    const handleLoadPeople = () => {
        setLoadPeople(true);
        setLoadFilms(false)
    
    return (
        <BrowserRouter>
        <Switch>
            <Route exact path="/films">
            {() => <h1>Films</h1>}
            </Route>
            <Route exact path="/:filmsid">
            {() => <h1>Films</h1>}
            </Route>      
            <Route exact path="/people">
            {() => <h1>People</h1>}
            </Route>
            <Route exact path="/:peopleid">
            {() => <h1>People</h1>}
            </Route>      
            <Route path= "*">
                {() => <h1>404 Not found</h1>}
            </Route>
        </Switch>
        </BrowserRouter>
    )}
    if (loadFilms) {
        return (
            <div className="container">
                <h1>Ghibli</h1>
                <button className="btn btn-dark mr-3 mb-3" onClick={handleLoadFilms}>Load Films</button>
                <button className="btn btn-dark ml-3 mb-3" onClick={handleLoadPeople}>Load People</button>
                <div className="row">
                    {films.map(film => (
                        <div className="col-6" key={film.id}>
                            <div class="card">
                                <div class="card-body">
                                    <img src={film.movie_banner} alt="poster from movie" class="card-img-top" />
                                    <h5 class="card-title">{film.title}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">{film.original_title}</h6>
                                    <p class="card-text">{film.description}</p>
                                    <a href={film.url} class="card-link">See Raw Data</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    } else if (loadPeople) {
        return (
            <div className="container">
                <h1>Ghibli</h1>
                <button className="btn btn-dark mr-3 mb-3" onClick={handleLoadFilms}>Load Films</button>
                <button className="btn btn-dark ml-3 mb-3" onClick={handleLoadPeople}>Load People</button>
                <h2>Studio Ghibli</h2>
                <div className="row">
                    {people.map(person => (
                        <div className="col-6 mt-3" key={person.id}>
                            <div class="card">
                                <div class="card-body">
                                    {/* <img src={person.movie_banner} alt="poster from movie" class="card-img-top" /> */}
                                    <h5 class="card-title">{person.name}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">{person.gender}</h6>
                                    <p class="card-text">{person.age}</p>
                                    <a href={person.url} class="card-link">See Raw Data</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    } else {
        return (
            <div className="container">
                <h1>Ghibli</h1>
                <button className="btn btn-dark mr-3" onClick={handleLoadFilms}>Load Films</button>
                <button className="btn btn-dark ml-3" onClick={handleLoadPeople}>Load People</button>
            </div>
        );
    }
}

export default App;