import PropTypes from 'prop-types';

import ClipLoader from 'react-spinners/ClipLoader';

import './assets/styles/loading.css';

export default function Loading({ isLoading }: { isLoading: boolean }) {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (!isLoading) return <></>;
  return (
    // eslint-disable-next-line react/jsx-no-undef
    <div className="loading">
      <ClipLoader color="#0077b6" size={100} />
    </div>
  );
}

Loading.defaultProps = {
  isLoading: false,
};

Loading.propTypes = {
  isLoading: PropTypes.bool,
};
