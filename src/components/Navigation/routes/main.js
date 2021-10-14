const MAIN_ROUTES = [
  {
    name: "sintomas",
    label: "Síntomas",
    icon: "file-upload",
    active: (location) => {
      const [, p] = location.pathname.split("/");
      return /sintomas/.test(p);
    },
    to: "/sintomas",
  },
];

export default MAIN_ROUTES;
