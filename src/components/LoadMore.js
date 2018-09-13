import React from 'react';

import './LoadMore.css';

const LoadMore = props => {
  let loadMoreBtn = null;

  // Display loadMoreBtn only when the data are fetched successfully.
  if (props.fetchStatus) {
    loadMoreBtn = (
      <button
        onClick={props.onLoadMore}
        className="text-btn single-line-btn load-more-btn"
      >
        Load More
      </button>
    );
  }

  return loadMoreBtn;
};

export default LoadMore;
