import { useState } from "react";

export const BuscadorPeli = () => {

  const urlBase = `https://api.themoviedb.org/3/search/movie`;

  const API_KEY = `8fffa2bf0570aefc4ca2cdc6a8edc014`;

  const [busqueda, setBusqueda] = useState('');

  const [peliculas, setPeliculas] = useState([]);
  
  const handleInputChange = (e) => {
    setBusqueda(e.target.value);
  };

  const fetchPeliculas = async () => {
    try{
      const response = await fetch(`${urlBase}?query=${busqueda}&api_key=${API_KEY}`);
      const data = await response.json()
      //setPeliculas(data)
      if (data.results && Array.isArray(data.results)) {//se hizo este if diferente al como se hizo en la practica porque al no poder verificar si peliculas.map era un array
        setPeliculas(data.results);
      } else {//en caso de que no lo verifique envia setPeliculas como un array vacio
        setPeliculas([]);
    }}catch (error) {
        console.error('Ha ocurrido un error', error)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPeliculas();
  };

  return (
    <div className="container">
      <h1 className="title">Buscador de Peliculas</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribi una Pelicula"
          value={busqueda}
          onChange={handleInputChange}
        />
        <button type="submit" className="search-button">
          🔍
        </button>
      </form>
        <div className="movie-list">
                    {peliculas.map( (pelicula) => (
                        <div key={pelicula.id} className="movie-card"> 
                        <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} alt={pelicula.title}/>
                        <h2>{pelicula.title}</h2>
                        <p>{pelicula.overview}</p>
                        </div>))}
        </div>
    </div>
  );
};
