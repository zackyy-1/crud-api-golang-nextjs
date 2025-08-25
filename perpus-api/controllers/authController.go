package controllers

import (
    "github.com/gofiber/fiber/v2"
    "github.com/golang-jwt/jwt/v5"
    "golang.org/x/crypto/bcrypt"
    "os"
    "time"
    "perpus-api/config"
    "perpus-api/models"
)

// Login user
func Login(c *fiber.Ctx) error {
    type LoginInput struct {
        Username string `json:"username"`
        Password string `json:"password"`
    }
    var input LoginInput
    if err := c.BodyParser(&input); err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
    }

    // ambil user dari database
    var user models.User
    if err := config.DB.Where("username = ? OR email = ?", input.Username, input.Username).First(&user).Error; err != nil {
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid credentials"})
    }

    // cek password
    if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)); err != nil {
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid credentials"})
    }

    // buat JWT
    claims := jwt.MapClaims{
        "id":       user.ID,
        "username": user.Username,
        "email":    user.Email,
        "exp":      time.Now().Add(time.Hour * 24).Unix(),
    }
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    t, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to generate token"})
    }

    return c.JSON(fiber.Map{"token": t})
}

// Register user baru
func Register(c *fiber.Ctx) error {
    type RegisterInput struct {
        Username string `json:"username"`
        Email    string `json:"email"`
        Password string `json:"password"`
    }

    var input RegisterInput
    if err := c.BodyParser(&input); err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
    }

    // hash password
    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to hash password"})
    }

    // buat user baru
    user := models.User{
        Username: input.Username,
        Email:    input.Email,
        Password: string(hashedPassword),
    }

    // simpan ke database
    var existing models.User
    if err := config.DB.Where("username = ? OR email = ?", input.Username, input.Email).First(&existing).Error; err == nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "error": "Username or email already taken",
        })
    }

    return c.Status(fiber.StatusCreated).JSON(fiber.Map{
        "message": "User registered successfully",
        "user": fiber.Map{
            "id":       user.ID,
            "username": user.Username,
            "email":    user.Email,
        },
    })
}