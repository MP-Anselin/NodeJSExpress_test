#NODEJS EXPRESS MONGODB

## Description

The project aim's to develop un API with node JS, Express and mongodb, the Api will
manage the system of trade commercial, with the selling product and a system of cart where 
where the user can add and remove product on the cart. 

####We have two Collection Mongo Db

######Product

**schema:**  <br>
```bash
                    {
                      "name": String,
                      "price": Number,
                      "category": String,
                      "description": String,
                      "quantity": Number
                      }
```
 

link with collection we fund routes:<br>

> get all products <br>
{ route: { path: 'products/', method: 'get' } },
<br>
>  
> GET a product by id <br>
{ route: { path: 'product/:id', method: 'get' } },<br>
{ params: {"id": String}
> 
> CREATE a product <br>
{ route: { path: '/product', method: 'post' } },<br>
{ params: {"name": String, "price": Number, "category": String, "description": String, "quantity": Number}
> 
> UPDATE a product by id <br>
{ route: { path: '/product:id', method: 'patch' } },<br>
{ params: {"name?": String, "price?": Number, "category?": String, "description?": String, "quantity?": Number}
>
> DELETE a product by id <br>
{ route: { path: '/product:id', method: 'delete' } },<br>
{ params: {"id": String}
<br>
______________________________________

######Command

**schema:**  <br>
```bash
                    {
                      "date": Date,
                      "createdAt": Date,
                      "updatedAt": Date,
                      "articles": [],
                      "min_price": Number,
                      "isCompleted": Boolean,
                      }
```

link with collection we fund routes:<br>

> FIND a command by date <br>
{ route: { path: 'command/find/date/:date', method: 'get' } },
{ params: {"date": String }
<br>
>
> FIND a command by date and price <br>
{ route: { path: 'command/find/:date&:price', method: 'get' } },
{ params: {"date": String, "price": String }
<br>
>
> FIND a command by sort by or(date, articles,  price) <br>
{ route: { path: 'product/sort*?', method: 'get' } },<br>
{ params: {date: String, articles: String, price}
>
> UPDATE a command by id  <br>
{ route: { path: 'command/:id', method: 'patch' } },<br>
{ params: {"date?": Date, "articles?": [], "min_price?": number,  "isCompleted": boolean}
>
> UPDATE add a product in the command by id <br>
{ route: { path: '/command/add/:id&:productId', method: 'patch' } },<br>
{ params: {"id": String}
>
> UPDATE delete a product in the command by id <br>
{ route: { path: '/command/add/:id&:productId', method: 'patch' } },<br>
{ params: {"id": String, "productId": String}
>
> UPDATE delete a product in the command by id <br>
{ route: { path: '/command/buy/:id', method: 'patch' } },<br>
{ params: {"id": String}

### Installation

```bash
$ npm install
```

###Add collection
1. Folder ${collection_name}
   1. create file ${collection_name}.controller.ts / ${collection_name}.interface.ts / ${collection_name}.service.ts / ${collection_name}.service.ts
2. Create folder Schema/dto/model
   1. inside model create file ${collection_name}.model.ts / ${collection_name}.schema.ts
3. add your ${controller_name} build/server.ts  

## Running the app

```bash
# development
$ npm run start
# watch mode
$ npm run start:dev
# production mode
$ npm run start:prod
```

## On Docker

```bash
$ docker-compose up
```

## Stay in touch

- Author - Mackendy-Pierre Anselin
- linkedin - https://www.linkedin.com/in/mp-anselin-827027167/