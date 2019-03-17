import React from 'react';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';
import Helmet from 'react-helmet';
import Header from './components/Header'

const Layout = ({ route }) => (
  <React.Fragment>
    <Helmet>
      <title>
        {(route.fields && route.fields.pageTitle && route.fields.pageTitle.value) || 'Page'}
      </title>
    </Helmet>

    <Header />

    <div className="container">
      <Placeholder name="jss-main" rendering={route} />
    </div>
  </React.Fragment>
);

export default Layout;
