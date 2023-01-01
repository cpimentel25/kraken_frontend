import './style.scss';

const DisplayTotalHistory = (props) => {
  const { data } = props;

  const newTotal = data.reduce((acc, act) => acc + parseFloat(act.value), 0);
  const newTotalValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(newTotal);


  return (
    <div key={data} className='displaytotalhistory'>
      <div className='displaytotalhistory-values'>
        <h3 className='displaytotalhistory-values_newtotal'>{newTotalValue}</h3>
      </div>
    </div>
  );
};

export default DisplayTotalHistory;
