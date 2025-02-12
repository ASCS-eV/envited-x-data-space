import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { FC, JSXElementConstructor, ReactElement } from 'react'

interface WidgetProps {
  title: string | ReactElement<any, string | JSXElementConstructor<any>>
  href: string
  description: string | ReactElement<any, string | JSXElementConstructor<any>>
}

const ActionWidget: FC<WidgetProps> = ({ href, title, description }) => (
  <a
    href={href}
    className="group relative block cursor-pointer rounded-lg border border-gray-300 py-4 px-6 group-hover:bg-blue-800 hover:bg-blue-900 hover:border-blue-900 transition-all ease-in-out duration-300"
  >
    <p className="text-base font-medium text-gray-900 group-hover:text-white">{title}</p>
    <p className="mt-1 text-sm text-gray-500 group-hover:text-white/75">{description}</p>
    <div className="absolute right-6 top-5 group-hover:right-4 transition-all ease-in-out duration-300">
      <button type="button" className="-m-2 inline-flex p-2 text-blue-900 group-hover:text-white">
        <ChevronRightIcon aria-hidden="true" className="size-5" />
      </button>
    </div>
  </a>
)

export default ActionWidget
