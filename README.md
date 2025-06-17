# React + TypeScript + Redux Toolkit + CSS + Docker + Vite

## Environment Variables

1. Create a `.env` file in the project root with the following variables:

VITE_API_URL=http://host.docker.internal:8000/api/v1
VITE_NAME=Liudmyla Poslavska
VITE_EMAIL=liudmyla.poslavska1@gmail.com
VITE_PASSWORD=liuda5151

## Docker
1. Pull the backend image:
```bash
docker pull webbylabhub/movies
```

2. Run backend server:
```bash
docker run --name movies -p 8000:8000 webbylabhub/movies
```

3. Pull the frontend image:
```bash
docker pull poslavska/movies-search
```

4. Run the container:
```bash
docker run --name movies-frontend -p 3000:3000 -e API_URL=http://host.docker.internal:8000/api/v1 -e VITE_EMAIL=liudmyla.poslavska1@gmail.com -e VITE_PASSWORD=liuda5151 -e VITE_NAME="Liudmyla Poslavska" poslavska/movies-search
```