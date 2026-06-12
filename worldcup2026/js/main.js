async function loadSchedule(){

const response=
await fetch("./data/wc2026.json");

const data=
await response.json();

render(data);

}



function render(data){

const root=

document.getElementById(
"schedule"
);


root.innerHTML="";


const grouped={};



data.matches.forEach(match=>{

if(
!grouped[
match.date
]
){

grouped[
match.date
]=[];

}


grouped[
match.date
].push(
match
);

});



Object
.entries(grouped)

.forEach(

([date,matches])=>{


root.innerHTML+=`

<div class="day-card">

<div class="day-header">

📅
${formatDate(date)}

</div>

<div class="table-responsive">

<table class="table align-middle">

<thead>

<tr>

<th>Giờ</th>

<th>Bảng</th>

<th>Đội</th>

<th>Tỉ số</th>

<th>Đội</th>

<th>Sân</th>

</tr>

</thead>

<tbody>

${matches.map(

match=>{


const score=

match.score?.ft

?

`${match.score.ft[0]} : ${match.score.ft[1]}`

:

`VS`;



return`

<tr>

<td class="match-time">

${match.time}

</td>

<td>

${match.group??"-"}

</td>

<td>

<div class="team">

<img

class="flag"

src="${flag(
match.team1
)}"

>

${match.team1}

</div>

</td>

<td>

<div class="score">

<input

value="${
match.score?.ft?.[0]

??

0
}">

<span class="vs">

${score==="VS"

?

"VS"

:

":"

}

</span>

<input

value="${
match.score?.ft?.[1]

??

0
}">

</div>

</td>

<td>

<div class="team">

<img

class="flag"

src="${flag(
match.team2
)}"

>

${match.team2}

</div>

</td>

<td>

${match.ground}

</td>

</tr>

`;

}

).join("")}

</tbody>

</table>

</div>

</div>

`;

}

);

}



function formatDate(date){

return new Date(date)

.toLocaleDateString(

"vi-VN",

{

weekday:

"long",

day:

"2-digit",

month:

"2-digit",

year:

"numeric"

}

);

}



function flag(name){

const MAP={

"Mexico":"mx",

"South Africa":"za",

"South Korea":"kr",

"Czech Republic":"cz",

"Canada":"ca",

"Bosnia & Herzegovina":"ba",

"Qatar":"qa",

"Switzerland":"ch",

"Brazil":"br",

"Morocco":"ma",

"Haiti":"ht",

"Scotland":"gb-sct",

"USA":"us",

"Paraguay":"py",

"Australia":"au",

"Turkey":"tr",

"Germany":"de",

"Curaçao":"cw",

"Ivory Coast":"ci",

"Ecuador":"ec",

"Netherlands":"nl",

"Japan":"jp",

"Sweden":"se",

"Tunisia":"tn",

"Belgium":"be",

"Egypt":"eg",

"Iran":"ir",

"New Zealand":"nz",

"Spain":"es",

"Saudi Arabia":"sa",

"Uruguay":"uy",

"France":"fr",

"Senegal":"sn",

"Iraq":"iq",

"Norway":"no",

"Argentina":"ar",

"Algeria":"dz",

"Austria":"at",

"Jordan":"jo",

"Portugal":"pt",

"DR Congo":"cd",

"Uzbekistan":"uz",

"Colombia":"co",

"England":"gb-eng",

"Croatia":"hr",

"Ghana":"gh",

"Panama":"pa"

};



if(
!MAP[name]
){

return

"https://placehold.co/36x24";

}



return

`https://flagcdn.com/w40/${MAP[name]}.png`;

}



loadSchedule();