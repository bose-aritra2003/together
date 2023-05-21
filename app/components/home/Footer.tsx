const Footer = () => {
  return (
    <footer className="bg-white py-7 px-4 sm:px-10 xl:px-16 2xl:px-36">
      <div className="w-full flex flex-col mx-auto p-4 md:flex-row md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center">
            © 2023
            <a className="hover:text-emerald-900 pl-1" href="https://bose-aritra2003.github.io/my-portfolio-website/">
                Aritra Bose™
            </a>.
            All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0">
          <li key={0}>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/bose-aritra2003/"
              className="mr-4 hover:text-emerald-900 md:mr-6"
            >
              LinkedIn
            </a>
          </li>
          <li key={1}>
            <a
              target="_blank"
              href="https://github.com/bose-aritra2003"
              className="mr-4 hover:text-emerald-900 md:mr-6"
            >
              GitHub
            </a>
          </li>
          <li key={2}>
            <a
              target="_blank"
              href="https://github.com/bose-aritra2003/together/blob/main/LICENSE"
              className="mr-4 hover:text-emerald-900 md:mr-6"
            >
              Licensing
            </a>
          </li>
          <li key={3}>
            <a
              target="_blank"
              href="mailto:dev.bose.aritra@gmail.com"
              className="hover:text-emerald-900"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
export default Footer;