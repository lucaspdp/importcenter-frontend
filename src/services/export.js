import React, { useState } from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx'
import {ExportButton} from '../styles/styles'
import api from './api';

export const ExportCSV = ({fileName, setBackups, type}) =>{
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';


    const exportToCSV = async (fileName) => {
        const id = sessionStorage.getItem('user_id');
        if(type !== "all"){
            let csvData = []
            switch(type){
                case 'files':
                    let res = await api.get('/postsall', {headers: {id}});
                    if(res){
                        if(res.data){
                            csvData = res.data
                        }
                    }
                break
                case 'users':
                    let res2 = await api.get('/usersall', {headers: {id}});
                    if(res2){
                        if(res2.data){
                            csvData = res2.data
                        }
                    }
                break
                case 'credits':
                    let res3 = await api.get('/creditsall', {headers: {id}});
                    if(res3){
                        if(res3.data){
                            csvData = res3.data
                        }
                    }
                break
            }

            // eslint-disable-next-line
            csvData.map((client, i)=>{
                if(csvData[i].statement){
                    // eslint-disable-next-line
                    csvData[i].statement.map((statement, ii)=>{
                        if(csvData[i].statement[ii].date){
                            csvData[i].statement[ii].date = new Date(csvData[i].statement[ii].date).toLocaleDateString();
                        }
                    })
                    csvData[i].statement = JSON.stringify(csvData[i].statement)
                }
                delete csvData[i]._id
                delete csvData[i].__v
                delete csvData[i].updatedAt
                delete csvData[i].createdAt
                csvData[i].admin = csvData[i].admin === false ? "Cliente" : "Administrador" 

                if(csvData[i].vehicle){
                    let destination = csvData[i].destination
                    delete csvData[i].admin;
                    csvData[i].bought = csvData[i].bought === true ? "Comprado" : "Sem comprar";
                    csvData[i].destino = destination ? destination.code : 'Usuário deletado'
                }
            })
            
            const ws = XLSX.utils.json_to_sheet(csvData);
            const wb = { Sheets: { 'Clientes': ws }, SheetNames: ['Clientes'] };
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], {type: fileType});
            FileSaver.saveAs(data, fileName + fileExtension);
        }else{
            const creditsData = await api.get('/creditsall', {headers: {id}});
            const usersData = await api.get('/usersall', {headers: {id}});
            const postsData = await api.get('/postsall', {headers: {id}});

            const csvData = [
                ...creditsData.data,
                ...usersData.data,
                ...postsData.data
            ]

            csvData.map((client, i)=>{
                if(csvData[i].statement){
                    // eslint-disable-next-line
                    csvData[i].statement.map((statement, ii)=>{
                        if(csvData[i].statement[ii].date){
                            csvData[i].statement[ii].date = new Date(csvData[i].statement[ii].date).toLocaleDateString();
                        }
                    })
                    csvData[i].statement = JSON.stringify(csvData[i].statement)
                }
                delete csvData[i]._id
                delete csvData[i].__v
                delete csvData[i].updatedAt
                delete csvData[i].createdAt
                csvData[i].admin = csvData[i].admin === false ? "Cliente" : "Administrador" 

                if(csvData[i].vehicle){
                    let destination = csvData[i].destination
                    delete csvData[i].admin;
                    csvData[i].bought = csvData[i].bought === true ? "Comprado" : "Sem comprar";
                    csvData[i].destino = destination ? destination.code : 'Usuário deletado'
                }
            })
            const ws = XLSX.utils.json_to_sheet(csvData);
            const wb = { Sheets: { 'Clientes': ws }, SheetNames: ['Clientes'] };
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], {type: fileType});
            FileSaver.saveAs(data, fileName + fileExtension);
        }
        
    }

    return (
        <ExportButton onClick={(e)=> {
            exportToCSV(fileName);
            // setBackups(Math.floor(Math.random() * 5000) + 1)
        }}>{type !== "all" ? 'Backup' : 'Backup total'}</ExportButton>
    )
}