#!/bin/bash

# To run this script
# sudo bash sql_setup.sh

# env_file=$(locate "ProAlx/.env" | head -n 1)
env_file=../../.env
if [ "$env_file" ]; then
    # shellcheck source=/dev/null
    source "$env_file"
else
    echo "Error: U need to create ProAlx/.env file"
    exit 1
fi
# set env variables
# DB_USERNAME
# DB_PASSWORD

mysql -e "DROP DATABASE IF EXISTS $DB_NAME;"

# Create project development database
mysql -e "CREATE DATABASE IF NOT EXISTS $DB_NAME;"

# Create new user with privileges
mysql -e "CREATE USER IF NOT EXISTS '$DB_USERNAME'@'localhost' IDENTIFIED BY '$DB_PASSWORD';"

# Grant privileges to the new user
mysql -e "GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USERNAME'@'localhost';"

#Allow user to observe db server performance metrics
mysql -e "GRANT SELECT ON performance_schema.* TO '$DB_USERNAME'@'localhost';"

# Flush privileges
mysql -e "FLUSH PRIVILEGES;"
