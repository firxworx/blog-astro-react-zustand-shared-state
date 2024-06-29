import { useStore } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { createStore } from 'zustand/vanilla'

export interface Widget {
  id: string
  name: string
  price: number
}

export interface WidgetState {
  widgets: Widget[]
}

export interface WidtgetActions {
  add: (widget: Widget) => void
  remove: (id: string) => void
}

export type WidgetStore = WidgetState & WidtgetActions

export const widgetStore = createStore<WidgetStore>()(
  devtools(
    immer((set, _get) => ({
      widgets: [],
      add: (widget) =>
        set((store) => {
          store.widgets.push(widget)
        }),
      remove: (id) =>
        set((store) => {
          store.widgets = store.widgets.filter((widget) => widget.id !== id)
        }),
    })),
  ),
)

// export store functions for Astro components to call
const { getState, getInitialState, subscribe, setState } = widgetStore
export { getState, getInitialState, subscribe, setState }

/**
 * @see https://docs.pmnd.rs/zustand/guides/typescript#bounded-usestore-hook-for-vanilla-stores
 */
export function useWidgetStore(): WidgetStore
export function useWidgetStore<T>(selector: (state: WidgetStore) => T): T
export function useWidgetStore<T>(selector?: (state: WidgetStore) => T) {
  // biome-ignore lint/style/noNonNullAssertion: zustand provides this example in their docs
  return useStore(widgetStore, selector!)
}
