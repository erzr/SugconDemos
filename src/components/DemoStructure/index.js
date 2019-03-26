import React from 'react';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';

const containerStyle = {
  paddingTop: '20px'
};

const DemoStructure = ({ fields, rendering }) => (
  <section>
    <div className="container" style={containerStyle}>
      <div className="row">

        {fields && fields.singleColumn && fields.singleColumn.value ? (
          <div className="col-md-12">
            <Placeholder name="jss-demo-main" rendering={rendering} />
          </div>
        ) : (
            <React.Fragment>
              <div className="col-md-6">
                <Placeholder name="jss-demo-left" rendering={rendering} />
              </div>
              <div className="col-md-6">
                <Placeholder name="jss-demo-main" rendering={rendering} />
              </div>
            </React.Fragment>
          )}

      </div>
    </div>
  </section>
);

export default DemoStructure;
