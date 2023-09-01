import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { DatePicker } from '@components/DatePicker';
import { dayjs } from '@utils/dayjs.util';
import './css/index.css';

const App = () => {
  const [value, setValue] = useState(dayjs());

  return (
    <div className="relative grid h-screen w-screen grid-cols-2 grid-rows-2">
      <div className="flex grow-0 items-start justify-start">
        <DatePicker
          date={value}
          options={{}}
          onDateChange={(date) => {
            if (date) {
              setValue(date);
            }
          }}
        />
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(<App />);
