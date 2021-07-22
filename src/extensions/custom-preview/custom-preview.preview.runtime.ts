import { PreviewRuntime, PreviewModule, ModuleFile, RenderingContext } from '@teambit/preview';
import { PreviewAspect, PreviewPreview } from '@teambit/preview';
import { CustomPreviewAspect, CUSTOM_PREVIEW_ID } from './custom-preview.aspect';

export type ImageAssets = string;
export type CustomPreviewTemplateProps = {
  componentId: string;
  assets: string[];
  // executionContext: RenderingContext;
};

export class CustomPreviewPreview {
  render = (componentId: string, modules: PreviewModule, _includedPreviews: [], context: RenderingContext) => {
    // in theory, we could just render whatever preview we want
    // practically, each component could have its own template, with its own technology, especially if the env is customizing it
    // so, we register the template `main.renderTemplatePath()`, and the preview adds it to the webpack bundle as `.mainModule`
    //
    // we might rename it, it should be clearer

    const template = modules.mainModule.default;
    const model = this.selectPreviewModel(componentId, modules);

    const props: CustomPreviewTemplateProps = { componentId, assets: model };
    template(props);
  };

  selectPreviewModel = (componentId: string, module: PreviewModule<ImageAssets>) => {
    const id = componentId;
    const images = module.componentMap[id] || [];

    // webpack loads images as url strig, and exports it as default
    const imagesUrls = images.map((asset) => asset.default);
    return imagesUrls;
  };

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
