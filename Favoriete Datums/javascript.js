//nieuwe lege favoriet datum array
let favorietDatum = [];

//loopen voor de favoriete datum in de json bestand
for (let i = 0; i < data.length; i++) {
    //de dag en de maand worden omgewisseld omdat javascript amerikaanse tijd aanhoudt anders klopt het niet
    var wijzigData = data[i]["favoriet-datum"].substr(3, 2) + "/" + data[i]["favoriet-datum"].substr(0, 2) + "/" + data[i]["favoriet-datum"].substr(6, 4);
    console.log(wijzigData);
    //de gewijzigde datum wordt in de nieuwe array gepusht
    favorietDatum.push(wijzigData);
}

// nieuwe array voor de volledige uitgeschreven datum
let nieuwDatum = [];

for (let i = 0; i < favorietDatum.length; i++) {
    //alle gewijzigde favoriete datums worden geloopt en wordt door javascript als tekst uitgeschreven
    var dateString = favorietDatum[i]
    var dateObject = new Date(dateString)
    //de uitgeschreven datum tekst wordt in de nieuwe array gepusht
    nieuwDatum.push(dateObject);
}

console.log(nieuwDatum);


//schalen
var timeScale = d3.scaleTime()
    .domain([new Date(1990, 0, 1), new Date(2025, 0, 1)])
    .range([0, 830]);

//d3
d3.select('#grafiek')
    .selectAll('circle')
    .data(nieuwDatum)
    .join('circle')
    .attr('cx', function (d) {
        return timeScale(d);
    });

//d3
d3.select('#grafiek')
    .selectAll('text')
    .data(nieuwDatum)
    .join('text')
    .attr('x', function (d) {
        return timeScale(d);
    })
    .text(function (d) {
        return d.toDateString();
    });
