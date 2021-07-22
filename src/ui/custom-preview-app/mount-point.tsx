import ReactDOM from 'react-dom';
import React from 'react';
import type { CustomPreviewTemplateProps } from '@teambit/teaching.extensions.custom-preview';

import { CustomPreviewApp } from './custom-preview-app';

export default function customPreviewMountPoint(props: CustomPreviewTemplateProps) {
  ReactDOM.render(<CustomPreviewApp {...props} />, document.getElementById('root'));
}

// don't put react components in this file, or you'll have troubles with hot reloading