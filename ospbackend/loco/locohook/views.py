from django.shortcuts import render
import firebase_admin
from firebase_admin import credentials,firestore
import uuid
import requests
from bs4 import BeautifulSoup
import pandas as pd
from datetime import datetime
import time
from tqdm import tqdm, tqdm_notebook
from functools import reduce 
import uuid 
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
cred = credentials.Certificate("./locohook/ainewscred.json")

firebase_admin.initialize_app(cred)

# Create your views here. 
    
def getSources():
    source_url = 'https://newsapi.org/v1/sources?language=en'
    response = requests.get(source_url).json()
    sources = []
    for source in response['sources']:
        sources.append(source['id'])
    return sources





def mapping():
    d = {}
    response = requests.get('https://newsapi.org/v1/sources?language=en')
    response = response.json()
    for s in response['sources']:
        d[s['id']] = s['category']
    return d





def category(source, m):
    try:
        return m[source]
    except:
        return 'NC'






def getDailyNews():
    sources = getSources()
    key =  'c947d9d49375402e93376aa74b1aeb27' #'539b70851d274c7988515e8cb036128a' '6b25a55c0566498a83bd13852b7331ec'
    url = 'https://newsapi.org/v1/articles?source={0}&sortBy={1}&apiKey={2}'
    responses = []
    for i, source in tqdm_notebook(enumerate(sources), total=len(sources)):
        
        try:
            u = url.format(source, 'top', key)
        except:
            u = url.format(source, 'latest', key)
        
        response = requests.get(u)
        r = response.json()
        try:
            for article in r['articles']:
                article['source'] = source
                article['id']=str(uuid.uuid4())
            responses.append(r)
        except:
            print('Rate limit exceeded ... please wait and retry in 6 hours')
            return None
                
    articles = list(map(lambda r: r['articles'], responses))
    articles = list(reduce(lambda x,y: x+y, articles))
    
    news = pd.DataFrame(articles)
    news = news.dropna()
    news = news.drop_duplicates()
    news.reset_index(inplace=True, drop=True)
    d = mapping()
    news['category'] = news['source'].map(lambda s: category(s, d))
    news['scraping_date'] = datetime.now()


    try:
        aux = pd.read_csv('./locohook/data/news.csv')
        aux = aux.append(news)
        aux = aux.drop_duplicates('url')
        aux = aux.drop_duplicates('description')
        aux = aux.drop_duplicates('title')

        aux.reset_index(inplace=True, drop=True)
        aux.to_csv('./locohook/data/news.csv', encoding='utf-8', index=False)
    except:
        news.to_csv('./data/news.csv', index=False, encoding='utf-8')
        
    print('Done')
    

@csrf_exempt
def postnews(requests):
    getDailyNews()
    data = pd.read_csv('./locohook/data/news.csv')
    data = data.drop_duplicates('description')
    data = data[~data['description'].isnull()]
    data = data.drop_duplicates('url')
    data = data.drop_duplicates('title')
    
    db = firestore.client()
    ref= db.collection(u'News').get()
    allnewsid=set() 
    for news in ref:
        val=news.to_dict()
        allnewsid.add(val['content'])
    # print(allnewsid)
    length=len(data)
    print(length)
    for i in range(1,length-1):
        news={}
        try:

            news['author']=data['author'][i]
            news['content']=data['description'][i]
            news['headline']=data['title'][i]
            news['url']=data['url'][i]
            news['imageURL']=data['urlToImage'][i]
            news['source']=data['source'][i]
            news['scraping_date']=data['scraping_date'][i]
            news['region']="International"
            news['tags']=[data['category'][i]]
            x=time.time()
            try:
                x=time.mktime(time.strptime(data['publishedAt'][i], '%Y-%m-%dT%H:%M:%S'))
            except Exception as e:
                x=time.mktime(time.strptime(data['publishedAt'][i], '%Y-%m-%dT%H:%M:%S%z'))

            except Exception as e:
                print(e)
            news['timestamp']= x*1000

            if(data['description'][i] not in allnewsid):
                db.collection(u'News').add(news);
                print("uploaded")

        except Exception as e:
            print("aa")

    return HttpResponse('success')
