-- this script prepares a MySQL server for the project
-- create project developement database with the name : pro_alx_db
CREATE DATABASE IF NOT EXISTS pro_alx_db;
-- creating new user named : pro_alx with all privileges on the db pro_alx_db
-- with the password : pro_alx_pwd if it dosen't exist
CREATE USER IF NOT EXISTS 'pro_alx'@'localhost' IDENTIFIED BY 'pro_alx_pwd';
-- granting all privileges to the new user
GRANT ALL PRIVILEGES ON pro_alx_db.* TO 'pro_alx'@'localhost';
FLUSH PRIVILEGES;
