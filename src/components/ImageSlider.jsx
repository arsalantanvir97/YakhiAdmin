import React, { Component } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { imageURL } from "../utils/api";

export default class ImageSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <Slider {...settings}>
        {this.props.images?.map((img, index) => (
          <div className="form-group position-relative mt-1 userss">
            <img
              src={`${imageURL}${img}`}
              draggable={true}
              style={{
                width: 220,
                height: 180
              }}
            />
            {this.props.enable_delete && (
              <img
               
                onMouseEnter={this.props.handleMouseEnter} // Or onMouseOver
                onMouseLeave={this.props.handleMouseLeave}
                style={{
                  margin: 10,
                  ...(this.props.hover && {
                    transform: `translate(${3}px, ${2}px)`,
                    cursor: "pointer"
                  })
                }}
                src="images/cross-icon.png"
                onClick={() => this.props.handleDeleteImage(index)}
                alt=""
              />
            )}
          </div>
        ))}
      </Slider>
    );
  }
}
