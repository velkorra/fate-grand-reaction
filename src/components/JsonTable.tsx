import React, { useState } from 'react';

type Props = {
  data: Record<string, any>[];
};

type SortConfig = {
  key: string;
  direction: 'ascending' | 'descending';
} | null;

const JsonTable: React.FC<Props> = ({ data }) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);

  const sortedData = React.useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  if (data.length === 0) {
    return <div>No data available</div>;
  }

  const headers = Object.keys(data[0]);

  return (
    <table className="json-table">
      <thead>
        <tr>
          {headers.map((header) => (
            <th
              key={header}
              onClick={() => requestSort(header)}
              className={sortConfig?.key === header ? sortConfig.direction : ''}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {headers.map((header) => (
              <td key={header}>
                {String(row[header])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default JsonTable;