import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

import { Container, Logo, DimLogo, Form, AlientechLogo, LoadingDiv } from './styles';
import LogoImg from '../../assets/import-center.png'
import DimSportImg from '../../assets/Dimsport-logo.png'
import Alientech from '../../assets/alientech.png'
import LoadingImg from '../../assets/loading.png'
import api from '../../services/api'

export default function Login() {
  const history = useHistory();

  const [key, setKey] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    if(sessionStorage.getItem('user_id') !== null){
      handleSubmit(null, sessionStorage.getItem('user_id'));
    }
  })

  async function handleSubmit(event, id){
    setLoading(true);
    if(event)
      event.preventDefault();


    if(id){
      setKey(await sessionStorage.getItem('user_key'));
    }
    const response = await api.post('/login', {
      code: key
    }).catch(err=>{
      setLoading(false);

      if(event !== null)
        alert("Um erro ocorreu ao tentar fazer login, tente novamente!");
      
      return;
    });

    if(response){
      const user = response.data;

      setLoading(false);
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
    }
  }
  return (
    <>
      {loading && (
        <LoadingDiv>
          <img src={LoadingImg} alt="Loading"/>
        </LoadingDiv>
      )}
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
