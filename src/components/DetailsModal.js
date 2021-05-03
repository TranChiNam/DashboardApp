import React, { useState } from 'react';
import CustomModal from './Modal';
import { formatDatetime } from '../utils/helpers';
import { STATUS, INTERNAL_STATUS } from '../utils/constants';
import { Form, Input, Table, Select, Row, Col } from 'antd';

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

  const [bLoading, setLoading] = useState(false);

  const { id, buyerEmail, dateTime, deliveryMethodId, paymentIntentId, status, subTotal, internalStatus, items } = objData;
  console.log(objData);
  const onFinish = (values) => {
    console.log(values);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'pictureUrl',
      key: 'pictureUrl',
      render: pictureUrl => <img src={pictureUrl} alt="img" style={{ maxHeight: 60 }} />,
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
  ]

  return (
    <CustomModal szTitle={`Chi tiết đơn hàng số #${id}`} bVisible={!!Object.keys(objData).length} setClose={setClose}>
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Row>
          <Col span={12}>
            <Form.Item label="Email">
              <strong>{buyerEmail}</strong>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Thời gian">
              <strong>{formatDatetime(dateTime)}</strong>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Giao hàng">
              <strong>{deliveryMethodId}</strong>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Trạng thái">
              <strong>{STATUS[status]}</strong>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Trạng thái nội bộ">
              <strong>{INTERNAL_STATUS[internalStatus]}</strong>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Tạm tính">
              <strong>{subTotal}</strong>
            </Form.Item>
          </Col>
        </Row>


        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
        >
          {({ getFieldValue }) =>
            getFieldValue('gender') === 'other' ? (
              <Form.Item
                name="customizeGender"
                label="Customize Gender"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            ) : null
          }
        </Form.Item>
        <Table rowKey="id" dataSource={items} columns={columns} pagination={false} />
      </Form>
    </CustomModal>
  );
};
