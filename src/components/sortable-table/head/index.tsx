import { useState } from 'react';
import { TableColumn } from '../body';

export interface TableHeadProps {
  columns: TableColumn[];
  handleSorting: (a: string, b: 'asc' | 'desc') => void;
  defaultSortField: string;
}

const TableHead = ({ columns, handleSorting, defaultSortField }: TableHeadProps) => {
  const [sortField, setSortField] = useState(defaultSortField);
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');

  const handleSortingChange = (accessor: string) => {
    const sortOrder = accessor === sortField && order === 'asc' ? 'desc' : 'asc';
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
  };

  return (
    <thead>
      <tr>
        {columns.map(({ label, accessor, sortable }) => {
          const cl = sortable
            ? sortField && sortField === accessor && order === 'asc'
              ? 'up'
              : sortField && sortField === accessor && order === 'desc'
              ? 'down'
              : 'default'
            : '';
          return (
            <th
              key={accessor}
              onClick={sortable ? () => handleSortingChange(accessor) : undefined}
              className={cl}>
              {label}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHead;
