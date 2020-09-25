import moment from "moment";
import { mainRoutes, getAllRoutes } from "../linksAndRoutes";

export const fetchData = async (link) => {
  const rawData = await fetch(link);
  const data = await rawData.json();
  return data
};

export const convertNewsToExhibition = news => news.map(el => ({
  ...el,
  date_of_exhibition: moment(el.date).format("DD/MM/YYYY"),
}));

export const pickRouteFromArray = (link) => (Array.isArray(link) && link.length > 0) ? link[1] : link;

export const translateLinks = (lang) => mainRoutes[lang];

const generateLink = (currentLang, splitedPathname, targetLanguage) => {
  const route = `/${splitedPathname[1]}`;
  const subPage = splitedPathname.length > 2 ? `/${splitedPathname[2]}` : "";
  const links = getAllRoutes(currentLang);
  const linkObject = links.find(el => Array.isArray(el.path) ? el.path[0] === route : el.path === route);
  if(!linkObject) return "/cookies-policy";
  return `${linkObject.path}${subPage}`
};

export const redirectTo = (currentLang, futureLang) => (loc) => {
  const splitedPathname = loc.pathname.split("/");
  return splitedPathname[1].length > 1 ? generateLink(currentLang, splitedPathname, futureLang) : "/";
};

export const formatDate = (date) => {
  const day = date.getDate().toString();
  const month = (date.getMonth() + 1).toString();
  const year = date.getFullYear().toString();

  const prefixedDay = day.length === 1 ? '0' + day : day;
  const prefixedMonth = month.length === 1 ? '0' + month : month;

  return `${prefixedDay}/${prefixedMonth}/${year}`;
};

export const isEmpty = obj => [Object, Array].includes((obj || {}).constructor) && !Object.entries((obj || {})).length;

export const dispatcher = (dispatch) => ({
  dispatch: (object) => {
    return Object.entries(object).forEach(
      ([key, value]) => {
        return dispatch({ type: key, value})
      }
    )
  }
});

export const dispatchSingle = dispatch => ({ dispatch: (key, value) => dispatch({type: key, value })});
