import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { useState, useEffect } from 'react';
import { fetchPhotosByQuery } from 'services/web-api';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import css from './App.module.css';

export const App = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [showLoadMore, setShowLoadMore] = useState(false);

  useEffect(() => {
    if (!query) return;
    const fetchPhotos = async () => {
      try {
        setIsLoading(true);
        const { hits, totalHits } = await fetchPhotosByQuery(query, page);
        const images = hits.map(
          // це масив
          ({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags,
          })
        );
        setImages(prevImages => [...prevImages, ...images]);
        setShowLoadMore(page < Math.ceil(totalHits / 12));
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, [query, page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleDataFormSubmit = searchQuery => {
    setImages([]);
    setPage(1);
    setQuery(searchQuery);
    setShowLoadMore(false);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleDataFormSubmit} />
      {isLoading && <Loader />}
      {images.length !== 0 ? <ImageGallery images={images} /> : null}
      {showLoadMore && <Button onClick={handleLoadMore} />}
    </div>
  );
};
