import { Button } from '@/components/ui/Button'
import { Heading } from '@/components/ui/Heading'
import { formatCurrencyUSD, generateRandomWidget } from '@/helpers/mock'
import { type Widget, useWidgetStore } from '@/stores/widget.store'
import { useShallow } from 'zustand/react/shallow'

type WidgetItemProps = {
  [K in keyof Widget]: Widget[K]
}

/**
 * React component that interfaces with the same zustand widget store as the Astro component.
 */
export function ReactZustand(): JSX.Element {
  return (
    <div className="grid grid-cols-1 gap-4">
      <Heading as="h2">React + Zustand</Heading>

      <Heading as="h3">Widgets</Heading>
      <WidgetsList />

      <Heading as="h3">Actions</Heading>
      <div className="widget-actions">
        <WidgetActions />
      </div>
    </div>
  )
}

function WidgetsList(): JSX.Element {
  const widgets = useWidgetStore((state) => state.widgets)

  if (!widgets.length) {
    return (
      <p>
        <em>No widgets</em>
      </p>
    )
  }

  return (
    <ul className="widget-list">
      {widgets.map((widget) => (
        <li key={widget.id}>
          <WidgetItem {...widget} />
        </li>
      ))}
    </ul>
  )
}

function WidgetItem({ id, name, price }: WidgetItemProps): JSX.Element {
  const removeWidget = useWidgetStore((state) => state.remove)

  return (
    <div className="widget-item">
      <span>
        {formatCurrencyUSD(price)} &mdash; {name}
      </span>
      <Button
        type="button"
        onClick={() => {
          removeWidget(id)
        }}
      >
        Remove
      </Button>
    </div>
  )
}

function WidgetActions(): JSX.Element {
  // although its not important in this case the following provides an example of useShallow which is useful for nested objects
  const count = useWidgetStore(useShallow((state) => state.widgets.length))
  const addWidget = useWidgetStore((state) => state.add)

  return (
    <Button
      type="button"
      onClick={() => {
        addWidget(generateRandomWidget(count + 1))
      }}
    >
      Add Widget
    </Button>
  )
}
