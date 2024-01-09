import React, { FC, ReactElement } from 'react'

interface HeadingWithTooltipProps {
  tooltip: ReactElement
  heading: ReactElement
}

const HeadingWithTooltip: FC<HeadingWithTooltipProps> = ({ tooltip, heading }) => (
  <div className="flex items-center justify-between pb-2">
    {heading}
    {tooltip}
  </div>
)

export default HeadingWithTooltip
