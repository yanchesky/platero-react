import Literature from "./pages/Literature";
import Exhibitions from "./pages/Exhibitions";
import News from "./pages/News";
import Bio                  from "./pages/Bio";
import Video                from "./pages/Video";
import Work from "./pages/Work";
import React from "react";
import Home from "./pages/Home";
import RedirectComponent from "./components/RedirectComponent";
import AboutMe from "./pages/AboutMe";
import Contact from "./pages/Contact";
import CookiesPolicy from "./components/CookiesPolicy";

export const mainRoutes = {
  en: [
    {
      label: 'Work',
      path: ["/work/:category", "/work"],
      Component: <Work title="Work"/>
    },
    {
      label: 'Exhibitions',
      path: ["/exhibitions/:category", "/exhibitions"],
      Component: <Exhibitions title="Exhibitions" horizontal/>
    },
    {
      label: 'News',
      path: ["/news/:category", "/news"],
      Component: <News title="News"/>
    },
    {
      label: "Video",
      path: '/video',
      Component: <Video title="Video" />
    },
    {
      label: 'Literature',
      path: '/literature',
      Component: <Literature title="Literature"/>
    },
    {
      label: 'Bio',
      path: '/bio',
      Component: <Bio />
    }
  ],
  es: [
    {
      label: 'Obras',
      path: ["/obras/:category", "/obras"],
      Component: <Work title="Obras"/>
    },
    {
      label: 'Exposiciones',
      path: ["/exposiciones/:category", "/exposiciones"],
      Component: <Exhibitions title="Exposiciones" horizontal/>
    },
    {
      label: 'Noticias',
      path: ["/noticias/:category", "/noticias"],
      Component: <News title="Noticias"/>
    },
    {
      label: 'Video',
      path: '/video',
      Component: <Video title="Video" />
    },
    {
      label: "Literatura",
      path: '/literatura',
      Component: <Literature title="Literatura"/>
    },
    {
      label: 'Bio',
      path: '/bio',
      Component: <Bio />
    }
  ]
};

export const otherRoutes = [
  {
    path: '/',
    exact: true,
    Component: <Home />
  },
  {
    path: '/wp-admin',
    exact: true,
    Component: <RedirectComponent />
  },
  {
    path: '/platero',
    Component: <AboutMe />
  },
  {
    path: '/contact',
    Component: <Contact />
  },
  {
    path: '/cookies-policy',
    Component: <CookiesPolicy />
  }
];

export const getAllRoutes = (language) => [...mainRoutes[language], ...otherRoutes];