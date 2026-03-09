DOCKER_USER = YOUR_DOCKERHUB_USERNAME
IMAGE_NAME = procurement-frontend
TAG = latest

NEXT_PUBLIC_BACKEND_API_URL ?= http://localhost:8000
NEXT_PUBLIC_FRONTEND_URL ?= http://localhost:3000

FULL_IMAGE = $(DOCKER_USER)/$(IMAGE_NAME):$(TAG)

.PHONY: build push all

build:
	docker build \
		--build-arg NEXT_PUBLIC_BACKEND_API_URL=$(NEXT_PUBLIC_BACKEND_API_URL) \
		--build-arg NEXT_PUBLIC_FRONTEND_URL=$(NEXT_PUBLIC_FRONTEND_URL) \
		-t $(FULL_IMAGE) .

push:
	docker push $(FULL_IMAGE)

all: build push