// First page start
const yourIpIs = document.querySelector('.you-p');

function getUserIp(){
    fetch(`https://api.ipify.org/?format=json`)
        .then(res => res.json())
        .then(data =>{
            yourIpIs.innerText = `Your IP is: ${data.ip}`;
        })
}
getUserIp();

// window.onload=function(){
//     const nextButton = document.getElementById('myButton');
//     nextButton.addEventListener('click',changeLocation);
// }
// function changeLocation(){
//     location.href = 'TaskPage.html';
// }
// First page end
