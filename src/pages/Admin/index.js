import React, {useState, useEffect} from 'react';
import { isMobile } from 'react-device-detect';
import CurrencyInput from 'react-currency-input';

import {ExportCSV} from '../../services/export';

import {Container, 
  Logo,  
  DimLogo, 
  AlientechLogo, 
  Header, 
  Nav, 
  Bars, 
  Menu, 
  MenuSelect,
  FormContainer,
  ExitButton,
  RadioLabel,
  TrashIcon,
  EditIcon,
  ButtonPremade,
  PremadeDiv,
 } from './styles';



import LogoImg from '../../assets/import-center.png'
import DimSportImg from '../../assets/Dimsport-logo.png'
import Alientech from '../../assets/alientech.png'
import api from '../../services/api';

export default function Admin({history}) {

  const [menu, setMenu] = useState(false);
  const [caminho, setCaminho] = useState('admin');
  //const [caminho, setCaminho] = useState('users');

  const [price, setPrice] = useState(0);
  const [credits, setCredits] = useState(0);
  const [vehicle, setVehicle] = useState('');
  const [tType, setTType] = useState('');
  const [brand, setBrand] = useState('');
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [creditsHistory, setCreditsHistory] = useState([]);

  const [user_name, setUserName] = useState('');
  const [user_code, setUserCode] = useState('');
  const [user_admin, setUserAdmin] = useState(false);
  const [backups, setBackups] = useState(0);

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

  useEffect(()=>{
    async function handleFiles(){
      //console.log("Files");
    }
    async function handleCredits(){
      //console.log("Credits");
    }
    async function handleUsers(){
      const response = await api.get('/users', {
        headers:{
          id: sessionStorage.getItem('user_id')
        }
      });

      setUsers(response.data);
    }

    async function handlePosts(){
      const response = await api.get('/posts', {
        headers:{
          id: sessionStorage.getItem('user_id')
        }
      });

      setPosts(response.data);
    }
    async function handleCreditsHistory(){
      const response = await api.get('/creditshistory', {
        headers:{
          id: sessionStorage.getItem('user_id')
        }
      });

      setCreditsHistory(response.data);
    }

    if(caminho === 'credits')
      handleCredits();
    if(caminho === 'admin')
      handleFiles();
    if(caminho === 'users')
      handleUsers();
    if(caminho === 'posts')
      handlePosts();
    if(caminho === 'creditshistory')
      handleCreditsHistory();
    setError('');
  },[caminho, backups])

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

    if(response)
      alert('Usuário cadastrado com sucesso!');
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
          alert(`A quantia de ${credits} foi adicionada ao usuário!`)
        if(credits < 0)
          alert(`A quantia de ${credits} foi removida do usuário!`)
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

  async function handleDelete(post_id, placa){
    // eslint-disable-next-line no-restricted-globals
    let res = confirm(`Você deseja deletar o post da placa ${placa}?`);
    if(res){
      const id = sessionStorage.getItem('user_id');
      const response = await api.delete('/post/delete', {
        headers:{
          id,
          post_id
        }
      }).catch(err=>{
        const errorMsg = err.response.data.error;
        return setError(errorMsg);
      });

      if(response){
        alert("Post deletado!");
        const res = await api.get('/posts', {
          headers:{
            id: sessionStorage.getItem('user_id')
          }
        });

        setPosts(res.data);
      }
    }
  }

  async function handleDeleteUser(id, email){
    if(id){
      // eslint-disable-next-line no-restricted-globals
      let res = confirm(`Você deseja deletar o usuário ${email} ?`);
      if(res){
        const response = await api.delete(`/user/${id}`,{
          headers:{
            id: sessionStorage.getItem('user_id')
          }
        }).catch(err=>{
          const errorMsg = err.response.data.error;
          return setError(errorMsg);
        });
    
        if(response){
          alert("Usuário deletado deletado!");
          const res = await api.get('/users', {
            headers:{
              id: sessionStorage.getItem('user_id')
            }
          });
    
          setUsers(res.data);
      }
    }
  }
  }

  async function handleDeleteCredit(destino, valor, date){
    // eslint-disable-next-line no-restricted-globals
    let res = confirm(`Você deseja remover R$${parseFloat(valor).toFixed(2)} de ${destino}?\n[SIM] Para sim   [CANCELAR] Para não`);
  
    if(res){
      // eslint-disable-next-line no-restricted-globals
      let res2 = confirm(`Confirmar ação?\nRemover R$${parseFloat(valor).toFixed(2)} de ${destino}?`);
    
      if(res2){

        //router.delete('/creditshistory/:date', AdminCredits.delete);
        const response = await api.delete(`/creditshistory/${date}`,{
          data:{  
            credit: true
          },
          headers:{
            id: sessionStorage.getItem('user_id')
          }
        }).catch(err=>{
          const errorMsg = err.response.data.error;
          return setError(errorMsg);
        });
    
        if(response){
          alert("Créditos removidos com sucesso!");
    
          const res = await api.get('/creditshistory', {
            headers:{
              id: sessionStorage.getItem('user_id')
            }
          });
    
          setCreditsHistory(res.data);
        }
      }
    }
  }

  function setTextTType(e, text){
    e.preventDefault();
    setTType(text);
  }
  return (
    <>
      <ExitButton onClick={()=>{
        sessionStorage.clear();
        history.push('/')
      }} />
      <Header>
        <DimLogo src={DimSportImg} alt="DimSport logo" isMobile={isMobile}/>
        <Logo src={LogoImg} alt="Import Center logo" isMobile={isMobile}/>
        <AlientechLogo src={Alientech} alt="Alientech logo" isMobile={isMobile}/>
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
                  }}
                  caminho={caminho.toString()}
                  val='admin'
                  >Cadastrar Arquivo</MenuSelect>
                </li>
                <li key='credits'>
                  <MenuSelect 
                  onClick={()=>{
                    setCaminho('credits'); 
                  }}
                  caminho={caminho.toString()}
                  val='credits'
                  >Créditos</MenuSelect>
                </li>
                <li key='users'>
                  <MenuSelect onClick={(e)=>{
                    setCaminho('users');
                  }}
                  caminho={caminho.toString()}
                  val='users'
                  >Usuários</MenuSelect>
                </li>
                <li key='register'>
                  <MenuSelect onClick={(e)=>{
                    setCaminho('register');
                  }}
                  caminho={caminho.toString()}
                  val='register'
                  >Cadastrar Cliente</MenuSelect>
                </li>
                <li key='creditshistory'>
                  <MenuSelect onClick={(e)=>{
                    setCaminho('creditshistory');
                  }}
                  caminho={caminho.toString()}
                  val='creditshistory'
                  >Histórico de Créditos</MenuSelect>
                </li>
                <li key='posts'>
                  <MenuSelect onClick={(e)=>{
                    setCaminho('posts');
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

                <button type="submit" onClick={handlePost}>Enviar</button>
              </form>
              <span className="errorSpan">{error}</span>
            </FormContainer>
          </>
        )}
        {caminho ==='credits' && (
          <>
            <FormContainer>
              <form>
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
                  <ButtonPremade onClick={(e) => setTextTType(e, "Compra de Créditos - Boleto")}>Boleto</ButtonPremade>
                  <ButtonPremade onClick={(e) => setTextTType(e, "Compra de Créditos - Depósito")}>Depósito</ButtonPremade>
                  <ButtonPremade onClick={(e) => setTextTType(e, "Compra de Créditos - Cartão")}>Cartão</ButtonPremade>
                </PremadeDiv>
                <button type="submit" onClick={handleCredits}>Enviar</button>
              </form>
              <span className="errorSpan">{error}</span>
            </FormContainer>
          </>
        )}
        {caminho ==='users' && (
          <>
            <FormContainer>
              <h2>Usuários Cadastrados:</h2>
              <ExportCSV csvData={users} fileName={`Backup-${(new Date().toLocaleDateString()).toString().replace('/', '-').replace(':', '_')}`} setBackups={setBackups}/>
              <table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Código</th>
                    <th>Créditos</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user=>(
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.code}</td>
                      <td>R${parseFloat(user.credits).toFixed(2)}</td>
                      <td><EditIcon onClick={()=> history.push(`/edituser/${user._id}`)}/>  <TrashIcon onClick={()=> handleDeleteUser(user._id, user.email)}/></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </FormContainer>
          </>
        )}
        {caminho ==='register' && (
          <>
            <FormContainer>
              <form onSubmit={(e)=>handleRegister(e)}>
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
                      onChange={handleRadioChange}
                      checked={user_admin === false}
                      />
                      Usuário
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
                <button type="submit" onClick={handleRegister}>Cadastrar</button>
              </form>
              <span className="errorSpan">{error}</span>
            </FormContainer>
          </>
        )}
        {caminho ==='posts' && (
          <>
            <FormContainer>
              <h2>Arquivos:</h2>
              <ExportCSV csvData={posts} fileName={`Backup_Arquivos-${(new Date().toLocaleDateString()).toString().replace('/', '-').replace(':', '_')}`} setBackups={setBackups}/>
              <table>
                <thead>
                  <tr>
                    <th>Usuário</th>
                    <th>Veículo</th>
                    <th>Placa</th>
                    <th>URL</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map(post=>(
                    <tr key={post._id}>
                      <td>{post.destination.email}</td>
                      <td>{post.vehicle}</td>
                      <td>{post.brand}</td>
                      <td><a href={post.url} rel="noopener noreferrer" target='_blank'>{post.url}</a></td>
                      <td><EditIcon onClick={()=> history.push(`/editpost/${post._id}`)}/> <TrashIcon onClick={()=>handleDelete(post._id, post.brand)}/></td>
                    </tr>
                  )).reverse()}
                </tbody>
              </table>
            </FormContainer>
          </>
        )}
        {caminho ==='creditshistory' && (
          <>
            <FormContainer>
              <h2>Creditos:</h2>
              <ExportCSV csvData={creditsHistory} fileName={`Backup_Creditos-${(new Date().toLocaleDateString()).toString().replace('/', '-').replace(':', '_')}`} setBackups={setBackups}/>
              <table>
                <thead>
                  <tr>
                    <th>Usuário</th>
                    <th>Valor</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {creditsHistory.map(transaction=>(
                    <tr key={transaction._id}>
                      <td>{transaction.destination.email}</td>
                      <td>R${parseFloat(transaction.value).toFixed(2)}</td>
                      <td>{transaction.date && <TrashIcon onClick={()=>handleDeleteCredit(transaction.destination.email, transaction.value, transaction.date)}/>}</td>
                    </tr>
                  )).reverse()}
                </tbody>
              </table>
            </FormContainer>
          </>
        )}
      </Container>
    </>
  );
}
