export const getListings = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          ville: "Dakar",
          quartier: "Almadies",
          type: "Appartement",
          prix: 1200000
        },
        {
          ville: "Dakar",
          quartier: "Yoff",
          type: "Maison",
          prix: 600000
        },
        {
          ville: "Thiès",
          quartier: "Randoulene",
          type: "Terrain",
          prix: 320000
        },
        {
          ville: "Mbour",
          quartier: "Saly",
          type: "Maison",
          prix: 800000
        },
        {
          ville: "Saint-Louis",
          quartier: "Sor",
          type: "Appartement",
          prix: 250000
        }
      ]);
    }, 1000);
  });
};