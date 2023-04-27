import React,{useState,useEffect} from 'react'
import moment from 'moment';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../redux/store';
import { IData, fetchDataAllProduct } from '../../../redux/reducer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

function createData(
  id:number,
  Status: string,
  updatedAt: string,
  Client: string,
  Currency: string,
  Total: number,
  Invoice: string,
) {
  return {id, Status, updatedAt, Client, Currency, Total, Invoice};
}

const Tablee = () => {
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState('');
  const [data, setData] = useState<IData[]>([]);

  useEffect(() => {
    dispatch(fetchDataAllProduct(document.cookie.split("=")[1]));
  }, [dispatch]);
 
  const products = useSelector((state: RootState) => state.Products);

  // useEffect(() => {
  //   // filter data here and then set it with setData
  //   const filteredData = products.filter((product) => product.Status === status);
  //   setData(filteredData);
  // }, [products, status]);
  
console.log(products)
  const rows = products.map((product) => {
    return createData(
      product.id,
      product.status,
      product.updatedAt,
      product.client,
      product.currency,
      product.total,
      product.invoice
    );
  });

  // const rows = data
  //   .filter((product) => {
  //     if (!status) {
  //       return true;
  //     }
  //     return product.Status === status;
  //   })
  //   .map((product) => {
  //     return createData(
  //       product.id,
  //       product.status,
  //       product.updatedAt,
  //       product.client,
  //       product.currency,
  //       product.total,
  //       product.invoice,
  //     );
  //   });
  
  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
    const filteredData = products.filter((product) => product.status === event.target.value);
  setData(filteredData);
  };

  return (
    <div style={{textAlign:'center',display:"flex",justifyContent:"center", padding:50}}>
      <div>
      <FormControl style={{width:120}}>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Status"
          onChange={handleStatusChange}
        >{rows.map((row) => (
           <MenuItem >{row.Status}</MenuItem>
        ))}
        </Select>
      </FormControl>
      {/* <FormControl style={{width:120,marginLeft:20}}>
        <InputLabel id="demo-simple-select-label">Client</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Client"
          // onChange={handleStatusChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl> */}
      <TableContainer component={Paper} style={{marginTop:20}}>
      <Table sx={{ minWidth: 900 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell >Status</TableCell>
            <TableCell >Date</TableCell>
            <TableCell >Client</TableCell>
            <TableCell >Currency</TableCell>
            <TableCell >Total</TableCell>
            <TableCell >Invoice</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell >{row.Status}</TableCell>
              <TableCell >{moment(row.updatedAt).format("DD/MM/YYYY")}</TableCell>
              <TableCell >{row.Client}</TableCell>
              <TableCell >{row.Currency}</TableCell>
              <TableCell >{row.Total}</TableCell>
              <TableCell >{row.Invoice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
</div>
  )
}

export default Tablee