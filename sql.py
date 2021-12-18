import pymysql
from sqlalchemy import create_engine

class sqlConfig:
    db_host = 'mttcug-public.mysql.rds.aliyuncs.com'
    db_port = 3306
    db_user = 'mtt_db'
    db_passwd = 'Mtt676992'
    db_name = 'stock_db'

    db_info = {
            'user': sqlConfig.db_user,
            'password': sqlConfig.db_passwd,
            'host': sqlConfig.db_host,
            'port': sqlConfig.db_port,
            'database': sqlConfig.db_name
        }