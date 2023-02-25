import { gql, useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useState } from 'react';

import './styles.scss';

const GET_ALL_VALUES = gql`
  query AllValues(
    $roster: String!
    $pagination: Pagination
    $categorie: [String]
    $rangeValue: RangeValue
    $createdBy: [String]
    $createdAt: Date
  ) {
    allValues(
      roster: $roster
      pagination: $pagination
      categorie: $categorie
      rangeValue: $rangeValue
      createdBy: $createdBy
      createdAt: $createdAt
    ) {
      _id
      value
      categorie
      createdBy
      createdAt
      description
    }
    allUsers {
      _id
      email
      firstName
      lastName
    }
  }
`;

const FilterResult = ({ filter }) => {
  const [paginated, setPaginated] = useState({
    limit: 10,
    offset: 0
  });

  const [search, { called, loading, data }] = useLazyQuery(GET_ALL_VALUES, {
    onCompleted: () => {
      console.log('complete apply filter');
    },
  });

  useEffect(() => {
      search({
        variables: {
          roster: filter?.roster,
          pagination: {
            limit: paginated?.limit,
            offset: paginated?.offset,
          },
          categorie: filter?.categorie,
          rangeValue: filter?.rangeValue,
          createdBy: filter?.createdBy,
          createdAt: filter?.createdAt,
        },
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, paginated]);

  if (called && loading) return <p>Loading ...</p>;

  const users = data?.allUsers;
  function filterUser(idUser) {
    const filter = users?.filter((user) => user._id === idUser);
    const result = filter[0]?.firstName + ' ' + filter[0]?.lastName;
    return result;
  }

  function setDate(date) {
    const isNumber = parseInt(date);
    const isDate = new Date(isNumber)
      .toString()
      .split(' ')
      .splice(0, 4)
      .join(' ');
    return isDate;
  }

  return (
    <main className='filterresults'>
      <section className='filterresults-box'>
        <div className='filterresults-box_res'>
          <p className='filterresults-box_res-value'>Value</p>
          <p className='filterresults-box_res-categorie'>Categorie</p>
          <p className='filterresults-box_res-description'>Description</p>
          <p className='filterresults-box_res-createdAt'>Created at</p>
          <p className='filterresults-box_res-createdBy'>Created by</p>
        </div>
        {data?.allValues?.map((result) => (
          <div className='filterresults-box_result' key={result?._id}>
            <p
              className='filterresults-box_result-value'
              style={
                result?.value >= 0
                  ? { color: 'rgb(27, 214, 27)' }
                  : { color: 'rgb(252, 15, 15)' }
              }
            >
              $ {result?.value}
            </p>
            <p className='filterresults-box_result-categorie'>
              {result?.categorie}
            </p>
            <p className='filterresults-box_result-description'>
              {result?.description}
            </p>
            <p className='filterresults-box_result-createdAt'>
              {setDate(result?.createdAt)}
            </p>
            <p className='filterresults-box_result-createdBy'>
              {filterUser(result?.createdBy)}
            </p>
          </div>
        ))}
      </section>
    </main>
  );
};

export default FilterResult;
