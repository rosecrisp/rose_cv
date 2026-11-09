const SiteCredit = () => {
  return (
    <div className="site-credit site-credit-c">
      <span className="site-credit-badge">Built & hosted by me</span>
      <a
        className="site-credit-pill"
        href="https://github.com/rosecrisp/rose_cv"
        target="_blank"
        rel="noopener noreferrer"
        title="Website source on GitHub"
      >
        <i className="fa fa-github" aria-hidden="true" /> rose_cv
      </a>
      <a
        className="site-credit-pill"
        href="https://github.com/rocrisp/cfgm"
        target="_blank"
        rel="noopener noreferrer"
        title="Infrastructure (Ansible) on GitHub"
      >
        <i className="fa fa-github" aria-hidden="true" /> cfgm
      </a>
    </div>
  );
};
export default SiteCredit;
