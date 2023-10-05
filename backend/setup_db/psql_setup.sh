#!/bin/bash

# To run this script
# sudo bash sql_setup.sh

# env_file=$(locate "ProAlx/.env" | head -n 1)
env_file=../../.env
if [ "$env_file" ]; then
    # shellcheck source=/dev/null
    source "$env_file"
else
    echo "Error: You need to create ProAlx/.env file"
    exit 1
fi
# set env variables
# DB_USERNAME
# DB_PASSWORD

# Drop and create the database
sudo -i -u postgres psql -c "DROP DATABASE IF EXISTS $DB_NAME;"
sudo -i -u postgres psql -c "CREATE DATABASE $DB_NAME;"

# Create a new user
sudo -i -u postgres psql -c "CREATE USER $DB_USERNAME WITH PASSWORD '$DB_PASSWORD';"

# Grant privileges to the new user on the database
sudo -i -u postgres psql -d "$DB_NAME" -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USERNAME;"

# Flush privileges (not needed in PostgreSQL)
