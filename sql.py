import pymysql
from sqlalchemy import create_engine

class sqlConfig:
    db_host = 'mttcug-public.mysql.rds.aliyuncs.com'
    db_port = 3306
    db_user = 'mttcug_db'
    db_passwd = 'Mtt676992'
    db_name = 'stock_db'

 db_info = {
            'user': sqlConfig.db_user,
            'password': sqlConfig.db_passwd,
            'host': sqlConfig.db_host,
            'port': sqlConfig.db_port,
            'database': sqlConfig.db_name
        }

        engine = create_engine(
            'mysql+pymysql://%(user)s:%(password)s@%(host)s:%(port)d/%(database)s?charset=utf8' % db_info,
            encoding='utf-8'
        )

def sql_con(self):
    con = pymysql.connect(
        host = sqlConfig.db_host,
        port = sqlConfig.db_port,
        user = sqlConfig.db_user,
        password = sqlConfig.db_passwd,
        database = sqlConfig.db_name
    )
    return con

def create_database(self, database_name):
    # 先创建连接
    conn = self.sql_con_without_database_name()
    cursor = conn.cursor()

    create_database_str = 'CREATE DATABASE %s;' % database_name

    cursor.execute(create_database_str)

    # 断开连接
    cursor.close()
    conn.close()

def create_table(self, create_table_str):
    # # mysql 创建表语言，表结构实例
    # create_table_str = '''create table student(
    #     id int,
    #     name char(16),
    #     born_year year,
    #     birth date,
    #     class_time time,
    #     reg_time datetime
    # );
    # '''
    # 先创建连接
    conn = self.sql_con()
    cursor = conn.cursor()

    cursor.execute(create_table_str)

    # 断开连接
    cursor.close()
    conn.close()

def insert_data_by_pandas(self, dataframe, table_name, if_exists='append'):
    '''
    通过dataframe 向 sql 中插入表，此方法缺点是若表已存在，不能替换表中部分重复数据，只能替换/追加整张表
    :param dataframe: pd.Dataframe类型
    :param table_name: 插入的表名
    :param if_exists: {'fail', 'replace', 'append'}, default 'fail'
        - fail: If table exists, do nothing.
        - replace: If table exists, drop it, recreate it, and insert data.
        - append: If table exists, insert data. Create if does not exist.
    :return:
    '''

    # 初始化数据库连接，使用pymysql模块
    db_info = {
        'user': sqlConfig.db_user,
        'password': sqlConfig.db_passwd,
        'host': sqlConfig.db_host,
        'port': sqlConfig.db_port,
        'database': sqlConfig.db_name
    }

    engine = create_engine(
        'mysql+pymysql://%(user)s:%(password)s@%(host)s:%(port)d/%(database)s?charset=utf8' % db_info,
        encoding='utf-8'
    )

    dataframe.to_sql(table_name, engine, if_exists=if_exists, index=False, chunksize=100)

def insert_data_multi(self, dataframe, table_name):
    '''
    通过dataframe 向 sql 中批量插入数据
    :param dataframe: pd.Dataframe类型
    :param table_name: 插入的表名
    :return:
    '''

    # 先创建连接
    conn = self.sql_con()
    cursor = conn.cursor()
    # 获取列名和值
    keys = dataframe.keys()
    values = dataframe.values.tolist()

    key_sql = ','.join(keys)
    value_sql = ','.join(['%s'] * dataframe.shape[1])

    # 插入语句
    insert_data_str = """ insert into %s (%s) values (%s)""" % (table_name, key_sql, value_sql)

    # 提交数据库操作
    cursor.executemany(insert_data_str, values)
    conn.commit()

    # 断开连接
    cursor.close()
    conn.close()


def update_data_multi(self, dataframe, table_name):
    '''
    通过dataframe 向 sql 中批量插入数据
    :param dataframe: pd.Dataframe类型
    :param table_name: 插入的表名
    :return:
    '''

    # 先创建连接
    conn = self.sql_con()
    cursor = conn.cursor()
    # 获取列名和值
    keys = dataframe.keys()
    values = dataframe.values.tolist()

    key_sql = ','.join(keys)
    value_sql = ','.join(['%s'] * dataframe.shape[1])

    # 插入语句，若数据已存在则更新数据
    insert_data_str = """ insert into %s (%s) values (%s) ON DUPLICATE KEY UPDATE""" % (table_name, key_sql, value_sql)
    update_str = ','.join([" {key} = VALUES({key})".format(key=key) for key in keys])
    insert_data_str += update_str

    # 提交数据库操作
    cursor.executemany(insert_data_str, values)
    conn.commit()

    # 断开连接
    cursor.close()
    conn.close()