import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { DatePickerProvider } from '@context/DatePicker.context';
import { dayjs } from '@utils/dayjs.util';
import { DatePicker } from '@components/DatePicker';
import './css/index.css';

const App = () => {
  const [value, setValue] = useState(dayjs());

  return (
    <div className="relative grid h-screen w-screen grow-0 grid-cols-2 grid-rows-2 border">
      <div className="flex grow-0 justify-start">
        <DatePickerProvider>
          <DatePicker
            date={value}
            classes={{
              container: 'bg-red-500',
            }}
            onChange={(date) => {
              if (date) {
                setValue(date);
              }
            }}
          />
        </DatePickerProvider>
      </div>

      {/* <div className="flex justify-end">
        <DatePicker />
      </div>

      <div className="flex items-end justify-start">
        <DatePicker />
      </div>

      <div className="flex items-end justify-end">
        <DatePicker />
      </div> */}
    </div>
  );
};

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(<App />);
