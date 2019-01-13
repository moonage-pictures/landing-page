import React, { Component, Fragment } from "react";
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
import ReactPlayer from "react-player";
import { Loader } from "./common/Loader";

export default class Show extends Component {
  state = {
    show: this.props.location.state.show,
    playerLoaded: false,
    imageModalActive: {}
  };

  componentDidMount = () => window.scrollTo(0, 0);

  getGalleryLinks = galleryInfo =>
    galleryInfo
      .split("src=")
      .map(imgLink =>
        imgLink.substring(1, imgLink.indexOf(imgLink.match(/jpg|jpeg|png/)))
      );

  successState = () => this.setState({ playerLoaded: true });

  render() {
    return (
      <Fragment>
        <Navbar />
        <div className="container fade">
          <section className="section">
            <div className="columns is-centered is-multiline">
              <div className="column is-half-desktop ">
                <h1
                  className="title is-1 section-header"
                  style={{ textAlign: "center" }}
                >
                  {this.state.show.title.rendered}
                </h1>
              </div>
            </div>

            <div className="columns is-centered">
              <div className="column is-full-width">
                {!this.state.playerLoaded && <Loader section="trailer" />}{" "}
                <div className="fade">
                  <ReactPlayer
                    url={this.state.show.acf.trailerUrl}
                    width="100%"
                    height="60vh"
                    onReady={this.successState}
                    controls
                  />
                </div>
              </div>
            </div>
            <div className="columns is-multiline is-centered">
              {this.getGalleryLinks(this.state.show.acf.landscapeGallery)
                .slice(1)
                .map((img, i) => (
                  <Fragment key={i}>
                    <div className="column is-one-third">
                      <p
                        className="image is-16by9"
                        style={{cursor: "pointer"}}
                        onClick={() =>
                          this.setState({
                            imageModalActive: Object.assign(
                              this.state.imageModalActive,
                              { [img]: true }
                            )
                          })
                        }
                      >
                        <img src={img} alt="" />
                      </p>
                    </div>
                    <div
                      className={`modal ${
                        this.state.imageModalActive[img] ? "is-active" : ""
                      }`}
                    >
                      <div className="modal-background" onClick={() =>
                          this.setState({
                            imageModalActive: Object.assign(
                              this.state.imageModalActive,
                              { [img]: false }
                            )
                          })
                        } />
                      <div className="modal-content">
                        <p className="image">
                          <img src={img} alt="" />
                        </p>
                      </div>
                      <button className="modal-close is-large" aria-label="close" onClick={() =>
                          this.setState({
                            imageModalActive: Object.assign(
                              this.state.imageModalActive,
                              { [img]: false }
                            )
                          })
                        }/>
                    </div>
                  </Fragment>
                ))}
            </div>
          </section>
        </div>
        <Footer />
      </Fragment>
    );
  }
}
