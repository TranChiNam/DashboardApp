import React, { useEffect, useState } from 'react';
import { Table, Tag, Button, Modal, message } from 'antd';
import { DATA } from './utils/data';
import { getData, updateStatus } from './utils/api';
// import ModalContent from './components/ModalContent';
// import FormPayment from './components/FormPayment';
import ConfirmPaymentModal from './components/ConfirmPaymentModal';
import DetailsModal from './components/DetailsModal';
import { formatDatetime } from './utils/helpers';
import { STATUS, INTERNAL_STATUS } from './utils/constants';
import { ExclamationCircleOutlined } from '@ant-design/icons';


const { confirm } = Modal;


function showConfirm(threshold = 0) {
  confirm({
    title: `Bạn có chắc chắn không?`,
    icon: <ExclamationCircleOutlined />,
    content: `Vượt quá hạn mức ${threshold}`,
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [lstData, setLstData] = useState([]);
  const [objDetails, setObjDetails] = useState({});
  const [objConfirmPayment, setObjConfirmPayment] = useState({});

  useEffect(() => {
    return fetchLstData();
  }, [])

  const fetchLstData = async () => {
    const res = await getData(`localhost:8080/orders/list`);
    console.log(res);
    setLstData(res)
  }

  const handleViewDetail = (record) => {
    setObjDetails(record);
  }

  const handleChangeStatus = async ({ id, internalStatus, expectInternalStatus = 1 }) => {
    try {

      const res = await updateStatus({ orderId: id, currentInternalStatus: internalStatus, expectInternalStatus })
      //  TODO: check response here
      if (res) {
        message.success('This is a prompt message for success, and it will disappear in 10 seconds', 10)
        fetchLstData();
      }
    } catch (err) {
      message.error('Error, and it will disappear in 10 seconds', 10)
      console.log(err);
    }
  }

  const handleConfirmPayment = (record) => {
    setObjConfirmPayment(record);
  }

  const columns = [
    {
      title: 'Thời gian',
      dataIndex: 'dateTime',
      key: 'dateTime',
      render: dateTime => <span>{formatDatetime(dateTime)}</span>
    },
    {
      title: 'Email',
      dataIndex: 'buyerEmail',
      key: 'buyerEmail',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Tạm tính',
      dataIndex: 'subTotal',
      key: 'subTotal',
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      render: statusId => statusId ? STATUS[statusId] : '',
    },
    {
      title: 'Trạng thái nội bộ',
      key: 'internalStatus',
      dataIndex: 'internalStatus',
      render: internalStatusId => internalStatusId ? internalStatusId + '---' + INTERNAL_STATUS[internalStatusId] : INTERNAL_STATUS[1],
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (record) => (
        <>
          <Button type="primary" onClick={() => handleViewDetail(record)} style={{ width: 175, marginTop: 4 }}>Hiển thị chi tiết</Button>
          {record.internalStatus === 2 && <div>
            <Button type="primary" onClick={() => handleChangeStatus({ ...record, expectInternalStatus: 5 })} style={{ width: 175, marginTop: 4 }}>Yêu cầu duyệt công nợ</Button>
            <div>
              <Button type="primary" onClick={() => handleConfirmPayment(record)} style={{ width: 175, marginTop: 4 }}>Duyệt thanh toán</Button>
            </div>
          </div>}
          {record.internalStatus === 3 || record.internalStatus === 7 ? <div>
            <Button type="primary" onClick={() => handleChangeStatus({ ...record, expectInternalStatus: 8 })} style={{ width: 175, marginTop: 4 }}>Duyệt công nợ</Button>
            <div> <Button type="primary" onClick={() => handleConfirmPayment(record)} style={{ width: 175, marginTop: 4 }}>Duyệt thanh toán</Button></div>
          </div> : null}
          {/* {record.internalStatus === 4 && <div>
            <Button type="primary" onClick={() => handleConfirmPayment(record)}style={{width: 175, marginTop:4}}>Chờ xác nhận thanh toán</Button>
          </div>} */}
          {record.internalStatus === 5 && <div>
            <Button type="primary" onClick={() => showConfirm(record.subTotal)} style={{ width: 175, marginTop: 4 }}>Duyệt công nợ</Button>
            <div>
              <Button type="primary" onClick={() => handleChangeStatus({ ...record, expectInternalStatus: 6 })} style={{ width: 175, marginTop: 4 }}>Hủy</Button>
            </div>
          </div>}
          {record.internalStatus === 8 && <div>
            <Button type="primary" onClick={() => handleChangeStatus({ ...record, expectInternalStatus: 9 })} style={{ width: 175, marginTop: 4 }}>Xuất hàng</Button>
          </div>}
          {record.internalStatus === 9 && <div>
            <Button type="primary" onClick={() => handleChangeStatus({ ...record, expectInternalStatus: 12 })} style={{ width: 175, marginTop: 4 }}>Xuất Kho</Button>
          </div>}
          {record.internalStatus === 12 && <div>
            <Button type="primary" onClick={() => handleChangeStatus({ ...record, expectInternalStatus: 10 })} style={{ width: 175, marginTop: 4 }}>Giao hàng</Button>
          </div>}
          {record.internalStatus === 10 && <div>
            <Button type="primary" onClick={() => handleChangeStatus({ ...record, expectInternalStatus: 11 })} style={{ width: 175, marginTop: 4 }}>Giao hàng thành công</Button>
          </div>}
        </>
      ),
    },
  ];

  console.log(DATA);

  return (
    <div className="App">
      {/* TODO */}
      <Table rowKey="id" dataSource={DATA} columns={columns} />
      {/* <Table rowKey="id" dataSource={lstData} columns={columns} /> */}

      <DetailsModal objData={objDetails} setClose={() => setObjDetails({})} />
      <ConfirmPaymentModal objData={objConfirmPayment} setClose={async (bRefresh = false) => {
        setObjConfirmPayment({});
        if (bRefresh) { await fetchLstData() }
      }} />
    </div>
  );
}

