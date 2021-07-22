import React from 'react';
import type { CustomPreviewTemplateProps } from '@teambit/teaching.extensions.component-images';
import { wideColumn } from '@teambit/base-ui.layout.page-frame';

import styles from './preview-images.module.scss';

export function ComponentImagesApp(props: CustomPreviewTemplateProps) {
  return (
    <div className={wideColumn + ' ' + styles.imagesPreviewApp}>
      <h2>Images</h2>
      <p>The component has the following images:</p>
      <div className={styles.imagesPreview}>
        {props.assets.map((imageUrl, idx) => (
          <div key={idx} className={styles.imageDetails}>
            <code>{imageUrl}</code>
            <img src={imageUrl} />
          </div>
        ))}
      </div>
    </div>
  );
}
