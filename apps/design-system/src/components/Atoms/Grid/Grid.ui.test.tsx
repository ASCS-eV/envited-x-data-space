import { render, screen } from '@testing-library/react'

import { Grid, GridRow } from '.'
import { Columns } from '../../../types'

describe('components/Atoms/Grid', () => {
  it.each([
    [Columns.two, 'xl:grid-cols-2'],
    [Columns.three, 'xl:grid-cols-3'],
    [Columns.four, 'xl:grid-cols-4'],
    [Columns.five, 'xl:grid-cols-5'],
  ])('should render as expected', (columns, expected) => {
    // when ... rendering component
    render(
      <Grid>
        <GridRow columns={columns}>
          <div>Grid item 1</div>
          <div>Grid item 2</div>
        </GridRow>
      </Grid>,
    )

    const gridElement = screen.getByText('Grid item 1')

    // then ... should render with expected css class
    expect(gridElement.parentElement).toHaveClass(expected)
  })
})
