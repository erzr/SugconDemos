import React from 'react';
import { loader as gqlLoader } from 'graphql.macro';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { SITE_SETTINGS_ID } from '../../constants';
import GraphQLData from '../../lib/GraphQLData';
import { withNamespaces } from 'react-i18next';

const ConnectedDemoQuery = gqlLoader('./query.graphql');

let DemoNavDropdown = ({ demoLinks }) => (
    <NavDropdown title="Demos" id="basic-nav-dropdown">
        {demoLinks.map((link, i) => <NavDropdown.Item href={link.url} key={i}>{link.pageTitle.value}</NavDropdown.Item>)}
    </NavDropdown>
);

let Header = ({t, headerQuery}) => {
    const { item } = headerQuery;

    return (
        <Navbar bg="dark" expand="lg" variant="dark">
            <Container>
                <Navbar.Brand href="/">{item && item.siteTitle.value}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {<Nav.Link href="/">{t('Home')}</Nav.Link>}
                        {item && item.demoLinks && <DemoNavDropdown demoLinks={item.demoLinks.targetItems} />}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

const HeaderWithNamespaces = withNamespaces()(Header);

export default GraphQLData(ConnectedDemoQuery, { name: 'headerQuery', options: { variables: { id: SITE_SETTINGS_ID } } })(HeaderWithNamespaces);