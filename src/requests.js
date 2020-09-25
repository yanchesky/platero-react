import {
  convertNewsToExhibition,
  fetchData,
  mapFetchedExhibitions,
  mapFetchedLinks,
  mapFetchedLiterature,
  mapFetchedNews,
  mapFetchedPhotos,
  mapFetchedVideoLinks,
  mapVimeoVideos
} from "helpers";

export const getPhotos = async () => {
  const data = await fetchData('https://dev.platero.eu/wp-json/acf/v3/obras/?per_page=300&page=1');
  return mapFetchedPhotos(data);
};

export const getLinks = async () => {
  const data = await fetchData('https://dev.platero.eu/wp-json/wp/v2/categories/')
  return mapFetchedLinks(data)
};

export const getLiterature = async () => {
  const data = await fetchData('https://dev.platero.eu/wp-json/wp/v2/literature/');
  return mapFetchedLiterature(data);
};

export const getExhibitions = async () => {
  const data = await fetchData('https://dev.platero.eu/wp-json/wp/v2/exhibitions/');
  const rawExhibitions = mapFetchedExhibitions(data);
  return rawExhibitions
    .sort((a,b) => b.sortValue - a.sortValue)
    .sort((a,b) => a.order - b.order);

};

export const getNews = async () => {
  const data = await fetchData('https://dev.platero.eu/wp-json/wp/v2/news/');
  const rawNews = mapFetchedNews(data);
  return convertNewsToExhibition(rawNews)
    .sort((a,b) => a.order - b.order);
};

export const getVideos = async () => {
  const data = await fetchData('https://dev.platero.eu/wp-json/wp/v2/videos/');
  const videoLinks = mapFetchedVideoLinks(data);
  const videosRequests = videoLinks
    .map(video =>
      fetchData(`https://vimeo.com/api/v2/video/${video.vimeo_movie_id}.json`)
    );
  const videosResponse = await Promise.all(videosRequests);
  const videoThumbnails = videosResponse.map(mapVimeoVideos);
  return videosResponse.map((el, index) => ({...el, ...videoThumbnails[index]}))
};

