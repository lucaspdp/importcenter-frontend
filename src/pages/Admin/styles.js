import styled from 'styled-components';
import { FaBars, FaWindowClose, FaTrash, FaPencilAlt } from 'react-icons/fa';

export const Logo = styled.img`

  width: 100%;
  max-width: 400px;
  margin-bottom: 10px;

  justify-self: center;

  position: initial;

`;
export const DimLogo = styled.img`

  width: 100%;
  max-width: 200px;

  position: initial;
  justify-self: right;

  margin-top: 2px;

`;

export const AlientechLogo = styled.img`


  width: 100%;
  max-width: 200px;
  justify-self: right;

  position: initial;
  margin-right: 5px;
  
  --stroke-pos: .1px;
    --stroke-neg: -.1px;
    --stroke-color: rgba(0, 0, 0, 0.23);
    filter: drop-shadow(var(--stroke-pos) 0 0 var(--stroke-color)) 
      drop-shadow(var(--stroke-neg) 0 var(--stroke-color))
      drop-shadow(0 var(--stroke-pos) 0 var(--stroke-color))
      drop-shadow(0 var(--stroke-neg) 0 var(--stroke-color))
      drop-shadow(var(--stroke-pos) var(--stroke-pos) 0 var(--stroke-color)) 
      drop-shadow(var(--stroke-pos) var(--stroke-neg) 0 var(--stroke-color))
      drop-shadow(var(--stroke-neg) var(--stroke-pos) 0 var(--stroke-color))
      drop-shadow(var(--stroke-neg) var(--stroke-neg) 0 var(--stroke-color));   

`;

export const MagicLogo = styled.img`


  width: 100%;
  max-width: 200px;
  justify-self: left;

  position: initial;
  margin-left: 5px;
  
  --stroke-pos: 0px;
    --stroke-neg: 0px;
    --stroke-color: #ffffff20;
    filter: drop-shadow(var(--stroke-pos) 0px 5px var(--stroke-color)) 
      drop-shadow(var(--stroke-neg) 0 var(--stroke-color))
      drop-shadow(0 var(--stroke-pos) 0 var(--stroke-color))
      drop-shadow(0 var(--stroke-neg) 0 var(--stroke-color))
      drop-shadow(var(--stroke-pos) var(--stroke-pos) 0 var(--stroke-color)) 
      drop-shadow(var(--stroke-pos) var(--stroke-neg) 0 var(--stroke-color))
      drop-shadow(var(--stroke-neg) var(--stroke-pos) 0 var(--stroke-color))
      drop-shadow(var(--stroke-neg) var(--stroke-neg) 0 var(--stroke-color));   

`;

export const Container = styled.div`
  background: #fff;

  width: 100%;
  min-height: 75vh;
  height: 100%;

  margin-top: 5vh;

  display: flex;
  flex-direction: column;

  border-top: #c33f3f 2px solid;
`;

export const Header = styled.div`
  width: 100%;
  max-width: 100%;
  height: 20vh;
  margin-top: 10px;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  @media only screen and (max-width: 900px){
    grid-template-columns: 1fr 2fr 1fr;
  }
  @media only screen and (max-width: 600px){
    grid-template-columns: 1fr 3fr 1fr;
  }
  
  justify-content: center;
  align-items: flex-end;
`;

export const Nav = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;

  position: absolute;
  user-select: none;
  ${props=>props.toggle ? `z-index: 0`: 'z-index: 6'};
`;

export const Bars = styled(FaBars)`
  color: #fff;
  background: #7E7E7E;
  padding: 5px;
  cursor: pointer;
  
  transition-duration: 0.5s;
    
  ${props=>props.toggle ? 'transform: translate(-300px, 0);' 
  : 'transform: translate(0, 0);'}
`;

export const Menu = styled.div`

    background-color: #fff;
    height: 74vh;
    width: 300px;
    ${props=> props.toggle ? setTimeout(()=>`display: none`, 1000) : `display: block`}
    
    transition-duration: 0.5s;

    border-right: 6px solid #7E7E7E;
    overflow-y: scroll;

    /* width */
    &::-webkit-scrollbar {
      width: 10px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px grey; 
      border-radius: 10px;
    }
    
    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: #5e5e5e; 
      border-radius: 10px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #2e2e2e; 
    }

    .top-text{
      height: 100px;
      background: #7e7e7e;

      display: flex;
      align-items: center;
      justify-content: center;

      span{
        color: #fff;
        font-size: 1.5rem;
      }
    }

    ul{
      display: flex;
      flex-direction: column;
    }
    li{
      display: flex;
      flex-direction: row;

      justify-content: space-between;
      
      a{
        text-decoration: none;
        margin-top: 10px;
      }
      span{
        margin-left: 5px;
        font-size: 1.5rem;
        transition-duration: 0.2s;


        &:hover{
          opacity: 0.8;
        }
      }
    }
  }
   ${props=>props.toggle ? 'transform: translate(-300px, 0);' 
    : 'transform: translate(0, 0)'};
    
`;

export const MenuSelect = styled.span`
  color: #7e7e7e;
  cursor: pointer;

  ${props=> props.caminho===props.val && `
    color: #c33f3f
  `}
`;

export const FormContainer = styled.div`

  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  align-items: center;

  .radios{
    margin-top: 20px;
  }

  .row{
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .input_button{
    input{
      width: 310px;
    }
  }

  .icon_button{
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 8px;
    border-radius: 50%;

    height: 35px;
    width: 35px;

    margin-top: 35px;
    margin-left: 5px;
  }

  .row_input{
    display: flex;
    flex-direction: column;

  }

  .radio{
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-content: center;

    input[type="radio"] {
      background-color: #ddd;
      background-image: -webkit-linear-gradient(0deg, transparent 20%, hsla(0,0%,100%,.7), transparent 80%),
                        -webkit-linear-gradient(90deg, transparent 20%, hsla(0,0%,100%,.7), transparent 80%);
      border-radius: 10px;
      box-shadow: inset 0 1px 1px hsla(0,0%,100%,.8),
                  0 0 0 1px hsla(0,0%,0%,.6),
                  0 2px 3px hsla(0,0%,0%,.6),
                  0 4px 3px hsla(0,0%,0%,.4),
                  0 6px 6px hsla(0,0%,0%,.2),
                  0 10px 6px hsla(0,0%,0%,.2);
      cursor: pointer;
      display: inline-block;
      height: 15px;
      margin-right: 15px;
      position: relative;
      width: 15px;
      -webkit-appearance: none;
    }
    input[type="radio"]:after {
        background-color: #444;
        border-radius: 25px;
        box-shadow: inset 0 0 0 1px hsla(0,0%,0%,.4),
                    0 1px 1px hsla(0,0%,100%,.8);
        content: '';
        display: block;
        height: 7px;
        left: 4px;
        position: relative;
        top: 4px;
        width: 7px;
    }
    input[type="radio"]:checked:after {
        background-color: #f66;
        box-shadow: inset 0 0 0 1px hsla(0,0%,0%,.4),
                    inset 0 2px 2px hsla(0,0%,100%,.4),
                    0 1px 1px hsla(0,0%,100%,.8),
                    0 0 2px 2px hsla(0,70%,70%,.4);
    }
  }

  form{
    display: flex;
    flex-direction: column;
    margin-top: 10px;

    
    @media screen and (max-width: 530px){
        margin-top: 40px;
    }

    label{
      font-size: 1.5rem;
      color: #7e7e7e;

      margin-top: 10px;
    }
    input{
      border: 1px solid #c33f3f;
      border-radius: 4px;
      height: 30px;
      width: 350px;
      padding: 10px;
      transition-duration: 0.2s;
      color: #555;
      z-index: 1;
      &:hover{
        border: 1px solid #f33;
      }
      &:focus{
        transform: translate(0, -2px);
      }
    }

    button{
      border: 0;
      background: #c33f3f;
      border-radius: 20px;
      margin-top: 10px;
      width: 150px;
      height: 30px;
      font-size: 1.5rem;
      color: #fff;
      transition-duration: 0.2s;
      z-index: 1;

      &.submitForm{
        margin: 0 auto;
        margin-top: 20  px!important;
      }

      &:hover{
        background: #f33;
      }
    }

  }
  .errorSpan{
    color: #f00;
    font-size: 1.2rem;
    margin: 0 5px;
  }

   table {
     border-collapse: collapse;
     width: 80%;
     z-index: 5
   }
  // th, td {
  //   text-align: left;
  //   padding: 8px;
  // }

  // td a{
  //   text-decoration: none;
  //   color: #53f;
  //   transition-duration: 0.2s;
  //   &:hover{
  //     color: #10a;
  //   }
  //   &:visited{
  //     color: #53f;
  //     &:hover{
  //       color: #10a;
  //     }
  //   }
  // }
  // td:last-child{
  //   display: flex;
  //   flex-direction: row;

  //   svg{
  //     margin-right: 10px;
  //   }
  // }

  // tr:nth-child(even){background-color: #fee}
  // tr:not(:nth-child(even)){background-color: #fdd}

  // th {
  //   background-color: #c33f3f;
  //   color: white;
  // }

`;

export const ExitButton = styled(FaWindowClose)`
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 50px;
  color: white;
  cursor: pointer;
  transition: color 0.25s;

  &:hover{
    color: #cecece;
  }

`

export const RadioLabel = styled.span`
  font-size: 1.3rem;
  font-weight: 600;
  transition-duration: 0.2s;
  color: #7d7d7d;

  ${props=>props.isAdmin === props.val && `
    font-size: 1.5rem;
    color: #300;
    font-weight: 700;
  `}
`

export const TrashIcon = styled(FaTrash)`

  color: #c33f3f;
  cursor: pointer;
  margin-left: 5px;

`

export const EditIcon = styled(FaPencilAlt)`

  color: #c33f3f;
  cursor: pointer;
`;

export const ButtonPremade = styled.button`
  width: 150px;
  font-size: 5px;
`;

export const PremadeDiv = styled.div`

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin: 20px auto;

`;

export const FilterContainer = styled.div`
  padding: 10px;
  border-radius: 5px;
  background: #eee;
  margin-bottom: 10px;
  width: 100%;
  z-index: 5;

  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(4, 1fr);

  
  div{
    display: grid;
    grid-template-columns: 1fr 4fr;
    align-items: center;
    label{
      justify-self: end;
      font-size: 1.2rem;
    }
    input{
      font-size: .8rem;
      margin-left: 5px;
      border: none;
      padding: 5px;
      width: 100%;
    }
  }
  @media screen and (max-width: 1024px){
    grid-template-columns: repeat(2, 1fr)!important;

    div{
      display: grid;
      margin-right: 10px;
      grid-template-columns: 1fr 3fr;
      label{
        text-align: right;
      }
    }
  }

  @media screen and (max-width: 730px){
    div{
      grid-template-columns: 1fr 2fr;
    }
  }

  @media screen and (max-width: 640px){
    div{
      grid-template-columns: 3fr 5fr;
    }
  }

  @media screen and (max-width: 530px){
    div{
      grid-template-columns: 1fr 1fr;
    }
  }
  `