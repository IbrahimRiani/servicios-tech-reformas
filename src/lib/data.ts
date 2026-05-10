export interface Service {
  slug: string
  title: string
  description: string
  fullDescription: string
  keywords: string[]
  price: string
  features: string[]
  faq: { question: string; answer: string }[]
  image: string
}

export const services: Service[] = [
  {
    slug: 'reformas-integrales',
    title: 'Reformas Integrales',
    description: 'Transformación completa de tu hogar con materiales premium y ejecución impecable.',
    fullDescription: 'Nuestro servicio de reformas integrales abarca desde la planificación inicial hasta la entrega final de tu nuevo espacio. Contamos con un equipo de profesionales altamente cualificados y utilizamos materiales de primera calidad para garantizar resultados extraordinarios. Cada proyecto es único, por eso dedicamos el tiempo necesario a entender tus necesidades y transformar tu visión en realidad.',
    keywords: [
      'reformas integrales',
      'reforma integral Madrid',
      'reforma integral precios',
      'reforma integral vivienda',
      'reforma integral presupuesto',
      'reforma integral llave en mano',
      'reformas integrales barcelona',
      'empresa reformas integrales',
    ],
    price: 'Desde 8.500€',
    features: [
      'Diseño 3D incluido',
      'Materiales de primera',
      'Equipo especializado',
      'Garantía 5 años',
      'Asesoramiento personalizado',
      'Gestión de permisos',
    ],
    faq: [
      {
        question: '¿Cuánto tiempo tarda una reforma integral?',
        answer: 'El tiempo medio de una reforma integral oscila entre 4 y 8 semanas, dependiendo del tamaño del inmueble y la complejidad del proyecto.',
      },
      {
        question: '¿Qué incluye el presupuesto?',
        answer: 'Nuestro presupuesto incluye todos los materiales, mano de obra, gestión de residuos y garantía de 5 años en la reforma.',
      },
      {
        question: '¿Necesito permisos para hacer una reforma?',
        answer: 'Para reformas menores no se requieren permisos. Para modificaciones estructurales, tramitamos nosotros la licencia de obra.',
      },
      {
        question: '¿Ofrecen financiación?',
        answer: 'Sí, colaboramos con entidades financieras para ofrecerte opciones de financiación hasta 60 meses.',
      },
    ],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80',
  },
  {
    slug: 'pintura-tecnica',
    title: 'Pintura Técnica',
    description: 'Acabados profesionales con pinturas ecológicas y técnicas avanzadas de aplicación.',
    fullDescription: 'Nuestra servicio de pintura técnica combina tecnología de vanguardia con productos de primera calidad para lograr acabados impecables. Utilizamos técnicas avanzadas como la aplicación airless para garantizar uniformidad y durabilidad. Trabajamos con pinturas ecológicas certificadas que respectan el medio ambiente y la salud de tu familia.',
    keywords: [
      'pintura técnica',
      'pintor profesional',
      'pintura ecológica',
      'pintura paredes',
      'pintura fachadas',
      'servicio pintura Madrid',
      'pintura interior',
      'pintura exterior',
    ],
    price: 'Desde 450€',
    features: [
      'Pinturas ecológicas',
      'Acabados mate/satinado',
      'Técnica airless',
      'Sin olores',
      'Secado rápido',
      'Garantía 3 años',
    ],
    faq: [
      {
        question: '¿Qué tipo de pinturas utilizan?',
        answer: 'Trabajamos con pinturas de alta gama ecológicas, libres de componentes tóxicos y con certificaciones ambientales.',
      },
      {
        question: '¿Cuánto tiempo necesita para secar?',
        answer: 'El secado al tacto es de 2-4 horas. Recomendamos esperar 24 horas antes de aplicar una segunda capa.',
      },
      {
        question: '¿Eliminan el papel antiguo?',
        answer: 'Sí, incluimos la retirada del papel antigo y preparación de superficie en nuestros servicios.',
      },
      {
        question: '¿Dan garantía del trabajo?',
        answer: 'Todos nuestros trabajos de pintura incluyen garantía de 3 años contra defectos de aplicación.',
      },
    ],
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=1920&q=80',
  },
  {
    slug: 'limpieza-industrial',
    title: 'Limpieza Industrial',
    description: 'Servicios de limpieza profesional para comunidades, oficinas y espacios comerciales.',
    fullDescription: 'Ofrecemos servicios de limpieza industrial con equipos de última generación y personal altamente formado. Nuestra metodología garantiza resultados superiores en comunidades de vecinos, oficinas, naves industriales y comerciales. Disponemos de horarios flexibles para minimizar la interrupción de tu actividad.',
    keywords: [
      'limpieza industrial',
      'limpieza comunidades',
      'limpieza oficinas',
      'servicio limpieza Madrid',
      'limpieza nave industrial',
      'limpieza comercial',
      'empresa limpieza',
      'limpieza profunda',
    ],
    price: 'Desde 90€/mes',
    features: [
      'Equipos industriales',
      'Productos biodegradables',
      'Personal cualificado',
      'Disponibilidad 24h',
      'Informes mensuales',
      'Contratos flexibles',
    ],
    faq: [
      {
        question: '¿Qué frequency de limpieza ofrecen?',
        answer: 'Ofrecemos servicios diarios, semanales o mensuales según las necesidades de cada cliente.',
      },
      {
        question: '¿Los productos son seguros?',
        answer: 'Utilizamos productos biodegradables y no tóxicos, seguros para personas y animales.',
      },
      {
        question: '¿Tienen seguro de responsabilidad?',
        answer: 'Sí, todos nuestros servicios incluyen seguro de responsabilidad civil y seguro de trabajadores.',
      },
      {
        question: '¿Puedo contratar un servicio puntual?',
        answer: 'Sí, además de contratos mensuales oferecmos servicios de limpieza puntual y limpieza post-obra.',
      },
    ],
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&q=80',
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}

export function getAllServices(): Service[] {
  return services
}