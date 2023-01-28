import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryFilters } from '../../../features/api/callSlice';

import './styles.scss';

const FilterModal = () => {
  const listCategory = useSelector((state) => state.financeData.categorie);
  const [filters, setFilters] = useState(listCategory);

  const dispatch = useDispatch();

  const handleChange = (value) => {
    const isChecked = filters.indexOf(value);
    const newFilter = [...filters];

    if (isChecked > -1) {
      newFilter.splice(isChecked, 1);
    } else {
      newFilter.push(value);
    }
    setFilters(newFilter);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setCategoryFilters(filters));
  };

  return (
    <div className='filters'>
      <form className='filters-category'>
        {listCategory?.length
          ? listCategory?.map((value, index) => (
              <li key={index} className='filters-category_list'>
                <div className='filters-category_wrap'>
                  <input
                    className='filters-category_checked'
                    type='checkbox'
                    id={index}
                    value={value}
                    defaultChecked={true}
                    onChange={() => handleChange(value)}
                  />
                  {value.name}
                </div>
              </li>
            ))
          : null}
        <div className='filters-category_buttons'>
          <input
            className='filters-category_btn'
            type='submit'
            value='Apply'
            onClick={handleSubmit}
          />
          <input
            className='filters-category_btn'
            type='submit'
            value='Reset'
            // onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default FilterModal;
