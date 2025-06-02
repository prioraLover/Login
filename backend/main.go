package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"web/database"
	"web/routes"
)

func main() {
	r := gin.Default()

	r.Use(cors.Default()) // включаем CORS

	database.ConnectDB()
	routes.SetupRoutes(r)

	r.Run(":8080")
}
