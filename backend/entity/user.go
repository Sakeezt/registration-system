package entity

import (
	"time"

	"gorm.io/gorm"
)

//การกำหนด schema
//ต้องเเก้ตามพี่
type Student struct {
	gorm.Model
	Name string
	//StudentCode
	Code         string         `gorm:"uniqueIndex"`
	Registration []Registration `gorm:"foreignKey:UserID"`
	Password     string
}

type Place struct {
	gorm.Model
	Name string
	Bill []Bill `gorm:"foreignKey:PlaceID"`
}

type PaymentType struct {
	gorm.Model
	Name string
	Bill []Bill `gorm:"foreignKey:PaymentTypeID"`
}

//เเก้ตามเฟย ใช้คำว่า Enrollment

type Registration struct {
	gorm.Model
	UngraduatedYear uint
	Trimester       uint
	EnrollDateTime  time.Time
	TotalCredit     uint
	UserID          *uint
	User            Student
}

//เชื่อม Bill เเบบ 1 ต่อ 1 กับ ใบ Registration
type Bill struct {
	gorm.Model

	BillTime time.Time

	PaymentTypeID uint
	PaymentType   PaymentType

	RegistrationID *uint        `gorm:"uniqueIndex"`
	Registration   Registration `gorm:"constraint:OnDelete:CASCADE;"` //belong to ลบใบลงทะเบียน บิลหาย

	PlaceID *uint
	Place   Place

	TotalPrice uint
}
