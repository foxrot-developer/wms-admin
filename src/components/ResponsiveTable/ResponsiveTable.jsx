import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ResponsiveTable = ({ data, column }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell width={50}>#</TableCell>
            {column.map((item) => (
              <TableCell width={250} key={item}>
                {item}
              </TableCell>
            ))}
            <TableCell align='center' width={100}>
              {t('action')}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{data}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default ResponsiveTable;
