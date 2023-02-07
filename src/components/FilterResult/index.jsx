import { useQuery, gql } from '@apollo/client';

import './styles.scss';
import { useSelector } from 'react-redux';

const GET_ALL_DATA = gql`
  query AllRoster {
    allRoster {
      _id
      title
      createdBy
      createdAt
      values {
        value
        categorie
        description
        createdBy
        createdAt
      }
      guests {
        _id
        email
        firstName
        lastName
      }
    }
    allUsers {
      _id
      email
      firstName
      lastName
    }
  }
`;

const FilterResult = () => {
  const { loading, error, data } = useQuery(GET_ALL_DATA);

  // const userId = useSelector((state) => state.financeData?.user?.profile?.id);
  const selectRoster = useSelector(
    (state) => state.financeData?.currentRoster?.roster
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const rosterId = data?.allRoster?.filter(
    (created) => created._id === selectRoster
  );
  const rosterValues = rosterId[0]?.values;
  // console.log('test filter: ', rosterValues);

  const users = data?.allUsers;
  function filterUser(idUser) {
    const filter = users?.filter((user) => user._id === idUser)
    const result = filter[0]?.firstName + ' ' + filter[0]?.lastName;
    return result;
  };

  // const guestsByRoster = data?.allRoster?.guests?.filter(
  //   (guest) => guest.email === 'jg_test@kraken.com'
  // );
  // console.log('Guests rosters filter: ', guestsByRoster);

  // const newDate = new Date('1675102189105');
  // console.log('new date: ', newDate);

  return (
    <main className='filterresults'>
      <section className='filterresults-box'>
        {rosterValues?.map((result) => (
          <div className='filterresults-box_result' key={result?.id}>
            <p className='filterresults-box_result-value'>{result?.value}</p>
            <p className='filterresults-box_result-categorie'>
              {result?.categorie}
            </p>
            <p className='filterresults-box_result-description'>
              {result?.description}
            </p>
            <p className='filterresults-box_result-createdAt'>
              {result?.createdAt}
            </p>
            <p className='filterresults-box_result-createdBy'>
              {filterUser(result.createdBy)}
            </p>
          </div>
        ))}
      </section>
    </main>
  );
};

export default FilterResult;
