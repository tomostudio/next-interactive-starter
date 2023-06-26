import React from "react";
import "./style.css";

const Visit = () => {
  return (
    <div className="visit">
      <div className="hero">
        <img className="img" alt="Hero" src="hero.png" />
        <h1 className="text">VISIT</h1>
      </div>
      <div className="navigation-bar">
        <div className="rectangle" />
        <img className="LOGO" alt="Logo" src="LOGO.png" />
        <div className="nav">
          <div className="text-wrapper">NXT</div>
          <div className="div">Editorial</div>
          <div className="text-wrapper-2">Family</div>
          <div className="text-wrapper-3">BOOKING</div>
        </div>
      </div>
      <div className="content">
        <div className="container">
          <p className="plan-to-visit-us">
            Plan to visit us?
            <br />
            Check out our information below!
          </p>
          <div className="container-location">
            <div className="body">OUR LOCATION</div>
            <div className="container-link">
              <p className="p">Jl. Lorem Ipsum Dolor sit Amet, No.123A, Ubud, Bali, Indonesia</p>
              <img className="vector" alt="Vector" src="vector-4.png" />
            </div>
          </div>
          <img className="map" alt="Map" src="map.png" />
          <div className="container-operating">
            <div className="title">OPERATING HOURS</div>
            <p className="body-2">
              <span className="span">
                Monday to Sunday 09.00 - 21.00
                <br />
                Last Order 20.00
                <br />—<br />
              </span>
              <span className="text-wrapper-4">*Open Daily apart from National Holidays</span>
            </p>
          </div>
          <div className="container-contact">
            <div className="group">
              <div className="body-3">CONTACT US</div>
            </div>
            <p className="body-4">
              <span className="text-wrapper-5">
                {" "}
                Phone / Whatsapp: +62 000 000 000
                <br />
                Email:{" "}
              </span>
              <span className="text-wrapper-6">info@restaurantlocavore.com</span>
            </p>
          </div>
          <div className="button-book">
            <div className="book-here">BOOK HERE</div>
          </div>
          <div className="container-border">
            <div className="content-left">
              <div className="frame">
                <div className="title-2">
                  <img className="vector-2" alt="Vector" src="vector-5.png" />
                  <div className="text-wrapper-7">Dress Code</div>
                </div>
                <p className="body-5">
                  Lorem ipsum dolor sit amet, consectet elit. Proin nec massa viveraliquet dui ac, gravida magna. Lorem
                  ipsum dolor sit amet, consectet elit. Proin nec massa viverra, aliquet dui ac, gravida magna. Lorem
                  ipsum dolor sit amet, dolor sit amet consectetur adipiscing elit. Proin nec massa dolor viverra,
                  aliquet dui ac.
                </p>
              </div>
            </div>
            <div className="content-right">
              <div className="frame-2">
                <div className="title-3">
                  <img className="vector-3" alt="Vector" src="vector.png" />
                  <div className="text-wrapper-8">Dress Code</div>
                </div>
                <p className="body-6">
                  Lorem ipsum dolor sit amet, consectet elit. Proin nec massa viveraliquet dui ac, gravida magna. Lorem
                  ipsum dolor sit.
                </p>
              </div>
            </div>
            <div className="frame-wrapper">
              <div className="frame-3">
                <div className="title-4">
                  <img className="vector-4" alt="Vector" src="image.png" />
                  <div className="text-wrapper-9">Dress Code</div>
                </div>
                <p className="body-7">
                  Lorem ipsum dolor sit amet, consectet elit. Proin nec massa viveraliquet dui ac, gravida magna. Lorem
                  ipsum dolor sit amet, consectet elit. Proin nec massa viverra, aliquet dui ac, gravida magna. Lorem
                  ipsum dolor sit amet, dolor sit amet consectetur adipiscing elit. Proin nec massa dolor viverra,
                  aliquet dui ac.
                  <br />
                  <br />
                  Proin nec massa viverra, aliquet dui ac, gravida magna. Lorem ipsum dolor sit amet, dolor sit amet
                  consectetur adipiscing elit. Proin nec massa dolor viverra, aliquet dui ac.
                </p>
              </div>
            </div>
            <div className="div-wrapper">
              <div className="frame-4">
                <div className="title-5">
                  <img className="vector-5" alt="Vector" src="vector-2.png" />
                  <div className="text-wrapper-10">Dress Code</div>
                </div>
                <p className="body-8">
                  Lorem ipsum dolor sit amet, consectet elit. Proin nec massa viveraliquet dui ac, gravida magna. Lorem
                  ipsum dolor sit amet, consectet elit. Proin nec massa viverra, aliquet dui ac, gravida magna. Lorem
                  ipsum dolor sit amet, dolor sit amet consectetur adipiscing elit. Proin nec massa dolor viverra,
                  aliquet dui ac.
                </p>
              </div>
            </div>
            <div className="content-left-2">
              <div className="frame-5">
                <div className="title-6">
                  <img className="vector-6" alt="Vector" src="vector-3.png" />
                  <div className="text-wrapper-11">Dress Code</div>
                </div>
                <p className="body-9">
                  Lorem ipsum dolor sit amet, consectet elit. Proin nec massa viveraliquet dui ac, gravida magna. Lorem
                  ipsum dolor sit.
                </p>
              </div>
            </div>
          </div>
          <p className="what-are-you-waiting">
            What are you waiting for?
            <br />
            Come and visit us now!
          </p>
          <div className="book-here-wrapper">
            <div className="book-here-2">BOOK HERE</div>
          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="container-2">
          <div className="content-left-3">
            <div className="ubud">UBUD 15:46</div>
            <div className="form">
              <p className="sign-up-for-insights">
                <span className="text-wrapper-12">Sign up for</span>
                <span className="text-wrapper-13">&nbsp;</span>
                <span className="text-wrapper-14">insights</span>
                <span className="text-wrapper-15">&nbsp;</span>
                <span className="text-wrapper-16">in your inbox</span>
              </p>
              <div className="input-email">
                <div className="text-wrapper-17">EMAIL</div>
                <img className="vector-7" alt="Vector" src="vector-6.png" />
              </div>
            </div>
          </div>
          <img className="content-right-2" alt="Content right" src="content-right.png" />
        </div>
      </footer>
      {/* <div className="menu-bar">
        <div className="overlap-group">
          <div
            className="MENU-BUTTON"
            style={{
            //   backgroundImage: "url(button-bar.png)",
            }}
          >
            <div className="text-wrapper-18">NXT</div>
          </div>
          <div
            className="NXT-wrapper"
            style={{
            //   backgroundImage: "url(button-bar-2.png)",
            }}
          >
            <div className="NXT">MENU</div>
          </div>
          <div
            className="MENU-BUTTON-2"
            style={{
            //   backgroundImage: "url(button-bar-3.png)",
            }}
          >
            <div className="NXT-2">FACILITIES</div>
          </div>
          <div
            className="MENU-BUTTON-3"
            style={{
            //   backgroundImage: "url(button-bar-4.png)",
            }}
          >
            <div className="NXT-3">COLLABORATIONS</div>
          </div>
          <div
            className="MENU-BUTTON-4"
            style={{
            //   backgroundImage: "url(button-bar-5.png)",
            }}
          >
            <div className="NXT-4">EVENTS &amp; PROGRAMS</div>
          </div>
          <div
            className="p-wrapper"
            style={{
              backgroundImage: "url(button-bar-6.png)",
            }}
          >
            <p className="NXT-5">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;VISIT</p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Visit