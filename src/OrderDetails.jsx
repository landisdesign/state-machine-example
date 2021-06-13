import { Checkbox, Form, Input, InputNumber } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useEffect } from 'react';

function OrderDetails({ onSubmit, initialValues, replace, onReplaceChanged }) {
  const [form] = useForm();
  useEffect(() => {
    console.log('rest');
    form.resetFields();
  }, [form, initialValues]);

  return <div>
    <Form form={form} onFinish={onSubmit} initialValues={initialValues}>
      <Form.Item name="item" label="Order Item"><Input /></Form.Item>
      <Form.Item name="quantity" label="Order Quantity"><InputNumber /></Form.Item>
    </Form>
    <Checkbox checked={replace} onChange={() => { onReplaceChanged(!replace); }}>Replace entire order</Checkbox>
  </div>;
}

export default OrderDetails;
