import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export function DataFilter() {
  const [dataRadar, setDataRadar] = useState([]);

  const userData = useSelector((state) => state.financeData.data);
  const categorie = useSelector((state) => state.financeData.categorie);

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

    categorie.forEach((element) => {
      const value = Math.abs(
        data
          .filter((data) => data.categorie === element)
          .reduce((acc, value) => acc + value.value, 0)
      );
      newArray.push({ categorie: element, value });
    });

    return setData(newArray);
  }

  return dataRadar;
};

  // const userData = useSelector((state) => state.financeData.data);
  // const categorie = useSelector((state) => state.financeData.categorie);

  // function dataFilter(setData) {
  //   const newArray = [];

  //   const data = userData.map((userData) => ({
  //     categorie: userData.categorie,
  //     value: userData.value[0],
  //   }));

  //   categorie.forEach((element) => {
  //     const value = Math.abs(
  //       data
  //         .filter((data) => data.categorie === element)
  //         .reduce((acc, value) => acc + value.value, 0)
  //     );
  //     newArray.push({ categorie: element, value });
  //   });

  //   return setData(newArray);
  // };
