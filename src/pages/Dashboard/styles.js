import styled from 'styled-components';
import { FaBars, FaWindowClose } from 'react-icons/fa';

export const Logo = styled.img`

  width: 300px;
  height: 90px;

  position: initial;

  ${props => props.isMobile && (
    `width: 60%;
    object-fit: scale-down;`
  )};

`;
export const DimLogo = styled.img`

  width: 150px;
  height: 38px;

  position: initial;

  margin-top: 2px;
  ${props => props.isMobile && (
    `width: 20%;
    object-fit: scale-down;`
  )};

`;

export const AlientechLogo = styled.img`

  width: 150px;
  height: 38px;

  position: initial;
  margin-left: 5px;
  
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

  ${props => props.isMobile && (
    `width: 20%;
    object-fit: scale-down;`
  )};

`;

export const Container = styled.div`
  background: #fff;

  width: 100%;
  height: 75vh;

  margin-top: 5vh;

  display: flex;
  flex-direction: column;

  border-top: #c33f3f 2px solid;

  overflow-y: hidden;
`;
export const Header = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 20vh;
  
  justify-content: center;
  align-items: flex-end;
`;

export const Nav = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;

  position: absolute;
`;

export const Bars = styled(FaBars)`
  color: #fff;
  background: #7E7E7E;
  padding: 5px;
  cursor: pointer;
  
  transition-duration: 0.5s;
  z-index: 2;
    
  ${props=>props.toggle ? 'transform: translate(-300px, 0);' 
  : 'transform: translate(0, 0)'}
`;

export const Menu = styled.div`

    background-color: #fff;
    height: 74vh;
    width: 300px;

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

    .saldo{
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

    .extrato{
      padding: 0 10px;
      .title{
        display: flex;
        align-items: center;
        justify-content: center;
        color: #7e7e7e;
        font-size: 1.5rem;
        text-align: center;
      };

      ul{
        display: flex;
        flex-direction: column;
      }
      li{
        display: flex;
        flex-direction: row;

        justify-content: space-between;
        
      }
    };
    
    ${props=>props.toggle? (`transform: translate(-300px, 0);`) 
    : `transform: translate(0, 0);  z-index: 2;`}

`;

export const Span = styled.span`
  color: ${props=>!props.debito ? '#56DC7F' : '#DC5656'};
`;

export const PostsContainer = styled.div`
    @import url('https://fonts.googleapis.com/css?family=Kanit:500i&display=swap');

    display: flex;
    flex-direction: column;

    align-items: center;
    z-index: 1;

    overflow-y: auto;
    &::-webkit-scrollbar{
        width: 0;
    }

    .title{
      color: #7d7d7d;
      font-size: 5rem;
      font-family: 'Kanit', sans-serif;
    }
    .saldo{
      font-size: 1rem;
      color: #56DC7F;
    }

    ul{
      display: flex;
      flex-direction: column;
      margin-top: 10px;
      list-style: none;
      overflow-y: auto;
      overflow-x: hidden;
      display: flex;

      
    /* width */
    &::-webkit-scrollbar {
      width: 20px;
      padding-right: 5px;
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

      li{
        display: flex;
        flex-direction: row;
        align-items: center;

        justify-content: space-between;
        width: 100vw;
        height: 100px;


        &:first-child{
          border: 1px solid #f33;
        };
        border-bottom: 1px solid #f33;

        img{
          width: 80px;
        }
        .left-side{
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-left: 15px;

          .desc{
            margin-left: 30px;
            color: #7e7e7e;

            @media screen and (min-width: 100px){
              font-size: 1rem;
            }
            @media screen and (min-width: 700px){
              font-size: 2rem;
            }
            @media screen and (max-width: 720px){
              margin-left: 5px;
            }
          }
          .placa{
            margin-left: 30px;
            font-size: 0.9rem;
            color: #933;
            font-weight: 900;
          }
        }

        .right-side{
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          button{
            background: none;
            border: none;
            margin-right: 40px;
            font-size: 2.5em;
            color: #EE1C25;
            transition-duration: 0.2s;
            @media screen and (max-width: 720px){
              margin-right: 5px;
              font-size: 1.5rem;
            }

            &:hover{
              color: #f33;
              transition-duration: 0.2s;
            }
          }
          span{
            color: #f33;            
            margin-right: 40px;

            @media screen and (max-width: 720px){
              margin-right: 5px;
              font-size: .8rem;
            }
          }
          span.placa{
            color: #933;
          }
        }
      }
    }

`;

export const ExitButton = styled(FaWindowClose)`

  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 50px;
  color: white;
  cursor: pointer;

`