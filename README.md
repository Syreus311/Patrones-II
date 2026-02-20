**Nombres:** Katherin Juliana Moreno Carvajal, Mariana Salas Gutiérrez

# Pasos para abrir la aplicación

## 1. Clonar y entrar al proyecto:

git clone https://github.com/Syreus311/Patrones-II.git

cd trabajo2-k8s

## 2. Iniciar Minikube
minikube start

## 3. Instalar componente metrics-server
minikube addons enable metrics-server

## 4. Conectar Docker al de Minikube
minikube -p minikube docker-env --shell powershell | Invoke-Expression

## 5. Construir backend y frontend
docker build -t backend-image ./backend
docker build -t frontend-image ./frontend

## 6. Aplicar Kubernetes
kubectl apply -f k8s/

## 7. Abrir aplicación
minikube service frontend-service

# Arquitectura implementada

## C1

La aplicación utiliza una arquitectura basada en contenedores, desplegada en un clúster Kubernetes (Minikube).

El sistema está compuesto por tres componentes principales:
* **Frontend:** React, JavaScript, Nginx
* **Backend:** Node.js, Express, API RESTful
* **Base de datos:** PostgreSQL

El modelo C1 presenta el contexto general del sistema y muestra cómo interactúa con otros sistemas y actores. El sistema desarrollado corresponde a la aplicación web desplegada en Kubernetes. En general, el propósito es permitir a los usuarios registrar y consultar valores almacenados en la base de datos.

![C1](trabajo2-k8s/images/Trabajo_2_C1.png)

## C2

El modelo C2 muestra la arquitectura interna del sistema, mostrando los contenedores que lo componen y cómo interactúan entre sí dentro del clúster Kubernetes. Como elementos principales se tienen:

* **Frontend:** Presenta la interfaz de usuario, consume la API REST del backend mediante solicitudes HTTP y muestra la lista de valores almacenados.
* **Backend:** Expone endpoints HTTP (GET y POST), procesa solicitudes y se comunica con la base de datos PostgreSQL.
* **Horizontal Pod Autoscaler (HPA):** Ajusta automáticamente el número de réplicas en función del uso de CPU.
* **Base de datos:** Almacena la información de forma persistente y ejecuta consultas SQL enviadas por el backend. Garantiza la persistencia mediante el uso de PersistentVolume (PV) y PersistentVolumeClaim (PVC).

![C2](trabajo2-k8s/images/Trabajo_2__C2.png)

# Estrategia de persistencia

# Definición de recursos

# Evidencia de pruebas

# Preguntas

## ¿Cómo configuro el HPA?

## ¿Cuántos recursos asigno a la API?

## ¿Cuántos instancias necesito para 5 usuarios concurrentes?

## ¿Cuántos instancias necesito para 40 usuarios concurrentes?