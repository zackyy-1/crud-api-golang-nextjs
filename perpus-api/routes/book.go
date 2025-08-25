package routes

import (
	"perpus-api/config"
	"perpus-api/models"

	"github.com/gofiber/fiber/v2"
)

func BookRoutes(app *fiber.App) {
	app.Get("/books", func(c *fiber.Ctx) error {
		var books []models.Book
		config.DB.Find(&books)
		return c.JSON(books)
	})

	app.Post("/books", func(c *fiber.Ctx) error {
		book := new(models.Book)
		if err := c.BodyParser(book); err != nil {
			return c.Status(400).JSON(err.Error())
		}
		config.DB.Create(&book)
		return c.JSON(book)
	})

	app.Put("/books/:id", func(c *fiber.Ctx) error {
		id := c.Params("id")
		var book models.Book
		config.DB.First(&book, id)
		if err := c.BodyParser(&book); err != nil {
			return c.Status(400).JSON(err.Error())
		}
		config.DB.Save(&book)
		return c.JSON(book)
	})

	app.Delete("/books/:id", func(c *fiber.Ctx) error {
		id := c.Params("id")
		config.DB.Delete(&models.Book{}, id)
		return c.SendString("Book deleted")
	})
}