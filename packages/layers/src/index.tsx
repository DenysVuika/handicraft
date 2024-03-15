import { ROOT_NODE } from '@webstencils/core';
import React from 'react';

import { LayerOptions } from './interfaces';
import { LayerContextProvider } from './layers/LayerContextProvider';
import { LayerManagerProvider } from './manager/LayerManagerProvider';
export {
  useLayer,
  DefaultLayer,
  DefaultLayerHeader,
  EditableLayerName
} from './layers';

export const Layers = ({ ...options }: Partial<LayerOptions>) => {
  return (
    <LayerManagerProvider options={options}>
      <LayerContextProvider id={ROOT_NODE} depth={0} />
    </LayerManagerProvider>
  );
};
