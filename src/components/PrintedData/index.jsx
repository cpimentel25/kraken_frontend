import { gql, useQuery } from '@apollo/client';
import InfoBar from '../InfiniteScroll/InfoBar';
import { useState } from 'react';
import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '../InfiniteScroll/Loading';

import './styless.scss';

const GET_ALL_VALUES = gql`
  query AllValues(
    $roster: String!
    $pagination: Pagination
    $categorie: [String]
    $createdAt: Date
    $createdBy: [String]
    $rangeValue: RangeValue
  ) {
    allValues(
      roster: $roster
      pagination: $pagination
      categorie: $categorie
      createdBy: $createdBy
      createdAt: $createdAt
      rangeValue: $rangeValue
    ) {
      value
      categorie
      description
      createdBy
      createdAt
    }
  }
`;

const PrintedData = ({ roster }) => {
  const [limit, setLimit] = useState(7);

  const { loading, error, data, fetchMore } = useQuery(GET_ALL_VALUES, {
    variables: {
      pagination: {
        limit: limit,
        offset: 0,
      },
      roster: roster?.roster,
      categorie: roster?.categorie,
      rangeValue: roster?.rangeValue,
      createdBy: roster?.createdBy,
      createdAt: roster?.createdAt,
    },
    onCompleted: () => {
      // console.log('complete search users');
    },
  });

  useEffect(() => {
    setLimit(7);
  }, [roster]);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const allData = data?.allValues;
  // const size = data?.allValues?.length;
  // console.log('size: ', size);

  const fetchMoreData = () => {
    // if (size <= dataBar?.length) {
    //   setHasMore(false);
    // return;
    // }

    setTimeout(() => {
      setLimit(limit + 7);
      console.log('limit: ', limit);
    }, 500);
  };

  return (
    <main className='printeddata'>
      <InfiniteScroll
        dataLength={allData?.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<Loading />}
        height={300}
      >
        {allData?.map((data) => (
          <InfoBar dataBar={data} />
        ))}
      </InfiniteScroll>
    </main>
  );
};

export default PrintedData;
