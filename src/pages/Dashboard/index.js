import React, {useState, useEffect} from 'react';
import { isMobile } from 'react-device-detect';

import {Container, 
        Logo,  
        DimLogo, 
        AlientechLogo, 
        MagicLogo, 
        Header, 
        Nav, 
        Bars, 
        Menu, 
        Span,
        PostsContainer,
        ExitButton,
        Paginator
       } from './styles';

import LogoImg from '../../assets/import-center.png'
import DimSportImg from '../../assets/Dimsport-logo.png'
import DIcon from '../../assets/D-Icon.png'
import MagicImg from '../../assets/magic.png'
import Alientech from '../../assets/alientech.png'
import api from '../../services/api';
import dayjs from 'dayjs';

export default function Dashboard({history}) {

  const [menu, setMenu] = useState(false);
  const [credits, setCredits] = useState(0);
  const [statements, setStatements] = useState([]);
  const [posts, setPosts] = useState([]);

  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [maxPages, setMaxPages] = useState(0)
  const [id, setId] = useState('')

  
    
  async function getStatements(){
    const response = await api.get('/statement', {
      headers:{
        id
      }
    });

    setStatements(response.data.slice(0, 50));
  }

  async function getCredits(){
    const response = await api.get('/credits', {
      headers: {
        id
      }
    })

    setCredits(response.data);
  }

  async function getPosts(){
    const response = await api.get('/post/show', {
      headers:{
        id,
        page,
        is_web: 1
      }
    })
    const responseCount = await api.get('/post/count', {
      headers:{
        id
      }
    })

    setItemsPerPage(responseCount.data.itemsPerPage)
    setMaxPages(responseCount.data.maxPages);
    setCount(responseCount.data.count)
    setPosts(response.data);
  }

  useEffect(()=>{
    setId(sessionStorage.getItem('user_id'));
    
    if(sessionStorage.getItem('user_id') === null){
      history.push('/');
    }

    if(!id) return;

    getStatements();
    getCredits()
    getPosts();
  }, [credits, history, page, id])

  async function handleBuy(post_id){
    const id = sessionStorage.getItem('user_id');

    const responseBuy = await api.put('/credits', {}, {
      headers:{
        id,
        post_id
      }
    }).catch(err=>{
      const errorMsg = err.response.data.error;
      return alert(errorMsg);
    })
    if(responseBuy)
      setCredits(responseBuy.data[0])
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
        <Nav >
          <Menu toggle={!menu}>
            <div className='saldo'>
              <span>Saldo: R${parseFloat(credits).toFixed(2)}</span>
            </div>
            <div className='extrato'>
              <span className='title'>Extrato</span>
              <ul>
                {statements.map(statement=>(
                  <li key={statement.name + Math.random(0, 500)}>
                    <Span debito={statement.price<0}>{statement.name}</Span>
                    <Span debito={statement.price<0}>R${statement.price}</Span>
                  </li>
                ))}

              </ul>
            </div>
          </Menu>
          <Bars size='40px' onClick={()=>setMenu(!menu)} toggle={!menu}/>
        </Nav>

        <PostsContainer>
          <span className='title'>Softwares</span>
          <span className='saldo' style={{color: credits<0&&'#f00'}}>Saldo: R${parseFloat(credits).toFixed(2)}</span>
          <ul>
            {posts.map(post=>(
              <li key={post._id}>
                  <div className="left-side">
                    <img src={DIcon} alt='DimSport-logo' />
                    <span className='desc'>{post.vehicle}</span>
                  </div>
                  <div className="right-side">
                    <button type='button' className='download' onClick={()=>{
                      if(post.bought)
                        window.open(post.url, '_blank');
                      else
                        handleBuy(post._id);
                    }}>{post.bought ? 'Download' : 'Comprar'}</button>
                    <div>
                      <span className='placa'>{post.brand}</span>
                      <span className='price'>R${post.price}</span>
                    </div>
                    <span className='date'>{dayjs(post.createdAt).format("DD/MM/YYYY")}</span>
                  </div>

              </li>
            ))}
          </ul>
        </PostsContainer>

        <Paginator>
          {page > 1 && (<button onClick={()=> setPage(page - 1)} > {'<'} </button>) }
          <span> Página {page} </span>
          {page < maxPages && <button type="button" onClick={()=> setPage(page + 1)}> {'>'} </button> }
        </Paginator>
      </Container>
    </>
  );
}
