import { TablePagination } from '@material-ui/core';
import React from 'react'
import { Container, TableContainer, TableRowHead, Tabl, TableHead, TableRow, TableCell } from './styles';

const CustomTable = ({data, columns, page, setPage, rowsPerPage, setRowsPerPage, dataCount}) => {
    return(<Container>
        <TableContainer>
            <TableRowHead>
                {columns.map(column=>(
                    <TableHead key={column.name}>{column.name}</TableHead>
                ))}
            </TableRowHead>
            {data.map(user=>(
                <TableRow key={user._id}>
                    {columns.map(column=>
                        <TableCell key={`user-${user._id}-${column.name}`}>{column.cell(user)}</TableCell>
                    )}
                </TableRow>
            ))}

        </TableContainer>
        <TablePagination rowsPerPageOptions={[10, 25, 50]} labelRowsPerPage="Linhas por página" rowsPerPage={rowsPerPage} page={page} onPageChange={(e, val)=> setPage(val)} onRowsPerPageChange={(e, val)=> {setRowsPerPage(val.props.value);}} count={parseInt(dataCount)}/>
    </Container>)

}

export default CustomTable;