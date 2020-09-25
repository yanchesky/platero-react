import moment from "moment";

const normalizeDimension = (width, height) => [width, height];

export const convertWordpressImageSizes = sizesObject => {
  const { medium, medium_large, large, thumbnail } = sizesObject;
  return {
    min: medium,
    med: medium_large,
    big: large,
    thumbnail: thumbnail
  }
};

export const mapFetchedPhotos = (rawPhotoArray) => {
  return rawPhotoArray
    .map(el => {
      const {
        image,
        base_panel_en,
        base_panel,
        title_en,
        title,
        year,
        technique_en,
        technique,
        infoWidth,
        infoHeight,
        category,
        order
      } = el.acf;

      const { url, sizes } = image;
      const [normalizedWidth, normalizedHeight] = normalizeDimension(image.width, image.height);
      return {
        id: el.id,
        fullURL: url,
        mediumURL: sizes.medium_large,
        smallURL: sizes.medium,
        basePanel: {
          en: base_panel_en ? base_panel_en : base_panel,
          es: base_panel
        },
        title:{
          en: title_en ? title_en : title,
          es: title
        },
        year,
        technique:{
          en: technique_en ? technique_en : technique,
          es: technique
        },
        infoWidth,
        infoHeight,
        category,
        order: order ? +order : 0,
        width: normalizedWidth,
        height: normalizedHeight,
        thumbnail: image.sizes.thumbnail
      }
    })
};

export const mapFetchedVideoLinks = rawLinks => {
  return rawLinks.map((
    {
      id,
      acf: {
        vimeo_movie_id,
        description_es,
        description_en,
        title_es,
        title_en,
        order
      }
    }) => ({
    id,
    vimeo_movie_id,
    order: order ? +order : 0,
    es: {
      description: description_es,
      title: title_es
    },
    en:{
      description: description_en,
      title: title_en
    }}
  ));
};

export const mapVimeoVideos = vimeoElement => {
  const { thumbnail_medium, thumbnail_large } = vimeoElement[0];
  return {
    label_photos: {
      med: thumbnail_medium,
      big: thumbnail_large
    }
  }
};

export const mapFetchedLinks = rawLinks => {
  return rawLinks
    .filter(link => link.slug !== 'bez-kategorii')
    .map(({id, name, slug, acf }) => (
      {
        id,
        name,
        slug,
        order: acf.order ? +acf.order : 0,
        path:`/${slug}`,
        label: name,
        spanishDescription: acf.spanish_description,
        spanishTitle: acf.spanish_title,
        es: {
          title: acf.spanish_title,
          description: acf.spanish_description
        },
        en: {
          title: acf.english_title,
          description: acf.english_description
        },
        pl: {
          title: acf.polish_title,
          description: acf.polish_description
        },

        labelPhotos: {
          min: acf.label_photo.sizes.medium,
          med: acf.label_photo.sizes.medium_large,
          big: acf.label_photo.sizes.large,
          full: acf.label_photo.url,
          thumbnail: acf.label_photo.sizes.thumbnail,
        },
        acf
      }
    ))
};

export const mapFetchedExhibitions = rawLinks => {
  return rawLinks
    .map((
      {
        id,
        date,
        acf: {
          place_of_exhibition_en,
          place_of_exhibition_pl,
          place_of_exhibition_es,
          city_of_exhibition_en,
          city_of_exhibition_es,
          city_of_exhibition_pl,
          description_en,
          description_es,
          description_pl,
          date_of_exhibition,
          order,
          label_photo: {
             sizes
          }
        },
      }) => ({
        id,
        date,
        date_of_exhibition,
        sortValue: date_of_exhibition.split("/").reverse().join(""),
        place_of_exhibition_en,
        city_of_exhibition_en,
        description_en,
        order: order ? +order : 0,
        en: {
          place: place_of_exhibition_en,
          city: city_of_exhibition_en,
          description: description_en,
        },
        es: {
          place: place_of_exhibition_es,
          city: city_of_exhibition_es,
          description: description_es,
        },
        pl: {
          place: place_of_exhibition_pl,
          city: city_of_exhibition_pl,
          description: description_pl,
        },
        label_photos: convertWordpressImageSizes(sizes)
      })
    )
};

export const mapFetchedNews = rawLinks => {
  return rawLinks.map((
    {
      id,
      date,
      acf: {
        title_en,
        title_es,
        title_pl,
        content_en,
        content_es,
        content_pl,
        order,
        news_label: { sizes }}
    }) => (
    {
      id,
      date,
      order: order ? +order : 0,
      en:{
        title: title_en,
        place: title_en,
        content: content_en,
        city: "",
        description: content_en
      },
      es:{
        title: title_es,
        place: title_en,
        city: "",
        content: content_es,
        description: content_es
      },
      pl:{
        title: title_pl,
        content: content_pl
      },
      sizes: convertWordpressImageSizes(sizes),
      label_photos: convertWordpressImageSizes(sizes),
      date_of_exhibition: moment(date).format("DD/MM/YYYY")
    }
  ))
};

export const mapFetchedLiterature = rawLinks => {
  return rawLinks.map((
    {
      id,
      acf: { title, editors, texts, designers, details, book_cover: { sizes }}
    }) => ({
      id,
      title,
      editors,
      texts,
      designers,
      details,
      sizes: convertWordpressImageSizes(sizes)
    }
  ))
};