import { useEffect } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

import './styles.scss';

const GET_ALL_VALUES = gql`
  query AllValuesForCharts(
    $roster: String!
    $categorie: [String]
    $rangeValue: RangeValue
    $createdBy: [String]
    $createdAt: Date
  ) {
    allValuesForCharts(
      roster: $roster
      categorie: $categorie
      rangeValue: $rangeValue
      createdBy: $createdBy
      createdAt: $createdAt
    ) {
      value
      categorie
      createdAt
      createdBy
      currency
      roster
    }
  }
`;

const ChartLiner = ({ dataChart }) => {
  const [search, { called, loading, data }] = useLazyQuery(GET_ALL_VALUES, {
    onCompleted: () => {
      console.log('Complete apply in chart');
    },
  });

  useEffect(() => {
    search({
      variables: {
        roster: dataChart?.roster,
        categorie: dataChart?.categorie,
        rangeValue: dataChart?.rangeValue,
        createdBy: dataChart?.createdBy,
        createdAt: dataChart?.createdAt,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataChart]);

  if (called && loading) return <p>Loading ...</p>;

  // const users = data?.allUsers;

  // function filterUser(idUser) {
  //   const filter = users?.filter((user) => user._id === idUser);
  //   const result = filter[0]?.firstName + ' ' + filter[0]?.lastName;
  //   return result;
  // }

  const dataResult = data?.allValuesForCharts;

  const chartData = dataResult?.map((result) => ({
    USD: +result?.value,
    date: `${new Date(result?.createdAt).getDate()}/${
      new Date(result?.createdAt).getMonth() + 1
    }`,
  }));

  console.log('search data: ', chartData);

  return (
    <div className='chart'>
      <div className='chart-graph'>
        <LineChart
          width={850}
          height={280}
          data={chartData}
          margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <Line type='basis' dataKey='USD' stroke='rgba(234, 77, 44, 1)' strokeWidth={3} dot={false}/>
          <Line type='monotone' dataKey='pv' stroke='rgba(255, 166, 46, 1)' />
          <CartesianGrid stroke='rgb(70, 70, 70)' strokeDasharray='0' vertical={false} />
          <XAxis dataKey='date' axisLine={false} tickSize={20} tickLine={false} />
          <YAxis axisLine={false} tickSize={20} tickLine={false} />
          <Tooltip />
        </LineChart>
      </div>
    </div>
  );
};

export default ChartLiner;
