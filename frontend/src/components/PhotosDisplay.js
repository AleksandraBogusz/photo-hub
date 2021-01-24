import axios from "axios";
import { useState, useEffect } from 'react';
import { PostList } from './PostList.js';
import InfiniteScroll from 'react-infinite-scroll-component';

const KEY = "cJ5wjvqwJvzhxcMqKN4sD06AoQiW2iLW-AsyXaXnVrs";

export const PhotosDisplay = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [firstRender] = useState();
  const [hasMore, setHasMore] = useState(true);

  const getQuery = () => {
    const params = new URL(window.location.href).searchParams;
    const search = new URLSearchParams(params);
    const param = search.get("q");
    return param ? param : null;
  };

  const getFetchFunction = () => {
    const options = {
      headers: {
        Authorization: `Client-ID ${KEY}`,
      }
    }

    const withQuery = (query) => {
      axios
        .get(`https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=30`, options)
        .then((res) => {
          const data = res.data.results;
          setHasMore(data.length ? true : false)
          setPhotos(photos.concat(data));
          setPage(page + 1);
        })
        .catch((err) => console.log(err));
    }

    const random = () => {
      axios
        .get(`https://api.unsplash.com/photos/random?page=${page}&count=30`, options)
        .then((res) => {
          const data = res.data;
          setHasMore(data.length ? true : false)
          setPhotos(photos.concat(data));
          setPage(page + 1);
          console.log(res);
        })
        .catch((err) => console.log(err));
    }

    const query = getQuery();
    return query ? () => withQuery(query) : random
  }

  const fetchPhotos = getFetchFunction();

  useEffect(() => {
    fetchPhotos();
  }, [firstRender]);

  return (
    <div>
      <InfiniteScroll
        dataLength={photos.length}
        next={fetchPhotos}
        hasMore={hasMore}
        loader={<h2>Loading...</h2>}
        endMessage={<h2>No results</h2>}
      >
        <PostList photos={photos} />
      </InfiniteScroll>
    </div>
  );

};