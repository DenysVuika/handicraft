import { useEditor } from '@craftjs/core';
import { Layers } from '@craftjs/layers';
import styled from '@emotion/styled';
import LayersIcon from '@mui/icons-material/Layers';
import TuneIcon from '@mui/icons-material/Tune';
import React, { useState } from 'react';

import { SidebarItem } from './SidebarItem';

import { Toolbar } from '../../Toolbar';

export const SidebarDiv = styled.div<{ enabled: boolean }>`
  width: 280px;
  opacity: ${(props) => (props.enabled ? 1 : 0)};
  background: #fff;
  margin-right: ${(props) => (props.enabled ? 0 : -280)}px;
`;

const SidebarContent = styled.div({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
});

export const Sidebar = () => {
  const [layersVisible, setLayerVisible] = useState(true);
  const [toolbarVisible, setToolbarVisible] = useState(true);
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <SidebarDiv enabled={enabled} className="sidebar transition app-bg-white">
      <SidebarContent>
        <SidebarItem
          icon={TuneIcon}
          title="Properties"
          height={!layersVisible ? 'full' : '55%'}
          visible={toolbarVisible}
          onChange={(val) => setToolbarVisible(val)}
        >
          <Toolbar />
        </SidebarItem>
        <SidebarItem
          icon={LayersIcon}
          title="Layers"
          height={!toolbarVisible ? 'full' : '45%'}
          visible={layersVisible}
          onChange={(val) => setLayerVisible(val)}
        >
          <div>
            <Layers expandRootOnLoad={true} />
          </div>
        </SidebarItem>
      </SidebarContent>
    </SidebarDiv>
  );
};
