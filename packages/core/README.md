# craft.js

Page editors are a great way to provide an excellent user experience. However, to build one is often a pretty dreadful task.

There're existing libraries that come with a fully working page editor out of the box with a user interface and editable components. However, if you wish to make customizations such as modifying the user interface and its behavior, it will most definitely involve modifying the library itself.

Craft.js solves this problem by modularizing the building blocks of a page editor. It ships with a drag-n-drop system and handles the way user components should be rendered, updated and moved - among other things. With this, you'll be able to build your own page editor exactly how you want it to look and behave.

## Docs

- [Core concepts](https://craft.js.org/docs/concepts/nodes)
- [Tutorial](https://craft.js.org/docs/guides/basic-tutorial)
- [API Reference](https://craft.js.org/docs/api/editor-state)

## Examples

These examples should give you an idea on the flexibility of Craft.js.

Both these examples look very different from each other, with very different UI. But they are both built with Craft.js! 🤯

- [Landing](https://craft.js.org)
- [Basic](https://craft.js.org/examples/basic)

## Features

### It's just React

No need for complicated plugin systems. Design your editor from top to bottom the same way as you would design any other frontend application in React.

A simple user component can easily be defined as such:

```jsx
import {useNode} from "@craftjs/core";

const TextComponent = ({text}) => {
  const { connectors: {drag} } = useNode();

  return (
    <div ref={drag}>
      <h2>{text}</h2>
    </div>
  )
}
```

Heck, the entire UI of your page editor is built using just React.

```jsx
import React from "react";
import {Editor, Frame, Canvas, Selector} from "@craftjs/core";
const App = () => {
  return (
    <div>
      <header>Some fancy header or whatever</header>
      <Editor>
        // Editable area starts here
        <Frame resolver={{TextComponent, Container}}>
          <Canvas>
            <TextComponent text="I'm already rendered here" />
          </Canvas>
        </Frame>
      </Editor>
    </div>
  )
}
```

### Control how your components are edited

An obvious requirement for page editors is that they need to allow users to edit components. With Craft.js, you control the process of which these components should be edited.

In the following example, when the user clicks on a component, we'll display a modal that requires the user to input a value for the `text` prop. As the input value changes, the component will be re-rendered with updated prop.

```jsx
import {useNode} from "@craftjs/core";

const TextComponent = ({text}) => {
  const { connectors: { connect, drag }, isClicked, actions: {setProp} } = useNode(
    (state) => ({
      isClicked: state.event.selected,
    })
  );

  return (
    <div ref={dom => connect(drag(dom))}>
      <h2>{text}</h2>
      {
        isClicked ? (
          <Modal>
            <input
              type="text"
              value={text}
              onChange={e => setProp(e.target.value)}
            />
          </Modal>
        )
      }
    </div>
  )
}
```

With this, you could easily implement content editable text or drag-to-resize components, just as any modern page editor would have.

### User components with droppable regions

Let's say we need a "Container" component which users can drop into the editor. Additionally, we would also like them to be able to drag and drop other components into the Container.

In Craft.js, it's as simple as calling the `<Canvas />`

```jsx
import {useNode} from "@craftjs/core";
const Container = () => {
  const { connectors: {drag} } = useNode();

  return (
    <div ref={drag}>
      <Canvas id="drop_section">
         // Now users will be able to drag/drop components into this section
        <TextComponent />
      </Canvas>
    </div>
  )
}
```

### Extensible

Craft.js provides an expressive API which allows you to easily read and manipulate the editor state. Let's say you would like to implement a copy function for a component:

```jsx
import {useEditor, useNode} from "@craftjs/core";
const Container = () => {
  const { actions: {add}, query: { createNode, node } } = useEditor();
  const { id, connectors: {drag, connect} } = useNode();
  return (
    <div ref={dom => connect(drag(dom))}>
      ...
      <a onClick={() => {
        const { data: {type, props}} = node(id).get();
        add(
          createNode(React.createElement(type, props));
        );
      }}>
        Make a copy of me
      </a>
    </div>
  )
}

```

### Serializable state

The editor's state can be serialized into JSON which you can then apply a compression technique of your choice for storage.

```jsx
const SaveButton = () => {
  const { query } = useEditor();
  return <a onClick={() => console.log(query.serialize()) }>Get JSON</a>
}
```

Of course, Craft.js will also able to recreate the entire state from the JSON string.

```jsx
const App = () => {
  const jsonString = /* retrieve JSON from server */
  return (
    <Editor>
      <Frame json={jsonString}>
        ...
      </Frame>
    </Editor>
  )
}
```

## Who is this for?

You should use this if:

- ✅ You want to design your page editor according to your own UI specifications. With Craft.js, you control almost every aspect of the look and feel of your page editor.
- ✅ You like the React ecosystem. Being a React framework, not only do you get to build your user interface declaratively, but you will also be able to extend upon thousands of existing React components for your page editor.
- ✅ You're the coolest kid in class 😎

You should not use this if:

- ❌ You need a page editor that works out of the box. Craft.js is an abstraction where you implement your own page editor upon. For example, it does not come with a ready-made user interface.
  - However, you could still consider using the [examples](https://github.com/prevwong/craft.js/tree/develop/examples) as a starting point.

## Additional Packages

- **[@craftjs/layers](https://github.com/prevwong/craft.js/tree/develop/packages/layers)** A Photoshop-like layers panel

## Acknowledgements

- **[craft.js](https://github.com/prevwong/craft.js)**: the original project by Previnash Wong Sze Chuan, MIT license
