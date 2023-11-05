import { Fragment, useContext } from "react";
import Context from "../../context/context";

const BlogSection = () => {
  const { changeNav } = useContext(Context);
  return (
    <Fragment>
      <div className="content blog">
        {/* title */}
        <div className="title">
          <span>Blog</span>
        </div>
        {/* content */}
        <div className="row border-line-v">
          {/* blog item */}
          <div className="col col-d-6 col-t-6 col-m-12">
            <div className="box-item">
              {/* <div className="image">
                <a href="#" onClick={() => changeNav("blog-post")}>
                  <img
                    src="images/blog/blog1.jpg"
                    alt="What is an Operator?"
                  />
                  <span className="info">
                    <span className="ion ion-document-text" />
                  </span>
                </a>
              </div> */}
              <div className="desc">
                {/* <a href="#" onClick={() => changeNav("blog-post")}>
                  <span className="date">April 28, 2020</span>
                </a> */}
                <a href="https://github.com/rocrisp/blogs/blob/main/Operator101.md" className="name" target="_blank" rel="noopener noreferrer">
                   Operator 101: What is an Operator?
                </a>
                <div className="text">
                  <p>
                    In the context of Kubernetes, an Operator is a method of
                    packaging, deploying, and managing a Kubernetes-native application.
                    Operators leverage Custom Controllers and Custom Resource Definitions
                    (CRDs) to extend Kubernetes functionality and define application-specific behavior.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* blog item */}
          <div className="col col-d-6 col-t-6 col-m-12">
            <div className="box-item">
              {/* <div className="image">
                <a href="#" onClick={() => changeNav("blog-post")}>
                  <img
                    src="images/blog/blog2.jpg"
                    alt="By spite about do of allow"
                  />
                  <span className="info">
                    <span className="ion ion-document-text" />
                  </span>
                </a>
              </div> */}
              <div className="desc">
                {/* <a href="#" onClick={() => changeNav("blog-post")}>
                  <span className="date">April 28, 2020</span>
                </a> */}
                {/* <a
                  href="#"
                  onClick={() => changeNav("blog-post")}
                  className="name"
                > */}
                <a href="https://github.com/rocrisp/blogs/blob/main/l5-operator.md" className="name" target="_blank" rel="noopener noreferrer">
                A Deep Dive into Level 5 Auto-Pilot Kubernetes Operators
                </a>
                <div className="text">
                  <p>
                  In this blog post, we will explore the inner workings of the l5-operator, a Kubernetes operator that manages the lifecycle of Bestie resources.
                  We'll delve into its architecture, key components, and the core logic behind its operations.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* blog item */}
          <div className="col col-d-6 col-t-6 col-m-12">
            <div className="box-item">
              {/* <div className="image">
                <a href="#" onClick={() => changeNav("blog-post")}>
                  <img
                    src="images/blog/blog3.jpg"
                    alt="By spite about do of allow"
                  />
                  <span className="info">
                    <span className="ion ion-document-text" />
                  </span>
                </a>
              </div> */}
              <div className="desc">
                {/* <a href="#" onClick={() => changeNav("blog-post")}>
                  <span className="date">April 28, 2020</span>
                </a> */}
                <a href="https://cloud.redhat.com/blog/streamlining-enterprise-application-deployment-with-the-eap-operator-a-beginners-guide" className="name" target="_blank" rel="noopener noreferrer">
                Streamlining Enterprise Application Deployment with the EAP Operator: A Beginner's Guide
                </a>
                <div className="text">
                  <p>
                  In this article, we'll highlight the benefits of the JBoss Enterprise Application Platform and provide a detailed step-by-step guide on deploying and managing it effortlessly on OpenShift using the EAP Operator.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* blog item */}
          <div className="col col-d-6 col-t-6 col-m-12">
            <div className="box-item">
              {/* <div className="image">
                <a href="#" onClick={() => changeNav("blog-post")}>
                  <img
                    src="images/blog/blog1.jpg"
                    alt="By spite about do of allow"
                  />
                  <span className="info">
                    <span className="ion ion-document-text" />
                  </span>
                </a>
              </div> */}
              <div className="desc">
                {/* <a href="#" onClick={() => changeNav("blog-post")}>
                  <span className="date">April 28, 2020</span>
                </a> */}
                <a href="https://medium.com/step-by-step-install-open-edx-platform-on-red-hat/step-by-step-guide-how-to-install-open-edx-platform-on-red-hat-openshift-container-platform-7eaca4dcd8a2" className="name" target="_blank" rel="noopener noreferrer">
                
                  Step by step guide : How to install Open edX Platform on Red Hat Openshift Container Platform.
                </a>
                <div className="text">
                  <p>
                    In this blog, we will explore the process of installing Open edX on Red Hat Openshift Container Platform..
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="clear" />
        </div>
        <div className="pager">
          <nav className="navigation pagination">
            <div className="nav-links">
              <span className="page-numbers current">1</span>
              {/* <a className="page-numbers" href="#">
                2
              </a>
              <a className="next page-numbers" href="#">
                Next
              </a> */}
            </div>
          </nav>
        </div>
      </div>
    </Fragment>
  );
};
export default BlogSection;

export const BlogClassic = () => {
  const { changeNav } = useContext(Context);
  return (
    <Fragment>
      <div className="content blog">
        {/* title */}
        <div className="title">Latest Posts</div>
        {/* content */}
        <div className="row border-line-v">
          {/* blog item */}
          <div className="col col-d-12 col-t-12 col-m-12 border-line-h">
            <div className="box-item">
              <div className="image">
                <a href="#" onClick={() => changeNav("blog-post")}>
                  <img src="images/blog/blog1.jpg" alt="" />
                  <span className="info">
                    <span className="ion ion-document-text" />
                  </span>
                  <span className="date">
                    <strong>20</strong>Jun
                  </span>
                </a>
              </div>
              <div className="desc">
                <a
                  href="#"
                  onClick={() => changeNav("blog-post")}
                  className="name"
                >
                  By spite about do of do allow blush
                </a>
                <div className="category">Design</div>
              </div>
            </div>
          </div>
          {/* blog item */}
          <div className="col col-d-12 col-t-12 col-m-12 border-line-h">
            <div className="box-item">
              <div className="image">
                <a href="#" onClick={() => changeNav("blog-post")}>
                  <img src="images/blog/blog2.jpg" alt="" />
                  <span className="info">
                    <span className="ion ion-document-text" />
                  </span>
                  <span className="date">
                    <strong>19</strong>Jun
                  </span>
                </a>
              </div>
              <div className="desc">
                <a
                  href="#"
                  onClick={() => changeNav("blog-post")}
                  className="name"
                >
                  Two Before Arrow Not Relied
                </a>
                <div className="category">Coding</div>
              </div>
            </div>
          </div>
          {/* blog item */}
          <div className="col col-d-12 col-t-12 col-m-12 border-line-h">
            <div className="box-item">
              <div className="image">
                <a href="#" onClick={() => changeNav("blog-post")}>
                  <img src="images/blog/blog3.jpg" alt="" />
                  <span className="info">
                    <span className="ion ion-document-text" />
                  </span>
                  <span className="date">
                    <strong>20</strong>Jun
                  </span>
                </a>
              </div>
              <div className="desc">
                <a
                  href="#"
                  onClick={() => changeNav("blog-post")}
                  className="name"
                >
                  By spite about do of do allow blush
                </a>
                <div className="category">Travel</div>
              </div>
            </div>
          </div>
          <div className="clear" />
        </div>
      </div>
    </Fragment>
  );
};
