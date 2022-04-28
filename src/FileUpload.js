import React, { useState } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const FileUpload = () => {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [response, setResponse] = useState([]);

  const saveFile = (e) => {
    
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    

  };

  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    try {
      const res = await axios.post("http://localhost:4000/upload", formData);
      console.log(res);
      setResponse(res.data)
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div className="App">
      <h1>Upload JSON File</h1>
      <div className="form-component" >
        <input type="file" accept="application/JSON" id="fileUpload" onChange={saveFile} required />
        <Button variant="contained" onClick={uploadFile}>Upload</Button>
      </div>
      { response.length>0 &&
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell >USerId</StyledTableCell>
            <StyledTableCell >Id</StyledTableCell>
            <StyledTableCell >Title</StyledTableCell>
            <StyledTableCell >Body</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {response.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell >{row.userId}</StyledTableCell>
              <StyledTableCell >{row.id}</StyledTableCell>
              <StyledTableCell >{row.title}</StyledTableCell>
              <StyledTableCell >{row.body}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      }
      
    </div>
  );
};

export default FileUpload;
