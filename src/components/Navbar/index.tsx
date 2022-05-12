import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import type { LinkInterface } from '../../utils/links';
import logo from './logo-light.svg';

const Navbar = (props: any) => {
  const links: LinkInterface[] = props?.links;
  return (
    <BootstrapNavbar bg="dark" variant="dark">
      <Container>
        <BootstrapNavbar.Brand href="/">
          <img src={logo} style={{ height: '40px' }} alt="logo" />
        </BootstrapNavbar.Brand>
        <Nav className="me-auto">
          {links?.map((link, index) => (
            <Nav.Link key={index} href={link.to}>
              {link.name}
            </Nav.Link>
          ))}
        </Nav>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
