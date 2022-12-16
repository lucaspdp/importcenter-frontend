import React, {useState, useEffect} from 'react';
import { isMobile } from 'react-device-detect';

import {Container, 
        Logo,  
        DimLogo, 
        AlientechLogo, 
        Header, 
        FormContainer,
        RadioLabel,
        ExitButton,
        MagicLogo
       } from '../Admin/styles';

import LogoImg from '../../assets/import-center.png'
import DimSportImg from '../../assets/Dimsport-logo.png'
import MagicImg from '../../assets/magic.png'
import Alientech from '../../assets/alientech.png'
import api from '../../services/api';

export default function EditUser({history, match}) {

  const [email, setEmail] = useState('');

  const [user_name, setUserName] = useState('');
  const [user_code, setUserCode] = useState('');
  const [user_admin, setUserAdmin] = useState(false);
  const [error, setError] = useState('');

  useEffect(()=>{
    const { id } = match.params;
    const user_id = sessionStorage.getItem('user_id');

    if(user_id === null){
      history.push('/');
    }

    async function getUserInfo(){
      const response = await api.get(`/user/${id}`, {
        headers:{
          admin_id: user_id,
        }
      }).catch(err=>{
        const errorMsg = err.response.data.error;
        return setError(errorMsg);
      })
      
      const user = response.data;

      if(response){
        setUserName(user.name);
        setUserCode(user.code);
        setUserAdmin(user.admin);
        setEmail(user.email);
      }
    }

    getUserInfo();
  }, [history, match.params])

  async function handleUpdate(e){
    e.preventDefault();
    const id = sessionStorage.getItem('user_id');
    const user_id = match.params.id;

    const response = await api.put(`/user/${user_id}`, {
      name: user_name,
      code: user_code,
      email,
      admin: user_admin
    }, {
      headers:{
        id
      }
    }).catch(err=>{
      const errorMsg = err.response.data.error;
      return setError(errorMsg);
    })

    if(response)
      alert('Dados do cliente alterados com sucesso!');
      history.push('/admin')
  }

  return (
    <>
      <ExitButton onClick={()=>{
        history.push('/admin')
      }} />
      <Header>
        <AlientechLogo src={Alientech} alt="Alientech logo" isMobile={isMobile}/>
        <div style={{display: 'flex', flexDirection:"column", justifyContent: 'center', alignItems: "center"}}>
          <Logo src={LogoImg} alt="Import Center logo" isMobile={isMobile}/>
          <DimLogo src={DimSportImg} alt="DimSport logo" isMobile={isMobile}/>
        </div>
        <MagicLogo src={MagicImg} alt="Magic logo" isMobile={isMobile}/>
      </Header>
      <Container>
        <FormContainer>
              <form onSubmit={(e)=>handleUpdate(e)}>
                <label>Nome do cliente:</label>
                <input 
                  type="text" 
                  id="name" 
                  name="Nome" 
                  value={user_name}
                  onChange={(e)=>setUserName(e.target.value)}
                />
                <label>Email do cliente: </label>
                <input 
                  type="email" 
                  id="email" 
                  name="Email" 
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
                <label>Código do cliente: </label>
                <input 
                  type="text" 
                  id="code" 
                  name="Codigo" 
                  value={user_code}
                  onChange={(e)=>setUserCode(e.target.value)}
                />

                
                <div className="radios">
                  <div className="radio">
                    <RadioLabel isAdmin={user_admin} val={false}>
                      <input type="radio" value="No"
                      onChange={handleUpdate}
                      checked={user_admin === false}
                      />
                      Cliente
                    </RadioLabel>
                  </div>
                  <div className="radio">
                    <RadioLabel isAdmin={user_admin} val={true}>
                      <input type="radio" value="Yes"
                      onChange={handleUpdate}
                      checked={user_admin === true}
                      />
                      Administrador
                    </RadioLabel>
                  </div>
                </div>
                <button style={{marginTop: 30}} type="submit" class="submitForm" onClick={handleUpdate}>Cadastrar</button>
              </form>
              <span style={{marginTop: 10}} className="errorSpan">{error}</span>
            </FormContainer>
      </Container>
    </>
  )
}