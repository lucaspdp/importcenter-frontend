import React, {useState, useEffect} from 'react';
import { isMobile } from 'react-device-detect';
import CurrencyInput from 'react-currency-input';

import {Container, 
        Logo,  
        DimLogo, 
        AlientechLogo, 
        Header, 
        FormContainer,
        ExitButton
       } from '../Admin/styles';

import LogoImg from '../../assets/import-center.png'
import DimSportImg from '../../assets/Dimsport-logo.png'
import Alientech from '../../assets/alientech.png'
import api from '../../services/api';

export default function EditPost({history, match}) {

  const [price, setPrice] = useState(0);
  const [vehicle, setVehicle] = useState('');
  const [brand, setBrand] = useState('');
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  useEffect(()=>{
    const { id } = match.params;
    const user_id = sessionStorage.getItem('user_id');

    if(user_id === null){
      history.push('/');
    }

    async function getPost(){
      const response = await api.get(`/editpost/${id}`, {
        headers:{
          id: user_id
        }
      }).catch(()=> history.push('/admin'))
      
      const post = response.data;
      setVehicle(post.vehicle);
      setBrand(post.brand);
      setEmail(post.destination.email);
      setPrice(post.price);
      setUrl(post.url);
    }
    getPost();
  }, [history, match.params])

  async function handleUpdate(e){
    e.preventDefault();
    const id = sessionStorage.getItem('user_id');
    const postId = match.params.id;

    const response = await api.put(`/post/${postId}`, {
      destination_email: email,
      vehicle,
      price,
      brand,
      url
    }, {
      headers:{
        id
      }
    }).catch(err=>{
      const errorMsg = err.response.data.error;
      return setError(errorMsg);
    })

    if(response){
      alert('Dados do arquivo alterados com sucesso!');
      history.push('/admin')
    }
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
        <form>
                <label for="vehicle">Veículo:</label>
                <input 
                  type="text" 
                  id="vehicle" 
                  name="Veiculo" 
                  description="A" 
                  value={vehicle}
                  onChange={(e)=>setVehicle(e.target.value)}
                  required
                />

                <label for="brand">Placa:</label>
                <input 
                  type="text" 
                  id="brand" 
                  name="Marca" 
                  value={brand}
                  onChange={(e)=>setBrand(e.target.value)}
                />

                <label for="price">Preço:</label>
                <CurrencyInput value={price} onChange={(e, masked, floatVal)=>{
                  setPrice(masked)
                }} prefix='R$'/>

                <label for="url">URL de download:</label>
                <input
                  type="text"
                  id="url"
                  name="URL" 
                  value={url}
                  onChange={(e)=>setUrl(e.target.value)}
                />

                <label for="email">Email do destinatário: </label>
                <input 
                  type="email" 
                  id="email" 
                  name="Email" 
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />

                <button type="submit" onClick={handleUpdate}>Enviar</button>
              </form>
              <span className="errorSpan">{error}</span>
            </FormContainer>
      </Container>
    </>
  )
}