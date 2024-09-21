# Python 3.12をそのまま使う設定
FROM python:3.12

ENV PYTHONUNBUFFERED 1

# 必要なライブラリをインストール
RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/
RUN apt-get update && apt-get install -y libpq-dev vim
RUN pip install -r requirements.txt
COPY . /code/


