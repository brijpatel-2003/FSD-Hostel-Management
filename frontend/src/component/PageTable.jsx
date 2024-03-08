import React, { useState } from 'react';

const PaginationTable = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
    console.log(props.data);


  const data = {
    columns: [
        {
            label: '# ',
            field: 'id',
            width: 10
        },
      {
        label: 'Room No. ',
        field: 'room_no',
        width: 50
      },
      {
        label: "Type",
        field: 'room_type'
      },
      {
        label: 'Fees',
        field: 'room_fees'
      },{
        label: 'student_capacity',
        field: 'student_capacity'
      },{
        label: 'student_available',
        field: 'student_available'
      }
    ],
    rows: props.data
  };

  const itemsPerPage = 3;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.rows.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            {data.columns.map((column, index) => (
              <th key={index}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((row, index) => (
            <tr key={index}>
              {data.columns.map((column, index) => (
                <td key={index}>{row[column.field]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={() => paginate(currentPage + 1)} disabled={currentItems.length < itemsPerPage}>
          Next
        </button>
      </div>
    </div>
  );
}

export default PaginationTable;
