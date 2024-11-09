/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const DigitalEncoder = () => {
  const [binaryInput, setBinaryInput] = useState('10110');
  const [lastLevel, setLastLevel] = useState(1);
  const [lastAMIPolarity, setLastAMIPolarity] = useState(1);

  // Convert binary string to array of bits
  const getBits = () => binaryInput.split('').map(bit => parseInt(bit));

  // Generate NRZ-L encoding
  const getNRZL = () => {
    return getBits().flatMap(bit => [
      { time: 't', value: bit ? 1 : -1 },
      { time: 't+0.5', value: bit ? 1 : -1 }
    ]);
  };

  // Generate NRZ-I encoding
  const getNRZI = () => {
    let level = lastLevel;
    return getBits().flatMap(bit => {
      if (bit === 1) level *= -1;
      return [
        { time: 't', value: level },
        { time: 't+0.5', value: level }
      ];
    });
  };

  // Generate Bipolar AMI encoding
  const getBipolarAMI = () => {
    let polarity = lastAMIPolarity;
    return getBits().flatMap(bit => {
      const value = bit ? (polarity *= -1) : 0;
      return [
        { time: 't', value: value },
        { time: 't+0.5', value: value }
      ];
    });
  };

  // Generate Pseudoternary encoding
  const getPseudoternary = () => {
    let polarity = 1;
    return getBits().flatMap(bit => {
      const value = bit ? 0 : (polarity *= -1);
      return [
        { time: 't', value: value },
        { time: 't+0.5', value: value }
      ];
    });
  };

  // Generate Manchester encoding
  const getManchester = () => {
    return getBits().flatMap(bit => [
      { time: 't', value: bit ? 1 : -1 },
      { time: 't+0.5', value: bit ? -1 : 1 }
    ]);
  };

  // Generate Differential Manchester encoding
  const getDiffManchester = () => {
    let level = 1;
    return getBits().flatMap(bit => {
      const result = [
        { time: 't', value: level },
        { time: 't+0.5', value: -level }
      ];
      if (bit === 0) level *= -1;
      return result;
    });
  };

  // Common chart properties
  const chartProps = {
    width: 600,
    height: 200,
    margin: { top: 20, right: 30, left: 30, bottom: 5 }
  };

  return (
    <Card className="w-full max-w-4xl p-6">
      <CardHeader>
        <CardTitle className='font-poppins-md'>Digital Signal Encoding Visualizer</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <label className="block mb-2 font-poppins">Binary Input:</label>
          <input
            type="text"
            value={binaryInput}
            onChange={(e) => setBinaryInput(e.target.value.replace(/[^01]/g, ''))}
            className="border p-2 rounded w-48 bg-white dark:bg-transparent font-poppins"
            pattern="[01]*"
          />
        </div>

        <div className="space-y-8">
          <div className='justify-center flex flex-col items-center'>
            <h3 className="text-lg mb-2 font-poppins-md">NRZ-L</h3>
            <LineChart {...chartProps} data={getNRZL()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[-1.5, 1.5]} />
              <Line type="stepBefore" dataKey="value" stroke="#2563eb" dot={false} />
            </LineChart>
          </div>

          <div className='justify-center flex flex-col items-center'>
            <h3 className="text-lg mb-2 font-poppins-md">NRZ-I</h3>
            <LineChart {...chartProps} data={getNRZI()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[-1.5, 1.5]} />
              <Line type="stepBefore" dataKey="value" stroke="#16a34a" dot={false} />
            </LineChart>
          </div>

          <div className='justify-center flex flex-col items-center'>
            <h3 className="text-lg mb-2 font-poppins-md">Bipolar AMI</h3>
            <LineChart {...chartProps} data={getBipolarAMI()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[-1.5, 1.5]} />
              <Line type="stepBefore" dataKey="value" stroke="#dc2626" dot={false} />
            </LineChart>
          </div>

          <div className='justify-center flex flex-col items-center'>
            <h3 className="text-lg mb-2 font-poppins-md">Pseudoternary</h3>
            <LineChart {...chartProps} data={getPseudoternary()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[-1.5, 1.5]} />
              <Line type="stepBefore" dataKey="value" stroke="#9333ea" dot={false} />
            </LineChart>
          </div>

          <div className='justify-center flex flex-col items-center'>
            <h3 className="text-lg mb-2 font-poppins-md">Manchester</h3>
            <LineChart {...chartProps} data={getManchester()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[-1.5, 1.5]} />
              <Line type="stepBefore" dataKey="value" stroke="#ea580c" dot={false} />
            </LineChart>
          </div>

          <div className='justify-center flex flex-col items-center'>
            <h3 className="text-lg font-poppins-md mb-2">Differential Manchester</h3>
            <LineChart {...chartProps} data={getDiffManchester()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[-1.5, 1.5]} />
              <Line type="stepBefore" dataKey="value" stroke="#0891b2" dot={false} />
            </LineChart>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DigitalEncoder;