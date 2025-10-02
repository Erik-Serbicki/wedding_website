.PHONY: help build up down logs shell-backend shell-frontend test clean

help:
	@echo "Wedding Website - Available Commands"
	@echo ""
	@echo "Development:"
	@echo "  make build          - Build all Docker images"
	@echo "  make up             - Start development environment"
	@echo "  make down           - Stop all containers"
	@echo "  make restart        - Restart all containers"
	@echo "  make logs           - View logs (all services)"
	@echo "  make logs-backend   - View backend logs"
	@echo "  make logs-frontend  - View frontend logs"
	@echo ""
	@echo "Django Commands:"
	@echo "  make migrate        - Run Django migrations"
	@echo "  make makemigrations - Create new migrations"
	@echo "  make createsuperuser - Create Django admin user"
	@echo "  make shell-backend  - Open Django shell"
	@echo "  make dbshell        - Open PostgreSQL shell"
	@echo ""
	@echo "Frontend Commands:"
	@echo "  make shell-frontend - Open frontend container shell"
	@echo "  make npm-install    - Install npm packages"
	@echo ""
	@echo "Maintenance:"
	@echo "  make clean          - Remove containers and volumes"
	@echo "  make reset          - Complete reset (DELETES ALL DATA)"
	@echo ""
	@echo "Production:"
	@echo "  make prod-build     - Build production images"
	@echo "  make prod-up        - Start production environment"
	@echo "  make prod-down      - Stop production environment"

build:
	docker-compose build

up:
	docker-compose up

upd:
	docker-compose up -d

down:
	docker-compose down

restart:
	docker-compose restart

logs:
	docker-compose logs -f

logs-backend:
	docker-compose logs -f backend

logs-frontend:
	docker-compose logs -f frontend

migrate:
	docker-compose exec backend uv run manage.py migrate

makemigrations:
	docker-compose exec backend uv run manage.py makemigrations

createsuperuser:
	docker-compose exec backend uv run manage.py createsuperuser

shell-backend:
	docker-compose exec backend uv run manage.py shell

dbshell:
	docker-compose exec backend uv run manage.py dbshell

collectstatic:
	docker-compose exec backend uv run manage.py collectstatic --noinput

shell-frontend:
	docker-compose exec frontend sh

npm-install:
	docker-compose exec frontend npm install

clean:
	docker-compose down
	@echo "Containers stopped. Volumes preserved."

reset:
	@echo "WARNING: This will delete ALL data including the database!"
	@read -p "Are you sure? (y/N): " confirm && [ "$$confirm" = "y" ]
	docker-compose down -v
	@echo "Reset complete. Run 'make up' to start fresh."

prod-build:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml build

prod-up:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

prod-down:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml down

prod-logs:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml logs -f
