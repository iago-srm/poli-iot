import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

export const LoadingErrorData = ({ loading, error, data, children }) => {

  const parseChildren = () => {
    const c = {
      noData: [],
      other: []
    };
    React.Children.map(children, (child) => {
      if(child.type.name === "NoData") {
        c.noData.push(child);
      } else {
        c.other.push(child);
      }
    });
    return c;
  }
  
  return (
    <>
      {loading && !data && !error && <LoadingErrorData.Loading/>}
      {!data && !loading && error && <LoadingErrorData.Error />}
      {!loading && !error && !data && <LoadingErrorData.NoData>{parseChildren().noData}</LoadingErrorData.NoData>}
      {!loading && data && parseChildren().other}
    </>
  );
};

const Error = () => <h3>Houve um erro!</h3>;
LoadingErrorData.Error = Error;

const Loading = () => (
  <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <Spinner animation="border" role="status">
    </Spinner>
  </div>
);
LoadingErrorData.Loading = Loading;

const NoData = ({children}) => (children);
// NoData.name = "noData";
LoadingErrorData.NoData = NoData;

// const Data = (props) => <>{props.children}</>;
// LoadingErrorData.Data = Data;
