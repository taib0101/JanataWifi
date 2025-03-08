import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const MyInfiniteList = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;

  const simulateApiCall = (page, limit) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        const dummyData = Array.from({ length: 1000 }, (_, index) => ({
          id: index,
          name: `Item ${index}`,
        }));

        const slicedData = dummyData.slice(startIndex, endIndex);
        resolve(slicedData);
      }, 500);
    });
  };

  const fetchMoreData = async () => {
    try {
      const response = await simulateApiCall(page, itemsPerPage);

      if (response.length === 0) {
        setHasMore(false);
        return;
      }

      setItems((prevItems) => [...prevItems, ...response]); // Correctly append new items
      setPage(page + 1);
    } catch (error) {
      console.error('Error fetching data:', error);
      setHasMore(false);
    }
  };

  useEffect(() => {
    fetchMoreData();
  }, []);

  return (
    <div> {/* Added a wrapping div */}
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={false}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {items.map((item) => (
          <div key={item.id} style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
            {item.name}
          </div>
        ))}
      </InfiniteScroll>
      {/* Optional: Display the current state of 'items' for debugging */}
      {/* <pre>{JSON.stringify(items, null, 2)}</pre> */}
    </div>
  );
};

export default MyInfiniteList;