# Description
A date component provides a simple way to display a date in a different format. 

# Example
~~~js

import {DateTime} from 'react-ui-modules'

<DateTime
    date={this.state.value}
    toFormat="YYYY-MM-DD"
    fromFormat="Do MMMM YYYY"
/>
~~~

panelClassNames
inputClassNames
disabled
  
# Date Format
The DateTime allows the date format to be set for both the 'toFormat' and 'fromFormat'. The following options are supported:

## Year, month, and day tokens

| Input      | Example          | Description                                            |
|------------|------------------|--------------------------------------------------------|
| `YYYY`     | `2014`           | 4 or 2 digit year                                      |
| `YY`       | `14`             | 2 digit year                                           |
| `Y`        | `-25`            | Year with any number of digits and sign                |
| `Q`        | `1..4`           | Quarter of year. Sets month to first month in quarter. |
| `M MM`     | `1..12`          | Month number                                           |
| `MMM MMMM` | `Jan..December`  | Month name in locale                                   |
| `D DD`     | `1..31`          | Day of month                                           |
| `Do`       | `1st..31st`      | Day of month with ordinal                              |
| `DDD DDDD` | `1..365`         | Day of year                                            |
| `X`        | `1410715640.579` | Unix timestamp                                         |
| `x`        | `1410715640579`  | Unix ms timestamp                                      |

## Week year, week, and weekday tokens

| Input      | Example        | Description                                 |
|------------|----------------|---------------------------------------------|
| `gggg`     | `2014`         | Locale 4 digit week year                    |
| `gg`       | `14`           | Locale 2 digit week year                    |
| `w ww`     | `1..53`        | Locale week of year                         |
| `e`        | `0..6`         | Locale day of week                          |
| `ddd dddd` | `Mon...Sunday` | Day name in locale                          |
| `GGGG`     | `2014`         | ISO 4 digit week year                       |
| `GG`       | `14`           | ISO 2 digit week year                       |
| `W WW`     | `1..53`        | ISO week of year                            |
| `E`        | `1..7`         | ISO day of week                             |

## Hour, minute, second, millisecond, and offset tokens

| Input      | Example  | Description                                                                    |
|------------|----------|--------------------------------------------------------------------------------|
| `H HH`     | `0..23`  | Hours (24 hour time)                                                           |
| `h hh`     | `1..12`  | Hours (12 hour time used with `a A`.)                                          |
| `k kk`     | `1..24`  | Hours (24 hour time from 1 to 24)                                              |
| `a A`      | `am pm`  | Post or ante meridiem (Note the one character `a p` are also considered valid) |
| `m mm`     | `0..59`  | Minutes                                                                        |
| `s ss`     | `0..59`  | Seconds                                                                        |
| `S SS SSS` | `0..999` | Fractional seconds                                                             |
| `Z ZZ`     | `+12:00` | Offset from UTC as `+-HH:mm`, `+-HHmm`, or `Z`                                 |