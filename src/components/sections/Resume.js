import { Fragment, useState } from "react";
const jobs = [
  {
    date: "02/2020 - Present",
    title: "Senior Software Engineer",
    company: "Red Hat, Raleigh, NC",
    lead: "Senior Software Engineer and Educator; partner engineering for OpenShift.",
    bullets: [
      "Design and deploy proof-of-concept AI workloads on OpenShift, including GPU-backed RAG chatbots and LLM serving with KServe and vLLM on OpenShift AI.",
      "Partner with ISVs to get their applications certified and listed in the Red Hat Ecosystem Catalog, from the first proof of concept through certification.",
      "Maintain and run the Red Hat Best Practices for Kubernetes test suite (certsuite), adding new test cases and validating 50+ partner operators on every new OpenShift release, then alerting stakeholders when an operator doesn't pass certification.",
      "Lead Red Hat's Kubernetes Operator Framework workshops, training partners to build, package, and certify operators.",
      "Built a Red Hat Developer Hub (Backstage) golden-path template that automates GitOps repo scaffolding, Argo CD, and Helm deployments for GPU-backed RAG workloads, turning a multi-team manual setup into a self-service flow (DevConf.US 2025).",
    ],
  },
  {
    date: "04/2019 - 12/2019",
    title: "Senior Software Developer",
    company: "SAS Institute Inc., Cary, NC",
    bullets: [
      "Built infrastructure automation with Ansible, Terraform, Bash, HashiCorp Vault, and OpenStack, and CI/CD pipelines in Jenkins and GitLab with automated tests and security scans.",
      "Containerized application deployments on Kubernetes and Docker, managed with Helm charts.",
    ],
  },
  {
    date: "05/2015 - 04/2019",
    title: "Senior Software Developer",
    company: "SAS Institute Inc., Cary, NC",
    bullets: [
      "Automated the SAS software escrow process with Jenkins, Perl, Bash, and MySQL, increasing production by 400%.",
      "Managed 600+ N+1 software feature releases per year, from infrastructure setup to delivery.",
    ],
  },
  {
    date: "06/1994 - 05/2015",
    title: "Earlier roles",
    company: "SAS Institute Inc., Cary, NC",
    bullets: [
      "Software Developer, Source Management",
      "Software Tester, Source Management",
      "Associate Systems Administrator (1996-1997)",
      "Technical Student (1994-1996)",
    ],
  },
];

/* Bold through "(certsuite)" when present; otherwise the opening sentence, first early comma, or first ~3 words. Wording unchanged. */
const splitBulletLead = (text) => {
  const certsuite = text.match(/^(.+?\(certsuite\))(,\s*[\s\S]*)$/);
  if (certsuite) return [certsuite[1], certsuite[2]];
  const sentence = text.match(/^(.{20,120}?\.)\s+(\S[\s\S]*)$/);
  if (sentence) return [sentence[1], " " + sentence[2]];
  const comma = text.indexOf(",");
  if (comma > 8 && comma < 48) {
    return [text.slice(0, comma), text.slice(comma)];
  }
  const m = text.match(/^(\S+(?:\s+\S+){0,2})([\s\S]*)$/);
  if (m) return [m[1], m[2] || ""];
  return [text, ""];
};

const JobItem = ({ job, index, open, onToggle, last }) => {
  const id = `job-${index}`;
  return (
    <div
      className={`resume-item job-accordion${last ? "" : " border-line-h"}${
        open ? " active is-open" : ""
      }`}
    >
      <h3 className="job-accordion-heading">
        <button
          type="button"
          className="job-accordion-toggle"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-button`}
          onClick={onToggle}
        >
          <span className="job-accordion-text">
            <span className="date">{job.date}</span>
            <span className="name">{job.title}</span>
            <span className="company">{job.company}</span>
          </span>
          <span className="job-accordion-chevron fa fa-chevron-down" aria-hidden="true" />
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-button`}
        className="job-accordion-panel"
        aria-hidden={!open}
      >
        <div className="job-accordion-inner">
          {job.lead && (
            <p className="job-lead">
              <em>{job.lead}</em>
            </p>
          )}
          <ul className="job-bullets">
            {job.bullets.map((b) => {
              const [leadPhrase, rest] = splitBulletLead(b);
              return (
                <li key={b} className="job-bullet">
                  <span className="job-bullet-marker" aria-hidden="true" />
                  <span className="job-bullet-text">
                    <strong className="job-bullet-lead">{leadPhrase}</strong>
                    {rest}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

const ResumeSection = () => {
  // Current job (index 0) open by default; the rest start collapsed.
  const [openJobs, setOpenJobs] = useState([0]);
  const toggle = (i) =>
    setOpenJobs((cur) => (cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i]));
  return (
    <Fragment>
      <div className="content resume">
        {/* title */}
        <div className="title">Resume</div>
        {/* content */}
        <div className="row resume-split">
          {/* experience: header stays, job list scrolls on its own (desktop) */}
          <div className="col col-d-6 col-t-6 col-m-12 border-line-v">
            <div className="resume-title border-line-h">
              <div className="icon">
                <i className="fa fa-briefcase" />
              </div>
              <div className="name">Experience</div>
            </div>
            <div className="resume-pane" tabIndex={0} aria-label="Experience (scrollable)">
            <div className="resume-items exp-job-cards">
              {jobs.map((job, i) => (
                <JobItem
                  key={job.date}
                  job={job}
                  index={i}
                  open={openJobs.includes(i)}
                  onToggle={() => toggle(i)}
                  last={i === jobs.length - 1}
                />
              ))}
            </div>
            </div>
          </div>
          {/* talks + education: its own pane, does not move when Experience scrolls */}
          <div className="col col-d-6 col-t-6 col-m-12 border-line-v">
            <div className="resume-pane talks-edu-pane" tabIndex={0} aria-label="Talks and education (scrollable)" data-ux-pane="talks-edu">
            <div className="resume-title border-line-h sticky-section-title">
              <div className="icon">
                <i className="fa fa-microphone" />
              </div>
              <div className="name">Talks &amp; Workshops</div>
            </div>
            <div className="resume-items talk-cards">
              <div className="resume-item border-line-h active">
                <div className="date">2025</div>
                <div className="name talk-title">
                  <a href="https://pretalx.devconf.info/devconf-us-2025/talk/XD9U37/" target="_blank" rel="noopener noreferrer">Zero to GitOps: Automating RAG Workloads with Backstage Templates</a>
                </div>
                <div className="company">DevConf.US (Boston)</div>
              </div>
              <div className="resume-item border-line-h">
                <div className="date">2024</div>
                <div className="name talk-title">
                  <a href="https://pretalx.com/devconf-cz-2024/talk/YE8FEJ/" target="_blank" rel="noopener noreferrer">Developing your Level 5 Operator in 75 Minutes</a>
                </div>
                <div className="company">DevConf.CZ (Brno) — workshop, co-lead with Yuri Oliveira Sa and Matthias Goerens</div>
              </div>
              <div className="resume-item border-line-h">
                <div className="date">2024</div>
                <div className="name talk-title">
                  <a href="https://cfp.cfgmgmtcamp.org/2024/talk/TZ7KSB/" target="_blank" rel="noopener noreferrer">Simplifying Cloud Deployments with Ansible for React Next.js on AWS EC2</a>
                </div>
                <div className="company">Config Management Camp (Ghent) — with Sid Kattoju</div>
              </div>
              <div className="resume-item border-line-h">
                <div className="date">2023</div>
                <div className="name talk-title">
                  <a href="https://2023.platformcon.com/talks/unlocking-the-power-of-kubernetes-create-your-own-resources-with-crds" target="_blank" rel="noopener noreferrer">Unlocking the Power of Kubernetes: Create Your Own Resources with CRDs</a>
                </div>
                <div className="company">PlatformCon</div>
              </div>
              <div className="resume-item border-line-h">
                <div className="date">2023</div>
                <div className="name talk-title">
                  <a href="https://developerweekeurope2023.sched.com/event/1Kz5A/open-talk-unlocking-the-power-of-kubernetes-create-your-own-resources-with-crds" target="_blank" rel="noopener noreferrer">Unlocking the Power of Kubernetes: Create Your Own Resources with CRDs</a>
                </div>
                <div className="company">DeveloperWeek Europe</div>
              </div>
              <div className="resume-item border-line-h">
                <div className="date">2023</div>
                <div className="name talk-title">
                  <a href="https://www.womentech.net/video/unlocking-power-kubernetes-create-your-own-resources-crds" target="_blank" rel="noopener noreferrer">Unlocking the Power of Kubernetes: Create Your Own Resources with CRDs</a>
                </div>
                <div className="company">WomenTech Global Conference</div>
              </div>
              <div className="resume-item border-line-h">
                <div className="date">2023</div>
                <div className="name talk-title">Create Your Own Resources with CRDs</div>
                <div className="company">THAT Conference</div>
              </div>
              <div className="resume-item">
                <div className="date">2022</div>
                <div className="name talk-title">
                  <a href="https://cfp.cloud-native.rejekts.io/cloud-native-rejekts-eu-valencia-2022/talk/D7ZXTG/" target="_blank" rel="noopener noreferrer">From Zero to Auto Pilot: Exploring Kubernetes Operator Capability Levels</a>
                </div>
                <div className="company">Cloud Native Rejekts EU (Valencia) — with Sid Kattoju, Yuri Oliveira Sa, Manna Kong, and Soundharya Pabba</div>
              </div>
            </div>
            <div className="resume-title border-line-h sticky-section-title">
              <div className="icon">
                <i className="fa fa-university" />
              </div>
              <div className="name">Education</div>
            </div>
            <div className="resume-items edu-cards">
              <div className="resume-item border-line-h active">
                <div className="date">1989 - 1992</div>
                <div className="name">North Carolina State University</div>
                <div className="company">Raleigh, NC</div>
                <p>Computer Science coursework toward a B.S. (127 credits completed)</p>
              </div>
            </div>
            </div>
          </div>
          <div className="clear" />
        </div>
      </div>
    </Fragment>
  );
};
export default ResumeSection;

export const ResumeSectionFitness = () => {
  return (
    <div className="content resume">
      {/* title */}
      <div className="title">
        <div className="first-letter">Resume</div>
      </div>
      {/* content */}
      <div className="row">
        {/* experience */}
        <div className="col col-d-6 col-t-6 col-m-12 border-line-v">
          <div className="resume-title border-line-h">
            <div className="icon">
              <i className="fa fa-briefcase" />
            </div>
            <div className="name">Experience</div>
          </div>
          <div className="resume-items">
            <div className="resume-item border-line-h active">
              <div className="date">2013 - Present</div>
              <div className="name">Fitness Trainer</div>
              <div className="company">Gym Club</div>
              <p>
                Inspired clients to push their hardest and do their very best.
              </p>
            </div>
            <div className="resume-item border-line-h">
              <div className="date">2011 - 2012</div>
              <div className="name">Cardio Trainer</div>
              <div className="company">High-Intensity Complex</div>
              <p>
                Dynamic sculpting exercises for the perfect balance of cardio
                and strength training.
              </p>
            </div>
          </div>
        </div>
        {/* education */}
        <div className="col col-d-6 col-t-6 col-m-12 border-line-v">
          <div className="resume-title border-line-h">
            <div className="icon">
              <i className="fa fa-university" />
            </div>
            <div className="name">Education</div>
          </div>
          <div className="resume-items">
            <div className="resume-item border-line-h">
              <div className="date">2006 - 2008</div>
              <div className="name">Pace University</div>
              <div className="company">New York</div>
              <p>
                Pace University is a private university with its main campus in
                New York City.
              </p>
            </div>
            <div className="resume-item border-line-h">
              <div className="date">2005 - 2006</div>
              <div className="name">Fitness Course</div>
              <div className="company">London</div>
              <p>Personal trainer and fitness instructor courses in London.</p>
            </div>
          </div>
        </div>
        <div className="clear" />
      </div>
    </div>
  );
};
export const ResumeSectionLawyer = () => {
  return (
    <div className="content resume">
      {/* title */}
      <div className="title">Resume</div>
      {/* content */}
      <div className="row">
        {/* experience */}
        <div className="col col-d-6 col-t-6 col-m-12 border-line-v">
          <div className="resume-title border-line-h">
            <div className="icon">
              <i className="fa fa-briefcase" />
            </div>
            <div className="name">Experience</div>
          </div>
          <div className="resume-items">
            <div className="resume-item border-line-h active">
              <div className="date">2013 - Present</div>
              <div className="name">Law Director</div>
              <div className="company">Facebook Inc.</div>
              <p>
                Head of the Law Department which represents and advises the City
                in all civil.
              </p>
            </div>
            <div className="resume-item border-line-h">
              <div className="date">2011 - 2012</div>
              <div className="name">Lawyer Leader</div>
              <div className="company">Google Inc.</div>
              <p>
                Was part of a client focused organisation that makes a
                difference.
              </p>
            </div>
            <div className="resume-item">
              <div className="date">2009 - 2010</div>
              <div className="name">Junior Lawyer</div>
              <div className="company">ABC Inc.</div>
              <p>
                A fast-growing international pharmaceutical services company.
              </p>
            </div>
          </div>
        </div>
        {/* education */}
        <div className="col col-d-6 col-t-6 col-m-12 border-line-v">
          <div className="resume-title border-line-h">
            <div className="icon">
              <i className="fa fa-university" />
            </div>
            <div className="name">Education</div>
          </div>
          <div className="resume-items">
            <div className="resume-item border-line-h">
              <div className="date">2006 - 2008</div>
              <div className="name">Law University</div>
              <div className="company">London</div>
              <p>
                {`Gray's`} Inn, 4 {`Gray's`} Inn Place, Warwick Ct
              </p>
            </div>
            <div className="resume-item border-line-h">
              <div className="date">2005 - 2006</div>
              <div className="name">Law Schools</div>
              <div className="company">London</div>
              <p>
                The Law School of English has over 50 years experience teaching
                general.
              </p>
            </div>
            <div className="resume-item">
              <div className="date">2004 - 2005</div>
              <div className="name">London School</div>
              <div className="company">London</div>
              <p>
                The London School of English has over 100 years experience
                teaching general.
              </p>
            </div>
          </div>
        </div>
        <div className="clear" />
      </div>
    </div>
  );
};
export const ResumeSectionWritter = () => {
  return (
    <div className="content resume">
      {/* title */}
      <div className="title">Resume</div>
      {/* content */}
      <div className="row">
        {/* experience */}
        <div className="col col-d-6 col-t-6 col-m-12 border-line-v">
          <div className="resume-title border-line-h">
            <div className="icon">
              <i className="fa fa-briefcase" />
            </div>
            <div className="name">Experience</div>
          </div>
          <div className="resume-items">
            <div className="resume-item border-line-h active">
              <div className="date">2013 - Present</div>
              <div className="name">Writer Director</div>
              <div className="company">DBBooks</div>
              <p>
                Collaborate with creative and development teams on the execution
                of ideas.
              </p>
            </div>
            <div className="resume-item border-line-h">
              <div className="date">2011 - 2012</div>
              <div className="name">Team Leader</div>
              <div className="company">ABC Inc.</div>
              <p>
                A team leader is responsible for guiding a group of employees as
                they complete a project.
              </p>
            </div>
            <div className="resume-item">
              <div className="date">2009 - 2010</div>
              <div className="name">Business Writer</div>
              <div className="company">Writer Corporation.</div>
              <p>Corporate writing is writing for business purposes.</p>
            </div>
          </div>
        </div>
        {/* education */}
        <div className="col col-d-6 col-t-6 col-m-12 border-line-v">
          <div className="resume-title border-line-h">
            <div className="icon">
              <i className="fa fa-university" />
            </div>
            <div className="name">Education</div>
          </div>
          <div className="resume-items">
            <div className="resume-item border-line-h">
              <div className="date">2006 - 2008</div>
              <div className="name">New York University</div>
              <div className="company">New York</div>
              <p>
                New York University offers 2 Creative Writing Degree programs.
                {`It's`} a large private university in a large city.
              </p>
            </div>
            <div className="resume-item border-line-h">
              <div className="date">2005 - 2006</div>
              <div className="name">Writing Course</div>
              <div className="company">London</div>
              <p>
                Creative writing short courses is taught at City, University of
                London. Develop writing skills with professional and published
                authors.
              </p>
            </div>
            <div className="resume-item">
              <div className="date">2004 - 2005</div>
              <div className="name">New York School</div>
              <div className="company">Brooklyn, NY, United States</div>
            </div>
          </div>
        </div>
        <div className="clear" />
      </div>
    </div>
  );
};
export const ResumeSectionMusician = () => {
  return (
    <div className="content resume">
      {/* title */}
      <div className="title">Resume</div>
      {/* content */}
      <div className="row">
        {/* experience */}
        <div className="col col-d-6 col-t-6 col-m-12 border-line-v">
          <div className="resume-title border-line-h">
            <div className="icon">
              <i className="fa fa-briefcase" />
            </div>
            <div className="name">Experience</div>
          </div>
          <div className="resume-items">
            <div className="resume-item border-line-h active">
              <div className="date">2018 - Present</div>
              <div className="name">Schenectady Symphony Orchestra</div>
              <div className="company">New York</div>
              <p>Third chair, first violin section.</p>
            </div>
            <div className="resume-item border-line-h">
              <div className="date">2016 - 2018</div>
              <div className="name">Utica Symphony Orchestra</div>
              <div className="company">New York</div>
              <p>
                First violin section; orchestra is currently without contract.
              </p>
            </div>
            <div className="resume-item">
              <div className="date">2014 - 2016</div>
              <div className="name">Frequent freelance</div>
              <div className="company">New York</div>
              <p>
                Work in: New York Capital Region for Cohoes Music Hall, Hubbard
                Hall Opera Theater.
              </p>
            </div>
          </div>
        </div>
        {/* education */}
        <div className="col col-d-6 col-t-6 col-m-12 border-line-v">
          <div className="resume-title border-line-h">
            <div className="icon">
              <i className="fa fa-university" />
            </div>
            <div className="name">Education</div>
          </div>
          <div className="resume-items">
            <div className="resume-item border-line-h">
              <div className="date">2011 - 2014</div>
              <div className="name">Peabody Institute</div>
              <div className="company">Baltimore</div>
              <p>
                M.M. in Performance, Peabody Institute {`–`} Baltimore, MD 2015.
              </p>
            </div>
            <div className="resume-item border-line-h">
              <div className="date">2008 - 2011</div>
              <div className="name">American University</div>
              <div className="company">Washington</div>
              <p>
                B.A. in Music, American University {`–`} Washington, D.C. 2012.
              </p>
            </div>
            <div className="resume-item">
              <div className="date">2000 - 2008</div>
              <div className="name">New York School of Music</div>
              <div className="company">New York</div>
              <p>Great school! The teachers really care about the students.</p>
            </div>
          </div>
        </div>
        <div className="clear" />
      </div>
    </div>
  );
};

export const ResumeSectionClassic = () => {
  return (
    <div className="content resume">
      {/* title */}
      <div className="title">Resume</div>
      {/* content */}
      <div className="row">
        {/* experience */}
        <div className="col col-d-6 col-t-6 col-m-12 border-line-v">
          <div className="resume-title border-line-h">
            <div className="icon">
              <i className="ion ion-briefcase" />
            </div>
            <div className="name">Experience</div>
          </div>
          <div className="resume-items">
            <div className="resume-item border-line-h active">
              <div className="date">2013 - Present</div>
              <div className="name">Art Director</div>
              <div className="company">Facebook Inc.</div>
              <p>
                Collaborate with creative and development teams on the execution
                of ideas.
              </p>
            </div>
            <div className="resume-item border-line-h">
              <div className="date">2011 - 2012</div>
              <div className="name">Front-end Developer</div>
              <div className="company">Google Inc.</div>
              <p>
                Monitored technical aspects of the front-end delivery for
                several projects.
              </p>
            </div>
            <div className="resume-item">
              <div className="date">2009 - 2010</div>
              <div className="name">Senior Developer</div>
              <div className="company">Abc Inc.</div>
              <p>Optimize website performance using latest technology.</p>
            </div>
          </div>
        </div>
        {/* education */}
        <div className="col col-d-6 col-t-6 col-m-12 border-line-v">
          <div className="resume-title border-line-h">
            <div className="icon">
              <i className="ion ion-university" />
            </div>
            <div className="name">Education</div>
          </div>
          <div className="resume-items">
            <div className="resume-item border-line-h">
              <div className="date">2006 - 2008</div>
              <div className="name">Art University</div>
              <div className="company">New York</div>
              <p>
                {`Bachelor's`} Degree in Computer Science ABC Technical
                Institute, Jefferson, Missouri
              </p>
            </div>
            <div className="resume-item border-line-h">
              <div className="date">2005 - 2006</div>
              <div className="name">Programming Course</div>
              <div className="company">Paris</div>
              <p>Coursework - Git, WordPress, Javascript, iOS, Android.</p>
            </div>
            <div className="resume-item">
              <div className="date">2004 - 2005</div>
              <div className="name">Web Design Course</div>
              <div className="company">London</div>
              <p>
                Converted Photoshop layouts to web pages using HTML, CSS, and
                JavaScript
              </p>
            </div>
          </div>
        </div>
        <div className="clear" />
      </div>
    </div>
  );
};
