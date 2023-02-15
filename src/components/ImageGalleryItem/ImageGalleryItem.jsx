import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
import { Modal } from 'components/Modal';

export class ImageGalleryItem extends Component {
  state = { showModal: false };

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  render() {
    return (
      <li className={css.imageGalleryItem}>
        <img
          src={this.props.webformatURL}
          alt={this.props.tags}
          className={css.imageGalleryItemImage}
          onClick={this.toggleModal}
        />
        {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={this.props.largeImageURL} alt={this.props.tags} />
          </Modal>
        )}
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
