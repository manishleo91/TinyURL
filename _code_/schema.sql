ALTER USER 'root'@'localhost' IDENTIFIED BY '12345678';
create user 
grant all on *.* to 'root'@'%';
grant all on *.* to 'root'@'localhost';

create database aqilliz_db;
use aqilliz_db;
create table url_map (tinyurl VARCHAR(8) primary key, longurl text, timerequested datetime, expirydate datetime);