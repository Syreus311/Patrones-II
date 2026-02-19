**Nombres:** Katherin Juliana Moreno Carvajal, Mariana Salas Gutiérrez

# Pasos para abrir la aplicación

# 1. Clonar y entrar al proyecto:

git clone https://github.com/Syreus311/Patrones-II.git

cd trabajo2-k8s

# 2. Iniciar Minikube
minikube start

# 3. Instalar componente metrics-server
minikube addons enable metrics-server

# 4. Conectar Docker al de Minikube
minikube -p minikube docker-env --shell powershell | Invoke-Expression

# 5. Construir backend y frontend
docker build -t backend-image ./backend
docker build -t frontend-image ./frontend

# 6. Aplicar Kubernetes
kubectl apply -f k8s/

# 7. Abrir aplicación
minikube service frontend-service