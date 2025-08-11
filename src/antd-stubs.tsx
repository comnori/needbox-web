import React, { forwardRef } from 'react';

// Minimal stubs to allow building without the real Ant Design package
export const Layout: React.FC<React.HTMLAttributes<HTMLDivElement>> & {
  Header: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  Content: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  Footer: React.FC<React.HTMLAttributes<HTMLDivElement>>;
} = ({ children, ...props }) => <div {...props}>{children}</div> as any;

Layout.Header = ({ children, ...props }) => <header {...props}>{children}</header>;
Layout.Content = ({ children, ...props }) => <main {...props}>{children}</main>;
Layout.Footer = ({ children, ...props }) => <footer {...props}>{children}</footer>;

// Improved Row and Col stubs with responsive grid support
export const Row: React.FC<any> = ({ children, gutter, ...props }) => {
  const [gutterH, gutterV] = Array.isArray(gutter) ? gutter : [gutter, gutter];
  return (
    <div 
      style={{ 
        display: 'flex',
        flexWrap: 'wrap',
        marginLeft: gutterH ? `-${gutterH / 2}px` : 0,
        marginRight: gutterH ? `-${gutterH / 2}px` : 0,
        rowGap: gutterV ? `${gutterV}px` : 0,
        ...props.style
      }} 
      {...props}
    >
      {children}
    </div>
  );
};

export const Col: React.FC<any> = ({ children, xs, sm, md, lg, xl, span, ...props }) => {
  const colSpan = lg || span || 24;
  const flexBasis = `${(colSpan / 24) * 100}%`;
  const mobileFlexBasis = xs === 24 || !lg ? '100%' : `${(xs / 24) * 100}%`;
  
  return (
    <div 
      style={{ 
        flex: `0 0 ${flexBasis}`,
        maxWidth: flexBasis,
        paddingLeft: '12px',
        paddingRight: '12px',
        ...props.style
      }}
      className="antd-col"
      {...props}
    >
      {children}
      <style>{`
        @media (max-width: 992px) {
          .antd-col {
            flex: 0 0 ${mobileFlexBasis} !important;
            max-width: ${mobileFlexBasis} !important;
          }
        }
      `}</style>
    </div>
  );
};

// Tag component stub
export const Tag: React.FC<any> = ({ children, closable, onClose, style, onClick, ...props }) => {
  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClose?.(e);
  };

  return (
    <span 
      className="antd-tag" 
      style={{
        display: 'inline-block',
        ...style
      }}
      onClick={onClick}
      {...props}
    >
      <span>{children}</span>
      {closable && (
        <span 
          className="antd-tag-close" 
          onClick={handleClose}
          style={{ marginLeft: '4px' }}
        >
          ×
        </span>
      )}
    </span>
  );
};

// Input component stub
export const Input = forwardRef<HTMLInputElement, any>(({ size, onPressEnter, ...props }, ref) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onPressEnter) {
      onPressEnter(e);
    }
    props.onKeyDown?.(e);
  };

  return (
    <input
      ref={ref}
      className={`antd-input ${size ? `antd-input-${size}` : ''}`}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
});

Input.displayName = 'Input';

// Theme hook stub
export const theme = {
  useToken: () => ({
    token: {
      colorBgContainer: '#ffffff'
    }
  })
};

// TweenOneGroup stub (simple animation group)
export const TweenOneGroup: React.FC<any> = ({ 
  children, 
  enter, 
  leave, 
  appear, 
  onEnd,
  ...props 
}) => {
  return <div {...props}>{children}</div>;
};

// Notification stub
export const notification = {
  success: (config: any) => {
    // Create notification element
    const notificationEl = document.createElement('div');
    notificationEl.className = 'antd-notification antd-notification-success';
    notificationEl.innerHTML = `
      <div class="antd-notification-notice">
        <div class="antd-notification-notice-content">
          <div class="antd-notification-notice-with-icon">
            <span class="antd-notification-notice-icon">
              <svg fill="currentColor" viewBox="0 0 1024 1024" width="1em" height="1em">
                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"/>
              </svg>
            </span>
            <div class="antd-notification-notice-message">${config.message || ''}</div>
            <div class="antd-notification-notice-description">${config.description || ''}</div>
          </div>
        </div>
      </div>
    `;

    // Add to body
    document.body.appendChild(notificationEl);

    // Auto remove after duration
    const duration = config.duration !== undefined ? config.duration : 4.5;
    if (duration > 0) {
      setTimeout(() => {
        if (document.body.contains(notificationEl)) {
          document.body.removeChild(notificationEl);
        }
      }, duration * 1000);
    }

    // Return API for manual close
    return {
      close: () => {
        if (document.body.contains(notificationEl)) {
          document.body.removeChild(notificationEl);
        }
      }
    };
  }
};