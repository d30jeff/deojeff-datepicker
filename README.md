### Installation

`yarn add deojeff-datepicker`

### Usage

```
import { DatePicker } from 'deojeff-datepicker';
import 'deojeff-datepicker/dist/style.css';

const Component = () => {
  const [value, setValue] = useState(dayjs());

  return (
    <DatePicker
      date={value}
      onDateChange={(date) => {
        if (date) {
          setValue(date);
        }
      }}
    />
  )
}
```

P.S This readme page is still in progress
