import React, { useContext } from 'react';
import { ComponentContext } from '@teambit/component';
import { ComponentPreview } from '@teambit/preview.ui.component-preview';
import { COMPONENT_IMAGES_PREVIEW_ID } from './config';

export function ComponentImagesPage() {
  const component = useContext(ComponentContext);

  // if (!component.buildStatus) return <div>component hasn't been build yet</div>;

  return (
    // render an iframe to the preview app.
    //
    // the preview app contains actual components, which we don't want in the main UI),
    // and could have a completely different engine (like Angular), which we can't have in the main UI)
    <ComponentPreview
      component={component}
      previewName={COMPONENT_IMAGES_PREVIEW_ID}
      style={{ width: '100%', height: '100%' }}
    />
  );
}
