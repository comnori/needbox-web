import React from 'react';

// Minimal stubs to allow building without the real Ant Design package
export const Layout: React.FC<React.HTMLAttributes<HTMLDivElement>> & {
  Header: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  Content: React.FC<React.HTMLAttributes<HTMLDivElement>>;
} = ({ children, ...props }) => <div {...props}>{children}</div> as any;

Layout.Header = ({ children, ...props }) => <header {...props}>{children}</header>;
Layout.Content = ({ children, ...props }) => <main {...props}>{children}</main>;

export const Row: React.FC<any> = ({ children, ...props }) => <div {...props}>{children}</div>;
export const Col: React.FC<any> = ({ children, ...props }) => <div {...props}>{children}</div>;
