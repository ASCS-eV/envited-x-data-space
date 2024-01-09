import React, { FC } from 'react'

import { formatDate } from '../../../common/utils'

interface Props {
  date: string
}

const Date: FC<Props> = ({ date }) => <time dateTime={date}>{formatDate(date)}</time>

export default Date
