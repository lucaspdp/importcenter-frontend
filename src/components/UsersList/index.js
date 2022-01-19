import React, { useEffect, useState } from 'react';
import Tooltip from 'react-tooltip';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';
import { EditIcon, FilterContainer, FormContainer, TrashIcon } from '../../pages/Admin/styles';
import { ExportCSV } from '../../services/export';
import CustomTable from '../CustomTable';
import { Button } from '@material-ui/core';
import { Filter } from './styles';

const UsersList = () => {
    const history = useHistory();

    const [emailSearchUsers, setEmailSearchUsers] = useState('');
    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [codeSearchUsers, setCodeSearchUsers] = useState('')

    const [page, setPage] = useState(0);
    const [count, setCount] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(25)
    const [id, setId] = useState('');
    const [queryParams, setQueryParams] = useState('')

    const columns = [
        {
            name: "Nome", columnPercent: 0.2, cell: user => (<>
                <Tooltip id={`user-${user._id}`}>{user.name}</Tooltip>
                <span style={{
                    overflowX: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    maxWidth: '95%'
                }} data-tip='' data-for={`user-${user._id}`}>{user.name}</span>
            </>)
        },
        {
            name: "Email", columnPercent: 0.4, cell: user => (<>
                <Tooltip id={`user-email-${user._id}`}>{user.email}</Tooltip>
                <span style={{
                    overflowX: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    maxWidth: '95%'
                }} data-tip='' data-for={`user-email-${user._id}`}>{user.email}</span>
            </>)
        },
        { name: "Código", columnPercent: 0.1, cell: user => user.code },
        { name: "Créditos", columnPercent: 0.2, cell: user => <span>R${parseFloat(user.credits).toFixed(2)}</span> },
        { name: "", columnPercent: 0.1, cell: user => <><EditIcon onClick={() => history.push(`/edituser/${user._id}`)} />  <TrashIcon className="ml-5" onClick={() => handleDeleteUser(user._id, user.email)} /></> }
    ]


    useEffect(() => {
        if (!id) return;
        fetchUsers()
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

    async function fetchUsers() {
        const response = await api.get(`users?${queryParams}`, {
            headers: {
                id,
                rows: rowsPerPage,
                page,
                is_web: 1
            }
        })

        if (response.data) {
            setUsers(response.data.users)
            setCount(response.data.count)
        }
    }

    async function handleDeleteUser(id, email) {
        if (id) {
            // eslint-disable-next-line no-restricted-globals
            let res = confirm(`Você deseja deletar o usuário ${email} ?`);
            if (res) {
                const response = await api.delete(`/user/${id}`, {
                    headers: {
                        id: sessionStorage.getItem('user_id')
                    }
                }).catch(err => {
                    const errorMsg = err.response.data.error;
                });

                if (response) {
                    alert("Usuário deletado deletado!");
                    const res = await api.get('/users', {
                        headers: {
                            id: sessionStorage.getItem('user_id')
                        }
                    });

                    setUsers(res.data);
                }
            }
        }
    }

    return (
        <FormContainer>
            <h2>Usuários Cadastrados:</h2>
            <ExportCSV csvData={users} fileName={`Backup-${(new Date().toLocaleDateString()).toString().replace('/', '-').replace(':', '_')}`} />

            <Filter onSubmit={e => {
                e.preventDefault()
                fetchUsers()
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
            <CustomTable columns={columns} dataCount={count} data={users} setPage={setPage} setRowsPerPage={setRowsPerPage} page={page} rowsPerPage={rowsPerPage} />
        </FormContainer>
    )
}

export default UsersList;