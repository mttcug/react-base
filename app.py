from flask import Flask, request, url_for
from flask_cors import cross_origin
import tushare as ts
import akshare as aks
import json
app = Flask(__name__)

url = 'api'
pro = ts.pro_api('79b02307d33ca733aeac643f8d1551a9794607ba8cc905f313815494')

#获取东方财富-行情中心-盘口异动数据
@app.route(f'/{url}/unusualChange', methods=['GET'])
@cross_origin()
def unusualChange():
    symbol = request.args.to_dict().get('symbol')
    predit = aks.stock_changes_em(symbol=symbol)
    df = predit.to_json(orient='records', force_ascii=False)
    return df

##############################################################################
# 获取东方财富网-数据中心-特色数据-高管持股
@app.route(f'/{url}/shareholdersChange', methods=['GET'])
@cross_origin()
def shareholdersChange():
    predit = aks.stock_em_ggcg()
    df = predit.to_json(orient='records', force_ascii=False)
    return df

##############################################################################
# 东方财富网-数据中心-研究报告-盈利预测
@app.route(f'/{url}/predictProfit', methods=['GET'])
@cross_origin()
def predictProfit():
    predit = aks.stock_profit_forecast()
    df = predit.to_json(orient='records', force_ascii=False)
    return df


#######################################################################################
# 同花顺-板块-概念板块-概念
# Concept
@app.route(f'/{url}/getTHConcept', methods=['GET'])
@cross_origin()
def getTHConcept():
    thc = aks.stock_board_concept_name_ths()
    thc['name'] = thc['概念名称']
    thc['code'] = thc['代码'].str.slice(38, 44, 1)
    thc['count'] = thc['成分股数量']
    data = thc[['code', 'name', 'count']]
    df = data.to_json(orient='records', force_ascii=False)
    return df

# 同花顺-板块-概念板块-成份股数据
# Concept 
# Name
@app.route(f'/{url}/getTHStocksByConceptName', methods=['GET'])
@cross_origin()
def getTHStocksByConceptName():
    symbol = request.args.to_dict().get('symbol')
    stocks = aks.stock_board_concept_cons_ths(symbol = symbol)
    df = stocks.to_json(orient='records', force_ascii=False)
    return df


# 同花顺-板块-概念板块-成份股数据
# Concept
# Code
@app.route(f'/{url}/getTHStocksByConceptCode', methods=['GET'])
@cross_origin()
def getTHStocksByConceptCode():
    symbol = request.args.to_dict().get('symbol')
    stocks = aks.stock_board_cons_ths(symbol = symbol)
    df = stocks.to_json(orient='records', force_ascii=False)
    return df

# 同花顺-板块-行业板块-行业
# Industry
@app.route(f'/{url}/getTHIndustry', methods=['GET'])
@cross_origin()
def getTHIndustry():
    thi = aks.stock_board_industry_name_ths()
    data = thi[['code', 'name']]
    df = data.to_json(orient='records', force_ascii=False)
    return df


# 同花顺-板块-行业板块-成份股数据
# Industry
# Name
@app.route(f'/{url}/getTHIndustryByName', methods=['GET'])
@cross_origin()
def getTHIndustryByName():
    symbol = request.args.to_dict().get('symbol')
    stocks = aks.stock_board_industry_cons_ths(symbol = symbol)
    df = stocks.to_json(orient='records', force_ascii=False)
    return df

# 同花顺-板块-行业板块-成份股数据
# Industry
# Code
@app.route(f'/{url}/getTHStocksByIndustryCode', methods=['GET'])
@cross_origin()
def getTHStocksByIndustryCode():
    symbol = request.args.to_dict().get('symbol')
    stocks = aks.stock_board_cons_ths(symbol = symbol)
    stocks['code'] = stocks['代码']
    stocks['name'] = stocks['名称']
    stocks['name'] = stocks['名称']
    stocks['flow_current'] = stocks['流通市值']
    stocks['price'] = stocks['现价']
    stocks['price_change'] = stocks['涨跌幅']
    df = stocks.to_json(orient='records', force_ascii=False)
    return df

###################################################################################################
# 东方财富-沪深板块-概念板块
# Concept
@app.route(f'/{url}/getDCConcept', methods=['GET'])
@cross_origin()
def getDCConcept():
    dci = aks.stock_board_concept_name_em()
    dci['code'] = dci['板块代码']
    dci['name'] = dci['板块名称']
    dci['count'] = dci['上涨家数'] + dci['下跌家数']
    data = dci[['code', 'name', 'count']]
    df = data.to_json(orient='records', force_ascii=False)
    return df


# 东方财富-沪深板块-概念板块-板块成份
# Concept
# Name
@app.route(f'/{url}/getDCStocksByConceptName', methods=['GET'])
@cross_origin()
def getDCStocksByConceptName():
    symbol = request.args.to_dict().get('symbol')
    stocks = aks.stock_board_concept_cons_em(symbol = symbol)
    df = stocks.to_json(orient='records', force_ascii=False)
    return df


# 东方财富-沪深京板块-行业板块
# Industry
@app.route(f'/{url}/getDCIndustry', methods=['GET'])
@cross_origin()
def getDCIndustry():
    thi = aks.stock_board_industry_name_em()
    thi['name'] = thi['概念名称']
    thi['code'] = thi['代码'].str.slice(38, 44, 1)
    thi['count'] = thi['成分股数量']
    data = thi[['code', 'name', 'count']]

    df = data.to_json(orient='records', force_ascii=False)
    return df

# 东方财富-沪深板块-行业板块-板块成份
# Industry
# Name
@app.route(f'/{url}/getDCStocksByIndustryName', methods=['GET'])
@cross_origin()
def getDCStocksByIndustryName():
    symbol = request.args.to_dict().get('symbol')
    stocks = aks.stock_board_industry_cons_em(symbol = symbol)
    df = stocks.to_json(orient='records', force_ascii=False)
    return df


#############################################################################################
#请求获取概念股
@app.route(f'/{url}/getConcept', methods=['GET'])
@cross_origin()
def getConcept():
    data = pro.concept()
    df = data.to_json(orient='records', force_ascii=False)
    return df


#请求获取概念股详情
@app.route(f'/{url}/getConceptDetail', methods=['GET'])
@cross_origin()
def getConceptDetail():
    id = request.args.to_dict().get('id')
    ts_code = request.args.to_dict().get('ts_code')
    if (id):
        data = pro.concept_detail(id = id, fields='ts_code,name')
    else:
        data = pro.concept_detail(ts_code=ts_code)
    df = data.to_json(orient='records', force_ascii=False)
    return df


#请求tushare接口
@app.route(f'/{url}/query', methods=['GET'])
@cross_origin()
def query():
    code = request.args.to_dict().get('ts_code')
    start = request.args.to_dict().get('start_date') or '20220101'
    data = pro.query('daily', ts_code = code, start_date = start)
    df = data.to_json(orient='records', force_ascii=False)
    return df


if __name__=='__main__':
    app.run(debug=True, port='8000')