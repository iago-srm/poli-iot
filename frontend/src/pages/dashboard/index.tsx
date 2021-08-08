import React from 'react';
import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next';
import { CookieNames } from '../../constants/names.enum';
import { useApiCall, getGardensApi, getSnapshotsApi } from '../../services';
import { AuthContext } from '../../contexts/auth.context';

import Select from 'react-select';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

let timerId = undefined;
const Dashboard = () => {

  const { user } = React.useContext(AuthContext);

  const [currentSnapshot, setCurrentSnapshot] = React.useState(undefined);
  
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

  const fetchOnMount = React.useCallback(async () => {
    if(user && !gardensResponse?.data) await getGardens(Number(user.id));
    if(gardensResponse?.data) {
      timerId = setInterval(async () => await getSnapshots(gardensResponse.data[0].id), 5000);
    }
  }, [getGardens, user, getSnapshots, gardensResponse]);

  React.useEffect(() => {
    if(snapshotsResponse?.data) {
      setCurrentSnapshot(snapshotsResponse.data);
    }
  }, [snapshotsResponse]);

  React.useEffect(() => {
    fetchOnMount();
  }, [user, gardensResponse?.data]);

  React.useEffect(() => () => clearInterval(timerId), []);

  const mapReactSelect = (arr) => arr.map(garden => ({value: garden, label: garden.name}));

  const onSelectChange = React.useCallback(async (val) => {
    const gardenId = val.value.id;
    await getSnapshots(gardenId);
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col xs={{ span: 10, offset: 1 }} sm={{ span: 8, offset: 2 }} md={{ span: 6, offset: 3 }}>
        {!getGardensLoading && !getGardensError.status && <Select
          defaultValue={gardensResponse?.data && mapReactSelect(gardensResponse.data)[0]}
          className="basic-single"
          options={gardensResponse?.data && mapReactSelect(gardensResponse.data)}
          onChange={onSelectChange}
        />}
        </Col>
      </Row>
      <Row>
        <Col>
          {currentSnapshot.length ? <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Snapshot ID</th>
                {currentSnapshot ? currentSnapshot.measurements.map((mes, i) => {
                  return (
                <th key={i}>Device {mes.deviceId}</th>
                )}) : undefined}
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
                <tr >
                  <th >{currentSnapshot.id}-{i}</th>
                  <th>
                    {currentSnapshot.measurements.map((mes,i) => {
                    return (
                    <>
                      <td key={i}>Temperatura: {mes.temperature}</td>
                      <td key={i}>Luminosidade: {mes.luminosity}</td>
                      <td key={i}>Umidade: {mes.humidity}</td>
                    </>
                    )})}
                  </th>
                </tr>
            </tbody>
          </Table> : undefined}
        </Col>
      </Row>
    </Container>
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