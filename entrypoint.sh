#!/bin/sh

: "${API_URL:=}"
: "${VITE_EMAIL:=}"
: "${VITE_PASSWORD:=}"
: "${VITE_NAME:=}"

echo "Injecting env variables into index.html..."

sed -i "s|VITE_API_URL_PLACEHOLDER|$API_URL|g" /app/dist/index.html
sed -i "s|VITE_EMAIL_PLACEHOLDER|$VITE_EMAIL|g" /app/dist/index.html
sed -i "s|VITE_PASSWORD_PLACEHOLDER|$VITE_PASSWORD|g" /app/dist/index.html
sed -i "s|VITE_NAME_PLACEHOLDER|$VITE_NAME|g" /app/dist/index.html

npm run preview