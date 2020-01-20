import React, {useState, useEffect} from 'react';
import { isMobile } from 'react-device-detect';

import {Container, 
        Logo,  
        DimLogo, 
        AlientechLogo, 
        Header, 
        FormContainer,
        RadioLabel,
        ExitButton
       } from '../Admin/styles';

import LogoImg from '../../assets/import-center.png'
import DimSportImg from '../../assets/Dimsport-logo.png'
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
      alert('Dados do usuário alterados com sucesso!');
      history.push('/admin')
  }

  return (
    <>
      <ExitButton onClick={()=>{
        history.push('/admin')
      }} />
        <Header>
          <DimLogo src={DimSportImg} alt="DimSport logo" isMobile={isMobile}/>
          <Logo src={LogoImg} alt="Import Center logo" isMobile={isMobile}/>
          <AlientechLogo src={Alientech} alt="Alientech logo" isMobile={isMobile}/>
        </Header>
      <Container>
        <FormContainer>
              <form onSubmit={(e)=>handleUpdate(e)}>
                <label>Nome do Usuário:</label>
                <input 
                  type="text" 
                  id="name" 
                  name="Nome" 
                  value={user_name}
                  onChange={(e)=>setUserName(e.target.value)}
                />
                <label>Email do usuário: </label>
                <input 
                  type="email" 
                  id="email" 
                  name="Email" 
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
                <label>Código do usuário: </label>
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
                      Usuário
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
                <button type="submit" onClick={handleUpdate}>Cadastrar</button>
              </form>
              <span className="errorSpan">{error}</span>
            </FormContainer>
      </Container>
    </>
  )
}