package config

import (
	"fmt"
	"log"
	"os"
	"perpus-api/models"
	"strings"

	"github.com/glebarez/sqlite"
	"github.com/joho/godotenv"
	"gorm.io/gorm"
	"golang.org/x/crypto/bcrypt"

)

var DB *gorm.DB

func HashPassword(password string) string {
    hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
    if err != nil {
        log.Fatal("Failed to hash password:", err)
    }
    return string(hash)
}

func ConnectDB() {
    // Load .env dulu
    err := godotenv.Load()
    if err != nil {
        log.Println("Failed to load .env file")
    }

    dbName := os.Getenv("DB_NAME")
    fmt.Println("DB_NAME from .env:", dbName)

    // kalau dbName kosong, kasih default
    if dbName == "" {
        dbName = "perpus.db"
    } else if !strings.HasSuffix(dbName, ".db") {
        dbName += ".db"
    }

    DB, err = gorm.Open(sqlite.Open(dbName), &gorm.Config{})
    if err != nil {
        log.Fatal("Failed to connect to SQLite: ", err)
    }

    fmt.Println("Connected to SQLite Database:", dbName)

    // Auto migrate tabel
    DB.AutoMigrate(&models.Book{}, &models.User{})

	// Seed default user
	// var count int64
	// DB.Model(&models.User{}).Count(&count)
	// if count == 0 {
	// 	defaultUser := models.User{
	// 		Username: "zacky",
    //         Email:    "zacky@gmail.com",
	// 		Password: HashPassword("123"), // hash password
	// 	}
	// 	DB.Create(&defaultUser)
	// 	fmt.Println("Default user created:", defaultUser.Username)
	// }

	// var countal int64
	// DB.Model(&models.Book{}).Count(&countal)
	// if countal == 0 {
	// 	defaultUser := models.Book{
	// 		Title:  "Default Book",
	// 		Author: "Default Author",
	// 		Year:   2023,
	// 	}
	// 	DB.Create(&defaultUser)
	// 	fmt.Println("Default book created:", defaultUser.Title)
	// }
}
