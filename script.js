window.onload = function(){
    var files = ["maenner.json", "jungen.json", "tiere.json"]
    var refresh = document.querySelector('#refresh--container')
    var timeout = false;
    var animationTeam = []

    refresh.addEventListener('click', renderTeam)
    refresh.addEventListener("pointerdown", function(event){
        event.preventDefault();
    });

    function loading(){
        setTimeout(function(){ 
            timeout = false; 
        }, 400);
    }

    // setInterval(() => {
    //     renderTeam()
    // }, 6000);

    renderTeam(true)
    function renderTeam(first_time){
        animationTeam = []
        if (timeout == false){
            refresh.classList.add('refresh--animation')
            files.forEach(file => {
                importFile(file, first_time)                
            });
            
            setTimeout(() => {
                refresh.classList.remove('refresh--animation')
            }, 300);
            
            timeout = true;
            loading()
        }
    }

    function readTextFile(file, callback) {
        var rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = function() {
            if (rawFile.readyState === 4 && rawFile.status == "200") {
                callback(rawFile.responseText);
            }    
        }

        rawFile.send(null);
    }

    function importFile(file, first_time){
        readTextFile(file, function(text){
            var data = JSON.parse(text);
            const member = data.messages[Math.floor(Math.random()*data.messages.length)].content            
            console.log(file.replace('.json', '') + ' ' + data.messageCount)
            
            if (member.length > 0){
                for (let i = 0; i < 5; i++) {
                    animationTeam.push(data.messages[Math.floor(Math.random()*data.messages.length)].content)                    
                }

                document.querySelector('#' + file.replace('.json', '')).innerHTML = member
            } else{
                renderTeam()
            }
        
            if(animationTeam.length == 15 && first_time == true){
                if(first_time == true){
                    setTimeout(() => {
                        document.getElementById('loader').style.opacity = 0;
                        for (let i = 1; i < animationTeam.length; i++) {
                            // console.log('translate(' + generateRandomInteger(-3, 3) + 'vw' + ', ' + generateRandomInteger(-3, 3) + 'vh' + ')')
                            document.getElementById('animation--team-' + i).innerHTML = animationTeam[i]
                            document.getElementById('animation--team-' + i).style.transform = 'translate(' + generateRandomInteger(-15, 15) + 'vw' + ', ' + generateRandomInteger(-15, 15) + 'vh' + ')'
                            
                            setTimeout(() => {                        
                                document.getElementById('animation--team-' + i).style.transition = 'transform ' + generateRandomInteger(300, 400) * 10 + 'ms ease-out' + ', opacity ' + generateRandomInteger(100, 200) * 10 + 'ms'
                                
                                setTimeout(() => {                                
                                    document.getElementById('animation--team-' + i).style.opacity = '1'
                                }, 50);
                                
                                const randomNumber = generateRandomInteger(0,7)
                                if(randomNumber == 0){
                                    document.getElementById('animation--team-' + i).style.transform = 'translate(' + generateRandomInteger(-100, 100) + 'vw'  + ', ' + '120' + 'vh' + ')' + ' scale(' + generateRandomInteger(8, 15) / 10 + ')';
                                }else if(randomNumber == 1){
                                    document.getElementById('animation--team-' + i).style.transform = 'translate(' + generateRandomInteger(100, -100) + 'vw' + ', ' + '120' + 'vh' + ')' + ' scale(' + generateRandomInteger(8, 15) / 10 + ')';
                                }else if(randomNumber == 2){
                                    document.getElementById('animation--team-' + i).style.transform = 'translate(' + '120' + 'vw' + ', ' + generateRandomInteger(100, -100) + 'vh' + ')' + ' scale(' + generateRandomInteger(8, 15) / 10 + ')';
                                }else if(randomNumber == 3){
                                    document.getElementById('animation--team-' + i).style.transform = 'translate(' + '120' + 'vw' + ', ' + generateRandomInteger(-100, 100) + 'vh' + ')' + ' scale(' + generateRandomInteger(8, 15) / 10 + ')';
                                }else if(randomNumber == 4){
                                    document.getElementById('animation--team-' + i).style.transform = 'translate(' + generateRandomInteger(-100, 100) + 'vw'  + ', ' + '-120' + 'vh' + ')' + ' scale(' + generateRandomInteger(8, 15) / 10 + ')';
                                }else if(randomNumber == 5){
                                    document.getElementById('animation--team-' + i).style.transform = 'translate(' + generateRandomInteger(100, -100) + 'vw' + ', ' + '-120' + 'vh' + ')' + ' scale(' + generateRandomInteger(8, 15) / 10 + ')';
                                }else if(randomNumber == 6){
                                    document.getElementById('animation--team-' + i).style.transform = 'translate(' + '-120' + 'vw' + ', ' + generateRandomInteger(100, -100) + 'vh' + ')' + ' scale(' + generateRandomInteger(8, 15) / 10 + ')';
                                }else if(randomNumber == 7){
                                    document.getElementById('animation--team-' + i).style.transform = 'translate(' + '-120' + 'vw' + ', ' + generateRandomInteger(-100, 100) + 'vh' + ')' + ' scale(' + generateRandomInteger(8, 15) / 10 + ')';
                                }

                                document.getElementById('loading-screen').style.opacity = 0;
                            }, 500);
                        }                        
                    }, 1000);

                    for (let i = 1; i < animationTeam.length; i++) {
                        document.getElementById('animation--team-' + i).style.transition = 'opacity(0s)'
                    }

                    setTimeout(() => {                        
                        document.getElementById('team').style.transition = '1s ease'
                        document.getElementById('team').style.transform = 'scale(1)'
                    }, 3250);
                }             
            }
        });
    }

    function generateRandomInteger(min, max) {
        return Math.floor(min + Math.random()*(max - min + 1))
    }
} 