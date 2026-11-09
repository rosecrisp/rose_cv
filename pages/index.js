import dynamic from "next/dynamic";
import Head from "next/head";
import About from "../src/components/About";
import Blog from "../src/components/Blog";
import Contact from "../src/components/Contact";
import Home from "../src/components/Home";
import Resume from "../src/components/Resume";
import AboutMe from "../src/components/sections/AboutMe";
import BlogSection from "../src/components/sections/Blog";
import Clients from "../src/components/sections/Clients";
import ContactForm from "../src/components/sections/ContactForm";
import ContactInfo from "../src/components/sections/ContactInfo";
import FunFact from "../src/components/sections/FunFact";
import Pricing from "../src/components/sections/Pricing";
import SiteCredit from "../src/components/sections/SiteCredit";
import Quote from "../src/components/sections/Quote";
import ResumeSection from "../src/components/sections/Resume";
import Services from "../src/components/sections/Services";
import Skills from "../src/components/sections/Skills";
import Testimonials from "../src/components/sections/Testimonials";
import TypingAnimation from "../src/components/TypingAnimation";
import Work from "../src/components/Work";
import ContentContainer from "../src/layout/ContentContainer";
import Header from "../src/layout/Header";
import Layout from "../src/layout/Layout";
const RecentWorks = dynamic(
  () => import("../src/components/sections/RecentWorks"),
  {
    ssr: false,
  }
);

const bio = `<p>
<strong>Hello! I’m Rose Crisp.</strong>
</p></br>
<p>
I’m an engineer-educator with 25+ years in software and infrastructure automation, including 6 years at Red Hat building, validating, and teaching cloud-native and AI platforms.
</p></br>
<p>
I stand up GPU-backed AI stacks on Kubernetes and OpenShift, from vLLM inference on OpenShift AI to RAG and agent apps, and automate them with Go operators, Helm, and GitOps.
</p></br>
<p>
Then I turn working deployments into hands-on workshops, demos, and conference talks.
</p></br>`;

const services = [
  {
    icon: "fa fa-html5",
    title: "Front-end",
    desc: "Modern and mobile-ready website that will help you reach all of your marketing.",
  },
  {
    icon: "fa fa-code",
    title: "Back-End",
    desc: "UI/UX focus on the user, frontend focus on the settings of the user, and backend focus on the data.",
  },
  {
    icon: "fa fa-wordpress",
    title: "WordPress Development",
    desc: "WordPress development services improve business websites.",
  },
  {
    icon: "fa fa-server",
    title: "WordPress Security",
    desc: "Security consultants can check the code and scan for vulnerabilities.",
  },
];

const animationText = [
  "Senior Engineer & Technical Educator",
  "AI Infrastructure on Kubernetes",
];

const Index3 = () => {
  return (
    <Layout bg={"gradient"}>
      <Head>
        <link rel="stylesheet" href="css/new-skin/new-skin.css" />
        <link rel="stylesheet" href="css/demos/demo-3-colors.css" />
        <link rel="stylesheet" href="css/new-skin/classic-skin.css" />
      </Head>
      <Header noSideBarBtn animationText={animationText} />
      <Home>
        <div className="profile no-photo">
          {/* profile image */}
          <div
            className="slide"
            style={{ backgroundImage: "url(images/roseheadshot.jpg)" }}
          />
          {/* profile titles */}
          <div className="title">Rose Crisp</div>

          <TypingAnimation data={animationText} />
          {/* profile socials */}
          <div className="social">
            <a target="_blank" rel="noreferrer" href="https://github.com/rocrisp">
              <span className="fa fa-github" />
            </a>
            <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/rosecrisp">
              <span className="fa fa-linkedin" />
            </a>
          </div>
          {/* profile buttons */}
          <div className="lnks">
            <a href="/doc/RoseCrisp_cv.pdf" className="lnk" download>
              <span className="text">Download CV</span>
              <span className="ion ion-android-download" />
            </a>
          </div>
          <SiteCredit />
        </div>
      </Home>
      <ContentContainer>
        <Resume>
          <ResumeSection />
          <Skills />
          <Quote />
        </Resume>
        <Blog>
          <BlogSection />
        </Blog>
        <Work>
          <RecentWorks />
        </Work>
        <About>
          <AboutMe bio={bio} />
        </About>
        <Contact>
          <ContactInfo />
          <ContactForm />
        </Contact>
      </ContentContainer>
    </Layout>
  );
};
export default Index3;
