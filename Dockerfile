# ベースイメージを指定
FROM python:3.9-slim

# 作業ディレクトリを設定
WORKDIR /app

# 必要なファイルをコピー
COPY requirements.txt requirements.txt
COPY . .

# パッケージのインストール
RUN pip install --no-cache-dir -r requirements.txt

# アプリケーションを実行
CMD ["python", "app.py"]
