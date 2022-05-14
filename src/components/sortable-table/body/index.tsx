export interface TableColumn {
  label: string;
  accessor: string;
  sortable: boolean;
  formatter?: (i: number, data: any) => any;
  style?: (data: any) => React.CSSProperties;
}

export interface TableBodyProps {
  tableData: any[];
  columns: TableColumn[];
}

const TableBody = ({ tableData, columns }: TableBodyProps) => {
  return (
    <tbody>
      {tableData.map((data, index: number) => {
        return (
          <tr key={data.language_name}>
            {columns.map(({ accessor, formatter, style }) => {
              const tData = formatter
                ? formatter(index, data[accessor])
                : data[accessor]
                ? data[accessor]
                : '——';
              return (
                <td key={accessor} style={style ? style(data[accessor]) : undefined}>
                  {tData}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
