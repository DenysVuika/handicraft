import React, { useContext, useEffect, useMemo } from 'react';
import invariant from 'tiny-invariant';

import { EditorContext } from './EditorContext';
import { QueryMethods } from './query';
import { EditorStore } from './store';

import { ERROR_USE_EDITOR_OUTSIDE_OF_EDITOR_CONTEXT } from '../constants';
import { CoreEventHandlers, useEventHandler } from '../events';
import { EventHandlerConnectors } from '../events/EventHandlers/interfaces';
import { wrapConnectorHooks } from '../events/EventHandlers/wrapConnectorHooks';
import { EditorState } from '../interfaces';
import {
  useCollector,
  useCollectorReturnType,
  QueryCallbacksFor
} from '../utils';

export type EditorCollector<C> = (
  state: EditorState,
  query: QueryCallbacksFor<typeof QueryMethods>
) => C;

export type useInternalEditorReturnType<C = null> = useCollectorReturnType<
  EditorStore,
  C
> & {
  inContext: boolean;
  store: EditorStore;
  connectors: EventHandlerConnectors<CoreEventHandlers, React.ReactElement>;
};

export function useInternalEditor<C>(
  collector?: EditorCollector<C>
): useInternalEditorReturnType<C> {
  const handler = useEventHandler();
  const store = useContext(EditorContext);
  invariant(store, ERROR_USE_EDITOR_OUTSIDE_OF_EDITOR_CONTEXT);

  const collected = useCollector(store, collector);

  const connectorsUsage = useMemo(
    () => handler && handler.createConnectorsUsage(),
    [handler]
  );

  useEffect(() => {
    connectorsUsage.register();

    return () => {
      connectorsUsage.cleanup();
    };
  }, [connectorsUsage]);

  const connectors = useMemo(
    () => connectorsUsage && wrapConnectorHooks(connectorsUsage.connectors),
    [connectorsUsage]
  );

  return {
    ...collected,
    connectors,
    inContext: !!store,
    store
  };
}
