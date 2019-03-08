import React from 'react';
import { Text } from '@sitecore-jss/sitecore-jss-react';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';

const containerStyle = {
  paddingTop: '20px'
};

const DemoStructure = ({rendering}) => (
  <section>
    <div className="container" style={containerStyle}>
      <div className="row">
        <div className="col-md-4">
          <ul class="list-group">
            <li class="list-group-item">
              <a href="/">
                Home
              </a>
            </li>
            <li class="list-group-item">
              <a href="#">
                Item Text Field Query
              </a>
            </li>
            <li class="list-group-item">
              <a href="#">
                Item Image Field Query
              </a>
            </li>
            <li class="list-group-item">
              <a href="#">
                Item Children Query
              </a>
            </li>
            <li class="list-group-item">
              <a href="#">
                Item Inline Fragments
              </a>
            </li>
            <li class="list-group-item">
              <a href="#">
                Content Search
              </a>
            </li>
            <li class="list-group-item">
              <a href="#">
                Subscriptions
              </a>
            </li>
          </ul>
        </div>
        <div className="col-md-8">
          <Placeholder name="jss-demo-main" rendering={rendering} />
        </div>
      </div>
    </div>
  </section>
);

export default DemoStructure;
