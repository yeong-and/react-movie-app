import React from "react";
import axios from "axios";
import Movie from "./Movie";
import { element } from "prop-types";

class App extends React.Component {
  state = {
    isLoading: true,
    movies: [],
  };

  getMovies = async () => {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get(
      "https://yts.mx/api/v2/list_movies.json?sort_by=rating"
    );
    this.setState({ movies, isLoading: false });
  };

  componentDidMount() {
    this.getMovies();
  }
  render() {
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        {isLoading ? (
          <div className="Loader">
            <span className="Loader__text">Loading...</span>
          </div>
        ) : (
          <div className="movies">
            {movies.map((element) => (
              <Movie
                key={element.id}
                year={element.year}
                title={element.title}
                summary={element.summary}
                poster={element.medium_cover_image}
              />
            ))}
          </div>
        )}
      </section>
    );
  }
}

export default App;
