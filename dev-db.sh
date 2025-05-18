#!/bin/bash
docker run \
	-e POSTGRES_PASSWORD=mysecretpassword \
	-e PGDATA=/var/lib/postgresql/data/pgdata \
	-p 5432:5432 \
	-v ./pgdata:/var/lib/postgresql/data \
	postgres

