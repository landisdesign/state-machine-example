import { Checkbox, Form, Input, InputNumber } from 'antd';

function OrderDetails({ onSubmit, initialValues, replace, onReplaceChanged }) {
  return <div>
    <Form onFinish={onSubmit} initialValues={initialValues}>
      <Form.Item name="item" label="Order Item"><Input /></Form.Item>
      <Form.Item name="quantity" label="Order Quantity"><InputNumber /></Form.Item>
    </Form>
    <Checkbox checked={replace} onChange={() => { onReplaceChanged(!replace); }}>Replace entire order</Checkbox>
  </div>;
}

export default OrderDetails;
