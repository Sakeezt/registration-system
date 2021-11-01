package middlewares

import (
	"net/http"
	"strings"

	"github.com/Sakeezt/sa-project/service"
	"github.com/gin-gonic/gin"
)

// Validates token
func Authorizes() gin.HandlerFunc {
	return func(c *gin.Context) {
		clientToken := c.Request.Header.Get("Authorization")
		if clientToken == "" {
			c.JSON(http.StatusForbidden, gin.H{"error": "no Authorization header provided"})
			return
		}

		extractedToken := strings.Split(clientToken, "Bearer ")

		if len(extractedToken) == 2 {
			clientToken = strings.TrimSpace(extractedToken[1])
		} else {
			c.JSON(http.StatusBadRequest, gin.H{"error": "incorrect format of Authorization token"})
			return
		}

		jwtWrapper := service.JwtWrapper{
			SecretKey: "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
			Issuer:    "AuthService",
		}

		claims, err := jwtWrapper.ValidateToken(clientToken)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			return
		}

		c.Set("StudentCode", claims.StudentCode)

		c.Next()
	}
}
