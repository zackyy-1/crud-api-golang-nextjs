	package middleware

	import (
		"os"

		"github.com/gofiber/fiber/v2"
		"github.com/golang-jwt/jwt/v5"
	)

	func AuthMiddleware(c *fiber.Ctx) error {
		tokenString := c.Get("Authorization")
		if tokenString == "" {
			return c.Status(fiber.StatusUnauthorized).SendString("Missing token")
		}

		// hapus prefix "Bearer " kalo ada
		if len(tokenString) > 7 && tokenString[:7] == "Bearer " {
			tokenString = tokenString[7:]
		}

		secret := os.Getenv("JWT_SECRET")
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			return []byte(secret), nil
		})

		if err != nil || !token.Valid {
			return c.Status(fiber.StatusUnauthorized).SendString("Invalid token")
		}

		// simpen claims ke context biar bisa dipake di handler
		if claims, ok := token.Claims.(jwt.MapClaims); ok {
			c.Locals("user", claims)
		}

		return c.Next()
	}