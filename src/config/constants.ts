// ============================================
// INFORMACIÓN DEL VIAJE (Hardcodeada)
// ============================================
export const TRIP_INFO = {
  title: 'De Toledo a Atenas. Solo con nuestras piernas.',
  subtitle: 'Un viaje de5,100 kilómetrosque cambiará nuestras vidas.',
  description: `Somos dos amigos que decidieron dejar todo por un tiempo y vivir la aventura de sus vidas. 
Desde Toledo, atravesaremos España, Francia, Mónaco, Italia, Eslovenia, Croacia, Bosnia, Montenegro, 
Albania, Serbia, Kosovo, Macedonia del Norte y llegaremos a Grecia. Sin avión, con excepción de fronteras y averías, solo con la fuerza de nuestras 
piernas y la ilusión de descubrir el mundo pedaleando.`,
  route: 'Toledo → Barcelona → Niza → Roma → Atenas',
  startDate: new Date('2026-03-15'),
  estimatedDays: 90,
  totalKmGoal: 5100,
};

// ============================================
// VIAJES ANTERIORES (Hardcodeados)
// ============================================
export const PREVIOUS_TRIPS = [
  {
    id: 1,
    title: 'Toledo → Santiago',
    year: 2024,
    distance: 850,
    description: 'Nuestra primera gran aventura. El Camino de Santiago en bicicleta. 850 km que nos cambiaron la perspectiva del viaje.',
    icon: 'camino',
    image: '/santiago.jpeg',
  },
  {
    id: 2,
    title: 'Toledo → Aquasella',
    year: 2025,
    distance: 580,
    description: 'Ruta por el norte de España hasta las famosas fiestas de Aquasella en Asturias. Playas, montañas y sidra.',
    icon: 'asturias',
    image: '/aquasella.jpeg',
  },
];

// ============================================
// CONFIGURACIÓN DE DONACIÓN
// ============================================
export const DONATION_CONFIG = {
  pricePerKm: 0.80,
  minAmount: 1,
  giftThreshold: 10,
};

// ============================================
// COLORES POR PAÍS (Para el mapa)
// ============================================
export const COUNTRY_COLORS: Record<string, string> = {
  'España': '#c9a227',
  'Francia': '#0055A4',
  'Mónaco': '#cecece',
  'Italia': '#009246',
  'Eslovenia': '#00A551',
  'Croacia': '#FF0000',
  'Bosnia': '#002395',
  'Montenegro': '#C6363C',
  'Albania': '#E41B17',
  'Serbia': '#0C4076',
  'Kosovo': '#244AA5',
  'Macedonia del Norte': '#D70000',
  'Grecia': '#001489',
};