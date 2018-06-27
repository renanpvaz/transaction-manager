import React from 'react'
import cn from 'classnames'

import './data-table.css'

class DataTableColumn extends React.Component {
  state = {
    order: ''
  }

  handleClick = () => {
    const { order } = this.state

    this.setState({
      order: !order ?
        'desc'  : order === 'desc' ?
        'asc'   : ''
    }, () => this.props.onSort(this.state.order))
  }

  render() {
    const { order } = this.state
    const { name, width } = this.props

    return (
      <th
        key={name}
        className={cn('data-table-col', order && `data-table-col--${order}`)}
        onClick={this.handleClick}
        style={{ width: width }}
      >
        {name}
      </th>
    )
  }
}

const DataTable = ({
  columns,
  data = [],
  children,
  onClickRow,
  onSort,
}) => (
  <table className="data-table">
    <tbody>
      <tr>
        {columns.map(c => (
          <DataTableColumn
            onSort={order => onSort(c.name, order)}
            {...c}
          />
        ))}
      </tr>
      {data.map((item, i) => (
        <tr key={i} tabIndex="0" onClick={() => onClickRow(item)}>
          {children(item)}
        </tr>
      ))}
    </tbody>
  </table>
)

export default DataTable
