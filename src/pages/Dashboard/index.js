import React, {useState, useEffect} from 'react';
import { isMobile } from 'react-device-detect';

import {Container, 
        Logo,  
        DimLogo, 
        AlientechLogo, 
        Header, 
        Nav, 
        Bars, 
        Menu, 
        Span,
        PostsContainer,
        ExitButton
       } from './styles';

import LogoImg from '../../assets/import-center.png'
import DimSportImg from '../../assets/Dimsport-logo.png'
import DIcon from '../../assets/D-Icon.png'
import Alientech from '../../assets/alientech.png'
import api from '../../services/api';

export default function Dashboard({history}) {

  const [menu, setMenu] = useState(false);
  const [credits, setCredits] = useState(0);
  const [statements, setStatements] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    const id = sessionStorage.getItem('user_id');
    
    async function getStatements(){
      const response = await api.get('/statement', {
        headers:{
          id
        }
      });
      

      setStatements(response.data);
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
          id
        }
      })

      setPosts(response.data);
    }
    
    if(sessionStorage.getItem('user_id') === null){
      history.push('/');
    }

    getStatements();
    getCredits()
    getPosts();
  }, [credits, history])

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
        <DimLogo src={DimSportImg} alt="DimSport logo" isMobile={isMobile}/>
        <Logo src={LogoImg} alt="Import Center logo" isMobile={isMobile}/>
        <AlientechLogo src={Alientech} alt="Alientech logo" isMobile={isMobile}/>
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
          <span className='title'>Remaps</span>
          <span className='saldo' style={{color: credits<0&&'#f00'}}>Saldo: R${parseFloat(credits).toFixed(2)}</span>
          <ul>
            {posts.map(post=>(
              <li key={post._id}>
                  <div className="left-side">
                    <img src={DIcon} alt='DimSport-logo' />
                    <span className='desc'>{post.vehicle}</span>
                    <span className='placa'>{post.brand}</span>
                  </div>
                  <div className="right-side">
                    <button type='button' className='download' onClick={()=>{
                      if(post.bought)
                        window.open(post.url, '_blank');
                      else
                        handleBuy(post._id);
                    }}>{post.bought ? 'Download' : 'Comprar'}</button>
                    <span className='price'>R${post.price}</span>
                  </div>

              </li>
            ))}
          </ul>
        </PostsContainer>
      </Container>
    </>
  );
}
