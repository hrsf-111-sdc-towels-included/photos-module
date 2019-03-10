
## Get Photos
#### Test.yml
___

```config:
  target: 'http://localhost:4000'
  phases:
    - duration: 60
      arrivalRate: 1500
scenarios:
  - flow:
    - get:
        url: "/{{$randomNumber(1, 74000000)}"
    - get: 
        url: "/pictures/{{$randomNumber(1, 74000000}}"
```

#### Results

```
Summary report @ 21:48:29(-0800) 2019-03-09
  Scenarios launched:  90090
  Scenarios completed: 90090
  Requests completed:  180180
  RPS sent: 316.17
  Request latency:
    min: 5.9
    max: 1745
    median: 15.6
    p95: 151.7
    p99: 365.7
  Scenario counts:
    0: 90090 (100%)
  Codes:
    400: 90090
    404: 90090
```