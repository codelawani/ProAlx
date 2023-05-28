#!/bin/bash

# Get the MySQL credentials from environment variables
DB_USERNAME="$DB_USERNAME"
DB_PASSWORD="$DB_PASSWORD"

# Create project development database
mysql -e "CREATE DATABASE IF NOT EXISTS pro_alx_db;"

# Create new user with privileges
mysql -e "CREATE USER IF NOT EXISTS '$DB_USERNAME'@'localhost' IDENTIFIED BY '$DB_PASSWORD';"

# Grant privileges to the new user
mysql -e "GRANT ALL PRIVILEGES ON pro_alx_db.* TO '$DB_USERNAME'@'localhost';"

# Flush privileges
mysql -e "FLUSH PRIVILEGES;"