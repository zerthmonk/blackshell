.DEFAULT_GOAL := help

ACCENT  := $(shell tput -Txterm setaf 2)
RESET := $(shell tput init)
APP_NAME := blackshell

build: ##  Собрать
	@docker-compose build

build-clean: ##  Собрать без кэша, с удалением node_modules
	@docker-compose down -v
	@docker-compose build --no-cache

start: ##  Запуск сборки
	@docker-compose up --force-recreate -d
	@docker-compose ps

stop:  ##  Остановка всех сервисов
	@docker-compose down

sh: ##  Открыть shell в контейнере приложения
	docker-compose up --no-recreate -d
	docker-compose exec ${APP_NAME} sh
	
logs: ##  Отобразить логи контейнера приложения
	docker-compose logs -f ${APP_NAME}

test: ##  Открыть shell в контейнере приложения
	docker-compose up --no-recreate -d
	docker-compose exec ${APP_NAME} npm run test

info:  ##  Показать список сервисов
	@docker-compose ps -a

help:
	@echo "\nКоманды:\n"
	@grep -E '^[a-zA-Z.%_-]+:.*?## .*$$' $(firstword $(MAKEFILE_LIST)) | awk 'BEGIN {FS = ":.*?## "}; {printf "%2s$(ACCENT)%-20s${RESET} %s\n", " ", $$1, $$2}'
	@echo ""
