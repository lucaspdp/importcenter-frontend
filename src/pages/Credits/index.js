import React, {useState} from 'react';
import { isMobile } from 'react-device-detect';

import {Container, 
        Logo,  
        DimLogo, 
        AlientechLogo, 
        Form,
        Span,
        Statements,
        LLine
       } from './styles';

import LogoImg from '../../assets/import-center.png'
import DimSportImg from '../../assets/Dimsport-logo.png'
import Alientech from '../../assets/alientech.png'
import api from '../../services/api';

export default function Dashboard({history}) {

  const [key, setKey] = useState('');
  const [credits, setCredits] = useState(0);
  const [statements, setStatements] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false)
  
  async function handleLogin(e){
    if(e)
      e.preventDefault();
    try {
      const response = await api.post('/login', {
        code: key
      });

      const user = response.data;
      setLoggedIn(true);
      setCredits(user.credits);
      setStatements(user.statement);
    } catch (error) {
      alert("Código inexistente!")
    }
  }

  return (
    <>
      <Container isMobile={isMobile}>
        {!loggedIn ? (
          <>
            <Logo src={LogoImg} alt="Import Center logo" isMobile={isMobile}/>
            <DimLogo src={DimSportImg} alt="DimSport logo" isMobile={isMobile}/>
            <AlientechLogo src={Alientech} alt="Alientech logo" isMobile={isMobile}/>
    
            <Form onSubmit={handleLogin} isMobile={isMobile}>
              <input type='text' placeholder='Código de acesso' value={key} onChange={(e)=>setKey(e.target.value)}/>
              <button type='submit'>Entrar</button>
            </Form>
          </>
        ): (
          <Statements>
            
            <div className='saldo'>
              <span>Saldo: R${parseFloat(credits).toFixed(2)}</span>
            </div>
            <div className='extrato'>
              <span className='title'>Extrato</span>
              <ul>
                {statements.map(statement=>(
                  <LLine key={statement.name + Math.random(0, 500)} debito={statement.price<0}>
                    <Span debito={statement.price<0}>{statement.name}</Span>
                    <Span debito={statement.price<0}>R${statement.price}</Span>
                  </LLine>
                ))}

              </ul>
            </div>
          </Statements>
        )}
      </Container>
    </>
  );
}
