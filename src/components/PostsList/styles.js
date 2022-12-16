import styled from 'styled-components';

export const Filter = styled.form`
    width: 90%;
    display: flex;
    flex-direction: row;
    /* display: grid!important; */
    /* grid-template-columns: 9fr 1fr; */
    /* grid-template-columns: 1fr!important; */
    align-items: center;
    column-gap: 5px;
    @media screen and (min-width: 800px){
        flex-direction: row!important;
    }

    button{
        margin-top: 5px;
        margin-left: 15px;
        color: rgba(0, 0, 0, 0.87);
        box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
        background-color: #e0e0e0;
        border-radius: 4px!important;
        font-size: 1rem!important;
        @media screen and (max-width: 800px){
            margin: 5px auto;
        }
    }
`;