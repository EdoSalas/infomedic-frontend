const MAIN_ROUTES = [
  {
    name: "diseases",
    label: "Enfermedades",
    icon: "file-upload",
    active: (location) => {
      const [, p] = location.pathname.split("/");
      return /diseases/.test(p);
    },
    to: "/diseases",
  },
    {
      name: "symptom",
      label: "Síntomas ",
      icon: "file-upload",
      active: (location) => {
        const [, p] = location.pathname.split("/");
        return /symptom/.test(p);
      },
      to: "/symptom",
    },
    {
      name: "risk",
      label: "Factores de riesgo ",
      icon: "file-upload",
      active: (location) => {
        const [, p] = location.pathname.split("/");
        return /risk/.test(p);
      },
      to: "/risk",
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
  