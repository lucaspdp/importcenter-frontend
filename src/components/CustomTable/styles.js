import styled from 'styled-components'

export const Container = styled.div`
    z-index: 1;
    width: 90%;
    max-width: 90%;

    overflow-x: auto;
`;

export const TableContainer = styled.table`
    padding: 10px 5px;
    width: 100%!important;
`;

export const TableRowHead = styled.tr`

`;
export const TableHead = styled.th`
    text-align: left;
    padding: 20px 5px;
    background-color: #eee;
`;

export const TableRow = styled.tr`
    border-bottom: 1px solid #22222220;
    &:hover{
        background: #f5f5f5;
    }

`;

export const TableCell = styled.td`
    text-align: left;
    padding: 20px 5px;
    
    width: auto;
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 25vw;
    margin: auto auto;
`;