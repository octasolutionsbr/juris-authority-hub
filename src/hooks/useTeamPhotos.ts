// Centralized team photo map - lazy loaded on demand
const photoMap: Record<string, string> = {};

let photosLoaded = false;

export const loadTeamPhotos = async () => {
  if (photosLoaded) return photoMap;
  
  const photos = await Promise.all([
    import("@/assets/team/carlos-mendes.jpg"),
    import("@/assets/team/ana-silva.jpg"),
    import("@/assets/team/roberto-costa.jpg"),
    import("@/assets/team/patricia-oliveira.jpg"),
    import("@/assets/team/fernando-alves.jpg"),
    import("@/assets/team/marcelo-andrade.jpg"),
    import("@/assets/team/juliana-martins.jpg"),
    import("@/assets/team/rafael-santos.jpg"),
    import("@/assets/team/camila-ribeiro.jpg"),
    import("@/assets/team/eduardo-lima.jpg"),
    import("@/assets/team/fernanda-costa.jpg"),
  ]);

  const photoIds = [
    "carlos-mendes",
    "ana-silva",
    "roberto-costa",
    "patricia-oliveira",
    "fernando-alves",
    "marcelo-andrade",
    "juliana-martins",
    "rafael-santos",
    "camila-ribeiro",
    "eduardo-lima",
    "fernanda-costa",
  ];

  photoIds.forEach((id, index) => {
    photoMap[id] = photos[index].default;
  });

  photosLoaded = true;
  return photoMap;
};

export const getTeamPhotoMap = () => photoMap;

export const useTeamPhotos = () => {
  return { photoMap, loadTeamPhotos };
};