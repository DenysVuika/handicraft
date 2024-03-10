import { NodeId, Indicator } from '@craftjs/core';
import React from 'react';

export type Layer = {
  id: NodeId;
  dom: HTMLElement;
  headingDom: HTMLElement;
  expanded: boolean;
  event: LayerRefEvents;
};

export type LayerRefEvents = Record<LayerEvents, boolean>;

export type LayerEvents = 'selected' | 'hovered';

export type LayerOptions = {
  expandRootOnLoad: boolean;
  renderLayer: React.ElementType;
};

export type LayerIndicator = Indicator & {
  onCanvas: boolean;
};

export type LayerState = {
  layers: Record<NodeId, Layer>;
  events: Record<LayerEvents, NodeId | null> & {
    indicator: LayerIndicator;
  };

  options: LayerOptions;
};
