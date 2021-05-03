import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, BarChartOutlined } from '@ant-design/icons';
import App from './App';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

  return (
    <Layout>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
          <Breadcrumb.Item>Danh sách</Breadcrumb.Item>
        </Breadcrumb>
        <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
          <Sider className="site-layout-background" width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
            >
              <SubMenu icon={<UserOutlined />} title="Đơn hàng" />
              <SubMenu icon={<BarChartOutlined />} title="Thống kê" />
              {/* <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu> */}
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}><App /></Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design 2021 Created by ...</Footer>
    </Layout>
  );
}
