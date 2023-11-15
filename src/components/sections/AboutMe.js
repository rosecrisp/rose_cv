import { Fragment } from "react";
const bio_ = ` <p>
<strong>Hello! I’m Rose Crisp.</strong>
As a Cloud Infrastructure Engineer with extensive experience in
 Kubernetes native application development and deployment,
 I am adept at hosting Learning Management Systems (LMS) solutions on the
 cloud and look forward to discussing how we can tailor these technologies to fit your unique ideas.
</p>`;
const AboutMe = ({ bio }) => {
  return (
    <Fragment>
      <div className="content about">
        {/* title */}
        <div className="title">
          <span className="first-word">About</span> Me
        </div>
        {/* content */}
        <div className="row">
          <div className="col col-d-6 col-t-6 col-m-12 border-line-v">
            <div
              className="text-box"
              dangerouslySetInnerHTML={{ __html: bio ? bio : bio_ }}
            ></div>
          </div>
          <div className="col col-d-6 col-t-6 col-m-12 border-line-v">
            <div className="info-list">
              <ul>
                <li>
                  <strong>Residence . . . . .</strong> North Carolina, USA
                </li>
                <li>
                  <strong>Freelance . . . . .</strong> Available
                </li>
              </ul>
            </div>
          </div>
          <div className="clear" />
        </div>
      </div>
    </Fragment>
  );
};
export default AboutMe;

// export const AboutMeClassic = () => {
//   return (
//     <div className="content about">
//       {/* title */}
//       <div className="title">About Me</div>
//       {/* content */}
//       <div className="row">
//         <div className="col col-d-12 col-t-12 col-m-12 border-line-v">
//           <div className="text-box">
//             <p>
//               I am RoseCrisp Adlard, web designer from USA, California. I have rich
//               experience in web site design and building and customization, also
//               I am good at wordpress. I love to talk with you about our unique.
//             </p>
//           </div>
//           <div className="info-list">
//             <ul>
//               <li>
//                 <strong>Age . . . . .</strong> 24
//               </li>
//               <li>
//                 <strong>Residence . . . . .</strong> USA
//               </li>
//               <li>
//                 <strong>Freelance . . . . .</strong> Available
//               </li>
//               <li>
//                 <strong>Address . . . . .</strong> California, USA
//               </li>
//             </ul>
//           </div>
//         </div>
//         <div className="clear" />
//       </div>
//     </div>
//   );
// };
