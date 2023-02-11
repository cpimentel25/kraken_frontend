import { useDispatch, useSelector } from 'react-redux';
import { pathUpdateUser, postCategorie, postRoster, reset, setActiveUser } from '../../features/api/callSlice';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { useNavigate } from 'react-router-dom';

import './styless.scss';

const KnowSystem = () => {
  const user = useSelector((state) => state.financeData.user);
  const id = user?.profile?.id;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const activeUser = { isActive: true };
  const initialRoster = { title: 'Inistial Roster', createdBy: id }

  const formStart = [
    { name: 'Income', createdBy: id },
    { name: 'Transport', createdBy: id },
    { name: 'Taxes', createdBy: id },
    { name: 'Shopping', createdBy: id },
    { name: 'Unexpected', createdBy: id },
    { name: 'Other', createdBy: id },
  ];

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dotffo6gi',
    },
  });

  const imgStepOne = cld.image('Kraken/kraken_stepOne_chqoww');
  imgStepOne.resize(fill().width(355).height(287));

  const allDispatch = () => {
    dispatch(postCategorie(formStart));
    dispatch(pathUpdateUser(activeUser));
    dispatch(postRoster(initialRoster));
    dispatch(setActiveUser(true));
    // dispatch(fetchRoster());
    localStorage.clear();
    dispatch(reset());
    navigate('/');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    allDispatch();
  };

  return (
    <main className='knowsystem'>
      <form className='knowsystem-form' onSubmit={handleSubmit}>
        <div className='knowsystem-form_title'>
          <p>Know your System</p>
        </div>
        <div className='knowsystem-form_fp'>
          <p>
            Kraken automates the processes, offering immediate information and
            very practical use. It only requires one piece of information, then
            our A.I. it will work for you.
          </p>
        </div>
        <div className='knowsystem-form_sp'>
          <div className='knowsystem-form_sp-text'>
            <p className='knowsystem-form_sp-text_title'>Single step:</p>
            <p className='knowsystem-form_sp-text_steps'>
              Input value &gt; select category &gt; input any description
              (optional)
            </p>
          </div>
          <AdvancedImage
            className='knowsystem-form_sp-img'
            cldImg={imgStepOne}
          />
        </div>
        <div className='knowsystem-form_btn'>
          <button className='knowsystem-form_btn-send'>Start System</button>
        </div>
      </form>
    </main>
  );
};

export default KnowSystem;
