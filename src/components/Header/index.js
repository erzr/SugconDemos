import React from 'react';
import { loader as gqlLoader } from 'graphql.macro';
import { Query } from "react-apollo";
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { SITE_SETTINGS_ID } from '../../constants';
import { withNamespaces } from 'react-i18next';

const ConnectedDemoQuery = gqlLoader('./query.graphql');

let DemoNavDropdown = ({demoLinks}) => (
    <NavDropdown title="Demos" id="basic-nav-dropdown">
        {demoLinks.map((link, i) => <NavDropdown.Item href={link.url} key={i}>{link.pageTitle.value}</NavDropdown.Item>)}
    </NavDropdown>
);

let Header = ({ t, i18n }) => (
    <Query query={ConnectedDemoQuery} variables={ { id: SITE_SETTINGS_ID } }>
        {({ loading, error, data }) => {
            if (loading) return '';
            if (error) return `Error! ${error.message}`;
            return (
                <Navbar bg="dark" expand="lg" variant="dark">
                    <Container>
                        <Navbar.Brand href="/">{data.item.siteTitle.value}</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href="/">{t('Home')}</Nav.Link>
                                {data.item.demoLinks && <DemoNavDropdown demoLinks={data.item.demoLinks.targetItems} />}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar >
            );
        }}
    </Query>
);

export default withNamespaces()(Header);