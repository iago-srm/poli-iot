import React from 'react';
import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next';
import Select from 'react-select';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import Spinner from 'react-bootstrap/Spinner';

import { LoadingErrorData } from '../../components/error-loading-data';
import { CookieNames } from '../../constants/names.enum';
import { useApiCall, getGardensApi, getSnapshotApi } from '../../services';
import { AuthContext } from '../../contexts/auth.context';

interface ISnapshot {
  id: number;
  time: string;
  measurements: any[]
}

let timerId = undefined;

const Dashboard = () => {

  const { user } = React.useContext(AuthContext);

  const [currentGardenId, setCurrentGardenId] = React.useState(undefined);
  const [lastUpdate, setLastUpdate] = React.useState(undefined);
  
  const { 
    apiCall: getSnapshot, 
    loading: getSnapshotLoading,
    response: snapshotResponse,
    errors: getSnapshotError
  } = useApiCall<number, ISnapshot>(getSnapshotApi);

  const { 
    apiCall: getGardens, 
    loading: getGardensLoading, 
    response: gardensResponse ,
    errors: getGardensError
  } = useApiCall<number, any[]>(getGardensApi);

  React.useEffect(() => {
    const fetchGardensOnMount = async () => {
      if(user && !gardensResponse?.data) await getGardens(Number(user.id));
      if(gardensResponse?.data.length) {
        setCurrentGardenId(gardensResponse?.data[0].id);
      }
    };

    fetchGardensOnMount();
  }, [user, gardensResponse?.data]);

  React.useEffect(() => {
    clearInterval(timerId);
    getSnapshot(currentGardenId);
    setLastUpdate(lastUpdate => ({...lastUpdate, [currentGardenId]: new Date()}));
    timerId = setInterval(async () => {
      setLastUpdate(lastUpdate => ({...lastUpdate, [currentGardenId]: new Date()}));
      await getSnapshot(currentGardenId);
    }, 5000);
  }, [currentGardenId]);

  React.useEffect(() => () => clearInterval(timerId), []);

  const onSelectChange = React.useCallback(async (val) => {
    const gardenId = val.value.id;
    setCurrentGardenId(gardenId);
  }, [setCurrentGardenId]);

  const mapReactSelect = (arr) => arr.map(garden => ({value: garden, label: garden.name}));

  return (
    <Container fluid>
      <Row>
        <Col xs={{ span: 10, offset: 1 }} sm={{ span: 8, offset: 2 }} md={{ span: 6, offset: 3 }}>
          <LoadingErrorData
            key={27}
            error={getGardensError.status}
            loading={getGardensLoading}
            data={gardensResponse}
          >
            <Select
              defaultValue={gardensResponse?.data && mapReactSelect(gardensResponse.data)[0]}
              className="basic-single"
              options={gardensResponse?.data && mapReactSelect(gardensResponse.data)}
              onChange={onSelectChange}
            />
          </LoadingErrorData>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>  
            <Badge pill>
              Snapshot {snapshotResponse && snapshotResponse?.data.id || "-"}
            </Badge>
          </div>
          <div>
            <p>
              Last update {lastUpdate?.[currentGardenId] ? 
              (new Date(lastUpdate[currentGardenId])).toLocaleString()
              : <Spinner animation="border" role="status" />}
            </p>
          </div>
        </Col>
      </Row>
      <LoadingErrorData
        key={89}
        loading={!snapshotResponse && getSnapshotLoading}
        error={getSnapshotError.status}
        data={snapshotResponse?.data.id}
      >
        <Row>
          <Col>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Device ID</th>
                  <th>Temperature</th>
                  <th>Humidity</th>
                  <th>Luminosity</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {snapshotResponse?.data?.measurements?.map((mes,i) => {
                return (
                <tr key={i}>
                  <td><strong>{mes.deviceId}</strong></td>
                  <td>{mes.temperature}</td>
                  <td>{mes.luminosity}</td>
                  <td>{mes.humidity}</td>
                  <td >{(new Date(mes.createdAt)).toLocaleString()}</td>
                </tr>
                )})}
              </tbody>
            </Table>
          </Col>
        </Row>
        {/* <LoadingErrorData.Error /> */}
        <LoadingErrorData.NoData > 
          <h3>This garden is not in operation</h3>
        </LoadingErrorData.NoData>
      </LoadingErrorData>
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