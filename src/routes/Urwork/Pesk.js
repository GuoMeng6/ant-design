import React, { Component } from 'react';

import BatchPesk from './BatchPesk';
import { sensorA, sensorB, sensorC } from './SensorConfig';

class Pesk extends Component {

  render() {
    return (
      <div>
        <BatchPesk params={sensorA} />
        <BatchPesk params={sensorB} />
        <BatchPesk params={sensorC} />
      </div>
    );
  }
}

export default Pesk;
