import ReactDOM from 'react-dom';
import React from 'react';

import { CustomPreviewApp } from './custom-preview-app';

export default function customPreviewMountPoint(payload: any, executionContext: RenderingContext) {
  ReactDOM.render(
    <CustomPreviewApp payload={payload} executionContext={executionContext} />,
    document.getElementById('root')
  );
}
