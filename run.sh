#!/bin/bash
set -e

# Vars
FRONTEND_DIR="./ClientApp"
BACKEND_DIR="."
FRONTEND_IMAGE_NAME="my-react-builder"
CONTAINER_NAME="react-temp"
DIST_PATH="/app/client/dist"
WWWROOT_PATH="${BACKEND_DIR}/wwwroot"

echo "Building React Docker image..."
docker build -t $FRONTEND_IMAGE_NAME $FRONTEND_DIR

echo "Running frontend container..."
docker create --name $CONTAINER_NAME $FRONTEND_IMAGE_NAME

echo "Cleaning old wwwroot..."
rm -rf $WWWROOT_PATH
mkdir -p $WWWROOT_PATH

echo "Copying built files from container to wwwroot..."
docker cp $CONTAINER_NAME:$DIST_PATH/. $WWWROOT_PATH

echo "Cleaning up container..."
docker rm $CONTAINER_NAME

echo "Clean up image"
docker rmi $FRONTEND_IMAGE_NAME

echo "Running backend..."
dotnet run --project $BACKEND_DIR
