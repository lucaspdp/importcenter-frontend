import React, { useEffect, useState } from 'react';
import Tooltip from 'react-tooltip';

import api from '../../services/api';
import { EditIcon, FilterContainer, FormContainer, TrashIcon } from '../../pages/Admin/styles';
import { ExportCSV } from '../../services/export';
import CustomTable from '../CustomTable';
import { Button } from '@material-ui/core';
import { Filter } from './styles';

const CreditosList = () => {

  const [emailSearchUsers, setEmailSearchUsers] = useState('');
  const [codeSearchUsers, setCodeSearchUsers] = useState('')

  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(25)
  const [id, setId] = useState('');
  const [queryParams, setQueryParams] = useState('')

  const [creditsHistory, setCreditsHistory] = useState([]);
  const [filteredCreditsHistory, setFilteredCreditsHistory] = useState([]);

  const columns = [
    {
      name: "Cliente", cell: transaction => transaction.destination ? (<>

        <Tooltip id={`transaction-destination-${transaction._id}`}>{transaction.destination.email}</Tooltip>
        <span style={{
          overflowX: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          maxWidth: '95%'
        }} data-tip='' data-for={`transaction-destination-${transaction._id}`}>{transaction.destination.email}</span>

      </>) : 'Usuário deletado', wrap: false, grow: 6
    },
    { name: "Valor", maxWidth: '200px', cell: transaction => <span>R${parseFloat(transaction.value).toFixed(2)}</span> },
    { name: "", maxWidth: '40px', cell: transaction => { if (transaction.date) return <TrashIcon onClick={() => handleDeleteCredit(transaction.destination.email, transaction.value, transaction.date)} /> } }
  ]


  useEffect(() => {
    if (!id) return;
    fetchCredits()
  }, [page, rowsPerPage, id])

  useEffect(() => {
    let queryList = []
    if (codeSearchUsers) queryList.push(`code=${codeSearchUsers}`);
    if (emailSearchUsers) queryList.push(`email=${emailSearchUsers}`);

    setQueryParams(queryList.join('&'))
  }, [codeSearchUsers, emailSearchUsers])

  useEffect(() => {
    setId(sessionStorage.getItem('user_id'))
  }, [])

  async function fetchCredits() {
    const response = await api.get(`creditshistory?${queryParams}`, {
      headers: {
        id,
        rows: rowsPerPage,
        page,
        is_web: 1
      }
    })

    if (response.data) {
      setCreditsHistory(response.data.credits)
      setCount(response.data.count)
    }
  }


  async function handleDeleteCredit(destino, valor, date) {
    // eslint-disable-next-line no-restricted-globals
    let res = confirm(`Você deseja remover R$${parseFloat(valor).toFixed(2)} de ${destino}?\n[SIM] Para sim   [CANCELAR] Para não`);

    if (res) {
      // eslint-disable-next-line no-restricted-globals
      let res2 = confirm(`Confirmar ação?\nRemover R$${parseFloat(valor).toFixed(2)} de ${destino}?`);

      if (res2) {

        //router.delete('/creditshistory/:date', AdminCredits.delete);
        const response = await api.delete(`/creditshistory/${date}`, {
          data: {
            credit: true
          },
          headers: {
            id: sessionStorage.getItem('user_id')
          }
        }).catch(err => {

        });

        if (response) {
          alert("Créditos removidos com sucesso!");

          fetchCredits()
        }
      }
    }
  }

  return (
    <FormContainer>

      <h2>Creditos:</h2>
      <ExportCSV csvData={filteredCreditsHistory} fileName={`Backup_Creditos-${(new Date().toLocaleDateString()).toString().replace('/', '-').replace(':', '_')}`} />

      <Filter onSubmit={e => {
        e.preventDefault()
        fetchCredits()
      }}>
        <FilterContainer>
          <div id="emailsearch">
            <label for="email">Email</label>
            <input id="email" type='text' value={emailSearchUsers} onChange={e => setEmailSearchUsers(e.target.value)} />
          </div>
          <div id="codeSearch">
            <label for="email">Código</label>
            <input id="email" type='text' value={codeSearchUsers} onChange={e => setCodeSearchUsers(e.target.value)} />
          </div>
        </FilterContainer>
        <div className="filter">
          <Button type="submit" style={{ backgroundColor: "#c33f3f", marginBottom: 20 }} variant="contained" color="primary">Filtrar</Button>
        </div>
      </Filter>
      <CustomTable columns={columns} dataCount={count} data={creditsHistory} setPage={setPage} setRowsPerPage={setRowsPerPage} page={page} rowsPerPage={rowsPerPage} />
    </FormContainer>
  )
}

export default CreditosList;