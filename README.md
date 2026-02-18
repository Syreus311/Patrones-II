# 1. Clonar y entrar al proyecto:

git clone <URL_DE_TU_REPO>

cd trabajo2-k8s

# 2. Levantar PostgreSQL con Docker
docker compose up -d

docker ps

# 3. Backend (instalar y correr)
cd backend

npm install

npm start
# 4. Frontend (instalar y correr)

# 5. En otra terminal
cd frontend

npm install

npm run dev

Nota importante para PowerShell (Windows)
Si curl -X POST ... falla en PowerShell, usar:
Invoke-RestMethod -Method Post -Uri "http://localhost:3000/items" -ContentType "application/json" -Body '{"value":"hola"}'
