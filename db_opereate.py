
import pandas as pd;
import tushare as ts;
import akshare as aks;
import pymysql
from sqlalchemy import create_engine
    
db_host = 'mttcug-public.mysql.rds.aliyuncs.com'
db_port = 3306
db_user = 'mtt_db'
db_passwd = 'Mtt676992'
db_name = 'stock_db'

engine = create_engine(f'mysql+pymysql://{db_user}:{db_passwd}@{db_host}:{db_port}/{db_name}')
# pro=ts.pro_api('79b02307d33ca733aeac643f8d1551a9794607ba8cc905f313815494')
# df=pro.concept()
# tushare行业
# df.to_sql('tushare_concept_table', engine)

#东方财富行业
dci = aks.stock_board_concept_name_em()
dci['成分股数量'] = dci['上涨家数'] + dci['下跌家数']
data = dci[['板块代码', '板块名称', '成分股数量']]
data.to_sql('dc_concept_table', engine)

#同花顺行业
thi = aks.stock_board_concept_name_ths()
thi['板块名称'] = thi['概念名称']
thi['板块代码'] = thi['代码'].str.slice(38, 44, 1)
data = thi[['板块代码', '板块名称', '成分股数量']]
data.to_sql('th_concept_table', engine)