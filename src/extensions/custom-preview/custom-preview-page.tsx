import React, { useContext } from 'react';
import { ComponentContext } from '@teambit/component';
import { ComponentPreview } from '@teambit/preview.ui.component-preview';
import { CUSTOM_PREVIEW_ID } from './custom-preview.aspect';

export function CustomPreviewPage() {
  const component = useContext(ComponentContext);

  // if (!component.buildStatus) return <div>component hasn't been build yet</div>;

  return (
    // render an iframe to the preview app:
    <ComponentPreview component={component} previewName={CUSTOM_PREVIEW_ID} style={{ width: '100%', height: '100%' }} />
  );
}
