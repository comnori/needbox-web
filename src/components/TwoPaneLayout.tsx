import React from 'react';
import { Layout, Row, Col } from 'antd';

type Props = {
  left: React.ReactNode;
  right: React.ReactNode;
};

const LogoIcon = () => (
  <svg style={{ width: '24px', height: '24px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

export const TwoPaneLayout: React.FC<Props> = ({ left, right }) => {
  return (
    <Layout style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
      <Layout.Header style={{ 
        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        boxShadow: 'var(--shadow-md)',
        height: '64px'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '1rem',
          color: 'white'
        }}>
          <LogoIcon />
          <h1 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '700',
            margin: 0,
            letterSpacing: '-0.025em'
          }}>
            NeedBox
          </h1>
          <span style={{ 
            padding: '0.25rem 0.75rem',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.75rem',
            fontWeight: '600'
          }}>
            6W Framework
          </span>
        </div>
        <div style={{ 
          fontSize: '0.875rem', 
          color: 'rgba(255, 255, 255, 0.9)',
          fontWeight: '500'
        }}>
          요구사항 명세 도구
        </div>
      </Layout.Header>
      
      <Layout.Content style={{ 
        padding: '2rem',
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%'
      }}>
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={12}>
            <div style={{ height: '100%' }}>
              {left}
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div style={{ height: '100%' }}>
              {right}
            </div>
          </Col>
        </Row>
      </Layout.Content>

      <Layout.Footer style={{
        textAlign: 'center',
        background: 'transparent',
        color: 'var(--color-text-muted)',
        fontSize: '0.875rem',
        padding: '1.5rem'
      }}>
        <div style={{ marginBottom: '0.5rem' }}>
          © 2024 NeedBox - 체계적인 요구사항 관리 시스템
        </div>
        <div style={{ fontSize: '0.75rem' }}>
          Made with precision and care for better requirement documentation
        </div>
      </Layout.Footer>
    </Layout>
  );
};