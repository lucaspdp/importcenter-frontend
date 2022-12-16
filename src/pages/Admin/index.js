import React, {useState, useEffect} from 'react';
import { isMobile } from 'react-device-detect';
import CurrencyInput from 'react-currency-input';

import { FiSearch } from 'react-icons/fi'


import {Container, 
  Logo,  
  DimLogo, 
  MagicLogo, 
  AlientechLogo, 
  Header, 
  Nav, 
  Bars, 
  Menu, 
  MenuSelect,
  FormContainer,
  ExitButton,
  RadioLabel,
  ButtonPremade,
  PremadeDiv
 } from './styles';



import LogoImg from '../../assets/import-center.png'
import DimSportImg from '../../assets/Dimsport-logo.png'
import Alientech from '../../assets/alientech.png'
import MagicImg from '../../assets/magic.png'

import api from '../../services/api';
import DataTable from 'react-data-table-component';
import UsersList from '../../components/UsersList';
import CreditosList from '../../components/CreditosList';
import PostsList from '../../components/PostsList';
import ReactTooltip from 'react-tooltip';
import dayjs from 'dayjs';

export default function Admin({history}) {

  const [menu, setMenu] = useState(false);
  const [caminho, setCaminho] = useState('admin');
  // const [caminho, setCaminho] = useState('posts');

  const [price, setPrice] = useState(0);
  const [credits, setCredits] = useState(0);
  const [vehicle, setVehicle] = useState('');
  const [tType, setTType] = useState('');
  const [brand, setBrand] = useState('');
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [code, setCode] = useState('');

  const [user_name, setUserName] = useState('');
  const [user_code, setUserCode] = useState('');
  const [user_admin, setUserAdmin] = useState(false);


  useEffect(()=>{
    async function checkAdmin(){
      const response = await api.post('/login', {
        code: sessionStorage.getItem('user_key')
      });

      if(response.data.admin === false){
        history.push('/dashboard')
      }
    }

    if(sessionStorage.getItem('user_id') === null){
      history.push('/');
    }

    checkAdmin();
  }, [history]);

  function handleRadioChange(e){
    e.persist();
    if(e.target.value === 'Yes'){
      setUserAdmin(true);
    }else{
      setUserAdmin(false);
    }
    console.log(e);
  }

  function ValidateEmail(mail) 
  {
   // eslint-disable-next-line no-useless-escape
   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    {
      return (true)
    }
      return (false)
  }

  async function handleRegister(e){
    e.preventDefault();
    setError('');

    if(!user_name || !user_code ||!email){
      return setError('Todos os dados devem ser preenchidos');
    }
    if(!ValidateEmail(email)){
      return setError('Entre com um endereço de email válido!');
    }
    const user_id = sessionStorage.getItem('user_id');
    const response = await api.post('/register', {
      admin: user_admin,
      name: user_name,
      code: user_code,
      email: email,
    },{
      headers: {
        id: user_id
      }
    }).catch((res)=>{
      const errorJson = {res};
      setError(errorJson.res.response.data.error)
    })

    if(response){
      setEmail('');
      setError('');
      
      setUserName('');
      setUserCode('');
      setUserAdmin(false);
      alert('Cliente cadastrado com sucesso!');
    }
    //console.log(response);
  }

  async function handleCredits(e){
    e.preventDefault();
    setError('');
    const id = sessionStorage.getItem('user_id');

    const response = await api.put('/credits', {
      credit: true,
      value: credits,
      user_email: email,
      t_type: tType
    }, {
      headers:{
        admin_id: id,
      }
    }).catch(err=>{
      if(err.message !== "Network Error"){
        const errorMsg = err.response.data.error;
        return setError(errorMsg);
      }
    })

    if(response){
      if(response.status === 200){
        if(credits > 0)
          alert(`A quantia de ${credits} foi adicionada ao cliente!`)
        if(credits < 0)
          alert(`A quantia de ${credits} foi removida do cliente!`)
        
          setCredits(0);
          setEmail('');
          setTType('');
          setCode('');
      }else{
        alert('Erro, tente novamente!')
      }
    }
  }

  async function handlePost(e){
    e.preventDefault();
    setError('')
    const id = sessionStorage.getItem('user_id');

    const response = await api.post('/post/new', {
      vehicle,
      brand,
      price,
      url,
      destination_email: email
    }, {
      headers:{
        id
      }
    }).catch(err=>{
      if(err.message !== "Network Error"){
        const errorMsg = err.response.data.error;
        return setError(errorMsg);
      }
    })

    if (response){
      if(response.status === 200){
        alert('Post criado com sucesso!')
        setVehicle("");
        setPrice(0);
        setUrl("");
        setBrand("");
        setEmail("");
      }
      else{
        alert('Erro, tente novamente!')
      }
    }
  }

  function setTextTType(e, text){
    e.preventDefault();
    setTType(text);
  }

  function searchClient(){
    setEmail('')
    api.post(`/usercode`, {
      code: code
    }).then(response=>{
      if(response){
        if(response.data){
          setEmail(response.data.email)
        }
      }
    }).catch(err=>{
      alert("Cliente não encontrado")
    })
  }

  return (
    <>
      <ExitButton onClick={()=>{
        sessionStorage.clear();
        history.push('/')
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
        <Nav toggle={!menu}>
            <Menu toggle={!menu}>
              <div className='top-text'>
                <span>Administrador</span>
              </div>
              <ul>
                <li key='admin'>
                  <MenuSelect onClick={(e)=>{
                    setCaminho('admin');
                    setError('');
                  }}
                  caminho={caminho.toString()}
                  val='admin'
                  >Cadastrar Arquivo</MenuSelect>
                </li>
                <li key='credits'>
                  <MenuSelect 
                  onClick={()=>{
                    setCaminho('credits'); 
                    setError('');
                  }}
                  caminho={caminho.toString()}
                  val='credits'
                  >Créditos</MenuSelect>
                </li>
                <li key='users'>
                  <MenuSelect onClick={(e)=>{
                    setCaminho('users');
                    setError('');
                  }}
                  caminho={caminho.toString()}
                  val='users'
                  >Clientes</MenuSelect>
                </li>
                <li key='register'>
                  <MenuSelect onClick={(e)=>{
                    setCaminho('register');
                    setError('');
                  }}
                  caminho={caminho.toString()}
                  val='register'
                  >Cadastrar Cliente</MenuSelect>
                </li>
                <li key='creditshistory'>
                  <MenuSelect onClick={(e)=>{
                    setCaminho('creditshistory');
                    setError('');
                  }}
                  caminho={caminho.toString()}
                  val='creditshistory'
                  >Histórico de Créditos</MenuSelect>
                </li>
                <li key='posts'>
                  <MenuSelect onClick={(e)=>{
                    setCaminho('posts');
                    setError('');
                  }}
                  caminho={caminho.toString()}
                  val='posts'
                  >Arquivos Cadastrados</MenuSelect>
                </li>
              </ul>
            </Menu>
            <Bars size='40px' onClick={()=>setMenu(!menu)} toggle={!menu}/>
        </Nav>

        {caminho==='admin' && (
          <>
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

                <button type="submit" style={{marginTop: 30}} class="submitForm" onClick={handlePost}>Enviar</button>
              </form>
              <span className="errorSpan">{error}</span>
            </FormContainer>
          </>
        )}
        {caminho ==='credits' && (
          <>
            <FormContainer>
              <form>

                <div className='row'>
                  <div className='row_input input_button'>
                    <label for="code">Código do cliente: </label>
                    <input 
                      type="text" 
                      id="code" 
                      name="Codigo" 
                      value={code}
                      onChange={(e)=>setCode(e.target.value)}
                    />
                  </div>
                  <button data-tip data-for="search-user-btn" type='button' onClick={()=> searchClient()} className='icon_button'><FiSearch /></button>
                  <ReactTooltip id="search-user-btn">Procurar cliente</ReactTooltip>
                </div>

                <label for='credits'>Valor de créditos:</label>
                <CurrencyInput value={credits} onChange={(e, masked, floatVal)=>{
                  setCredits(masked)
                }} prefix='R$' allowNegative={true}/>

                <label for="email">Email do destinatário: </label>
                <input 
                  type="email" 
                  id="email" 
                  name="Email" 
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />

                <label for="motivo">Tipo de transação: </label>
                <input 
                  type="text" 
                  id="tType" 
                  name="tType" 
                  value={tType}
                  onChange={(e)=>setTType(e.target.value)}
                />

                <PremadeDiv>
                  <ButtonPremade onClick={(e) => setTextTType(e, "Compra de Créditos - Depósito Pix " + dayjs().format("DD/MM/YYYY"))}>Pix</ButtonPremade>
                  <ButtonPremade onClick={(e) => setTextTType(e, "Compra de Créditos - Cartão " + dayjs().format("DD/MM/YYYY"))}>Cartão</ButtonPremade>
                  <ButtonPremade onClick={(e) => setTextTType(e, "Estorno de Créditos " + dayjs().format("DD/MM/YYYY"))}>Estorno</ButtonPremade>
                  <ButtonPremade onClick={(e) => setTextTType(e, "Upgrade " + dayjs().format("DD/MM/YYYY"))}>Upgrade</ButtonPremade>
                </PremadeDiv>
                <button type="submit" class="submitForm" onClick={handleCredits}>Enviar</button>
              </form>
              <span className="errorSpan">{error}</span>
            </FormContainer>
          </>
        )}
        {caminho ==='users' && (
          <>
            <UsersList />
          </>
        )}
        {caminho ==='register' && (
          <>
            <FormContainer>
              <form onSubmit={(e)=>handleRegister(e)}>
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
                      onChange={handleRadioChange}
                      checked={user_admin === false}
                      />
                      Cliente
                    </RadioLabel>
                  </div>
                  <div className="radio">
                    <RadioLabel isAdmin={user_admin} val={true}>
                      <input type="radio" value="Yes"
                      onChange={handleRadioChange}
                      checked={user_admin === true}
                      />
                      Administrador
                    </RadioLabel>
                  </div>
                </div>
                <button type="submit" style={{marginTop: 30}} class="submitForm" onClick={handleRegister}>Cadastrar</button>
              </form>
              <span className="errorSpan">{error}</span>
            </FormContainer>
          </>
        )}
        {caminho ==='posts' && (
          <>
            <PostsList />
          </>
        )}
        {caminho ==='creditshistory' && (
          <>
            <CreditosList />
          </>
        )}
      </Container>
    </>
  );
}
