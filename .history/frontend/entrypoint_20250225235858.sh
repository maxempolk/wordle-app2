#!/bin/sh

# Создаем env файл для клиентской части
echo "window.ENV = {" > /app/dist/env-config.js
echo "  VITE_API_URL: \"$VITE_API_URL\"," >> /app/dist/env-config.js
echo "}" >> /app/dist/env-config.js

# Запускаем nginx или другой сервер
exec "$@"