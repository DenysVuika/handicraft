# @craftjs/layers

A Photoshop-like layers panel for your page editor.

<div align="center" style={{d}}>
    <img src="https://user-images.githubusercontent.com/16416929/71734439-f2aada00-2e86-11ea-9d5f-c782ccbc8e54.gif"/>
</div>

<p align="center">
  <strong>
    <a href="https://craft.js.org/docs/additional/layers">Documentation</a>
  </strong>
</p>

<p align="center">
  <strong>
    <a href="https://craft.js.org">Craft.js</a>
  </strong>
</p>

## Usage

```bash
yarn add @craftjs/layers styled-components
```

```jsx
import React from "react";
import {Editor} from "@craftjs/core"
import {Layers} from "@craftjs/layers"

export default function App() {
  return (
    <div style={{margin: "0 auto", width: "800px"}}>
      <Typography variant="h5" align="center">A super simple page editor</Typography>
      <Editor resolver={...}>
        <Layers />
      </Editor>
    </div>
  );
}
```
