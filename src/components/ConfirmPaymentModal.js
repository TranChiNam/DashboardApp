import React from 'react';
import { Form, Input, Row, Col, Modal, message } from 'antd';
import { postForm } from '../utils/api';


const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};


// eslint-disable-next-line import/no-anonymous-default-export
export default ({ objData, setClose }) => {
  const [form] = Form.useForm();

  const onFinish = async (data) => {
    try {

      const amount = form.getFieldValue('amount');
      const bankId = form.getFieldValue('bankId');
      const bankName = form.getFieldValue('bankName');
      const transactionId = form.getFieldValue('transactionId');

      const res = await postForm({ amount, bankId, bankName, transactionId });
      //  TODO: check response here
      console.log(res);
      message.success('This is a prompt message for success, and it will disappear in 20 seconds', 20)
      setClose({ bRefresh: true });
    } catch (err) {
      message.error('Error, and it will disappear in 10 seconds', 20)
      console.log(err);
    }
  }

  return (
    <Modal
      width={768}
      centered
      title={"Xác nhận thanh toán"}
      visible={!!Object.keys(objData).length}
      onOk={onFinish}
      onCancel={setClose}
    >
      <Form {...layout} form={form} name="control-hooks">
        <Row>
          <Col span={12}>
            <Form.Item
              name="bankId"
              label="Mã ngân hàng"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="bankName"
              label="Tên ngân hàng"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="transactionId"
              label="Mã giao dịch"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="amount"
              label="Tổng số tiền"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
