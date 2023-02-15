import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Component } from 'react';
import { fetchPhotosByQuery } from 'services/web-api';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import css from './App.module.css';

export class App extends Component {
  state = {
    images: [],
    page: 1,
    query: '',
    isLoading: false,
    error: '',
    showLoadMore: false,
  };

  async componentDidUpdate(_, prevState) {
    //при сабміті оновлюється state і викликається метод
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ isLoading: true });
      try {
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

        console.log(page);
        console.log(Math.ceil(totalHits / 12));
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          showLoadMore: page < Math.ceil(totalHits / 12),
        }));
      } catch (error) {
        this.setState({ error: error.message });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleDataFormSubmit = searchQuery => {
    this.setState({
      images: [],
      page: 1,
      query: searchQuery,
      showLoadMore: false,
    });
  };

  render() {
    const { images, isLoading, showLoadMore } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleDataFormSubmit} />
        {isLoading && <Loader />}
        {images.length !== 0 ? <ImageGallery images={images} /> : null}
        {showLoadMore && <Button onClick={this.handleLoadMore} />}
      </div>
    );
  }
}
