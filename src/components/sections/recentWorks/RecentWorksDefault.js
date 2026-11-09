import Isotope from "isotope-layout";
import { Fragment, useEffect, useRef, useState } from "react";

const talks = [
  {
    year: "2025",
    title: "Zero to GitOps: Automating RAG Workloads with Backstage Templates",
    event: "DevConf.US (Boston)",
    href: "https://pretalx.devconf.info/devconf-us-2025/talk/XD9U37/",
  },
  {
    year: "2024",
    title: "Developing your Level 5 Operator in 75 Minutes",
    event: "DevConf.CZ (Brno)",
    href: "https://pretalx.com/devconf-cz-2024/talk/YE8FEJ/",
  },
  {
    year: "2024",
    title: "Simplifying Cloud Deployments with Ansible for React Next.js on AWS EC2",
    event: "Config Management Camp (Ghent)",
    href: "https://cfp.cfgmgmtcamp.org/2024/talk/TZ7KSB/",
    slidesPdf:
      "https://github.com/rocrisp/blogs/blob/main/CfgMgmtCampGhent2024Ansibleautomationpresentation.pdf",
  },
  {
    year: "2023",
    title: "Unlocking the Power of Kubernetes: Create Your Own Resources with CRDs",
    event: "PlatformCon",
    href: "https://2023.platformcon.com/talks/unlocking-the-power-of-kubernetes-create-your-own-resources-with-crds",
  },
  {
    year: "2023",
    title: "Unlocking the Power of Kubernetes: Create Your Own Resources with CRDs",
    event: "DeveloperWeek Europe",
    href: "https://developerweekeurope2023.sched.com/event/1Kz5A/open-talk-unlocking-the-power-of-kubernetes-create-your-own-resources-with-crds",
  },
  {
    year: "2023",
    title: "Unlocking the Power of Kubernetes: Create Your Own Resources with CRDs",
    event: "WomenTech Global Conference",
    href: "https://www.womentech.net/video/unlocking-power-kubernetes-create-your-own-resources-crds",
  },
  {
    year: "2023",
    title: "Create Your Own Resources with CRDs",
    event: "THAT Conference",
    href: null,
    slidesPdf: "https://github.com/rocrisp/blogs/blob/main/ThatConference.pdf",
  },
  {
    year: "2022",
    title: "From Zero to Auto Pilot: Exploring Kubernetes Operator Capability Levels",
    event: "Cloud Native Rejekts EU (Valencia)",
    href: "https://cfp.cloud-native.rejekts.io/cloud-native-rejekts-eu-valencia-2022/talk/D7ZXTG/",
  },
];

const talkTileStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: 150,
  background: "#2f6b36",
  color: "#fff",
  fontWeight: 600,
  fontSize: 14,
  textAlign: "center",
  padding: "12px 16px",
  lineHeight: 1.35,
};

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
          <div
            className={`f_btn ${activeBtn("talks")}`}
            onClick={handleFilterKeyChange("talks")}
          >
            <label>
              <input type="radio" name="fl_radio" defaultValue="talks" />
              Talks
            </label>
          </div>
        </div>
        {/* content */}
        <div className="row grid-items border-line-v">
          {/* work item photo */}
          <div className="col col-d-6 col-t-6 col-m-12 grid-item photo border-line-h">
            <div className="box-item">
              <div className="image">
                <a href="https://carrotandthestick.williamputsis.com/">
                  <img
                    src="images/works/carrotandthestick.jpg"
                    alt=""
                    style={{ width: "auto", height: "150px", objectFit: "cover" }}
                  />
                </a>
              </div>
              <div className="desc">
                <p>
                  <a
                    href="https://carrotandthestick.williamputsis.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    'The Carrot and the Stick'
                  </a>
                  {" "}
                  is deployed on AWS EC2 instances, leveraging the Open edX framework and is a containerized application.
                </p>
                <div className="category">LMS</div>
              </div>
            </div>
          </div>
          {talks.map((talk) => {
            const image = (
              <div className="image">
                {talk.href ? (
                  <a href={talk.href} target="_blank" rel="noopener noreferrer">
                    <div style={talkTileStyle}>{talk.event}</div>
                  </a>
                ) : (
                  <div style={talkTileStyle}>{talk.event}</div>
                )}
              </div>
            );
            return (
            <div
              className="col col-d-6 col-t-6 col-m-12 grid-item talks border-line-h"
              key={`${talk.event}-${talk.year}-${talk.title}`}
            >
              <div className="box-item">
                {image}
                <div className="desc">
                  <p>
                    <b>
                      {talk.year} · {talk.event}
                    </b>
                  </p>
                  <p>
                    {talk.href ? (
                      <a
                        href={talk.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="name"
                      >
                        {talk.title}
                      </a>
                    ) : (
                      <span className="name">{talk.title}</span>
                    )}
                  </p>
                  {talk.slidesPdf ? (
                    <p>
                      <a
                        href={talk.slidesPdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="works-slides-download"
                      >
                        Download slides
                      </a>
                    </p>
                  ) : null}
                  <div className="category">Talks</div>
                </div>
              </div>
            </div>
            );
          })}
          <div className="clear" />
        </div>
      </div>
    </Fragment>
  );
};
export default RecentWorksDefault;
