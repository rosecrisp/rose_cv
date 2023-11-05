import { Fragment } from "react";
const Quote = () => {
  return (
    <Fragment>
      <div className="content quote">
        {/* title */}
        <div className="title">
          <span>Quote</span>
        </div>
        {/* content */}
        <div className="row">
          <div className="col col-d-12 col-t-12 col-m-12 border-line-v">
            <div className="revs-item">
              <div className="text">
                <div>
                Change is the law of life. And those who look only to the past or the present are certain to miss the future., President John F. Kennedy.
                </div>
              </div>
              <div className="user">
                <div className="img">
                  <img src="images/logo.png" alt="RoseCrisp Adlard" />
                </div>
                <div className="info">
                  <div className="name">Rose Crisp</div>
                  <div className="company">wwww.aprendeconsulting.com</div>
                </div>
                <div className="clear" />
              </div>
            </div>
          </div>
          <div className="clear" />
        </div>
      </div>
    </Fragment>
  );
};
export default Quote;
