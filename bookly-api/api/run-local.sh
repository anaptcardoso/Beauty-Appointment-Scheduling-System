#!/bin/bash
export DB_URL="jdbc:postgresql://localhost:5433/bookly"
export DB_USERNAME="bookly_user"
export DB_PASSWORD="bookly_pass"
./mvnw spring-boot:run
