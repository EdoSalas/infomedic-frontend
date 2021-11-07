const MAIN_ROUTES = [
    {
      name: "symptom",
      label: "Síntomas / Factores de riesgo",
      icon: "file-upload",
      active: (location) => {
        const [, p] = location.pathname.split("/");
        return /symptom/.test(p);
      },
      to: "/symptom",
    },
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
  ];
  
  export default MAIN_ROUTES;
  