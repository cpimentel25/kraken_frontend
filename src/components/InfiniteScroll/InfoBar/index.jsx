import { gql, useQuery } from '@apollo/client';

import './styles.scss';

const GET_ALL_USER = gql`
  query AllUsers {
    allUsers {
      _id
      firstName
      lastName
    }
  }
`;

const InfoBar = ({ dataBar }) => {
  const { loading, error, data } = useQuery(GET_ALL_USER, {
    onCompleted: () => {
      // console.log('complete search users');
    },
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

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
    <main className='infobar'>
      <section className='infobar-section'>
        <div className='infobar-section-data' key={dataBar?._id}>
          <p
            className='infobar-section-data-value'
            style={
              dataBar?.value >= 0
                ? { color: 'rgb(27, 214, 27)' }
                : { color: 'rgb(252, 15, 15)' }
            }
          >
            $ {dataBar?.value}
          </p>
          <p className='infobar-section-data-categorie'>{dataBar?.categorie}</p>
          <p className='infobar-section-data-description'>
            {dataBar?.description}
          </p>
          <p className='infobar-section-data-createdAt'>
            {setDate(dataBar?.createdAt)}
          </p>
          <p className='infobar-section-data-createdBy'>
            {/* {dataBar?.createdBy} */}
            {filterUser(dataBar?.createdBy)}
          </p>
        </div>
      </section>
    </main>
  );
};

export default InfoBar;
