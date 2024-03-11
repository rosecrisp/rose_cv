import Isotope from "isotope-layout";
import { Fragment, useEffect, useRef, useState } from "react";
const RecentWorksDefault = () => {
  // Isotope
  const isotope = useRef();
  const [filterKey, setFilterKey] = useState("*");
  useEffect(() => {
    setTimeout(() => {
      isotope.current = new Isotope(".grid-items", {
        itemSelector: ".grid-item",
        //    layoutMode: "fitRows",
        percentPosition: true,
        masonry: {
          columnWidth: ".grid-item",
        },
        animationOptions: {
          duration: 750,
          easing: "linear",
          queue: false,
        },
      });
    }, 1000);
    //     return () => isotope.current.destroy();
  }, []);
  useEffect(() => {
    if (isotope.current) {
      filterKey === "*"
        ? isotope.current.arrange({ filter: `*` })
        : isotope.current.arrange({ filter: `.${filterKey}` });
    }
  }, [filterKey]);
  const handleFilterKeyChange = (key) => () => {
    setFilterKey(key);
  };
  const activeBtn = (value) => (value === filterKey ? "active" : "");

  return (
    <Fragment>
      <div className="content works">
        {/* title */}
        <div className="title">Recent Works</div>
        {/* filters */}
        <div className="filter-menu filter-button-group">
          <div
            className={`f_btn ${activeBtn("*")}`}
            onClick={handleFilterKeyChange("*")}
          >
            <label>
              <input type="radio" name="fl_radio" defaultValue="grid-item" />
              All
            </label>
          </div>
          <div
            className={`f_btn ${activeBtn("photo")}`}
            onClick={handleFilterKeyChange("photo")}
          >
            <label>
              <input type="radio" name="fl_radio" defaultValue="photo" />
              LMS
            </label>
          </div>
          {/* <div
            className={`f_btn ${activeBtn("gallery")}`}
            onClick={handleFilterKeyChange("gallery")}
          >
            <label>
              <input type="radio" name="fl_radio" defaultValue="gallery" />
              Github
            </label>
          </div> */}
          <div
            className={`f_btn ${activeBtn("video")}`}
            onClick={handleFilterKeyChange("video")}
          >
            <label>
              <input type="radio" name="fl_radio" defaultValue="video" />
              Presentations
            </label>
          </div>
          
        </div>
        {/* content */}
        <div className="row grid-items border-line-v">
          {/* work item photo */}
          <div className="col col-d-6 col-t-6 col-m-12 grid-item photo border-line-h">
          {/* <div className="col col-d-6 col-t-6 col-m-12 grid-item photo border-line-h"> */}
            <div className="box-item">
              <div className="image">
                <a href="https://carrotandthestick.williamputsis.com/">
                  <img src="images/works/carrotandthestick.jpg" alt="" style={{ width: 'auto', height: '150px', objectFit: 'cover' }} />
                  {/* <span className="info">
                    <span className="ion ion-image" />
                  </span> */}
                </a>
              </div>
              <div className="desc">
                <p><a href="https://carrotandthestick.williamputsis.com/" target="_blank">
                  'The Carrot and the Stick'</a> is deployed on AWS EC2 instances,
                  leveraging the Open edX framework and is a containerized application.</p>
                <div className="category">LMS</div>
              </div>
            </div>
          </div>
    
          <div className="col col-d-6 col-t-6 col-m-12 grid-item video border-line-h">
            <div className="box-item">
              <div className="desc">
                <p><b>THAT Conference 2023</b></p>
                <p>Unlocking the Power of Kubernetes: Create Your Own Resources with CRDs</p>
                <a
                  href="https://github.com/rocrisp/blogs/blob/main/ThatConference.pdf"
                  className="name has-popup-video"
                >
                  Download PDF
                </a>
                <div className="category">Presentation</div>
              </div>
            </div>
          </div>

          <div className="col col-d-6 col-t-6 col-m-12 grid-item video border-line-h">
            <div className="box-item">
              <div className="desc">
                <p><b>Config Management Camp 2024 Ghent</b></p>
                <p>Simplifying Cloud Deployments with Ansible for React Next.js on AWS EC2</p>
                <a
                  href="https://github.com/rocrisp/blogs/blob/main/CfgMgmtCampGhent2024Ansibleautomationpresentation.pdf"
                  className="name has-popup-video"
                >
                  Download PDF
                </a>
                <div className="category">Presentation</div>
              </div>
            </div>
          </div>
          
          <div className="clear" />
        </div>
      </div>
    </Fragment>
  );
};
export default RecentWorksDefault;
