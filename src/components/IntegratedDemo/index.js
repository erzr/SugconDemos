import React from 'react';
import { Form } from 'react-bootstrap';

const IntegratedDemo = ({ fields }) => {
  return (
    <div>
      <h2>With GraphQL Query</h2>
      <hr />
      <Form.Group controlId="exampleForm.ControlTextarea1">
      <Form.Label>Content of fields prop</Form.Label>
        <Form.Control as="textarea" rows="10" value={JSON.stringify(fields, null, 4)} readOnly />
      </Form.Group>
    </div>
  )
};

export default IntegratedDemo;
