import React from 'react';
import { loader as gqlLoader } from 'graphql.macro';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { SITE_SETTINGS_ID } from '../../constants';
import GraphQLData from '../../lib/GraphQLData';
import { withNamespaces } from 'react-i18next';
import gql from 'graphql-tag';

const ConnectedDemoQuery = gql`
query NavBar($id:String) {
  header:item(path:$id) {
    name
    
    ... on SiteSettingsTemplate {
      siteTitle {
        value
      }
      demoLinks {
      	targetItems {
          url
          ... on AppRoute {
            pageTitle {
              value
            }
          }
        }
      }
      
    }
    
  }
}
`;

let DemoNavDropdown = ({ demoLinks }) => (
    <NavDropdown title="Demos" id="basic-nav-dropdown">
        {demoLinks.map((link, i) => <NavDropdown.Item href={link.url} key={i}>{link.pageTitle.value}</NavDropdown.Item>)}
    </NavDropdown>
);

let Header = ({t, headerQuery}) => {
    const { header } = headerQuery;

    return (
        <Navbar bg="dark" expand="lg" variant="dark">
            <Container>
                <Navbar.Brand href="/">{header && header.siteTitle.value}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {<Nav.Link href="/">{t('Home')}</Nav.Link>}
                        {header && header.demoLinks && <DemoNavDropdown demoLinks={header.demoLinks.targetItems} />}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

const HeaderWithNamespaces = withNamespaces()(Header);

export default GraphQLData(ConnectedDemoQuery, { name: 'headerQuery', options: { variables: { id: SITE_SETTINGS_ID } } })(HeaderWithNamespaces);