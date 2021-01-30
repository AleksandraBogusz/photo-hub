import axios from "axios";
import { useState, useEffect } from 'react';
import { PostList } from './PostList.js';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useAuth } from '../utils/Auth.js';

export const PhotosDisplay = () => {
  const auth = useAuth();
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(0);
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
        Authorization: `Bearer ${auth.token}`
      }
    }

    const withQuery = (query) => {
      axios.get(`http://localhost:50001/search?q=${query}&page=${page}&per_page=30`, options)
        .then(res => {
          const data = res.data;
          setHasMore(data.length ? true : false);
          setPhotos(photos.concat(data));
          setPage(page + 1);
        })
        .catch(err => console.log(err));
    }

    const random = () => {
      axios.get(`http://localhost:50001/search?q=cat&page=${page}&per_page=30`, options)
        .then(res => {
          const data = res.data;
          setHasMore(data.length ? true : false);
          setPhotos(photos.concat(data));
          setPage(page + 1);
        })
        .catch(err => console.log(err));
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
        endMessage={<h2>No results</h2>}
      >
        <PostList photos={photos} />
      </InfiniteScroll>
    </div>
  );

};