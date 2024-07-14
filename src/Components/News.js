import React, {useEffect, useState} from "react";
import NewsItem from "./NewsItem.js";
import {nullImage, apikey} from "./nullimage.js";
import Spinner from "./spinner.js";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const New =(props)=> {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  document.title = `${props.category === 'general' ? 'Home' : props.category.charAt(0).toUpperCase() + props.category.slice(1)} - NewsMonkey`;

  useEffect(() => {
    fetchAPI();
  }, [page])

  const fetchAPI = async () => {
    try {
      props.setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?category=${props.category}&country=${props.country}&apiKey=${apikey}&pageSize=${props.totalResults}`;
      setLoading(true);
      let data = await fetch(url);
      props.setProgress(30);
      let parsedData = await data.json();
      props.setProgress(70);
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
      props.setProgress(100);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      props.setProgress(0); // Reset progress if there's an error
    }
  };

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?category=${props.category}&country=${props.country}&apiKey=${apikey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    setLoading(true);
    try {
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles([...articles, ...parsedData.articles]); // Append new articles to the existing ones
      setTotalResults(parsedData.totalResults);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching more data:", error);
      setLoading(false);
    }
  };
  
  
    return (
      <>
        <h1 className="text-center " style={{marginTop: "100px"}} >NewsMonkey - Top Headline from {props.category}</h1>
        {articles.length > 0 ? (
          <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !== totalResults}
            loader= {loading && <Spinner />}
          >
            <div className="container my-3">
              <div className="row">
                {articles.map((element) => (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title : " "}
                      description={element.description ? element.description : " "}
                      imageUrl={element.urlToImage ? element.urlToImage : nullImage}
                      newsUrl={element.url}
                      author={element.author ? element.author : "Unknown"}
                      date={element.publishedAt ? element.publishedAt : " "}
                      source={element.source.name}
                    />
                  </div>
                ))}
              </div>
            </div>
          </InfiniteScroll>
        ) : (
          <div>{loading && <Spinner />}</div>
        )}
      </>
    );
  }



New.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

New.propTypes = {
  setProgress: PropTypes.func.isRequired,
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default New // Exporting the component as default at the end of the file
