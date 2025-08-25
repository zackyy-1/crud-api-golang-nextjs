package controllers

import (
	"log"
	// "fmt"
	"perpus-api/config"
	"perpus-api/models"


	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"

)

func HashPassword(password string) string {
    hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
    if err != nil {
        log.Fatal("Failed to hash password:", err)
    }
    return string(hash)
}

// Create Book
func CreateBook(c *fiber.Ctx) error {
	book := new(models.Book)

	if err := c.BodyParser(book); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid input"})
	}

	if err := config.DB.Create(&book).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to create book"})
	}

	return c.JSON(book)
}

// Get all Books
func GetBooks(c *fiber.Ctx) error {
	var books []models.Book
	if err := config.DB.Find(&books).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch books"})
	}
	return c.JSON(books)
}

// Get single Book
func GetBook(c *fiber.Ctx) error {
	id := c.Params("id")
	var book models.Book
	if err := config.DB.First(&book, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Book not found"})
	}
	return c.JSON(book)
}

// Update Book
func UpdateBook(c *fiber.Ctx) error {
	id := c.Params("id")
	var book models.Book

	if err := config.DB.First(&book, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Book not found"})
	}

	if err := c.BodyParser(&book); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid input"})
	}

	config.DB.Save(&book)
	return c.JSON(book)
}

// Delete Book
func DeleteBook(c *fiber.Ctx) error {
	id := c.Params("id")
	var book models.Book

	if err := config.DB.First(&book, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Book not found"})
	}

	config.DB.Delete(&book)
	return c.JSON(fiber.Map{"message": "Book deleted"})
}

// Create User
func CreateUser(c *fiber.Ctx) error {
	user := new(models.User)

	if err := c.BodyParser(user); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid input"})
	}

	user.Password = HashPassword(user.Password) // Hash the password

	if err := config.DB.Create(&user).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to create user"})
	}

	return c.JSON(user)
}