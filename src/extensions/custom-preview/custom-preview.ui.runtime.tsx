import React from 'react';
import { UIRuntime } from '@teambit/ui';
import { ComponentAspect, ComponentUI } from '@teambit/component';
import { CustomPreviewAspect } from './custom-preview.aspect';
import { CustomPreviewPage } from './custom-preview-page';

export class CustomPreviewUI {
  static runtime = UIRuntime;
  static dependencies = [ComponentAspect];

  static async provider([componentUI]: [ComponentUI]) {
    componentUI.registerNavigation({ href: '~custom-preview', children: 'custom-preview' });
    componentUI.registerRoute({ path: '~custom-preview', children: <CustomPreviewPage /> });

    return new CustomPreviewUI();
  }
}

CustomPreviewAspect.addRuntime(CustomPreviewUI);
