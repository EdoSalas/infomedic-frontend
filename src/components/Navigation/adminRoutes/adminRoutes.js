const MAIN_ROUTES = [
  {
    name: "diseases",
    label: "Enfermedades",
    icon: "virus",
    active: (location) => {
      const [, p] = location.pathname.split("/");
      return /diseases/.test(p);
    },
    to: "/diseases",
  },
    {
      name: "symptom",
      label: "Síntomas ",
      icon: "head-side-virus",
      active: (location) => {
        const [, p] = location.pathname.split("/");
        return /symptom/.test(p);
      },
      to: "/symptom",
    },
    {
      name: "risk",
      label: "Factores de riesgo ",
      icon: "exclamation-circle",
      active: (location) => {
        const [, p] = location.pathname.split("/");
        return /risk/.test(p);
      },
      to: "/risk",
    },
    {
      name: "recomendations",
      label: "Recomendaciones",
      icon: "hands-wash",
      active: (location) => {
        const [, p] = location.pathname.split("/");
        return /recomendations/.test(p);
      },
      to: "/recomendations",
    },
    {
      name: "configuration",
      label: "Configuración",
      icon: "user-cog",
      active: (location) => {
        const [, p] = location.pathname.split("/");
        return /configuration/.test(p);
      },
      to: "/configuration",
    },
    
  ];
  
  export default MAIN_ROUTES;
  