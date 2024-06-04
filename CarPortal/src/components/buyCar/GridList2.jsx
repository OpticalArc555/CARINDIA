
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */


import { CardDefault } from "../../ui/CardDefault";
import CardUi from "../../ui/CardUi";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const GridList2 = ({ data,error }) => {
   console.log(data)
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [lastPage, setLastPage] = useState();
console.log(page)
  useEffect(() => {
    if (data) {
      setPosts(data?.list);
    }
    if (error) {
      alert('data not found');
    }
  }, [data, error]);
console.log(page)
  const fetchData = async () => {
    try {
      const nextPage = page + 1; // Increment page here
      console.log(nextPage)
      const res = await fetch(
        `https://carsel-production.up.railway.app/cars/mainFilter/${nextPage}`
      );
      const data = await res.json();
      console.log(data);
      // eslint-disable-next-line no-unsafe-optional-chaining
      if (data.message === "unsuccess") {
        return setLastPage("your are in last page");
      }
      setPosts((prevPosts) => [...prevPosts, ...data?.list]); // Concatenate new data with previous posts
      setPage(nextPage); // Update page after successful fetch
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <>
      <CardUi>
        <div className="grid md:grid-cols-3 md:grid-rows-1 gap-4 justify-center">
          {posts?.map((items, index) => {
            console.log(items);
            return (
              <div key={index}>
                <div className="flex">
                  <CardDefault data={items} />
                </div>
              </div>
            );
          })}
          <InfiniteScroll
          dataLength={posts.length}
          next={fetchData}
          hasMore={true}
          loader={<p>Loading...</p>}
        scrollableTarget="scrollableDiv"
        endMessage={lastPage && <p>You are in the last page</p>}

        />
        </div>
      
      </CardUi>
    </>
  );
};

export default GridList2;
