import { FC, JSXElementConstructor, ReactElement } from 'react'

interface WidgetProps {
  title: string | ReactElement<any, string | JSXElementConstructor<any>>
  value: number
  icon: JSX.Element
  description: string | ReactElement<any, string | JSXElementConstructor<any>>
}

const Widget: FC<WidgetProps> = ({ title, value, icon, description }) => (
  <div className="relative rounded-lg overflow-hidden shadow-xl shadow-blue-900/10 ring-1 ring-blue-900/10 bg-gradient-to-b to-gray-900 from-blue-900/40 bg-gray-900">
    <div className="relative flex items-center p-6 rounded-lg h-full">
      <div className="relative flex flex-wrap items-center w-full z-2 text-base leading-7 text-white flex items-center justify-between gap-3">
        <span className="transition-all ease-in-out duration-300">
          <p className="text-sm/6 font-medium text-gray-400">{title}</p>
          <p className="flex items-baseline gap-x-2">
            <span className="text-4xl font-semibold tracking-tight text-white">{value}</span>
          </p>
        </span>
        {icon}
        <div className="w-full">
          <p className="text-xs text-gray-400">{description}</p>
        </div>
      </div>
    </div>
  </div>
)

export default Widget
