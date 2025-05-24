import React from 'react';
import Layout from '@theme-original/Layout';
import BackgroundEffect from '@site/src/components/BackgroundEffect';

export default function LayoutWrapper(props) {
  return (
    <>
      <BackgroundEffect />
      <Layout {...props} />
    </>
  );
} 