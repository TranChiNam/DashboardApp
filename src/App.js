import React, { useEffect, useState } from 'react';
import { Table, Tag, Button, Modal } from 'antd';
import { DATA, DATAz } from './utils/data';
import { getData } from './utils/api';
import ModalContent from './components/ModalContent';

const App = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    return (async () => {
      const res = await getData(`https://jsonplaceholder.typicode.com/posts`);
      console.log(res);
    })
  }, [])

  const handleClick = (record) => {
    console.log(record);
    showModal();
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <Button type="primary" onClick={() => handleClick(record)}>button here</Button>
      ),
    },
  ];
  console.log(DATAz);

  return (
    <div className="App" style={{ padding: 15 }}>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <br />
      <br />
      <br />
      <br />
      <Table dataSource={DATA} columns={columns} />;
      <Modal centered title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <ModalContent />
      </Modal>
    </div>
  );
}

export default App;
