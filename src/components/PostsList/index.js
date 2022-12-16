import React, { useEffect, useState } from 'react';
import Tooltip from 'react-tooltip';
import { useHistory } from 'react-router-dom';
import dayjs from 'dayjs'

import api from '../../services/api';
import { EditIcon, FilterContainer, FormContainer, TrashIcon } from '../../pages/Admin/styles';
import { ExportCSV } from '../../services/export';
import CustomTable from '../CustomTable';
import { Button } from '@material-ui/core';
import { Filter } from './styles';

const PostsList = () => {
    const history = useHistory();

    const [emailSearchUsers, setEmailSearchUsers] = useState('');
    const [posts, setPosts] = useState([]);
    const [placaSearch, setPlacaSearch] = useState('');
    const [codeSearchUsers, setCodeSearchUsers] = useState('')

    const [page, setPage] = useState(0);
    const [count, setCount] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(25)
    const [id, setId] = useState('');
    const [queryParams, setQueryParams] = useState('')

    const columns = [
        { name: "Cliente", grow: 1, cell: post => post.destination ? post.destination.email : 'Cliente deletado' },
        {
            name: "Veículo", grow: 3, maxWidth: '400px', cell: post =>
                <>
                    <span style={{
                        overflowX: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        maxWidth: '95%'
                    }} data-tip='' data-for={`vehicle-${post._id}`}>{post.vehicle}</span>
                    <Tooltip id={`vehicle-${post._id}`}>{post.vehicle}</Tooltip>
                </>
        },
        {
            name: "Placa", maxWidth: '100px', cell: post =>
                <>
                    <span style={{
                        overflowX: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        maxWidth: '95%'
                    }} data-tip data-for={`brand-${post._id}`}>{post.brand}</span>
                    <Tooltip class="noselect" id={`brand-${post._id}`}>{post.brand}</Tooltip>
                </>
        },
        {
            name: "URL", cell: post => (
                <>
                    <a style={{
                        overflowX: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        maxWidth: '95%'
                    }} data-tip data-for={`post-${post._id}`} href={post.url} rel="noopener noreferrer" target='_blank'>{post.url}</a>
                    <Tooltip id={`post-${post._id}`}>{post.url}</Tooltip>
                </>
            )
        },
        {
            name: "Data", cell: post => (
                <>
                    <span style={{
                        overflowX: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        maxWidth: '95%'
                    }} data-tip='' data-for={`post-date-${post._id}`}>{dayjs(post.updatedAt).format("DD/MM/YYYY")}</span>
                    <Tooltip id={`post-date-${post._id}`}>{dayjs(post.updatedAt).format("DD/MM/YYYY")}</Tooltip>
                </>
            )
        },
        { name: "", maxWidth: '40px', cell: post => <><EditIcon onClick={() => history.push(`/editpost/${post._id}`)} /> <TrashIcon onClick={() => handleDelete(post._id, post.brand)} /></> }
    ]


    useEffect(() => {
        if (!id) return;
        fetchPosts()
    }, [page, rowsPerPage, id])

    useEffect(() => {
        let queryList = []
        if (codeSearchUsers) queryList.push(`code=${codeSearchUsers}`);
        if (emailSearchUsers) queryList.push(`email=${emailSearchUsers}`);
        if (placaSearch) queryList.push(`placa=${placaSearch}`);

        setQueryParams(queryList.join('&'))
    }, [codeSearchUsers, emailSearchUsers, placaSearch])

    useEffect(() => {
        setId(sessionStorage.getItem('user_id'))
    }, [])

    async function fetchPosts() {
        const response = await api.get(`posts?${queryParams}`, {
            headers: {
                id,
                rows: rowsPerPage,
                page,
                is_web: 1
            }
        })

        if (response.data) {
            setPosts(response.data.posts)
            setCount(response.data.count)
        }
    }


    async function handleDelete(post_id, placa) {
        // eslint-disable-next-line no-restricted-globals
        let res = confirm(`Você deseja deletar o post da placa ${placa}?`);
        if (res) {
            const id = sessionStorage.getItem('user_id');
            const response = await api.delete('/post/delete', {
                headers: {
                    id,
                    post_id
                }
            }).catch(err => {

            });

            if (response) {
                fetchPosts()
            }
        }
    }

    return (
        <FormContainer>
            <h2>Arquivos:</h2>
            <ExportCSV fileName={`Backup_Arquivos-${(new Date().toLocaleDateString()).toString().replace('/', '-').replace(':', '_')}`} type="files" />
            <ExportCSV fileName={`Backup-${(new Date().toLocaleDateString()).toString().replace('/', '-').replace(':', '_')}`} type="all" />

            <Filter className="formFilter" onSubmit={e => {
                e.preventDefault()
                fetchPosts()
            }}>
                <FilterContainer>
                    <div id="emailsearch">
                        <label for="email">Email</label>
                        <input id="email" type='text' value={emailSearchUsers} onChange={e => setEmailSearchUsers(e.target.value)} />
                    </div>
                    <div id="brandsearch">
                        <label for="brand">Placa</label>
                        <input id="brand" type='text' value={placaSearch} onChange={e => setPlacaSearch(e.target.value)} />
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
            <CustomTable columns={columns} dataCount={count} data={posts} setPage={setPage} setRowsPerPage={setRowsPerPage} page={page} rowsPerPage={rowsPerPage} />
        </FormContainer>
    )
}

export default PostsList;