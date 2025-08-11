import React from 'react';
import { Layout, Row, Col } from 'antd';

type Props = {
  left: React.ReactNode;
  right: React.ReactNode;
};

export const TwoPaneLayout: React.FC<Props> = ({ left, right }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Header style={{ color: '#fff', fontSize: 20 }}>NeedBox</Layout.Header>
      <Layout.Content style={{ padding: '24px' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>{left}</Col>
          <Col xs={24} lg={12}>{right}</Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
};
