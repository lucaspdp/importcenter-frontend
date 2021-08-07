import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
  Badge,
  Drawer,
  Divider,
  List,
  Box,
  Container,
  ListItem,
  Button
} from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ExitIcon from '@material-ui/icons/ExitToApp'
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Tooltip from 'react-tooltip'
import DIcon from '../../assets/D-Icon.png'

import { Copyright } from '../Login'
import LogoImg from '../../assets/import-center.png'
import api from '../../services/api';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import { formatCurrency } from '../../utils/formatCurrency';

const drawerWidth = 350;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    backgroundColor: '#222'
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: '#444'
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  whiteIcon: {
    fill: '#fff'
  },
  logo: {
    width: '90%'
  },
  flexRow: {
    display: 'flex',
    alignItems: 'center'
  },

  descText: {
    width: 200,
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  saldoTotal: {
    textAlign: 'center',
    fontSize: 24,
    color: 'white'
  },
  listRow: {
    background: '',
    transition: '0.2s',
    display: 'flex',
    color: 'white',
    justifyContent: 'space-between'
  },
  cashin: {
    color: '#afa'
  },
  cashout: {
    color: '#faa'
  },
  pageTitle: {
    textAlign: 'center'
  },
  listRemaps: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  listIconAndName: {
    display: 'flex',
    alignItems: 'center',
    '& p': {
      fontSize: 24
    },
    '& img': {
      width: 50,
    }
  }

}));

export default function AdminDashboard() {
  const history = useHistory();
  const [menu, setMenu] = useState(false);
  const [credits, setCredits] = useState(0);
  const [statements, setStatements] = useState([]);
  const [posts, setPosts] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [reversedPosts, setReversedPosts] = useState([]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  useEffect(() => {
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
  }, [history.location])

  useEffect(() => {
    const id = sessionStorage.getItem('user_id');

    async function getStatements() {
      const response = await api.get('/statement', {
        headers: {
          id
        }
      });


      setStatements(response.data);
    }

    async function getCredits() {
      const response = await api.get('/credits', {
        headers: {
          id
        }
      })

      setCredits(response.data);
    }

    async function getPosts() {
      const response = await api.get('/post/show', {
        headers: {
          id
        }
      })

      setPosts(response.data);
    }

    getStatements();
    getCredits()
    getPosts();
  }, [credits, history])

  useEffect(()=>{
    setReversedPosts(posts.reverse())
  }, [posts])

  async function handleBuy(post_id) {
    const id = sessionStorage.getItem('user_id');

    const responseBuy = await api.put('/credits', {}, {
      headers: {
        id,
        post_id
      }
    }).catch(err => {
      const errorMsg = err.response.data.error;
      
      toast.error(errorMsg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    })
    if (responseBuy)
    {
      toast.success('Compra efetuada com sucesso!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setCredits(responseBuy.data[0])
    }
  }

  return (
    <>
      <div className={classes.root}>
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={[clsx(classes.menuButton, open && classes.menuButtonHidden), classes.whiteIcon]}
            >
              <MenuIcon data-tip data-for="extrato" />
              <Tooltip id="extrato">
                Extrato
              </Tooltip>
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              Import Center - Painel do administrador
            </Typography>
            <IconButton color="inherit" onClick={() => {
              sessionStorage.clear();
              history.push('/')
            }}>
              <ExitIcon data-tip data-for="sair" />
              <Tooltip id="sair">
                Sair
              </Tooltip>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="persistent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon className={classes.whiteIcon} />
            </IconButton>
          </div>
          <Divider />

          <Typography className={classes.saldoTotal}>Saldo: R${formatCurrency(credits)}</Typography >

          <Divider />
          <List>
            <Scrollbars style={{ width: '100%', height: '70vh' }}>
              {statements.map((statement, index) => (
                <ListItem className={classes.listRow} key={statement.name + Math.random(0, 500)}>
                  <Typography className={classes.descText} data-tip data-for={`descTooltip-${index}`}>{statement.name}</Typography>
                  <Typography className={statement.price > 0 ? classes.cashin : classes.cashout}>{statement.price < 0 && '-'}R${formatCurrency(statement.price.toString().replace('-', ''))}</Typography>
                  <Tooltip id={`descTooltip-${index}`}>
                    {statement.name}
                  </Tooltip>
                </ListItem>
              ))}
            </Scrollbars>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Typography variant='h3' className={classes.pageTitle}>Remaps</Typography>
            <Typography variant='subtitle1' style={{textAlign: 'center'}}>Saldo: R${formatCurrency(credits)}</Typography >

            <List>

              <Scrollbars style={{ width: '100%', height: '40vh' }}>
                {reversedPosts.map(post => (
                  <>
                    <ListItem className={classes.listRemaps} key={post._id}>
                      <Box className={classes.listIconAndName} >
                        <img src={DIcon} alt='DimSport-logo' />
                        <Typography className='desc'>{post.vehicle}</Typography>
                      </Box>
                      <Box className={classes.flexRow}>
                        <Button color="primary" type='button' className='download' onClick={() => {
                          if (post.bought)
                            window.open(post.url, '_blank');
                          else
                            handleBuy(post._id);
                        }}>{post.bought ? 'Download' : 'Comprar'}</Button>
                        <Box style={{ width: 100, textAlign: 'right' }}>
                          <Typography className='placa'>{post.brand}</Typography>
                          <Typography className='price'>R${formatCurrency(post.price)}</Typography>
                        </Box>
                      </Box>
                    </ListItem>
                    <Divider />
                  </>
                ))}
              </Scrollbars>
            </List>

            <Box pt={4}>
              <Copyright />
            </Box>
          </Container>
        </main>
      </div>
    </>
  );
}
