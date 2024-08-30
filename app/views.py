from django.shortcuts import render
from django.views import View
import requests
from bs4 import BeautifulSoup
import pandas as pd
from time import sleep
import os
# Create your views here.

def scraping_code(name):
    

    #楽天サイトURLを変数に代入
    rakuten_url = 'https://search.rakuten.co.jp/'
    #urlを取得
    url = rakuten_url + "search/mall/{}/".format(name)
    sleep(1)
    print(url)
    d_list = []

    r = requests.get(url)
    soup = BeautifulSoup(r.text,features='lxml')
    sleep(1)
    contents = soup.find_all('div',class_='dui-card searchresultitem overlay-control-wrapper--2W6PV title-control-wrapper--1YBX9')
    for content in contents[:5]:
        item_title = content.find('div',class_='title--I67Sk title--zfJkV title-grid--XKKDL')
        item_price = content.find('div',class_='price-wrapper--F8UPj')


        d = {
            '商品名':item_title.text,
            '商品価格':item_price.text,
            }
        d_list.append(d)

  
    df = pd.DataFrame(d_list)
    return df

class HomeView(View):
    def get(self,request):
        context = {"message":"hello world"}
        return render(request, "app/home.html", context)
    
    def post(self, request):
        search_name = request.POST.get("name")
        print(search_name)
        df = scraping_code(search_name)
        data = df.to_html(index=False)
        message = "下記にスクレイピング結果が表示されます。"
        context = {"data":data,}
        return render(request, "app/result.html", context)

    
home = HomeView.as_view()
