package controller

import (
	"net/http"

	"github.com/Sakeezt/sa-project/entity"
	"github.com/gin-gonic/gin"
)

// GET /students/:code
// Get student by student_code
func GetStudent(c *gin.Context) {
	var student entity.Student
	code := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM students WHERE id = ?", code).First(&student).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": student})
}

// POST /students
func CreateStudent(c *gin.Context) {
	var student entity.Student
	if err := c.ShouldBindJSON(&student); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&student).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": student})
}
