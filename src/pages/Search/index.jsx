import { useState } from 'react';
import FilterBar from '../../components/FilterBar';
import FilterResult from '../../components/FilterResult';

import './style.scss';

const Search = () => {
  const [dataFilter, setDataFilter] = useState({});

  const data = (data) => {
    setDataFilter(data)
  };

  return (
    <div className='main'>
      <FilterBar sendFilter={data} />
      <FilterResult filter={dataFilter} />
    </div>
  );
};

export default Search;
