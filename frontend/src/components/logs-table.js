import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import HarvestDataService from "../services/harvest.js";

const columns = [
  { id: 'date', label: 'Date', minWidth: 50 },
  { id: 'user_name', label: 'Farmer', minWidth: 50 },
  { id: 'type', label: 'Crop Type', minWidth: 50 },
  { id: 'produce', label: 'Produce Type', minWidth: 50 },
  { id: 'description', label: 'Log Description', minWidth: 50 },
  { id: 'yield', label: 'Yield (kg)', minWidth: 170, align: 'right' }
];


const LogsTable = props => {
  const [logs, setLogs] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  React.useEffect(() => {
    retrieveLogs();
  }, [])
  const retrieveLogs = () => {
    let pageNum = 0;
    HarvestDataService.getAllLogs(pageNum)
      .then(response => {
        console.log(response.data.logs);
        setLogs(response.data.logs);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  return (
    <Paper sx={{ width: '90%', overflow: 'hidden', margin: 'auto' }}>
      <TableContainer sx={{ maxHeight: 700 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {logs
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} size='small' align={column.align}>
                          {column.id === "date" ? (new Date(value)).toLocaleDateString('en-GB') : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={logs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
  ;
export default LogsTable;