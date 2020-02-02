import React, {useState, useEffect} from 'react';
import { isMobile } from 'react-device-detect';

import { Container, Logo, DimLogo, Form, AlientechLogo } from './styles';
import LogoImg from '../../assets/import-center.png'
import DimSportImg from '../../assets/Dimsport-logo.png'
import Alientech from '../../assets/alientech.png'
import api from '../../services/api'

export default function Login({history}) {

  const [key, setKey] = useState('');

  useEffect(()=>{
    if(sessionStorage.getItem('user_id') !== null){
      handleSubmit(null, sessionStorage.getItem('user_id'));
    }
  })

  async function handleSubmit(event, id){
    if(event)
      event.preventDefault();
    try {
      if(id){
        setKey(await sessionStorage.getItem('user_key'));
      }
      const response = await api.post('/login', {
        code: key
      });

      const user = response.data;

      //console.log(user);

      if(user.admin){
        sessionStorage.setItem('user_id', user._id);
        await sessionStorage.setItem('user_key', user.code);
        history.push('/admin');
      }else{
        sessionStorage.setItem('user_id', user._id);
        await sessionStorage.setItem('user_key', user.code);
        history.push('/dashboard');
      }
    } catch (error) {
      //alert('Usuário não cadastrado!')
    }

  }
  return (
    <>
      <Container isMobile={isMobile}>

        <Logo src={LogoImg} alt="Import Center logo" isMobile={isMobile}/>
        <DimLogo src={DimSportImg} alt="DimSport logo" isMobile={isMobile}/>
        <AlientechLogo src={Alientech} alt="Alientech logo" isMobile={isMobile}/>

        <Form onSubmit={handleSubmit} isMobile={isMobile}>
          <input type='text' placeholder='Código de acesso' value={key} onChange={(e)=>setKey(e.target.value)}/>
          <button type='submit'>Entrar</button>
        </Form>
      </Container>
    </>
  );
}
