import React, { Component }       from 'react'
import styled                     from 'styled-components'
import { connect }                from 'react-redux'
import { withRouter }             from "react-router-dom"

import { LiteratureTitle }        from 'styledComponents'
import media                      from 'styledComponents/media'
import Heading                    from 'components/Heading'

import { formatDate, isEmpty }    from 'helpers'
import { getNews }                from 'requests';

const StyledImage = styled.img`
  width: 100%;
`;

const NewsTitle = styled(LiteratureTitle)`
  font-size: 28px;
  ${props => props.length < 60 && "max-width: 300px"};
  margin-bottom: 15px;
`;

const NewsLayout = styled.div`
  margin: 10px 0;
  /* ${media.mobile`
    margin: 10px 0;
  `} */
`;

const NewsCard = styled.div`
  position: relative;
 
  display: block;
  ${media.mobile`
    display: flex;
  `}

  &:not(:last-of-type){
    margin: 30px auto;
    border-bottom: 1px solid #444;
    padding-bottom: 30px;
  }
`;

const PostDate = styled.p`
  font-weight: 600;
  color: #a3a9ac;
  letter-spacing: 0.1em;
  font-size: 14px;
  margin-top: 5px;
`;

const CardSection = styled.div`
  width: 100%;
  ${media.mobile`
    width: 50%;
  `};
  position: relative;
`;

const NewsBody = styled.div`
  margin: 20px 0;
  font-weight: 300;
  font-size: 17px;

  ul li{
    list-style: disc inside;
  }
  ol li{
    list-style: decimal inside;
  }
  a{
    font-weight: 600;
  }
  a:hover{
    text-decoration: underline;
  }
  p{
    margin: 15px 0;
  }
`;

class News extends Component {
  state = {
    isLoaded: false
  };

  componentDidMount = async () => {
    if(isEmpty(this.props.news)){
      const news = await getNews();
      this.props.dispatch('news', news)
    }
  };

  render(){
    const { title, lang, news, match } = this.props;
    const category = match?.params?.category;
    const filteredNews = category ? news.filter(el => el.id === +category) : news;

    return (
      <>
        <Heading>{title}</Heading>
        <NewsLayout>
          {
            filteredNews.map((newsArticle, index) => {
              const newsDate = new Date(newsArticle.date);
              const { title, content } = newsArticle[lang];
              return (
                <NewsCard key={index}>
                  <CardSection style={{marginRight: "20px"}}>
                    <NewsTitle length={title?.length}>{title}</NewsTitle>
                    <PostDate>{formatDate(newsDate)}</PostDate>
                    <NewsBody dangerouslySetInnerHTML={{__html: content }} />
                  </CardSection>
                  <CardSection><StyledImage src={newsArticle.sizes.med} /></CardSection>
                </NewsCard>
            )})
          }
        </NewsLayout>
      </>
    )
  }
}

export default connect(
  ({ news, lang }) => ({ news, lang }),
    dispatch => ({ dispatch: (key, value) => dispatch({type: key, value })})
)(withRouter(News));