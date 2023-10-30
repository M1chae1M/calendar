import {Html, Head, Main, NextScript} from 'next/document'

export default function Document(){
  return(
    <Html lang="pl">
      <Head>
        <title>Calendar</title>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet"/>
      </Head>
      <body>
        <Main/>
        <NextScript/>
      </body>
    </Html>
  )
}

export function returnDaysInMonth(year){
  const daysInMonths=[];
  for(let i=0;i<12;i++){
    const temporaryDate=new Date(year, (i+1), 0);
    daysInMonths.push({
      fullDate:temporaryDate,
      days:temporaryDate.getDate(),
      month:(i+1),
      year:year,
      startsFrom:new Date(year, i, 1).getDay(),
    });
  }
  return daysInMonths
}

// export const DaySize='38px'
export const DaySize='45px'
// export const DaySize='52px'
// export const DaySize='33px'
export const namesOfDays=['M','T','W','T','F','S','S']

export const isWeekend=(fullDate,day)=>{
  const names=[[...namesOfDays].pop(),...namesOfDays]
  const date=new Date(fullDate?.year, fullDate?.month-1, day);
  const dayOfWeek=names[date.getDay()];
  return dayOfWeek==='S'
}

export function fetchPOST(path, data){
  return(
    fetch(path,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(data)
    })
    .then(res=>res.json())
  )
}