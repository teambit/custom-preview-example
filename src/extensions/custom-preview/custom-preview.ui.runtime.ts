import { PreviewRuntime } from '@teambit/preview';
import { ReactAspect, ReactPreview } from '@teambit/react';
import { CustomPreviewAspect } from './custom-preview.aspect';

export class CustuomPreviewUI {
  static runtime = PreviewRuntime;
  static dependencies = [];

  static async provider([]: []) {}
}

CustomPreviewAspect.addRuntime(CustuomPreviewUI);
