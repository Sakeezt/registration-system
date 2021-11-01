package entity

import (
	"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("sa-64.db"), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	database.AutoMigrate(
		&Registration{},
		&Student{},
		&Place{},
		&PaymentType{},
		&Bill{},
	)
	db = database
	password, err := bcrypt.GenerateFromPassword([]byte("123456"), 14)
	if err != nil {
		panic("failed")
	}

	db.Model(&Student{}).Create(&Student{
		Code:     "B6209568",
		Name:     "Saharat Juntarin",
		Password: string(password),
	})

	db.Model(&Student{}).Create(&Student{
		Name:     "Sakeet juntarin",
		Code:     "B2222222",
		Password: string(password),
	})

	var Saharat Student
	var Sakeet Student
	//var A Student

	db.Raw("SELECT * FROM students WHERE code = ?", "B6209568").Scan(&Saharat)
	db.Raw("SELECT * FROM students WHERE code = ?", "B2222222").Scan(&Sakeet)
	//db.Raw("SELECT * FROM students WHERE code = ?", "B3333333").Scan(&A)

	//registration

	Registration1 := Registration{

		UngraduatedYear: 2019,
		Trimester:       3,
		TotalCredit:     10,
		EnrollDateTime:  time.Now(),
		User:            Saharat,
	}
	db.Model(&Registration{}).Create(&Registration1)

	Registration2 := Registration{

		UngraduatedYear: 2019,
		Trimester:       2,
		TotalCredit:     8,
		EnrollDateTime:  time.Now(),
		User:            Saharat,
	}
	db.Model(&Registration{}).Create(&Registration2)

	Registration3 := Registration{

		UngraduatedYear: 2019,
		Trimester:       1,
		TotalCredit:     15,
		EnrollDateTime:  time.Now(),
		User:            Saharat,
	}
	db.Model(&Registration{}).Create(&Registration3)

	Registration4 := Registration{

		UngraduatedYear: 2018,
		Trimester:       3,
		TotalCredit:     20,
		EnrollDateTime:  time.Now(),
		User:            Sakeet,
	}
	db.Model(&Registration{}).Create(&Registration4)

	//place
	Place1 := Place{
		Name: "ธนาคาร A",
	}
	db.Model(&Place{}).Create(&Place1)
	Place2 := Place{
		Name: "ธนาคาร B",
	}
	db.Model(&Place{}).Create(&Place2)
	Place3 := Place{
		Name: "ธนาคาร C",
	}
	db.Model(&Place{}).Create(&Place3)

	//PaymentType
	PaymentType1 := PaymentType{
		Name: "เงินสด",
	}
	db.Model(&PaymentType{}).Create(&PaymentType1)
	PaymentType2 := PaymentType{
		Name: "หักผ่านบัญชี",
	}
	db.Model(&PaymentType{}).Create(&PaymentType2)
	PaymentType3 := PaymentType{
		Name: "ทุน",
	}
	db.Model(&PaymentType{}).Create(&PaymentType3)

	//Bill1
	/*db.Model(&Bill{}).Create(&Bill{

		Registration: Registration1,
		Place:        Place1,
		PaymentType:  PaymentType1,
		BillTime:     time.Now(),
		TotalPrice:   (Registration1.TotalCredit * 800),
	})*/

	/*//Bill2
	db.Model(&Bill{}).Create(&Bill{

		Registration: Registration2,
		Place:        Place2,
		PaymentType:  PaymentType2,
		BillTime:     time.Now(),
		TotalPrice:   (Registration2.TotalCredit * 800),
	})

	//Bill3
	db.Model(&Bill{}).Create(&Bill{

		Registration: Registration3,
		Place:        Place3,
		PaymentType:  PaymentType3,
		BillTime:     time.Now(),
		TotalPrice:   (Registration2.TotalCredit * 800),
	})*/

}
