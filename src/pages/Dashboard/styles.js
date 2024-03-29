import styled from 'styled-components';
import { FaBars, FaWindowClose } from 'react-icons/fa';


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
  height: 75vh;

  margin-top: 5vh;

  display: flex;
  flex-direction: column;

  border-top: #c33f3f 2px solid;

  overflow-y: hidden;

  
`;

export const Header = styled.div`
  width: 100%;
  max-width: 100%;
  height: 20vh;

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
    
    .date{
      font-size: 10px!important;
      color: #844!important ;
    }

    .title{
      color: #7d7d7d;
      font-size: 3.5rem;
      font-family: Tahoma, Geneva, Verdana, sans-serif;
      font-weight: bold;
      margin-bottom: 10px;
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

export const Paginator = styled.div`
  z-index: 1;
  display: grid;

  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;

  width: 150px;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-areas: 'btn1 spanText btn2';
  padding-bottom: 20px;

  button{
    height: 30px;
    width: 30px;
    border: none;
    cursor: pointer;

    border: 0;

    background: #c33f3f;
    border-radius: 10px;
    font-size: 1rem;
    color: #fff;
    transition-duration: 0.2s;
    z-index: 1;

    margin: 0 5px;

    &:hover{
      filter: brightness(1.2);
    }
  }

  span{
    grid-area: spanText;
    text-align: center;
    align-self: center;
  }

  button:first-child{
    grid-area: btn1;  
    justify-self: center;
  }

  span+button{
    grid-area: btn2;
    justify-self: center;
  }

`;