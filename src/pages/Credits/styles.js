import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;

  align-items: center;

  overflow-y: hidden;
  overflow-x: hidden;
  ${props => props.isMobile && (
    `
      justify-content: center;
      align-items: center;
    `
  )};

`;

export const Logo = styled.img`

  width: 424px;
  height: 106px;

  position: initial;

  margin-top: 90px;

  ${props => props.isMobile && (
    `width: 80%;
    height: 12%;
    margin-top: 0;`
  )};

`;
export const DimLogo = styled.img`

  width: 223px;
  height: 50px;

  position: initial;

  margin-top: 20px;
  ${props => props.isMobile && (
    `width: 40%;
    height: 6%;`
  )};

`;

export const AlientechLogo = styled.img`

  width: 223px;
  height: 50px;

  position: initial;

  margin-top: 20px;
  
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
    `width: 40%;
    height: 6%;`
  )};

`;

export const Form = styled.form`

  display: flex;
  flex-direction: column;

  align-items: center;

  input{
    width: 385px;
    height: 62px;

    border-radius: 40px;
    border: 0;
    padding: 10px;

    font-size: 1.5rem;

    text-align: center;

    margin-top: 80px;

    border: 1px solid #707070;

    box-shadow: 0px 3px 15px black;
    transition-duration: 0.2s;
    ${props => props.isMobile && (
      `width: 80vw;
      height: 8vh;
      font-size: 3.5rem;
      margin-top: 200px;`
    )};

    &::placeholder{
      color: #aaa;
    }
    
    &:focus{
      transform: translate(0px, -10px);
      transition-duration: 0.2s;
    }

    


  }
  button{
    margin-top: 25px;

    height: 40px;
    width: 150px;

    border: 0;
    background-color: #EE1C25;

    color: white;
    font-size: 1.5rem;
    ${props => props.isMobile && (
      `width: 40vw;
      height: 4vh;
      font-size: 2.5rem;
      margin-top: 50px;`
    )};
  }

`;

export const Statements = styled.div`
  width: 100%;
  background: #fff;
  height: 100%;
  .saldo{
      height: 100px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      span{
        color: #c33f3f;
        font-size: 1.5rem;
        font-weight: 600;
      }
    }

    .extrato{
      .title{
        display: flex;
        align-items: center;
        justify-content: center;
        color: #c33f3f;
        font-size: 1.5rem;
        text-align: center;
      };

      ul{
        display: flex;
        flex-direction: column-reverse;
      }
    };

`;

export const LLine = styled.li`

    display: flex;
    flex-direction: row;

    justify-content: space-between;
    background: ${props=>!props.debito ? '#56DC7F' : '#DC5656'};
    transition-duration: 0.2s;

    &:hover{
      background: ${props=>!props.debito ? '#15ab1a' : '#ab1212'};
    }
`

export const Span = styled.span`
  /*color: ${props=>!props.debito ? '#56DC7F' : '#DC5656'};*/
  color: #fff;
  font-size: 1.2rem;
`;
