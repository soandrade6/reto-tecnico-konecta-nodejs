

# 🧩 Proyecto Backend — Node.js + Express + Sequelize + MySQL

Este proyecto es un **backend** desarrollado con **Node.js**, **Express** y **Sequelize**, que se conecta a una base de datos **MySQL**.
Incluye soporte para **autenticación JWT**, **integración con reCAPTCHA** y está totalmente **dockerizado** para facilitar su despliegue.

---

## 🚀 Requisitos previos

* 🐳 **Docker**
* ⚙️ **Docker Compose**
* 💻 *(Opcional)* **Node.js ≥ 18**, si deseas correrlo localmente

---

## ⚙️ Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```bash
PORT=4000
DB_NAME=nombre_de_tu_base
DB_USER=usuario_mysql
DB_PASS=contraseña_mysql
DB_HOST=mysql
JWT_SECRET=clave_secreta_jwt
RECAPTCHA_SECRET=clave_secreta_recaptcha
```

---

## 🐋 Ejecución con Docker

### 🔧 Construir e iniciar los contenedores

```bash
docker-compose up --build
```

### 📜 Ver logs del backend

```bash
docker logs -f node_backend_konecta
```

### 🌐 Acceder al servidor

[http://localhost:4000](http://localhost:4000)

### 🛑 Detener los contenedores

```bash
docker-compose down
```

---

## 💻 Ejecución local (sin Docker)

Si prefieres correrlo en tu máquina:

```bash
npm install
npm run dev
```

Asegúrate de tener **MySQL** corriendo con las credenciales indicadas en el archivo `.env`.

---

## 🧰 Comandos útiles

| 🧩 Acción                    | 💻 Comando                               |
| ---------------------------- | ------------------------------------------|
| Levantar entorno Docker      | `docker-compose up -d`                    |
| Reconstruir imágenes         | `docker-compose build --no-cache`         |
| Ver contenedores activos     | `docker ps`                               |
| Entrar al contenedor backend | `docker exec -it node_backend_konecta sh` |
| Parar todo                   | `docker-compose down`                     |

---


