import { PreviewRuntime, PreviewModule } from '@teambit/preview';
import { PreviewAspect, PreviewPreview } from '@teambit/preview';
import { ComponentImagesAspect } from './component-images.aspect';
import { COMPONENT_IMAGES_PREVIEW_ID } from './config';

export type ImageAssets = string;
export type CustomPreviewTemplateProps = {
  componentId: string;
  assets: string[];
};

export class ComponentImagesPreview {
  render = (
    componentId: string,
    modules: PreviewModule
    // _includedPreviews: [],
    //  _context: RenderingContext,
  ) => {
    // in theory, we could just render whatever preview we want
    // practically, each component could have its own template, with its own technology, especially if the env is customizing it
    // so, we register the template `main.renderTemplatePath()`, and the preview adds it to the webpack bundle as `.mainModule`

    const template = modules.mainModule.default;
    const model = this.selectPreviewModel(componentId, modules);

    const props: CustomPreviewTemplateProps = { componentId, assets: model };
    template(props);
  };

  /** narrow the data needed to render this component from the full list of assets */
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
    const customPreviewPreview = new ComponentImagesPreview();

    previewPreview.registerPreview({
      name: COMPONENT_IMAGES_PREVIEW_ID,
      render: customPreviewPreview.render,
      selectPreviewModel: customPreviewPreview.selectPreviewModel,

      // // allow you to get other previews as part of your data
      // include: ['compositions'],
    });

    return customPreviewPreview;
  }
}

ComponentImagesAspect.addRuntime(ComponentImagesPreview);
