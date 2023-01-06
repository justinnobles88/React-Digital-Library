import React, { useState } from 'react';
import {DataGrid, GridColDef } from '@material-ui/data-grid';
import { useGetData } from '../../custom-hooks';
import { server_calls } from '../../api/server';
import { Button, Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle } from '@material-ui/core';
import { BookForm } from '../BookForm';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90, hide: true },
  { field: 'title', headerName: 'Title', flex: 1 },
  { field: 'author', headerName: 'Author', flex: 1 },
  { field: 'cover', headerName: 'Cover', flex: 1 },
  { field: 'pages', headerName: 'Pages', flex: 2 },
];

interface gridData {
  data: {
      id?:string
  }
}


export const DataTable = () => {

  let { contactData, getData } = useGetData();
  let [open, setOpen] = useState(false);
  let [gridData, setData] = useState<gridData>({data:{}});
  const [selectionModel, setSelectionModel] = useState<any>([]);
  

  let handleOpen = () => {
      setOpen(true)
  };
  let handleClose = () => {
      setOpen(false)
  };

  let deleteData = () => {
      server_calls.delete(selectionModel);
      console.log(gridData.data.id);
      getData();
      setTimeout( () => { window.location.reload(); }, 1000)
  }

  console.log(gridData.data.id!);
  console.log(`testing for data ${contactData}`)

  return (
    <div style={{ height: 400, width: '100%' }}>
        <h2>My Books</h2>

    <DataGrid rows={ contactData } columns={ columns } pageSize={ 5 } checkboxSelection={true} 
    onSelectionModelChange={ (item) => {
        setSelectionModel(item)
        console.log(item)
      }}
    />

    <Button onClick={handleOpen}>Update</Button>
    <Button variant="contained" color="secondary" onClick={deleteData}>Delete</Button>

    {/* Dialog pop-up */}
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Update Contact {selectionModel}</DialogTitle>
        <DialogContent>
            <DialogContentText>Update Contact</DialogContentText>
                <BookForm id={selectionModel!}/>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">Cancel</Button>
            <Button onClick={handleClose} color="primary">Done</Button>
        </DialogActions>
    </Dialog>
        
    </div>
)
}

