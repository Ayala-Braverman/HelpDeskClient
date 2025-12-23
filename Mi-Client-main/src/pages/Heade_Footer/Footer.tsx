const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <hr />
      <p>© {year} Helpdesk System</p>
    </footer>
  );
};

export default Footer;
