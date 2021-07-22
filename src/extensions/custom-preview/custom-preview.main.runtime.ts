import { MainRuntime } from '@teambit/cli';
import { PreviewAspect, PreviewMain } from '@teambit/preview';
import { Component, ComponentMap } from '@teambit/component';
import { DevFilesAspect, DevFilesMain } from '@teambit/dev-files';

// TODO!!
import type { AbstractVinyl } from '@teambit/legacy/dist/consumer/component/sources';

import { CustomPreviewAspect, CUSTOM_PREVIEW_ID } from './custom-preview.aspect';

/** files to claim as the extention's dev files */
const devFilePattern = '**/*.customPreview.*';
/** file types to include in preview */
const previewExtentions = new Set(['.js', '.jsx', '.ts', '.tsx']);

export class CustomPreviewMain {
  /** list a components dev files */
  private getDevFiles(component: Component) {
    return component.state.filesystem.byGlob([devFilePattern]);
  }

  /** list a components preview files */
  private getPreviewFiles(components: Component[]) {
    return ComponentMap.as<AbstractVinyl[]>(components, (component) => {
      const devFiles = this.getDevFiles(component);

      const files = devFiles.filter((file) => previewExtentions.has(file.extname));

      return files;
    }).filter((componenentFiles) => componenentFiles.length > 0);
  }

  /** list files to be bundled in the preview */
  private getModuleMap = async (components: Component[]) => this.getPreviewFiles(components);

  static runtime = MainRuntime;
  static dependencies = [PreviewAspect, DevFilesAspect];
  static async provider([previewMain, devFilesMain]: [PreviewMain, DevFilesMain]) {
    const customPreviewMain = new CustomPreviewMain();

    // add new preview
    previewMain.registerDefinition({
      prefix: CUSTOM_PREVIEW_ID,
      getModuleMap: customPreviewMain.getModuleMap,
      renderTemplatePath: async function (/* context */) {
        // could also get it from `context.env`, etc
        return require.resolve('@teambit/teaching.custom-preview-app');
      },
    });

    // claim dev files
    devFilesMain.registerDevPattern([devFilePattern]);

    return customPreviewMain;
  }
}

CustomPreviewAspect.addRuntime(CustomPreviewMain);