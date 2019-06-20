import React, { Component } from "react";
import { Link } from "react-router-dom";

const Track = ({ track }) => {
  return (
    <React.Fragment>
      <div className="col-md-6">
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <h5>{track.artist_name}</h5>
            <p className="card-text">
              <strong>
                <i className="fas fa-play" /> Track
              </strong>
              : {track.track_name}
              <br />
              <strong>
                <i className="fas fa-compact-disc" /> Album
              </strong>
              : {track.album_name}
            </p>
            <Link
              to={`/lyrics/track/${track.track_id}`}
              className="btn btn-info btn-block"
            >
              <i className="fas fa-eye" /> View Lyrics
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Track;
