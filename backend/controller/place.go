package controller

import (
	"net/http"

	"github.com/Sakeezt/sa-project/entity"
	"github.com/gin-gonic/gin"
)

// GET /Places
func GetPlace(c *gin.Context) {
	var place []entity.Place
	if err := entity.DB().Raw("SELECT * FROM places").Scan(&place).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": place})
}
