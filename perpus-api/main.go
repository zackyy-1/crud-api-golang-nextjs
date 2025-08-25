package main

import (
	"github.com/gofiber/fiber/v2"
    "github.com/gofiber/fiber/v2/middleware/cors"
	"perpus-api/config"
	"perpus-api/models"
	"perpus-api/routes"
)

func main() {
    app := fiber.New()

    app.Use(cors.New(cors.Config{
        AllowOrigins: "http://localhost:3000",
        AllowHeaders: "Origin, Content-Type, Accept, Authorization",
        AllowMethods: "GET,POST,PUT,DELETE,OPTIONS",
    }))

    config.ConnectDB()
	config.DB.AutoMigrate(&models.Book{}, &models.User{})
	routes.Setup(app)

    // Route test
    app.Get("/", func(c *fiber.Ctx) error {
        return c.SendString("Fiber udah jalan nihh")
    })

    app.Listen(":8000")
}
