import { render } from '@testing-library/react';
import React from 'react';

import { createTestNode } from '../../utils/createTestNode';
import { Element } from '../Element';
import { Node } from '../../interfaces';

let parentNode: Node;
let existingLinkedNode: Node;
const newLinkedNode = createTestNode('newLinkedNode');

const addLinkedNodeFromTree = jest.fn();
const parseReactElement = jest.fn().mockImplementation(() => ({
  rootNodeId: newLinkedNode.id
}));

jest.mock('../../editor/useInternalEditor', () => ({
  useInternalEditor: () => ({
    actions: {
      history: {
        ignore: jest.fn().mockImplementation(() => ({
          addLinkedNodeFromTree
        }))
      }
    },
    query: {
      parseReactElement,
      node: jest.fn().mockImplementation((id) => ({
        get() {
          return id === 'parent-node' ? parentNode : existingLinkedNode;
        }
      }))
    }
  })
}));

jest.mock('../useInternalNode', () => ({
  useInternalNode: () => ({
    node: parentNode,
    inNodeContext: true
  })
}));

const NodeElementTest = jest.fn().mockImplementation(() => null);

jest.mock('../NodeElement', () => ({
  NodeElement: jest.fn().mockImplementation((props) => NodeElementTest(props))
}));

describe('<Element />', () => {
  beforeEach(() => {
    parentNode = createTestNode('test');
  });

  describe('when no id is passed', () => {
    it('should throw error', () => {
      expect(() => render(<Element />)).toThrow();
    });
  });

  describe('when there is no existing node', () => {
    let elementProps: { color: string };
    let children: React.ReactElement;

    beforeEach(() => {
      elementProps = {
        color: '#fff'
      };

      children = <h1>Child</h1>;
      render(
        <Element id="test" {...elementProps}>
          {children}
        </Element>
      );
    });

    it('should call query.parseReactElement()', () => {
      expect(parseReactElement).toHaveBeenCalledWith(
        <Element {...elementProps}>{children}</Element>
      );
    });
    it('should call actions.addLinkedNodeFromTree()', () => {
      expect(addLinkedNodeFromTree).toHaveBeenCalled();
    });
    it('should render a new linked Node', () => {
      expect(NodeElementTest).toHaveBeenCalledWith({
        id: newLinkedNode.id
      });
    });
  });

  describe('when there is an existing node', () => {
    beforeEach(() => {
      existingLinkedNode = createTestNode('existing-linked-node', {
        type: 'div',
        props: {
          background: '#000',
          color: '#fff'
        }
      });

      parentNode = createTestNode('parent-node', {
        linkedNodes: {
          test: existingLinkedNode.id
        }
      });

      render(<Element id="test" color="#000" />);
    });
    it('should render existing Node', () => {
      expect(NodeElementTest).toHaveBeenCalledWith({
        id: existingLinkedNode.id
      });
    });
  });
});
