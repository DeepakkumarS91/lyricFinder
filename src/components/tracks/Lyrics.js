import React, { Component } from "react";
import Spinner from "../layouts/Spinner";
import axios from "axios";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const API_KEY = process.env.REACT_APP_MM_KEY;
class Lyrics extends Component {
  state = {
    track: {},
    lyric: {}
  };
  componentDidMount() {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${
          this.props.match.params.trackid
        }&apikey=${API_KEY}`
      )
      .then(res => {
        this.setState({ lyric: res.data.message.body.lyrics });
        return axios.get(
          `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${
            this.props.match.params.trackid
          }&apikey=${API_KEY}`
        );
      })
      .then(res => this.setState({ track: res.data.message.body }))
      .catch(err => console.log(err));
  }
  render() {
    const { track, lyric } = this.state;

    if (
      track === undefined ||
      lyric === undefined ||
      Object.keys(track).length === 0 ||
      Object.keys(lyric).length === 0
    ) {
      return <Spinner />;
    } else {
      return (
        <React.Fragment>
          {console.log(track)}
          <Link to={"/"} className="btn btn-primary mb-4 ">
            <i className="fas fa-backward"> Go Back</i>
          </Link>
          <div className="container mb-4">
            <div className="row-justify-content-center">
              <div className="col-12 col-md-12">
                <div className="card ">
                  <h5 className="card-header">
                    <span className="text-dark font-weight-bold ">
                      {track.track.track_name}
                    </span>{" "}
                    by{" "}
                    <span className="text-secondary">
                      {track.track.artist_name}
                    </span>
                  </h5>
                  <div className="card-body">
                    <p className="card-text">
                      {lyric.lyrics_body.slice(0, -71)}
                    </p>
                  </div>
                </div>
                <ul className="list-group mt-3">
                  <li className="list-group-item">
                    <strong>Album ID</strong>: {track.track.album_id}
                  </li>
                  <li className="list-group-item">
                    <strong>Lyric Genre</strong>:{" "}
                    {track.track.primary_genres.music_genre_list.length === 0
                      ? "none"
                      : track.track.primary_genres.music_genre_list[0]
                          .music_genre.music_genre_name}
                  </li>
                  <li className="list-group-item">
                    <strong>Explicit Words</strong>:{" "}
                    {lyric.explicit === 0 ? "No" : "Yes"}
                  </li>
                  <li className="list-group-item">
                    <strong>Release Year</strong>:{" "}
                    <Moment format="DD/MM/YYYY">
                      {track.track.release_date}
                    </Moment>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default Lyrics;
