
import React from 'react';
import { Modal } from 'antd';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ szTitle, bVisible, setClose, children }) => {


  return (
    <Modal
      width={768}
      centered
      title={szTitle}
      visible={bVisible}
      onOk={setClose}
      onCancel={setClose}
    >
      {children}
    </Modal>
  )
}
