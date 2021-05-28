$(document).ready(function () {
    $("#mycarousel").carousel({ interval: 2000 });
    $("#carouselButton").click(function () {
      if ($("#carouselButton").children("span").hasClass("fa-pause")) {
        $("#mycarousel").carousel("pause");
        $("#carouselButton").children("span").removeClass("fa-pause");
        $("#carouselButton").children("span").addClass("fa-play");
      } else if ($("#carouselButton").children("span").hasClass("fa-play")) {
        $("#mycarousel").carousel("cycle");
        $("#carouselButton").children("span").removeClass("fa-play");
        $("#carouselButton").children("span").addClass("fa-pause");
      }
    });
});


// Triggering login modal
$(document).ready(function () {
    $("#loginClick").click(function () {
      $("#loginModal").modal();
    });
});











function fetchData() {
  fetch("https://cricapi.com/api/playerStats?apikey=KpOHGFa1yuSz7Ostbh5vNvVCENH2&pid=35320")
    .then(response => {
        if(!response.ok) {
          throw Error("ERROR");
        }
        return response.json();
      })
      .then(data => {
        console.log(data.data);
        // const html = data.data
        //   .map(user => {
        //     return `<p>Batting: ${user.batting}</p>`
        //   })
        //   .join("");
        //   console.log(html);
        //   document.querySelector('#sachin').insertAdjacentElement("afterbegin", html)
        const  { batting , bowling } = data.data;
        console.log("Batting:",batting);
        console.log("Bowling:",bowling);
        
        let matchTypes = Object.keys(batting);
        let batStatsType = Object.keys(batting[matchTypes[0]])
        let bowStatsType = Object.keys(bowling[matchTypes[0]])

        let threadID = ["batting_thead","bowling_thead"];
        let bodyId = ["bat_body","bow_body"];
        let stats = [batStatsType,bowStatsType];
        let playerData = [batting,bowling];

        threadID.forEach((ele,index)=>{
            let tableThread = document.getElementById(ele);
            let tableBody = document.getElementById(bodyId[index]);
            let tableHeadingTr = document.createElement("tr");
            let th = document.createElement("th");
            th.innerHTML="MatchType"
            tableHeadingTr.appendChild(th);
            stats[index].forEach(stat=>{
              let th = document.createElement("th");
              th.innerHTML=`${stat}`;
              tableHeadingTr.appendChild(th);
            })
            tableThread.appendChild(tableHeadingTr);

            matchTypes.forEach((matchType,i)=>{
              const tr = document.createElement("tr");
              const th = document.createElement("th");
              th.innerHTML = `${matchType}`;
              tr.appendChild(th);
              stats[index].forEach(batStat=>{
                let td = document.createElement("td");
                td.innerHTML=`${playerData[index][matchType][batStat]==""?"NA":playerData[index][matchType][batStat]}`;
                

                tr.appendChild(td)
              })
              tableBody.appendChild(tr);
            })

        })


        

        
      })
      .catch(error => {
        console.log(error);
      });
}

fetchData();