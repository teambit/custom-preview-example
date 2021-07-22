import { PreviewRuntime, PreviewModule, RenderingContext } from '@teambit/preview';
import { PreviewAspect, PreviewPreview } from '@teambit/preview';
import { CustomPreviewAspect, CUSTOM_PREVIEW_ID } from './custom-preview.aspect';

export class CustomPreviewPreview {
  render = (componentId: string, modules: PreviewModule, _includedPreviews: [], context: RenderingContext) => {
    const template = modules.mainModule.default;

    template(/* props of customPreviewMountPoint */);
  };
  selectPreviewModel = (componentId: string, module: PreviewModule<any>) => {};

  static runtime = PreviewRuntime;
  static dependencies = [PreviewAspect];

  static async provider([previewPreview]: [PreviewPreview]) {
    const customPreviewPreview = new CustomPreviewPreview();

    previewPreview.registerPreview({
      name: CUSTOM_PREVIEW_ID,
      render: customPreviewPreview.render,
      selectPreviewModel: customPreviewPreview.selectPreviewModel,

      // // allow you to get other previews as part of your data
      // include: ['compositions'],
    });

    return customPreviewPreview;
  }
}

CustomPreviewAspect.addRuntime(CustomPreviewPreview);
