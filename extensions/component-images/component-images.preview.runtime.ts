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
    envId: string,
    modules: PreviewModule
    // _includedPreviews: [],
    //  _context: RenderingContext,
  ) => {
    const model = this.selectPreviewModel(componentId, modules);
    const mainModule = modules.modulesMap.default;
    const defaultExports = mainModule.default;

    const props: CustomPreviewTemplateProps = { componentId, assets: model };
    defaultExports(props);
  };

  /** narrow the data needed to render this component from the full list of assets */
  selectPreviewModel = (componentId: any, module: PreviewModule<ImageAssets>) => {
    const id = componentId;
    const images = module.componentMap[id.name] || [];
    
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
      render: customPreviewPreview.render.bind(customPreviewPreview),
      selectPreviewModel: customPreviewPreview.selectPreviewModel,
      // // allow you to get other previews as part of your data
      // include: ['compositions'],
    });

    return customPreviewPreview;
  }
}

ComponentImagesAspect.addRuntime(ComponentImagesPreview);
