import FilterBar from '../../components/FilterBar';
import FilterResult from '../../components/FilterResult';

import './style.scss';

const Search = () => {
  return (
    <div className='main'>
      <FilterBar />
      <FilterResult />
    </div>
  );
};

export default Search;
