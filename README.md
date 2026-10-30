# Monitor de Microservicios — Frontend

React + Vite + Chart.js. Dashboard de observabilidad que consume el backend con Proxy de logging.

- 3 tarjetas de servicio (total de llamadas, tasa de éxito, tiempo promedio); en rojo si la tasa de error supera el 15 %.
- Gráfica de líneas con las últimas 20 llamadas por servicio.
- Tabla de logs con polling cada 3 s, filtros (servicio, estado, rango de fechas), paginación y detalle expandible (parámetros y respuesta).
- Botón **Simular carga** (`POST /api/metrics/simulate-load`).

## Ejecutar
```bash
cp .env.example .env     # VITE_API_URL=http://localhost:8080
npm install
npm run dev
```

## Despliegue (Vercel)
Importar el repo en Vercel (preset Vite) y definir la variable de entorno `VITE_API_URL` con la URL pública del backend en Railway.
