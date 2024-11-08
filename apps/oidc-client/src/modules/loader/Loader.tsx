import { FC } from 'react'

import styles from './Loader.module.css'

export const Loader: FC = () => {
  return (
    <div className={styles.loader}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
