import RosterSetting from '../../components/CreatedRoster';
import SharedRoster from '../../components/SharedRoster';

import './styles.scss';

const Settings = () => {
  return (
    <div className='settings'>
      <RosterSetting />
      <SharedRoster />
    </div>
  );
};

export default Settings;
