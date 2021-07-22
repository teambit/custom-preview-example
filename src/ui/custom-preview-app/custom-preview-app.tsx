import React from 'react';
import type { CustomPreviewTemplateProps } from '@teambit/teaching.extensions.custom-preview';

export function CustomPreviewApp(props: CustomPreviewTemplateProps) {
  return (
    <div>
      <h2>hello</h2>
      <p>I'm inside the iframe world, I got: {props.componentId}</p>
      <div>
        I got these assets: <br />
        {JSON.stringify(props.assets)}
      </div>
    </div>
  );
}
