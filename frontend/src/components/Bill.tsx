import React, { useEffect } from "react";

import { Link as RouterLink } from "react-router-dom";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button";

import Container from "@material-ui/core/Container";

import Paper from "@material-ui/core/Paper";

import Box from "@material-ui/core/Box";

import Table from "@material-ui/core/Table";

import TableBody from "@material-ui/core/TableBody";

import TableCell from "@material-ui/core/TableCell";

import TableContainer from "@material-ui/core/TableContainer";

import TableHead from "@material-ui/core/TableHead";

import TableRow from "@material-ui/core/TableRow";

import { BillInterface } from "../models/IBill";


import moment from 'moment';


 

const useStyles = makeStyles((theme: Theme) =>

 createStyles({

   container: {marginTop: theme.spacing(2)},

   table: { minWidth: 650},

   tableSpace: {marginTop: 20},

 })

);

 

function Bills() {

 const classes = useStyles();

 const [users, setUsers] = React.useState<BillInterface[]>([]);

 
// รอหน้า login




//เเก้เป็น getbill
//รับข้อมูลมาจาก DB
 const getUsers = async () => {

  let uid = localStorage.getItem("uid");

   const apiUrl = `http://localhost:8080/bills/${uid}`;

   const requestOptions = {

     method: "GET",

     headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
   };

 
   //การกระทำ
   fetch(apiUrl, requestOptions)

     .then((response) => response.json())

     .then((res) => {

       console.log(res.data);

       if (res.data) {

         setUsers(res.data);

       } else {

         console.log("else");

       }

     });

 };

 
//เพื่อให้มีการดึงข้อมูลใส่ combobox ตอนเริ่มต้นเเค่ครั้งเดียว
//
 useEffect(() => {

   getUsers();

 }, []);

 

 return (

   <div>

     <Container className={classes.container} maxWidth="lg">

       <Box display="flex">

         <Box flexGrow={1}>

           <Typography

             component="h2"

             variant="h6"

             color="primary"

             gutterBottom

           >

             ประวัติใบชำระเงินค่าลงทะเบียนเรียน

           </Typography>

         </Box>

         <Box>

           <Button

             component={RouterLink}

             to="/create"

             variant="contained"

             color="primary"

           >

             ใบชำระเงิน

           </Button>

         </Box>

       </Box>

       <TableContainer component={Paper} className={classes.tableSpace}>

         <Table className={classes.table} aria-label="simple table">

           <TableHead>

             <TableRow>

              
               <TableCell align="left" width="15%">

                ID

               </TableCell>
            


               <TableCell align="center" width="15%">

                PaymentType

               </TableCell>

               <TableCell align="center" width="15%">

                Place

               </TableCell>

               <TableCell align="center" width="20%">

               TotalPrice

               </TableCell>
               <TableCell align="center" width="20%">

               Trimester

               </TableCell>
               <TableCell align="center" width="20%">

               UngraduatedYear
               </TableCell>


               <TableCell align="center" width="20%">

               BillTime

               </TableCell>

             </TableRow>

           </TableHead>

           <TableBody>

             {users.map((bill: BillInterface) => (

               <TableRow key={bill.ID}>

                 <TableCell align="left">{bill.ID}</TableCell>

                 <TableCell align="left" >{bill.PaymentType.Name}</TableCell>

                 <TableCell align="left" >{bill.Place.Name}</TableCell>

                 <TableCell align="center">{bill.TotalPrice}</TableCell>

                 <TableCell align="center">{bill.Registration.Trimester}</TableCell>

                 <TableCell align="center">{bill.Registration.UngraduatedYear}</TableCell>

                 <TableCell align="center">{moment(bill.BillTime).format("DD/MM/YYYY HH:mm:ss A")}</TableCell>

               </TableRow>

             ))}

           </TableBody>

         </Table>

       </TableContainer>

     </Container>

   </div>

 );

}

 

export default Bills;