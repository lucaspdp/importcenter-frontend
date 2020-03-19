import React from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx'
import {ExportButton} from '../styles/styles'

export const ExportCSV = ({csvData, fileName, setBackups}) =>{
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (csvData, fileName) => {
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
                csvData[i].destino = destination.code
            }
        })
        
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'Clientes': ws }, SheetNames: ['Clientes'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    return (
        <ExportButton onClick={(e)=> {
            exportToCSV(csvData, fileName);
            setBackups(Math.floor(Math.random() * 5000) + 1)
        }}>Backup</ExportButton>
    )
}