import React, { useState, useEffect, useCallback, useRef } from "react";

// Simulate a large dataset
const allSimulatedItems = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  text: `Simulated Item ${i + 1}`,
}));
const ITEMS_PER_LOAD = 10;

function SimpleInifiniteScroll() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1); // To simulate fetching pages
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Ref for the scrollable container or observer target
  const observer = useRef();
  const lastItemRef = useCallback(
    (node) => {
      if (isLoading) return; // Don't set up observer if already loading
      if (observer.current) observer.current.disconnect(); // Disconnect previous observer

      observer.current = new IntersectionObserver((entries) => {
        // entries[0] is the observed element (our lastItemRef)
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node); // Observe the new last item
    },
    [isLoading, hasMore],
  );

  // Simulate fetching data
  const loadMoreItems = useCallback(() => {
    if (!hasMore) return;
    setIsLoading(true);
    console.log(`Loading page ${page}`);
    // Simulate API call delay
    setTimeout(() => {
      const newItems = allSimulatedItems.slice(
        (page - 1) * ITEMS_PER_LOAD,
        page * ITEMS_PER_LOAD,
      );
      setItems((prevItems) => [...prevItems, ...newItems]);
      setHasMore(allSimulatedItems.length > page * ITEMS_PER_LOAD);
      setIsLoading(false);
    }, 1000);
  }, [page, hasMore]);

  useEffect(() => {
    loadMoreItems();
  }, [loadMoreItems]); // Initial load and when page changes due to intersection

  return (
    <div
      style={{ height: "400px", overflowY: "auto", border: "1px solid black" }}
      id="scrollableDiv"
    >
      <h2>Basic Endless Scroll List</h2>
      {items.map((item, index) => {
        // If this is the last item, attach the ref
        if (items.length === index + 1) {
          return (
            <div
              ref={lastItemRef}
              key={item.id}
              style={{ padding: "20px", borderBottom: "1px solid #eee" }}
            >
              {item.text}
            </div>
          );
        } else {
          return (
            <div
              key={item.id}
              style={{ padding: "20px", borderBottom: "1px solid #eee" }}
            >
              {item.text}
            </div>
          );
        }
      })}
      {isLoading && <p>Loading more items...</p>}
      {!hasMore && items.length > 0 && <p>You've reached the end!</p>}
      {items.length === 0 && !isLoading && <p>No items to display.</p>}
    </div>
  );
}

export default SimpleInifiniteScroll;
