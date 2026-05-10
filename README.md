# ReformasPro AI 🚀

Plataforma de servicios técnicos con inteligencia artificial para reformas, pintura y limpieza industrial.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-cyan)
![Gemini](https://img.shields.io/badge/Google-Gemini-purple)

## ✨ Funcionalidades

### 🤖 Presupuestador con IA
- Chat conversacional con **Google Gemini 2.5 Flash**
- Análisis de imágenes para presupuestar espacios
- Desglose detallado de costos por categoría
- Recomendaciones técnicas personalizadas

### 💬 Chat de Asesoramiento
- Asesor virtual que no presiona al usuario
- Conocimiento de precios de materiales (Bricomart, Brico Depôt, Leroy Merlin)
- Escalamiento automático a WhatsApp para cierre de ventas

### 📱 Flujo de Conversión
- Botón flotante de WhatsApp en todas las páginas
- Redirección desde "Hablar con un técnico" directamente a WhatsApp
- Formulario de contacto con envío de presupuesto precargado

### 🎨 UX Premium
- Tema Dark con acentos en Azul Eléctrico (#3b82f6)
- Animaciones GSAP en el hero "antes/después"
- Modal de chat con scroll bloqueado
- Smooth scroll con Lenis

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **Estilos**: Tailwind CSS 3.4
- **Animaciones**: GSAP 3 + Framer Motion
- **IA**: Google Gemini 2.5 Flash API
- **Iconos**: Lucide React
- **Tipografía**: Inter / Geist

## 📂 Estructura del Proyecto

```
src/
├── app/                    # Páginas de Next.js
│   ├── api/presupuesto/   # API de Gemini
│   ├── servicios/          # Páginas dinámicas de servicios
│   ├── proceso/            # Página del proceso
│   ├── contacto/           # Formulario de contacto
│   └── aviso-legal/        # Páginas legales
├── components/             # Componentes reutilizables
│   ├── Navbar.tsx          # Navegación
│   ├── HeroParallax.tsx    # Efecto antes/después
│   ├── IAPricingBot.tsx    # Chat con IA
│   ├── WhatsAppButton.tsx  # Botón flotante
│   └── ...
├── context/                # React Context
│   └── PricingModalContext.tsx
└── lib/                    # Datos y utilidades
    └── data.ts             # Configuración de servicios
```

## 📈 Cómo Añadir Nuevos Servicios

1. Edita `src/lib/data.ts`:
   ```typescript
   export const services: Service[] = [
     {
       slug: 'mi-nuevo-servicio',
       title: 'Mi Nuevo Servicio',
       description: 'Descripción breve',
       // ... más campos
     }
   ]
   ```

2. Las páginas se generan automáticamente en `/servicios/[slug]`

3. Los botones del Navbar y Footer se actualizan solos

## 🚀 Despliegue

### Requisitos Previos
- Node.js 18+
- Cuenta de Vercel
- API Key de Google Gemini

### Instalación Local

```bash
# Clonar el repositorio
git clone https://github.com/IbrahimRiani/servicios-tech-reformas
cd servicios-tech-reformas

# Instalar dependencias
npm install

# Configurar variables de entorno
# Crear archivo .env.local con:
# GEMINI_API_KEY=tu_api_key_aqui

# Ejecutar en desarrollo
npm run dev
```

### Variables de Entorno (.env.local)

```env
GEMINI_API_KEY=AIzaSy...
```

### Build para Producción

```bash
npm run build
npm start
```

## 🔧 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Construye para producción |
| `npm start` | Inicia servidor de producción |
| `npm run lint` | Ejecuta linter |

## 📄 Licencia

MIT License - Copyright (c) 2024 ReformasPro

---

Construido con ❤️ usando Next.js y Google Gemini AI