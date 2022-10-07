## API Test - Negozia

#### Crear usuario para poder logearse en el sistema

```http
  POST /user
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userName` | `string` | **Required**. nombre de usuario|
| `email` | `string` | **Required**. email valido|
| `password` | `string` | **Required**.|
| `name` | `string` |  Nombre .|
| `lastName` | `string` |  apellidos .|


Levantar el backend local

.1 `npm run start:debug` |

```http
  Swagger http://localhost:3001/api 
```

## Start

To start this project run

```bash
  npm run start:debug
```



## Documentation

[Swagger](http://localhost:3001/api)


# 

