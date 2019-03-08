import React from 'react';
import { Text, RichText } from '@sitecore-jss/sitecore-jss-react';

const TextSection = ({fields}) => (
  <div>
    <h3><Text field={fields.heading} /></h3>
    <hr />
    <RichText field={fields.body} />
  </div>
);

export default TextSection;
