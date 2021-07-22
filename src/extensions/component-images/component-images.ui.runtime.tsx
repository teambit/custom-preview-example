import React from 'react';
import { UIRuntime } from '@teambit/ui';
import { ComponentAspect, ComponentUI } from '@teambit/component';
import { ComponentImagesAspect } from './component-images.aspect';
import { COMPONENT_IMAGES_SUBPATH, COMPONENT_IMAGES_TAB_NAME } from './config';
import { ComponentImagesPage } from './component-images-page';

export class ComponentImagesUI {
  static runtime = UIRuntime;
  static dependencies = [ComponentAspect];

  static async provider([componentUI]: [ComponentUI]) {
    // register menu tab in component page
    componentUI.registerNavigation({ href: COMPONENT_IMAGES_SUBPATH, children: COMPONENT_IMAGES_TAB_NAME }, 100);
    // register a page under the component page
    componentUI.registerRoute({ path: COMPONENT_IMAGES_SUBPATH, children: <ComponentImagesPage /> });

    return new ComponentImagesUI();
  }
}

ComponentImagesAspect.addRuntime(ComponentImagesUI);
