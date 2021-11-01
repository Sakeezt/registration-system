package main

import (
	"github.com/Sakeezt/sa-project/controller"

	"github.com/Sakeezt/sa-project/entity"

	"github.com/Sakeezt/sa-project/middlewares"

	"github.com/gin-gonic/gin"
)

func main() {
	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	api := r.Group("")
	{
		protected := api.Use(middlewares.Authorizes())
		{

			// Student Routes
			protected.GET("/students/:id", controller.GetStudent)
			protected.POST("/students", controller.CreateStudent)

			// registation Routes
			protected.GET("/registrations", controller.ListRegistration)
			protected.GET("/registrations/:id", controller.ListEnrollment)

			// place Routes
			protected.GET("/places", controller.GetPlace)

			// payment_types Routes
			protected.GET("/payment_types", controller.GetPaymentType)

			// bills Routes
			protected.GET("/bills", controller.ListBill)
			protected.GET("/bills/:id", controller.ListIDBill)
			protected.POST("/Createbills", controller.Createbill)

		}
	}

	// Authentication Routes
	r.POST("/api/login", controller.Login)

	// Run the server
	r.Run()
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
