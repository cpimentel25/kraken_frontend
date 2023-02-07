import RosterSetting from '../../components/CreatedRoster';
import SharedRoster from '../../components/SharedRoster';

// import FormStart from '../../components/FormStart';

import './styles.scss';

const Settings = () => {
  return (
    <div className='settings'>
      {/* <FormStart /> */}
      <RosterSetting />
      <SharedRoster />
    </div>
  );
};

export default Settings;
