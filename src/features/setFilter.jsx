import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export function DataFilterNoAbs() {
  const [dataRadar, setDataRadar] = useState([]);

  const userData = useSelector((state) => state.financeData.data);
  const categorie = useSelector((state) => state.financeData.categorie);
  const mapCategorie = categorie.map(list => list.name);

  useEffect(
    () => {
      dataFilter(setDataRadar);
    },
    // eslint-disable-next-line
    [userData]
    );

    function dataFilter(setData) {
      const newArray = [];

      const data = userData.map((userData) => ({
        categorie: userData.categorie,
        value: userData.value[0],
      }));

      mapCategorie?.forEach((element) => {
      const value = data
        .filter((data) => data.categorie === element)
        .reduce((acc, value) => acc + value.value, 0);
      newArray.push({ categorie: element, value });
    });

    return setData(newArray);
  }

  return dataRadar;
}
