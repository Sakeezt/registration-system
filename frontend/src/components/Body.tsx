import React, { useState, useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Box, Paper, Select } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import FormControl from "@material-ui/core/FormControl";
import { Alert } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";
import { BillInterface } from "../models/IBill";
import { RegistrationsInterface } from "../models/IRegistrations";
import { PaymentInterface } from "../models/IPayment";
import { PlaceInterface } from "../models/IPlace";

import { Link as RouterLink } from "react-router-dom";
import { MenuItem } from "@material-ui/core";
import { KeyboardDateTimePicker } from "@material-ui/pickers";

const useStyles = makeStyles((theme: Theme) =>
  //การกำหนดลักษณะ

  createStyles({
    root: { flexGrow: 1 },

    container: { marginTop: theme.spacing(2) },

    paper: { padding: theme.spacing(2), color: theme.palette.text.secondary },

    table: { minWidth: 20 },

    position: { marginleft: theme.spacing(5) },
  })
);

/*function createData(name: string, amount: number) {
    return { name, amount };
}
*/

export default function Body() {
  const classes = useStyles();
  //เก็บวันที่
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date()
  );
  //การเปลี่ยนค่าวันที่
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  //option

  //Registration
  const [Registration, setRegistration] = React.useState< RegistrationsInterface[]>([]);

  const getRegistration = async () => {
    const apiUrl = `http://localhost:8080/registrations/${localStorage.getItem("uid")}`;

    const requestOptions = {
      method: "GET",

      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())

      .then((res) => {
        console.log(res.data);

        if (res.data) {
          setRegistration(res.data);
        } else {
          console.log("else");
        }
      });
  };
  //สำหรับล็อคหน่วยดิจ
  const [Reg, setReg] = React.useState<RegistrationsInterface>();
  //PaymentType
  const [PaymentType, setPaymentType] = React.useState<PaymentInterface[]>([]);
  const getPaymentType = async () => {
    const apiUrl = "http://localhost:8080/payment_types";

    const requestOptions = {
      method: "GET",

      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())

      .then((res) => {
        console.log(res.data);

        if (res.data) {
          setPaymentType(res.data);
        } else {
          console.log("else");
        }
      });
  };
  //Place
  const [Place, setPlace] = React.useState<PlaceInterface[]>([]);
  const getPlace = async () => {
    const apiUrl = "http://localhost:8080/places";

    const requestOptions = {
      method: "GET",

      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())

      .then((res) => {
        console.log(res.data);

        if (res.data) {
          setPlace(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const [BillData, setBillData] = React.useState<Partial<BillInterface>>({});

  //Submit
  //set คือการ set ค่า
  const [success, setSuccess] = useState(false);

  const [warning, setWarning] = useState(false); // ตัวเเสดง popup ว่ามีซ้ำ

  const [error, setError] = useState(false);

  
  //เเจ้งเตือนเมื่อข้อมูลว่าง
  const [isItemEmpty, setIsItemEmpty] = useState<boolean>(false);
  const [msg,setMsg] = useState<string>("");

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setWarning(false);
    setError(false);
    setIsItemEmpty(false);
  };
  
    
  
  function submit() {
    
    if((BillData?.RegistrationID === 0 || !BillData?.RegistrationID)&&(BillData?.PlaceID === 0 || !BillData?.PlaceID)&&(BillData?.PaymentTypeID === 0 || !BillData?.PaymentTypeID )){
      setIsItemEmpty(true);
      setMsg("กรุณากรอกข้อมูลให้ครบถ้วน");
      return
    }
    if((BillData?.PlaceID === 0 || !BillData?.PlaceID)&&(BillData?.PaymentTypeID === 0 || !BillData?.PaymentTypeID )){
      setIsItemEmpty(true);
      setMsg("กรุณาเลือกสถานที่ชำระเงินเเละช่องทางการชำระเงิน");
      return
    }
    if((BillData?.RegistrationID === 0 || !BillData?.RegistrationID)&&(BillData?.PlaceID === 0 || !BillData?.PlaceID)){
      setIsItemEmpty(true);
      setMsg("กรุณาเลือกใบลงทะเบียนเรียนเเละสถานที่ชำระเงิน");
      return
    }
    if((BillData?.RegistrationID === 0 || !BillData?.RegistrationID)&&(BillData?.PaymentTypeID === 0 || !BillData?.PaymentTypeID )){
      setIsItemEmpty(true);
      setMsg("กรุณาเลือกใบลงทะเบียนเรียนเเละช่องทางการชำระเงิน");
      return
    }
    if (BillData?.RegistrationID === 0 || !BillData?.RegistrationID){
      setIsItemEmpty(true);
      setMsg("กรุณาเลือกใบลงทะเบียนเรียน");
      return
    }
    if (BillData?.PlaceID === 0 || !BillData?.PlaceID){
      setIsItemEmpty(true);
      setMsg("กรุณาเลือกสถานที่ชำระเงิน");
      return
    }
    if (BillData?.PaymentTypeID === 0 || !BillData?.PaymentTypeID ) {
      setIsItemEmpty(true);
      setMsg("กรุณาเลือกช่องทางการชำระเงิน");
      return
    }
    
    
    
    
    
    //กดบันทึกเเล้ว

    //ส่ง data ไป backend
    let data = {
      //ชื่อต้องตรงกับ backend

      RegistrationID: BillData?.RegistrationID,

      PaymentTypeID: BillData?.PaymentTypeID,

      PlaceID: BillData?.PlaceID,

      Totalcredit: BillData?.Registration?.TotalCredit,

      BillTime: selectedDate,
    };

    const apiUrl = "http://localhost:8080/Createbills";

    const requestOptions = {
      //ส่งไป backend
      method: "POST",

      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())

      .then((res) => {
        if (res.billDuplicate) {
          setWarning(true);
        }
        if (res.data) {
          setSuccess(true);
        } else {
          setError(true);
        }
      });
  }

  useEffect(() => {
    getRegistration();
    getPaymentType();
    getPlace();
  }, []);

  //handleChange คือการเปลี่ยนค่าในตัวแปร bill
  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof BillData;
    setBillData({
      ...BillData,
      [name]: event.target.value,
    });
    //การล็อค หน่วยกิตตามใบลงทะเบียนเรียน
    if (event.target.name === "RegistrationID") {
      setReg(Registration.find((r) => r.ID === event.target.value));
    }
  };
  console.log(Registration);

  return (
    <Container className={classes.container} maxWidth="lg">
      <Snackbar open={success} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={warning} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">
          มีใบลงทะเบียนเรียนที่ชำระเงินแล้ว กรุณาเลือกใบลงทะเบียนใหม่
        </Alert>
      </Snackbar>
      <Snackbar open={isItemEmpty} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="warning">
            {msg}
          </Alert>
        </Snackbar>
      <Paper className={classes.paper}>
        <Box display="flex">
          <br />
          <br />
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
              align="center"
            >
              ใบชำระเงินค่าลงทะเบียนเรียน
            </Typography>
            <br />
          </Box>
        </Box>
        <Box flexGrow={1}>
          <Button
            component={RouterLink}
            to="/history"
            variant="contained"
            color="primary"
            style={{ float: "right" }}
          >
            ประวัติใบชำระเงิน
          </Button>
        </Box>
        <br />
        <br />
        <Divider />
        <br />

        <Grid container spacing={3} className={classes.root}>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ใบลงทะเบียนเรียน</p>
              <Select
                //การกำหนดค่า
                value={BillData.RegistrationID}
                //เปลี่ยนค่าที่รับเข้ามาจาก Value
                onChange={handleChange}
                //กำหนดให้ value
                inputProps={{
                  name: "RegistrationID",
                }}
                defaultValue={""}
              >
                <MenuItem value="" key={0}>
                  เลือกใบลงทะเบียนเรียน
                </MenuItem>
                {Registration.map((item: RegistrationsInterface) => (
                  <MenuItem value={item.ID} key={item.UngraduatedYear}>
                  ปี {item.UngraduatedYear} เทอม {item.Trimester}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>หน่วยกิตรวม</p>
              <TextField
                disabled
                fullWidth
                variant="outlined"
                value={Reg?.TotalCredit}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>สถานที่ชำระเงิน</p>
              <Select
                value={BillData.PlaceID}
                onChange={handleChange}
                inputProps={{
                  name: "PlaceID",
                }}
                defaultValue={""}
              >
                <MenuItem value="" key={0}>
                  เลือกสถานที่ชำระเงิน
                </MenuItem>
                {Place.map((item: PlaceInterface) => (
                  <MenuItem value={item.ID} key={item.ID}>
                    {item.Name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ช่องทางการชำระเงิน</p>
              <Select
                value={BillData.PaymentTypeID}
                onChange={handleChange}
                inputProps={{
                  name: "PaymentTypeID",
                }}
                defaultValue={""}
              >
                <MenuItem value="" key={0}>
                  เลือกช่องทางการชำระเงิน
                </MenuItem>
                {PaymentType.map((item: PaymentInterface) => (
                  <MenuItem value={item.ID} key={item.ID}>
                    {item.Name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <p>วันที่เเละเวลา</p>

            <form className={classes.container} noValidate>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                  name="WatchedTime"
                  value={selectedDate}
                  onChange={handleDateChange}
                  label=""
                  minDate={new Date("2018-01-01T00:00")}
                  format="yyyy/MM/dd hh:mm a"
                />
              </MuiPickersUtilsProvider>
            </form>
          </Grid>

          <Grid item xs={12}>
            <Button
              style={{ float: "right" }}
              onClick={submit}
              variant="contained"
              color="primary"
            >
              บันทึก
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
