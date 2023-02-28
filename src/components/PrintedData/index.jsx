import { gql, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '../InfiniteScroll/Loading';
import InfoBar from '../InfiniteScroll/InfoBar';

import './styless.scss';

const GET_ALL_VALUES = gql`
  query Values($limit: Int, $offset: Int, $roster: String!) {
    values(limit: $limit, offset: $offset, roster: $roster) {
      value
      categorie
      description
      createdAt
      createdBy
    }
  }
`;

const PrintedData = ({ roster }) => {
  const { loading, error, data, fetchMore, client } = useQuery(GET_ALL_VALUES, {
    variables: {
      offset: 0,
      limit: 6,
      roster: roster?.roster,
    },
    onCompleted: () => {
      console.log('complete query');
    },
  });

  useEffect(() => {
    client.resetStore();
  }, [client, roster]);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const size = data?.values?.length;
  // console.log('size: ', size);

  const fetchMoreData = () => {
    const totalSize = data?.values?.length || 0;
    setTimeout(async () => {
      await fetchMore({
        variables: {
          offset: totalSize,
          limit: totalSize * 2,
          roster: roster?.roster,
        },
      });
      console.log('fetch more data');
    }, 500);
  };

  return (
    <main className='printeddata'>
      <InfiniteScroll
        dataLength={size}
        next={fetchMoreData}
        hasMore={true}
        loader={<Loading />}
        height={300}
      >
        {data && data?.values?.map((data) => <InfoBar dataBar={data} />)}
      </InfiniteScroll>
    </main>
  );
};

export default PrintedData;
