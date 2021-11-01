package controller

import (
	"net/http"

	"github.com/Sakeezt/sa-project/entity"
	"github.com/gin-gonic/gin"
)

// GET /registration----> list
func ListRegistration(c *gin.Context) {
	var registrations []entity.Registration
	if err := entity.DB().Raw("SELECT * FROM registrations").Scan(&registrations).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": registrations})
}

func ListEnrollment(c *gin.Context) {
	id := c.Param("id")
	var enrollment []entity.Registration
	if err := entity.DB().Raw("SELECT * FROM registrations WHERE user_id = ? ORDER BY ungraduated_year,trimester ASC ", id).Scan(&enrollment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": enrollment})
}
