import styled from 'styled-components';

export const ExportButton = styled.button`

    margin: 10px 0;

    height: 40px;
    width: 150px;

    border: 0;
    border-radius: 20px;
    background-color: #c33f3f;

    color: white;
    font-size: 20px;

    transition-duration: 0.4s;

    &:hover{
        background-color: #c0303f;
    }
    &:active{
        background-color: #fcc;
    }
    z-index: 5;
`;
