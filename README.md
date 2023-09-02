### Installation

`yarn add @deojeff/datepicker`

or

`npm install @deojeff/datepicker`

### Preview


![Preview](https://i.imgur.com/nRVH8uf.png)

### Usage

```
import { DatePicker } from '@deojeff/datepicker';
import '@deojeff/datepicker/dist/style.css';

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

### Props

`date | Dayjs`

The current date value

`options.disablePastDates | Boolean`

Flag to disable past dates

`options.disableFutureDates | Boolean`

Flag to disable future dates

`onDateChange | (date: Dayjs) => void`

Callback that returns a function with the selected date as the param.

`classess`

Optional classes based on the given option structure

```
classes={{
  picker: {
    classes: {
      container: 'bg-red-500',
      year: {
        classes: {
          container: 'bg-red-600',
          buttons: {
            previous: 'bg-purple-500',
            label: 'border-[2px] bg-green-500',
            next: 'bg-blue-500',
          },
        },
        picker: {
          classes: {
            current: 'font-semibold text-green-500',
            selected: 'bg-green-500 font-light',
            label: 'py-[20px] h-[60px]'
          }
        }
      },
      divider: {
        classes: 'border-[2px] h-[20px] bg-purple-500 border-blue-500',
      },
      month: {
        classes: {
          container: 'bg-black p-[10px]',
          buttons: {
            previous: 'bg-yellow-500 text-blue-500',
            label: 'bg-gradient-to-r from-black to-white hover:bg-red-500',
            next: 'bg-yellow-700 disabled:bg-orange-900',
          },
        },
        picker: {
          classes: {
            disabled: 'disabled:bg-red-500',
            label: 'font-semibold hover:bg-red-500 text-green-500',
            selected: 'bg-blue-500'
          }
        }
      },
      day: {
        classes: {
          container: 'bg-green-900',
          days: {
            labels: {
              days: 'bg-gray-100 text-[14px] font-semibold',
              weekend: 'text-orange-500',
            },
            label: 'h-[40px] bg-green-200 hover:bg-red-500',
            weekend: 'bg-black disabled:bg-blue-100',
            disabled: 'bg-yellow-100',
            selected: 'bg-yellow-300',
            today: 'text-red-500 !bg-red-200',
            past: {
              label: 'bg-red-500',
              disabled: 'bg-red-100',
            },
            future: {
              label: 'bg-red-900',
              disabled: 'disabled:bg-blue-100',
            },
          },
        },
      },
    },
  },
}}
```
