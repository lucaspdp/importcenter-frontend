import React, {useState, useEffect} from 'react';
import { isMobile } from 'react-device-detect';
import CurrencyInput from 'react-currency-input';
import { TableContainer, Table, TableBody, TableRow, TableCell, TableHead, TablePagination } from '@material-ui/core'

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
  FilterContainer,
 } from './styles';



import LogoImg from '../../assets/import-center.png'
import DimSportImg from '../../assets/Dimsport-logo.png'
import Alientech from '../../assets/alientech.png'
import api from '../../services/api';
import DataTable from 'react-data-table-component';

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

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const [creditsHistory, setCreditsHistory] = useState([]);
  const [filteredCreditsHistory, setFilteredCreditsHistory] = useState([]);

  const [user_name, setUserName] = useState('');
  const [user_code, setUserCode] = useState('');
  const [user_admin, setUserAdmin] = useState(false);
  const [backups, setBackups] = useState(0);

  const [emailSearch, setEmailSearch] = useState('');
  const [codeSearchUsers, setCodeSearchUsers] = useState('')
  const [placaSearch, setPlacaSearch] = useState('');
  
  const [emailSearchCredits, setEmailSearchCredits] = useState('');

  const [emailSearchUsers, setEmailSearchUsers] = useState('');

  const [creditsPage, setCreditsPage] = useState(0)
  const [searchEmail, setSearchEmail] = useState('')
  const [credistRowsPerPage, setCreditsRowsPerPage] = useState(25)

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

      let reversed = response.data.reverse()
      setUsers(reversed);
    }

    async function handlePosts(){
      const response = await api.get('/posts', {
        headers:{
          id: sessionStorage.getItem('user_id')
        }
      });

      let reversed = response.data.reverse()
      setPosts(reversed);
    }
    async function handleCreditsHistory(){
      const response = await api.get('/creditshistory', {
        headers:{
          id: sessionStorage.getItem('user_id')
        }
      });

      let reversed = response.data.reverse()
      setCreditsHistory(reversed);
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

  useEffect(()=>{
    if(caminho === 'posts'){
      let filterEmail = posts;
      if(emailSearch) filterEmail = filterEmail.filter(post=>{
        return post.destination?.email.includes(emailSearch)
      })
      let filterPlaca = filterEmail;
      if(placaSearch) filterPlaca = filterPlaca.filter(post => {
        return post.brand.toLowerCase().includes(placaSearch.toLowerCase())
      })
  
      const filtered = filterPlaca
  
      setFilteredPosts(filtered)
    }
  }, [posts, emailSearch, placaSearch])

  useEffect(()=>{
    if(caminho === 'creditshistory'){
      let filterEmail = creditsHistory;
      if(emailSearchCredits) filterEmail = filterEmail.filter(transaction=>{
        return transaction.destination?.email.includes(emailSearchCredits)
      })
  
      const filtered = filterEmail
  
      setFilteredCreditsHistory(filtered)
    }
  }, [creditsHistory, emailSearchCredits])
  
  useEffect(()=>{
    if(caminho === 'users'){
      let filterEmail = users;
      if(emailSearchUsers) filterEmail = filterEmail.filter(user=>{
        return user.email.toLowerCase().includes(emailSearchUsers.toLowerCase())
      })
      const filterCode = filterEmail.filter(user=> {
        return user.code.toLowerCase().includes(codeSearchUsers.toLowerCase())
      })
  
      const filtered = filterCode
  
      setFilteredUsers(filtered)
    }
  }, [users, emailSearchUsers, codeSearchUsers])

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
        
          setCredits(0);
          setTType('')
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
              <FilterContainer>
                <div id="emailsearch">
                  <label for="email">Email</label>
                  <input id="email" type='text' value={emailSearchUsers} onChange={e=> setEmailSearchUsers(e.target.value)} />
                </div>
                <div id="codeSearch">
                  <label for="email">Código</label>
                  <input id="email" type='text' value={codeSearchUsers} onChange={e=> setCodeSearchUsers(e.target.value)} />
                </div>
              </FilterContainer>
              <DataTable
                customStyles={{
                  headRow:{
                    style:{
                      backgroundColor: '#eee'
                    }
                  },
                  table:{
                    style:{
                      width: '90%',
                      margin: '0 auto'
                    }
                  }
                }}
                columns={[
                  {name: "Nome", cell: user=> user.name},
                  {name: "Email", cell: user=> user.email},
                  {name: "Código", cell: user=> user.code},
                  {name: "Créditos", cell: user=> <span>R${parseFloat(user.credits).toFixed(2)}</span>},
                  {name: "", cell: user=> <><EditIcon onClick={()=> history.push(`/edituser/${user._id}`)}/>  <TrashIcon className="ml-5" onClick={()=> handleDeleteUser(user._id, user.email)}/></>}
                ]} 
                paginationPerPage={25}
                pagination
                data={filteredUsers}
                fixedHeader
                />
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
              <FilterContainer>
                <div id="emailsearch">
                  <label for="email">Email</label>
                  <input id="email" type='text' value={emailSearch} onChange={e=> setEmailSearch(e.target.value)} />
                </div>
                <div id="brandsearch">
                  <label for="brand">Placa</label>
                  <input id="brand" type='text' value={placaSearch} onChange={e=> setPlacaSearch(e.target.value)}/>
                </div>
              </FilterContainer>
              <DataTable
                customStyles={{
                  headRow:{
                    style:{
                      backgroundColor: '#eee'
                    }
                  },
                  table:{
                    style:{
                      width: '90%',
                      margin: '0 auto'
                    }
                  }
                }}
                columns={[
                  {name: "Usuário", cell: post=> post.destination?post.destination.email:'Usuário deletado'},
                  {name: "Veículo", maxWidth: '200px', cell: post=> post.vehicle},
                  {name: "Placa", maxWidth: '100px', cell: post=> post.brand},
                  {name: "URL", cell: post=> <a href={post.url} rel="noopener noreferrer" target='_blank'>{post.url}</a>},
                  {name: "", maxWidth: '40px', cell: post=> <><EditIcon onClick={()=> history.push(`/editpost/${post._id}`)}/> <TrashIcon onClick={()=>handleDelete(post._id, post.brand)}/></>}
                ]} 
                paginationPerPage={25}
                pagination
                data={filteredPosts}
                fixedHeader
                />
            </FormContainer>
          </>
        )}
        {caminho ==='creditshistory' && (
          <>
            <FormContainer>
              <h2>Creditos:</h2>
              <ExportCSV csvData={filteredCreditsHistory} fileName={`Backup_Creditos-${(new Date().toLocaleDateString()).toString().replace('/', '-').replace(':', '_')}`} setBackups={setBackups}/>
              <FilterContainer>
                <div id="emailsearch">
                  <label for="email">Email</label>
                  <input id="email" type='text' value={emailSearchCredits} onChange={e=> setEmailSearchCredits(e.target.value)} />
                </div>
              </FilterContainer>
              <DataTable
                customStyles={{
                  headRow:{
                    style:{
                      backgroundColor: '#eee'
                    }
                  },
                  table:{
                    style:{
                      width: '90%',
                      margin: '0 auto'
                    }
                  }
                }}
                columns={[
                  {name: "Cliente", cell: transaction=> transaction.destination?transaction.destination.email:'Usuário deletado'},
                  {name: "Valor", maxWidth: '200px', cell: transaction=> <span>R${parseFloat(transaction.value).toFixed(2)}</span>},
                  {name: "", maxWidth: '40px', cell: transaction=> {if(transaction.date) return <TrashIcon onClick={()=>handleDeleteCredit(transaction.destination.email, transaction.value, transaction.date)}/>}}
                ]} 
                paginationPerPage={25}
                pagination
                fixedHeader
                dense={true}
                data={filteredCreditsHistory}
                />
            </FormContainer>
          </>
        )}
      </Container>
    </>
  );
}
