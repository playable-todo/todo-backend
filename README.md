# TODO CASE STUDY

![alt text](https://github.com/playable-todo/todo-backend/blob/main/public/images/home.png?raw=true)

## Özellikler
PDF'te projede istenen tüm özellikler barındırmaktadır

* Backend
    * Typescript
    * Express JS
    * OAuth 2.0
    * JWT
    * Redis
    * PostgreSQL

* Frontend
    * Typescript
    * ReactJS
    * Material UI

## Kurulum

### Gerekliler
* ### NodeJS (min v20.10.0)
* ### PostgreSQL (Yönetim için [PgAdmin](https://www.pgadmin.org/download/) kullandım) buradan indirip kurabilirsiniz
* ### Redis
    * [Mac cihazlar için](https://redis.io/download/)
    * [Windows cihazlar için](https://www.youtube.com/watch?v=4ePdm4AyL0s)

## PostgreSQL Database kurulumu

* ### PgAdmin bilgisayarınıza kurduktan sonra, pgAdmin'den yeni server oluşturunuz

![alt text](https://github.com/playable-todo/todo-backend/blob/main/public/images/db/db-step-1.png?raw=true)

![alt text](https://github.com/playable-todo/todo-backend/blob/main/public/images/db/db-step-2.png?raw=true)


* ### PosgreSQL server oluşturduktan sonra yeni database oluşturalım

![alt text](https://github.com/playable-todo/todo-backend/blob/main/public/images/db/db-step-4.png?raw=true)

![alt text](https://github.com/playable-todo/todo-backend/blob/main/public/images/db/db-step-5.png?raw=true)

* ### İlgili Yeni database üzerinden sağ tıklayıp Restore seçeneğine tıklayıp database verilerimizi import edelim

![alt text](https://github.com/playable-todo/todo-backend/blob/main/public/images/db/db-step-6.png?raw=true)

* ### ilgil databasimiz seçip Restore butona tıklayıp import edelim

![alt text](https://github.com/playable-todo/todo-backend/blob/main/public/images/db/db-step-7.png?raw=true)

## Backend projemizi çalıştıralım
* ### .env dosyamızı oluşturalım

```
DB_PASS = 123
DB_USER = postgres
DB_NAME = playable-todo
DB_HOST = 127.0.0.1
DB_PORT = 5432
REDIS_URL = 
ACCESS_TOKEN_SECRET = d04d7a975469e2c33373f22a9fd3c9d65a8753e4c11bacfe84ff18e872efce305ed36b91ffb70bcfee8710eb4dd5b00f72d0342ba6320ade8c29844e3e6be95f
REFRESH_TOKEN_SECRET = a1eb69644c3db6963e72827ad2348b15003f0458f53d0863f76d2423fae87d9f0abfd9b89e4752ba8506ca9e5c02ea69504e510ce9da3148be9079654ef5e719
CLIENT_ID_CLIENT = playable_todo_client
CLIENT_ID_PASSWORD = playable_todo_account
CLIENT_SECRET = CLIENT_SECRET
CLIENT_SECRET_CLIENT = 720d5df6b0c8de78
CLIENT_SECRET_PASSWORD = b7e86788eef7b043
```

* ### Backend projemizi kurup çalıştırmak için aşağıdaki komutları kullanabilirisiniz
```
npm install
```
```
npm run dev
```

![alt text](https://github.com/playable-todo/todo-backend/blob/main/public/images/backend.png?raw=true)

* ### Backendimiz 8080 portunda çalışacaktır.

## Frontend alanını kurup çalıştırmak için

* ### `cd todo-web` komutuyla klasörüne geçiş yapalım

* ### `.env` dosyamızı oluşturalım

```
VITE_ENDPOINT = http://localhost:8000
VITE_CLIENT_SECRET = 720d5df6b0c8de78
VITE_CLIENT_ID = playable_todo_client
VITE_GRANT_TYPE = password
```

* ### Frontend tarafını çalıştırmak için bu komutları sırasıyla kullanabilirsiniz

```
npm install
```
```
npm run dev
```

* ### Frontendimizde terminalinizde çıkan `5173` veya `5174` gibi komutlarla çalışacaktır.

## Frontend Projesindeki ekran resimleri
![alt text](https://github.com/playable-todo/todo-backend/blob/main/public/images/home.png?raw=true)

![alt text](https://github.com/playable-todo/todo-backend/blob/main/public/images/login.png?raw=true)

![alt text](https://github.com/playable-todo/todo-backend/blob/main/public/images/register.png?raw=true)

![alt text](https://github.com/playable-todo/todo-backend/blob/main/public/images/add.png?raw=true)

![alt text](https://github.com/playable-todo/todo-backend/blob/main/public/images/edit-delete.png?raw=true)