import React from 'react';
import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next';
import { CookieNames } from '../../constants/names.enum';
import { useApiCall, getGardensApi, getSnapshotsApi } from '../../services';
import { AuthContext } from '../../contexts/auth.context';
import Select from 'react-select';

const Dashboard = () => {

  const { user } = React.useContext(AuthContext);

  const { 
    apiCall: getSnapshots, 
    loading: getSnapshotsLoading, 
    response: snapshotsResponse ,
    errors: getSnapshotsError
  } = useApiCall<number, any[]>(getSnapshotsApi);

  const { 
    apiCall: getGardens, 
    loading: getGardensLoading, 
    response: gardensResponse ,
    errors: getGardensError
  } = useApiCall<number, any[]>(getGardensApi);

  const fetchUserGardens = React.useCallback(async () => {
    if(user) await getGardens(Number(user.id));
  }, [getGardens, user]);

  React.useEffect(() => {
    fetchUserGardens();
  }, [getGardens, user]);

  const mapReactSelect = (arr) => arr.map(garden => ({value: garden, label: garden.name}));

  const onSelectChange = React.useCallback(async (val) => {
    const gardenId = val.value.id;
    await getSnapshots(gardenId);
  }, []);
  return (
    <div>
      
      {/* {user && <p>I am {JSON.stringify(user)}</p>} */}
      <p>{!getGardensLoading && !getGardensError.status && <Select
        defaultValue={gardensResponse?.data && mapReactSelect(gardensResponse.data)[0]}
        // label="Single select"
        className="basic-single"
        options={gardensResponse?.data && mapReactSelect(gardensResponse.data)}
        onChange={onSelectChange}
      />}</p>
    </div>
  );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { [CookieNames.REFRESH_TOKEN]: token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  return { props: {}}
}