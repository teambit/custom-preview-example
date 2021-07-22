import React from 'react';
import { UIRuntime } from '@teambit/ui';
import { ComponentAspect, ComponentUI } from '@teambit/component';
import { CustomPreviewAspect, CUSTOM_PREVIEW_SUBPATH, CUSTOM_PREVIEW_TAB_NAME } from './custom-preview.aspect';
import { CustomPreviewPage } from './custom-preview-page';

export class CustomPreviewUI {
  static runtime = UIRuntime;
  static dependencies = [ComponentAspect];

  static async provider([componentUI]: [ComponentUI]) {
    componentUI.registerNavigation({ href: CUSTOM_PREVIEW_SUBPATH, children: CUSTOM_PREVIEW_TAB_NAME }, 100);
    componentUI.registerRoute({ path: CUSTOM_PREVIEW_SUBPATH, children: <CustomPreviewPage /> });

    return new CustomPreviewUI();
  }
}

CustomPreviewAspect.addRuntime(CustomPreviewUI);
