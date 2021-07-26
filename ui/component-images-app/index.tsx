import ReactDOM from 'react-dom';
import React from 'react';
import type { CustomPreviewTemplateProps } from '@teambit/teaching.extensions.component-images';

import { ComponentImagesApp } from './component-images-app';

export default function componentImagesMountPoint(props: CustomPreviewTemplateProps) {
  const mountPoint = document.getElementById('root');
  ReactDOM.render(<ComponentImagesApp {...props} />, mountPoint);
}

// don't put react components in this file, or you'll have troubles with hot reloading
