import ReactDOM from 'react-dom';
import React from 'react';

import { ComponentImagesApp } from './component-images-app';

export default function componentImagesMountPoint(props: any) {
  const mountPoint = document.getElementById('root');
  ReactDOM.render(<ComponentImagesApp {...props} />, mountPoint);
}

// don't put react components in this file, or you'll have troubles with hot reloading
