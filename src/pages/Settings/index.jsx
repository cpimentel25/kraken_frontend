import FormStart from '../../components/FormStart';
import RosterSetting from '../../components/RosterSetting';

import './styles.scss';

const Settings = () => {
  return (
    <div className='settings'>
      <FormStart />
      <RosterSetting />
    </div>
  );
};

export default Settings;
