#!/bin/bash

# To run this script
# sudo bash sql_setup.sh

env_file=$(locate ProAlx/.env)

if [ -f "$env_file" ]; then
    # shellcheck source=/dev/null
    source "$env_file"
else
    echo "Error: create ProAlx/.env file"
    exit 1
fi
# set env variables
# DB_USERNAME
# DB_PASSWORD

# Create project development database
mysql -e "CREATE DATABASE IF NOT EXISTS pro_alx_db;"

# Create new user with privileges
mysql -e "CREATE USER IF NOT EXISTS '$DB_USERNAME'@'localhost' IDENTIFIED BY '$DB_PASSWORD';"

# Grant privileges to the new user
mysql -e "GRANT ALL PRIVILEGES ON pro_alx_db.* TO '$DB_USERNAME'@'localhost';"

#Allow user to observe db server performance metrics
mysql -e "GRANT SELECT ON performance_schema.* TO '$DB_USERNAME'@'localhost';"

# Flush privileges
mysql -e "FLUSH PRIVILEGES;"
