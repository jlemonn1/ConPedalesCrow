const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const mockData = {
  metrics: {
    totalKm: 5100,
    kmRecorridos: 420,
    diasViaje: 6,
    paises: 2,
    desnivel: 3200,
    donaciones: 132
  },
  
  fundedKm: 2430,
  goalKm: 5100,
  pricePerKm: 0.80,
  
  stages: [
    {
      id: 1,
      number: 1,
      title: "Toledo → Illescas",
      date: "15/03/2026",
      distance: 45,
      elevation: 320,
      summary: "El primer día fue mágico. Salimos de Toledo con el sol de la Mancha acompañándonos. Los primeros kilómetros siempre son los más especiales.",
      current: false
    },
    {
      id: 2,
      number: 2,
      title: "Illescas → Tarancueña",
      date: "16/03/2026",
      distance: 68,
      elevation: 580,
      summary: "Día de transición por La Sagra. Campo extremeño stretching ante nosotros. Las bikes rulando perfectas.",
      current: false
    },
    {
      id: 3,
      number: 3,
      title: "Tarancueña → Torrijos",
      date: "17/03/2026",
      distance: 52,
      elevation: 410,
      summary: "Pequeña parada en Torrijos para repostar. El paisaje cambia: olivos interminables nos acompañan.",
      current: false
    },
    {
      id: 4,
      number: 4,
      title: "Torrijos → Talavera",
      date: "18/03/2026",
      distance: 78,
      elevation: 890,
      summary: "Primera big day. Subidas constants que ponen a prueba las piernas. Pero la llegada a Talavera lo vale.",
      current: false
    },
    {
      id: 5,
      number: 5,
      title: "Talavera → Navalmoral",
      date: "19/03/2026",
      distance: 85,
      elevation: 720,
      summary: "Entramos en el Valle del Tiétar. El frío de la mañana dio paso a un sol de justicia.",
      current: false
    },
    {
      id: 6,
      number: 6,
      title: "Navalmoral → Plasencia",
      date: "20/03/2026",
      distance: 92,
      elevation: 1200,
      summary: "Hoy ha sido una etapa durísima, con viento de cara casi todo el día. Pero Plasencia nos recibió con una sunset increíble.",
      current: true
    }
  ],
  
  donations: [
    { id: 1, name: "Carlos", amount: 15, comment: "Mucho ánimo chavales. Grecia os espera.", date: "06/03/2026" },
    { id: 2, name: "Laura", amount: 5, comment: "Vamos!", date: "06/03/2026" },
    { id: 3, name: "Miguel Ángel", amount: 25, comment: "De parte de toda la peña del pueblo. Acierto seguro.", date: "05/03/2026" },
    { id: 4, name: "Ana", amount: 10, comment: "Os sigo desde el día 1. Sois inspiración.", date: "05/03/2026" },
    { id: 5, name: "Jose Luis", amount: 50, comment: "1€ = 1km. A por el Egeo!", date: "04/03/2026" },
    { id: 6, name: "María", amount: 20, comment: "Mi primer donativo. Mucho ánimo!", date: "04/03/2026" },
    { id: 7, name: "David", amount: 100, comment: "Recordad que laúnima kms son los más duros. Ánimo!", date: "03/03/2026" },
    { id: 8, name: "Sofia", amount: 15, comment: "Desde Grecia os esperamos!", date: "03/03/2026" }
  ],
  
  tripInfo: {
    title: "De Toledo a Atenas. Solo con nuestras piernas.",
    subtitle: "Un viaje de 5.100 km que cambiará nuestras vidas.",
    description: "Somos dos amigos que decidieron dejar todo por un tiempo y vivir la aventura de sus vidas. Desde Toledo, atravesaremos España, Francia, Mónaco, Italia, Eslovenia, Croacia, Bosnia, Montenegro, Albania, Serbia, Macedonia y llegaremos a Grecia. Sin avión, sin tren, solo con la fuerza de nuestras piernas y la ilusión de descubrir el mundo pedaleando.",
    startDate: "15/03/2026",
    estimatedDays: 90,
    route: "Toledo → Barcelona → Niza → Roma → Atenas"
  },
  
  previousTrips: [
    {
      id: 1,
      title: "Toledo → Santiago",
      year: "2024",
      distance: 850,
      description: "Nuestra primera gran aventura. El Camino de Santiago en bicicleta. 850 km que nos cambiaron la perspectiva del viaje.",
      image: "camino"
    },
    {
      id: 2,
      title: "Toledo → Aquasella",
      year: "2025",
      distance: 1200,
      description: "Ruta por el norte de España hasta las famosas fiestas de Aquasella en Asturias. Playas, montañas y sidra.",
      image: "asturias"
    }
  ],
  
  mapRoute: [
    { lat: 39.8581, lng: -4.0226, name: "Toledo", country: "España", stage: "Inicio", km: 0, status: "completed" },
    { lat: 40.0667, lng: -2.1333, name: "Cuenca", country: "España", stage: "España", km: 150, status: "pending" },
    { lat: 40.3456, lng: -1.1065, name: "Teruel", country: "España", stage: "España", km: 280, status: "pending" },
    { lat: 41.1167, lng: 1.2500, name: "Tarragona", country: "España", stage: "España", km: 450, status: "pending" },
    { lat: 41.3888, lng: 2.1590, name: "Barcelona", country: "España", stage: "España", km: 550, status: "pending" },
    { lat: 41.9830, lng: 2.8240, name: "Girona", country: "España", stage: "España", km: 630, status: "pending" },
    { lat: 43.6108, lng: 3.8768, name: "Montpellier", country: "Francia", stage: "Francia", km: 789, status: "pending" },
    { lat: 43.2965, lng: 5.3698, name: "Marsella", country: "Francia", stage: "Francia", km: 950, status: "pending" },
    { lat: 43.2693, lng: 6.6398, name: "Saint-Tropez", country: "Francia", stage: "Francia", km: 1050, status: "pending" },
    { lat: 43.7102, lng: 7.2620, name: "Niza", country: "Francia", stage: "Francia", km: 1150, status: "pending" },
    { lat: 43.7384, lng: 7.4246, name: "Mónaco", country: "Mónaco", stage: "Mónaco", km: 1180, status: "pending" },
    { lat: 45.0705, lng: 7.6868, name: "Turín", country: "Italia", stage: "Italia", km: 1330, status: "pending" },
    { lat: 45.4642, lng: 9.1896, name: "Milán", country: "Italia", stage: "Italia", km: 1450, status: "pending" },
    { lat: 45.1602, lng: 10.7833, name: "Mantua", country: "Italia", stage: "Italia", km: 1520, status: "pending" },
    { lat: 45.4421, lng: 10.9986, name: "Verona", country: "Italia", stage: "Italia", km: 1560, status: "pending" },
    { lat: 45.4408, lng: 12.3155, name: "Venecia", country: "Italia", stage: "Italia", km: 1650, status: "pending" },
    { lat: 46.5405, lng: 12.1357, name: "Dolomitas", country: "Italia", stage: "Italia", km: 1900, status: "pending" },
    { lat: 46.3625, lng: 14.0938, name: "Lago de Bled", country: "Eslovenia", stage: "Eslovenia", km: 2100, status: "pending" },
    { lat: 46.0511, lng: 14.5051, name: "Liubliana", country: "Eslovenia", stage: "Eslovenia", km: 2180, status: "pending" },
    { lat: 45.8150, lng: 15.9819, name: "Zagreb", country: "Croacia", stage: "Croacia", km: 2350, status: "pending" },
    { lat: 44.8708, lng: 15.6005, name: "Lagos de Plitvice", country: "Croacia", stage: "Croacia", km: 2480, status: "pending" },
    { lat: 44.0414, lng: 16.1986, name: "Knin", country: "Croacia", stage: "Croacia", km: 2580, status: "pending" },
    { lat: 43.8666, lng: 15.9722, name: "Krka", country: "Croacia", stage: "Croacia", km: 2650, status: "pending" },
    { lat: 43.5081, lng: 16.4402, name: "Split", country: "Croacia", stage: "Croacia", km: 2750, status: "pending" },
    { lat: 44.2000, lng: 17.9000, name: "Zenica", country: "Bosnia", stage: "Bosnia", km: 2900, status: "pending" },
    { lat: 43.8563, lng: 18.4131, name: "Sarajevo", country: "Bosnia", stage: "Bosnia", km: 3050, status: "pending" },
    { lat: 43.3433, lng: 17.8150, name: "Mostar", country: "Bosnia", stage: "Bosnia", km: 3150, status: "pending" },
    { lat: 43.2167, lng: 17.7000, name: "Neum", country: "Bosnia", stage: "Bosnia", km: 3220, status: "pending" },
    { lat: 42.6500, lng: 18.1000, name: "Dubrovnik", country: "Croacia", stage: "Croacia", km: 3300, status: "pending" },
    { lat: 42.4207, lng: 18.7683, name: "Kotor", country: "Montenegro", stage: "Montenegro", km: 3380, status: "pending" },
    { lat: 39.8756, lng: 20.0053, name: "Saranda", country: "Albania", stage: "Albania", km: 3500, status: "pending" },
    { lat: 42.0692, lng: 19.5206, name: "Shkoder", country: "Albania", stage: "Albania", km: 3600, status: "pending" },
    { lat: 44.8040, lng: 20.4651, name: "Belgrado", country: "Serbia", stage: "Serbia", km: 3750, status: "pending" },
    { lat: 45.2667, lng: 19.8500, name: "Novi Sad", country: "Serbia", stage: "Serbia", km: 3850, status: "pending" },
    { lat: 43.7144, lng: 19.7158, name: "Zlatibor", country: "Serbia", stage: "Serbia", km: 3950, status: "pending" },
    { lat: 43.4270, lng: 19.9343, name: "Uvac", country: "Serbia", stage: "Serbia", km: 4050, status: "pending" },
    { lat: 41.9965, lng: 21.4314, name: "Skopje", country: "Macedonia", stage: "Macedonia", km: 4200, status: "pending" },
    { lat: 41.6000, lng: 20.9667, name: "Mavrovo", country: "Macedonia", stage: "Macedonia", km: 4300, status: "pending" },
    { lat: 41.1167, lng: 20.8000, name: "Ohrid", country: "Macedonia", stage: "Macedonia", km: 4400, status: "pending" },
    { lat: 40.6403, lng: 22.9444, name: "Thessaloniki", country: "Grecia", stage: "Grecia", km: 4550, status: "pending" },
    { lat: 40.0856, lng: 22.3586, name: "Monte Olimpo", country: "Grecia", stage: "Grecia", km: 4650, status: "pending" },
    { lat: 37.9838, lng: 23.7278, name: "Atenas", country: "Grecia", stage: "Grecia", km: 4900, status: "pending" },
    { lat: 38.2500, lng: 21.7333, name: "Patra", country: "Grecia", stage: "Grecia", km: 5050, status: "pending" },
    { lat: 37.9409, lng: 22.9449, name: "Corinto", country: "Grecia", stage: "Grecia", km: 5100, status: "pending" },
    { lat: 43.5942, lng: 13.5034, name: "Ancona", country: "Italia", stage: "Italia", km: 3400, status: "pending" }
  ]
};

export const api = {
  async getMetrics() {
    await delay(300);
    return { ...mockData.metrics };
  },
  
  async getFundedKm() {
    await delay(200);
    return mockData.fundedKm;
  },
  
  async getStages(limit = 6) {
    await delay(400);
    return mockData.stages.slice(0, limit);
  },
  
  async getDonations(limit = 10) {
    await delay(350);
    return mockData.donations.slice(0, limit);
  },
  
  async getTripInfo() {
    await delay(250);
    return { ...mockData.tripInfo };
  },
  
  async getPreviousTrips() {
    await delay(300);
    return [...mockData.previousTrips];
  },
  
  async getMapRoute() {
    await delay(200);
    return [...mockData.mapRoute];
  },
  
  async createDonation(donationData) {
    await delay(800);
    const newDonation = {
      id: mockData.donations.length + 1,
      ...donationData,
      date: new Date().toLocaleDateString('es-ES')
    };
    mockData.donations.unshift(newDonation);
    mockData.metrics.donaciones += 1;
    mockData.fundedKm += Math.floor(donationData.amount / mockData.pricePerKm);
    return newDonation;
  },
  
  async getStageById(id) {
    await delay(300);
    return mockData.stages.find(s => s.id === parseInt(id)) || null;
  }
};
