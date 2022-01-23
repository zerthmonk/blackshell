.DEFAULT_GOAL := help

ACCENT  := $(shell tput -Txterm setaf 2)
RESET := $(shell tput init)

build: ##  Собрать без кэша -- требует интернета
	@docker-compose build --no-cache

rebuild: ##  Собрать без кэша, с удалением node_modules -- требует интернета
	@docker-compose down -v
	@docker-compose build --no-cache

start: ##  Запуск всех сервисов
	@docker-compose up --force-recreate -d
	@docker-compose ps

sh.%: ##  Открыть shell в указанном сервисе [sh.[service]]
	docker-compose exec $* sh

exec: ##  Выполнение команды в указанном сервисе [service [command]]
	@docker-compose exec $$CMD

stop:  ##  Остановка всех сервисов
	@docker-compose down

restart.%: ##  Перезапустить сервис [restart.[service]]
	@docker-compose up --force-recreate -d $*

info:  ##  Показать список сервисов
	@docker-compose ps -a

help:
	@echo "\nКоманды:\n"
	@grep -E '^[a-zA-Z.%_-]+:.*?## .*$$' $(firstword $(MAKEFILE_LIST)) | awk 'BEGIN {FS = ":.*?## "}; {printf "%2s$(ACCENT)%-20s${RESET} %s\n", " ", $$1, $$2}'
	@echo ""
