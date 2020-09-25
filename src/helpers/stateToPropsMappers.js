export const mainStateToProps = (
  {
    isLightboxOpen,
    overflowIsHidden,
    cookiesAccepted,
    lang,
    photos,
    galleryCategories,
    exhibitions,
    videos,
    literature,
    news,
    dataFetched,
    translatedLinks
  }) => ({
    isLightboxOpen,
    overflowIsHidden,
    cookiesAccepted,
    lang,
    photos,
    galleryCategories,
    exhibitions,
    videos,
    literature,
    news,
    dataFetched,
    translatedLinks
  });

export const headerStateToProps = (
  {
    translatedLinks,
    lang,
    isLightboxOpen
  }) => ({
    translatedLinks,
    lang,
    isLightboxOpen
  });

export const workStateToProps = (
  {
    galleryCategories,
    photos,
    translatedLinks,
    lang
  }) => (
  {
    galleryCategories,
    photos,
    translatedLinks,
    lang
  });

export const specificCategoryStateToProps = (
  {
    isLightboxOpen,
    galleryCategories,
    photos,
    lang
  }) => (
  {
    isLightboxOpen,
    galleryCategories,
    photos,
    lang
  });

export const homeStateToProps = (
  {
    exhibitions,
    translatedLinks,
    news
  }) => (
  {
    exhibitions,
    translatedLinks,
    news
  }
);