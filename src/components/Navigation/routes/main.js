const MAIN_ROUTES = [
  {
    name: "symptom",
    label: "Síntomas",
    icon: "file-upload",
    active: (location) => {
      const [, p] = location.pathname.split("/");
      return /symptom/.test(p);
    },
    to: "/symptom",
  },
  {
      name: "stadistics",
      label: "Estadísticas",
      icon: "file-upload",
      active: (location) => {
        const [, p] = location.pathname.split("/");
        return /stadistics/.test(p);
      },
      to: "/stadistics",
    },
    {
      name: "recomendations",
      label: "Recomendaciones",
      icon: "file-upload",
      active: (location) => {
        const [, p] = location.pathname.split("/");
        return /recomendations/.test(p);
      },
      to: "/recomendations",
    },
    {
      name: "configuration",
      label: "Configuración",
      icon: "file-upload",
      active: (location) => {
        const [, p] = location.pathname.split("/");
        return /configuration/.test(p);
      },
      to: "/configuration",
    },
];

export default MAIN_ROUTES;
