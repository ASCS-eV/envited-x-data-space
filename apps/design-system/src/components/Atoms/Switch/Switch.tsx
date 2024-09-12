import { Switch } from '@headlessui/react'
import React, { FC } from 'react'

interface Props {
  status: boolean
  onClick: (status: boolean) => void
}

const SwitchAtom: FC<Props> = ({ status, onClick }) => (
  <Switch
    checked={status}
    onChange={onClick}
    className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2"
  >
    <span aria-hidden="true" className="pointer-events-none absolute h-full w-full rounded-md bg-white" />
    <span
      aria-hidden="true"
      className="pointer-events-none absolute mx-auto h-4 w-9 rounded-full bg-gray-200 transition-colors duration-200 ease-in-out group-aria-checked:bg-blue-900"
    />
    <span
      aria-hidden="true"
      className="pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out group-aria-checked:translate-x-5"
    />
  </Switch>
)

export default SwitchAtom
