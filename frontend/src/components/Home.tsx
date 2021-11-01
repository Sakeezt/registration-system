import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2),
    },
    table: {
      minWidth: 650,
    },
    tableSpace: {
      marginTop: 20,
    },
  })
);

function Home() {
  const classes = useStyles();

  return (
    <div>
      <Container className={classes.container} maxWidth="md">
        <h1 style={{ textAlign: "center" }}>ระบบใบชำระเงินค่าลงทะเบียนเรียน</h1>
        <h4><u>Requirements</u></h4>
        <p>
        ระบบลงทะเบียนเรียนของมหาวิทยาลัย 
        เป็นระบบที่ให้นักศึกษาในมหาวิทยาลัยสามารถ login เข้าสู่ระบบเพื่อลงทะเบียนในรายวิชาที่ต้องการเรียนได้ 
        และจะมีระบบเพื่อใช้งานในส่วนของระบบใบชำระเงินค่าลงทะเบียนเรียน เมื่อเข้ามาแล้วระบบจะแสดงข้อมูลที่ใช้
        สำหรับเลือก เพื่อแจ้งใบชำระเงินค่าลงทะเบียนเรียนในเทอมที่นักศึกษากำลังศึกษาอยู่ โดยจะมีข้อมูล วัน เดือน 
        ปี ใบลงทะเบียนเรียน สถานที่ชำระค่าลงทะเบียนเรียน และ ช่องทางการชำระเงิน
        </p>
        <br />
      </Container>
    </div>
  );
}
export default Home;