from flask import Flask, request, url_for
import tushare as ts
import json
app = Flask(__name__)

url = 'api'

pro = ts.pro_api('79b02307d33ca733aeac643f8d1551a9794607ba8cc905f313815494')


#同花顺行业列表
#请求tushare接口
@app.route(f'/{url}/getTHIndustry', methods=['GET'])
def getTHIndustry():
    data = pro.ths_index()
    df = data.to_json(orient='records', force_ascii=False)
    return df

#同花顺行业列表
#请求tushare接口
@app.route(f'/{url}/getSWIndustry', methods=['GET'])
def getSWIndustry():
    level = request.args.to_dict().get('level')
    src = request.args.to_dict().get('src')
    if (not src):
        src = 'SW2021'
    data = pro.index_classify(level = level, src = src)
    df = data.to_json(orient='records', force_ascii=False)
    return df


#请求获取概念股
@app.route(f'/{url}/getConcept', methods=['GET'])
def getConcept():
    data = pro.concept()
    df = data.to_json(orient='records', force_ascii=False)
    return df


#请求获取概念股详情
@app.route(f'/{url}/getConceptDetail', methods=['GET'])
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
def query():
    code = request.args.to_dict().get('ts_code')
    start = request.args.to_dict().get('start_date') or '20220101'
    data = pro.query('daily', ts_code = code, start_date = start)
    df = data.to_json(orient='records', force_ascii=False)
    return df


if __name__=='__main__':
    app.run(debug=True, port='8000')