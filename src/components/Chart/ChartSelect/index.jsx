import './styles.scss';

const ChartSelect = () => {
  return (
    <main className='select'>
      <section className='select-section'>
        <button className='select-section_btn'>Liner Chart</button>
        <button className='select-section_btn'>Bar Chart</button>
        <button className='select-section_btn'>Radar Chart</button>
        <button className='select-section_btn'>Pie Chart</button>
      </section>
    </main>
  );
};

export default ChartSelect;
