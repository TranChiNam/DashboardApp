
import React from 'react';
import { Modal } from 'antd';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ szTtitle, bVisible, setClose, children }) => {


  return (
    <Modal
      width={768}
      centered
      title={szTtitle}
      visible={bVisible}
      onOk={setClose}
      onCancel={setClose}
    >
      {children}
    </Modal>
  )
}
