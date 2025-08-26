package routes

import (
	"perpus-api/controllers"
	"perpus-api/middleware"
	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {

	// Protected routes (butuh JWT)
	bookRoutes := app.Group("/books", middleware.AuthMiddleware)


	bookRoutes.Post("/", controllers.CreateBook)
	bookRoutes.Get("/", controllers.GetBooks)
	bookRoutes.Get("/:id", controllers.GetBook)
	bookRoutes.Put("/:id", controllers.UpdateBook)
	bookRoutes.Delete("/:id", controllers.DeleteBook)

	app.Post("/register", controllers.Register)
	app.Post("/login", controllers.Login)
	app.Get("/profile", middleware.AuthMiddleware, controllers.GetProfile)
}