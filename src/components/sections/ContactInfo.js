const ContactInfo = () => {
  return (
    <div className="content contacts">
      {/* title */}
      <div className="title">Get in Touch</div>
      {/* content */}
      <div className="row">
        <div className="col col-d-12 col-t-12 col-m-12 border-line-v">
          <div className="map">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51696.96647167558!2d-79.08049045690157!3d35.92102147180119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89acc31c216e7ea7%3A0x7f03bae00443e4cb!2sChapel%20Hill%2C%20NC!5e0!3m2!1sen!2sus!4v1699158952305!5m2!1sen!2sus" width="600" height="450" style="border:0;"
              style={{ border: 0, width: "100%", height: "100%" }}
              allowFullScreen=""
              loading="lazy"
            />
          </div>
          <div className="info-list">
            <ul>
              <li>
                <strong>Address . . . . .</strong> North Carolina, USA
              </li>
              <li>
                <strong>Email . . . . .</strong> rose.crisp.info@gmail.com
              </li>
              <li>
                <strong>Phone . . . . .</strong> +1 919 360 1189
              </li>
            </ul>
          </div>
        </div>
        <div className="clear" />
      </div>
    </div>
  );
};
export default ContactInfo;
