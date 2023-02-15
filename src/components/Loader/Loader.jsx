import { Blocks } from 'react-loader-spinner';
import css from '../Modal/Modal.module.css';

export const Loader = () => {
  return (
    <div className={css.overlay}>
      <Blocks
        visible={true}
        height="120"
        width="120"
        ariaLabel="blocks-loading"
        wrapperClass="blocks-wrapper"
      />
    </div>
  );
};
