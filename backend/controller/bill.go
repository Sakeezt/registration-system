package controller

import (
	"net/http"

	"github.com/Sakeezt/sa-project/entity"
	"github.com/gin-gonic/gin"
)

// POST /bill //รับข้อมูลมาจาก Frontend มาบันทึกลง DB
func Createbill(c *gin.Context) {

	var bill entity.Bill
	var check_bill entity.Bill
	var payment_types entity.PaymentType
	var place entity.Place
	var registration entity.Registration

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร bill
	if err := c.ShouldBindJSON(&bill); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//ค้นหา id ของ enrollment ที่ชำระ bill แล้ว ถ้ามีใน bill ส่ง bill ที่มี enrollment ที่ซ้ำออกมา
	if tx := entity.DB().Where("registration_id = ?", bill.RegistrationID).Find(&check_bill); tx.RowsAffected != 0 {
		c.JSON(http.StatusOK, gin.H{"billDuplicate": check_bill})
		return
	}

	// 9: ค้นหา payment_types ด้วย id
	if tx := entity.DB().Where("id = ?", bill.PaymentTypeID).First(&payment_types); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "PaymentType not found"})
		return
	}

	// 10: ค้นหา place ด้วย id
	if tx := entity.DB().Where("id = ?", bill.PlaceID).First(&place); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Place not found"})
		return
	}

	// 11: ค้นหา registrations ด้วย id
	if tx := entity.DB().Where("id = ?", bill.RegistrationID).First(&registration); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Registration not found"})
		return
	}

	var calculate = (registration.TotalCredit * 800)

	// 12: สร้าง bill
	bi := entity.Bill{
		PaymentType:  payment_types, // โยงความสัมพันธ์กับ Entity payment_types
		Place:        place,         // โยงความสัมพันธ์กับ Entity place
		Registration: registration,  // โยงความสัมพันธ์กับ Entity registration
		BillTime:     bill.BillTime, // ตั้งค่าฟิลด์ BillTime
		TotalPrice:   calculate,
	}

	// 13: บันทึก
	if err := entity.DB().Create(&bi).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bi})
}

// GET /Bill
func ListBill(c *gin.Context) {
	var bill []entity.Bill
	if err := entity.DB().Preload("PaymentType").Preload("Place").Preload("Registration").Preload("Registration.User").Raw("SELECT * FROM bills").Find(&bill).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": bill})
}

// GET /Bill/:id  //ใข้ใน login

func ListIDBill(c *gin.Context) {
	id := c.Param("id")
	var registration []entity.Registration
	var bill []entity.Bill

	if tx := entity.DB().Where("user_id = ?", id).Find(&registration); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "registration not found"})
		return
	}

	for _, reg := range registration {
		var b entity.Bill
		if tx := entity.DB().Preload("Place").
			Preload("PaymentType").
			Preload("Registration").
			Preload("Registration.User").
			Where("registration_id = ?", reg.ID).Find(&b); tx.RowsAffected == 0 {
			continue
		} else {
			bill = append(bill, b)
		}
	}

	c.JSON(http.StatusOK, gin.H{"data": bill})
}
