import React from 'react';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';

const containerStyle = {
  paddingTop: '20px'
};

const DemoStructure = ({rendering}) => (
  <section>
    <div className="container" style={containerStyle}>
      <div className="row">
        <div className="col-md-12">
          <Placeholder name="jss-demo-main" rendering={rendering} />
        </div>
      </div>
    </div>
  </section>
);

export default DemoStructure;
