import styled from 'styled-components';

export const Filter = styled.form`
    width: 90%;
    display: grid!important;
    grid-template-columns: 9fr 1fr;
    column-gap: 5px;

    button{
        margin-top: 5px;
        color: rgba(0, 0, 0, 0.87);
        box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
        background-color: #e0e0e0;
        border-radius: 4px!important;
        font-size: 1rem!important;
    }
`;