#!/bin/sh


NETWORK_NAME_1="rideshare-network"


# Check if the Docker network exists
if ! docker network inspect "$NETWORK_NAME_1" >/dev/null 2>&1 ; then
    # Create the Docker network
    docker network create "$NETWORK_NAME_1"
    echo "Docker network '$NETWORK_NAME_1' created."
else
    echo "Docker network '$NETWORK_NAME_1' already exists."
fi

docker-compose down && \
docker-compose up  --build -d