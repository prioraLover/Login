package database

import (
	"fmt"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"os"
	"web/models"
)

var DB *gorm.DB

func ConnectDB() error {
	// Загружаем переменные из .env
	err := godotenv.Load()
	if err != nil {
		return fmt.Errorf("Ошибка загрузки .env файла: %w", err)
	}

	// Формируем строку подключения к базе данных
	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
		os.Getenv("DB_PORT"),
	)

	// Подключаемся к базе данных
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return fmt.Errorf("Ошибка подключения к базе данных: %w", err)
	}

	// Выполняем автоматическую миграцию для таблицы пользователей
	err = db.AutoMigrate(&models.User{})
	if err != nil {
		return fmt.Errorf("Ошибка миграции: %w", err)
	}

	// Сохраняем подключение в глобальной переменной DB
	DB = db
	fmt.Println("База данных успешно подключена!")
	return nil
}
