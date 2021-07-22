import { MainRuntime } from '@teambit/cli';
import { PreviewAspect, PreviewMain } from '@teambit/preview';
import { Component, ComponentMap } from '@teambit/component';
import { DevFilesAspect, DevFilesMain } from '@teambit/dev-files';

// adds `component-images-app` as a package dependency of `component-images`.
// (this loads the preview-app in the main runtime, which is not optimal)
import '@teambit/teaching.component-images-app';

// // TODO - must not rely on @teambit/legacy!
// import type { AbstractVinyl } from '@teambit/legacy/dist/consumer/component/sources';

import { ComponentImagesAspect } from './component-images.aspect';
import { COMPONENT_IMAGES_PREVIEW_ID } from './config';

type AbstractVinyl = any;

/** files to claim as the extention's dev files */
const devFilePattern = '**/*.snapshot.{png,jpeg,jpg,svg}';
/** file types to include in preview */
const imageFilePattern = '**/*.{png,jpeg,jpg,svg}';

export class ComponentImagesMain {
  /** list a components preview files */
  private getPreviewFiles(components: Component[]) {
    return ComponentMap.as<AbstractVinyl[]>(components, (component) => {
      const files = component.state.filesystem.byGlob([imageFilePattern]);
      return files;

      // can filter, check against dev files, etc.
    }).filter((componentFiles) => componentFiles.length > 0);
  }

  /** list files to be bundled in the preview */
  private getModuleMap = async (components: Component[]) => this.getPreviewFiles(components);

  static runtime = MainRuntime;
  static dependencies = [PreviewAspect, DevFilesAspect];
  static async provider([previewMain, devFilesMain]: [PreviewMain, DevFilesMain]) {
    const customPreviewMain = new ComponentImagesMain();

    // add new preview
    previewMain.registerDefinition({
      // name of the link file
      // can be found at node_modules/.cache/bit/teambit.preview/.../
      prefix: COMPONENT_IMAGES_PREVIEW_ID,
      // use arrow functions, or .bind() the functions to the instance
      getModuleMap: customPreviewMain.getModuleMap,
      // bundles the path to the preview app
      renderTemplatePath: async function (/* context */) {
        // could also get it from `context.env`, etc
        return require.resolve('@teambit/teaching.component-images-app');
      },
    });

    // claim dev files
    // TODO - might support for regex
    devFilesMain.registerDevPattern([devFilePattern]);

    return customPreviewMain;
  }
}

ComponentImagesAspect.addRuntime(ComponentImagesMain);
