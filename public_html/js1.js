const NUM_CONTESTS_TO_DISPLAY_POST_CONTEST= 3;
const TIME_TO_SHOW_UPCOMMING_CONTEST_GREEN_SECONDS= 3*24*3600;
setTimeout(()=>{
    fetch("https://codeforces.com/api/contest.list").then(responce => responce.json()).then(data=>{
        if(data.status=="OK"){
            var contests=data.result;
            const contestTemplate=document.getElementById("contest-template");
            const contestContainer=document.getElementById("contest-container");
            var Upcomming_contest_count=0;
            for(var i=0;i<NUM_CONTESTS_TO_DISPLAY_POST_CONTEST+Upcomming_contest_count;i++){
                var clone=contestTemplate.cloneNode(true);
                clone.className="contest-outer";
                clone.querySelector('.contest-name').querySelector('p').textContent=contests[i].name;
                var cloneoptions=clone.querySelector('.contest-options');
                cloneoptions.querySelector('.contest-time').textContent=
                    getDateString(contests[i].startTimeSeconds)+" "
                    +getTimeString(contests[i].startTimeSeconds);
                if(contests[i].phase=='BEFORE'){
                    cloneoptions.querySelector('.contest-status').textContent='UPCOMMING';
                    Upcomming_contest_count+=1;
                    clone.style.order=-Upcomming_contest_count;
                    if(-contests[i].relativeTimeSeconds<=TIME_TO_SHOW_UPCOMMING_CONTEST_GREEN_SECONDS){
                        clone.querySelector('.contest-time').style.color='rgb(99,241,249)';
                        clone.style.background="rgba(60,60,80,1)";
                        clone.querySelector('.contest-time').style.fontWeight='bold';
                    }
                }
                else{
                    cloneoptions.querySelector('.contest-status').textContent=contests[i].phase;
                    clone.style.background="rgba(60,60,60,1)";

                }
                const j=i;
                cloneoptions.querySelector('.contest-inform-btn').onclick=function(){
                    informContest(contests[j].id,contests[j].startTimeSeconds,contests[j].relativeTimeSeconds);
                };
                cloneoptions.querySelector('.contest-postStandings-btn').onclick=function(){
                    postStandings(contests[j].id);
                };
                cloneoptions.querySelector(".contest-postRatingchanges-btn").onclick=function(){
                    postRatingchanges(contests[j].id);
                };
                contestContainer.appendChild(clone);
            }
        }
    });
},300);




const TIME_BEFORE_CAN_INFORM_IN_HRS=2*24;
const TIME_BEFORE_CAN_INFORM_IN_SECONDS=TIME_BEFORE_CAN_INFORM_IN_HRS*3600;
function informContest(contestId,contestStartTime,contestRelativeTime){
    if(contestRelativeTime<0 && -contestRelativeTime<=TIME_BEFORE_CAN_INFORM_IN_SECONDS){
        var message="https://codeforces.com/contests/"+contestId+"\n";
        message+="At "+getTimeString(contestStartTime)+" on "+getDateString(contestStartTime)+".";
        if(confirm("Do you want to notify about "+contestId)==true){
            sendMessage(message);
        }
    }
    else{
        alert("Can't inform about contest");
    }
}

function cleardynamicPoststandings(){

    var dynamic_elements=document.querySelectorAll(".dynamic-tag");
    dynamic_elements.forEach(element=>{
        element.remove();
    });
    var dynamic_standings=document.querySelectorAll(".dynamic-standings");
    dynamic_standings.forEach(element=>{
        element.remove();
    });
}
function postStandings(contestId){
    cleardynamicPoststandings();
    fetch("codeforcesHandles.json").then(rensopnce =>rensopnce.json()).then(handlesFile=>{
        var handles=handlesFile.handles;
        fetch("https://codeforces.com/api/contest.standings?contestId="+contestId).then(rensopnce=>rensopnce.json()).then(data=>{
            if(data.status=="OK"){
                var handlesQ="";
                handles.forEach(handle => {
                    handlesQ+=handle+";";
                });
                var handleDetails;
                fetch("https://codeforces.com/api/user.info?handles="+handlesQ).then(responce=>responce.json()).then(userdetails=>{
                    if(userdetails.status=="OK"){
                        handleDetails=userdetails.result;
                        data=data.result;   
                        if(data.contest.relativeTimeSeconds>=data.contest.durationSeconds){
                            const standingsDisplay=document.getElementById("standings-outer");
                            standingsDisplay.querySelector('.standings-contest-name').textContent=data.contest.name;
                            
                            const standingsTopBar=standingsDisplay.querySelector('.standings-container').querySelector('.standings-top-container');
                            data.problems.forEach(problem => {
                                const problemTag=document.createElement("div");
                                problemTag.className="standings-top-problem-tag dynamic-tag";
                                const ptag=document.createElement("p");
                                ptag.className="p-tag";
                                ptag.textContent=problem.index;
                                problemTag.appendChild(ptag);
                                standingsTopBar.appendChild(problemTag);
                            });

                            const contestentDisplayTemplate=document.getElementById("standings-individual-template");
                            const contestentDisplayContainer=document.getElementById("standings-container");
                            var cnt=0;
                            data.rows.forEach(content => {
                                var contentHandle=content.party.members[0].handle;
                                var fnd=false;
                                var ind=0;
                                handles.forEach(handle => {
                                    if(contentHandle==handle){
                                        fnd=true;                          
                                    }
                                    if(!fnd) {
                                        ind++;  
                                    }  
                                });
                                if(fnd){
                                    cnt++;
                                    const contestentDisplay=contestentDisplayTemplate.cloneNode(true);
                                    if(cnt%2==0){
                                        contestentDisplay.style.background='rgb(240,240,240)';
                                    }
                                    contestentDisplay.className="standings-individual-outer dynamic-standings";
                                    contestentDisplay.querySelector(".standings-individual-rank").querySelector("p")
                                    .textContent=cnt +"("+content.rank+")";

                                    contestentDisplay.querySelector(".standings-individual-handle").querySelector("p")
                                    .textContent=content.party.members[0].handle;
                                    if(handleDetails[ind].hasOwnProperty("rating")){
                                        contestentDisplay.querySelector(".standings-individual-handle")
                                        .style.color=getColor(handleDetails[ind].rating);
                                    }
                                    
                                    contestentDisplay.querySelector('.standings-individual-points').querySelector('p')
                                    .textContent=content.points;
                                    content.problemResults.forEach(pData=>{
                                        var pointsDiv=document.createElement("div");
                                        pointsDiv.className="standings-individual-problem-status";
                                        var pointsP=document.createElement("p");
                                        if(pData.points>0){
                                            pointsP.textContent="+"+pData.points;
                                        }
                                        else{
                                            if(pData.rejectedAttemptCount>0){
                                                pointsP.textContent="-"+pData.rejectedAttemptCount;
                                                pointsDiv.style.color='red';
                                            }
                                            else{
                                                pointsP.textContent="0";
                                                pointsDiv.style.color='grey';

                                            }

                                        }
                                        pointsDiv.appendChild(pointsP);
                                        contestentDisplay.appendChild(pointsDiv);
                                    });
                                    contestentDisplayContainer.appendChild(contestentDisplay);

                                }
                            });

                            setTimeout(() => {
                                if(confirm("Are you sure to post Standings?")==true){
                                    sendImg2(document.getElementById("standings-outer"));
                                }
                            }, 3000);
                        }
                        else{
                            alert("Cant post standings of the selected contest");
                        }
                        //------------------
                    }
                    else{
                        console.log(userdetails);
                        throw new Error('Failed To fetch user details');

                    }
                });
                //----------------------------------
                
            }
            else{
                console.log("Failed to fetch data");
                console.log(data);
                alert("Failed to fetch data");
            }
        });
        
    });

}
function getColor(x){
    if(x<1200){
        return 'rgb(128,128,128)';
    }
    if(x<1400){
        return 'rgb(0,128,0)';
    }
    if(x<1600){
        return 'rgb(3,168,158)';
    }
    if(x<1900){
        return 'rgb(0,0,255)';

    }
    if(x<2100){
        return 'rgb(170,0,170)';

    }
    if(x<2300){
        return 'rgb(254,152,12)';

    }
    if(x<2400){
        return 'rgb(255,141,36)';

    }
    if(x<2600){
        return 'rgba(255,0,0,255)';

    }
    return 'rgb(239,35,36)';
}
function getLevel(x){
    if(x<1200){
        return "Newbie";
    }
    if(x<1400){
        return 'Pupil';
    }
    if(x<1600){
        return 'Specialist';
    }
    if(x<1900){
        return 'Expert';

    }
    if(x<2100){
        return 'Candidate Master';

    }
    if(x<2300){
        return 'Master';

    }
    if(x<2400){
        return 'International Master';

    }
    if(x<2600){
        return 'Grandmaster';

    }
    if(x<3000){
        return 'International Grandmaster';

    }
    return 'Legendary Grandmaster';
}

function cleardynamicRatingChanges(){
    var elements=document.querySelectorAll(".dynamic-ratingChanges-element");
    elements.forEach(element=>{
        element.remove();
    });
}
function postRatingchanges(contestId){
    cleardynamicRatingChanges();
    fetch("https://codeforces.com/api/contest.ratingChanges?contestId="+contestId).then(responce=>responce.json()).then(data=>{
        if(data.status=="OK"){
            data=data.result;
            fetch("codeforcesHandles.json").then(responce=>responce.json()).then(handlesData=>{
                var handles=handlesData.handles;
                var cnt=0;
                const ratingChangesTemplate=document.getElementById("ratingChange-individual-template");
                const ratingChangesContainer=document.getElementById("ratingChanges-container");
                document.getElementById("ratingChanges-outer").querySelector(".ratingChanges-contest-name")
                .querySelector("p").textContent=data[0].contestName;
                var congradulateCaption="APPLE";
                data.forEach(party=>{
                    var fnd=false;
                    handles.forEach(handle=>{
                        if(handle==party.handle){
                            fnd=true;
                        }
                    });
                    if(fnd){
                        cnt+=1;
                        const ratingChangeNew=ratingChangesTemplate.cloneNode(true);
                        if(cnt%2==0){
                            ratingChangeNew.style.background='rgb(240,240,240)';
                        }
                        ratingChangeNew.className="ratingChange-individual-outer dynamic-ratingChanges-element";
                        ratingChangeNew.querySelector(".standings-individual-rank").querySelector("p")
                        .textContent=cnt+"("+party.rank+")";

                        ratingChangeNew.querySelector(".standings-individual-handle").querySelector("p")
                        .textContent=party.handle;
                        ratingChangeNew.querySelector(".standings-individual-handle").style.color=getColor(party.oldRating);

                        ratingChangeNew.querySelector(".ratingChange-individual-delta").querySelector("p")
                        .textContent="+"+(party.newRating-party.oldRating);
                        if(party.newRating-party.oldRating<=0){
                            ratingChangeNew.querySelector(".ratingChange-individual-delta").querySelector("p")
                        .textContent=party.newRating-party.oldRating;
                            ratingChangeNew.querySelector(".ratingChange-individual-delta").style.color='rgb(255,0,0)';
                        }

                        ratingChangeNew.querySelector(".ratingChange-individual-from").querySelector("p")
                        .textContent=party.oldRating;
                        ratingChangeNew.querySelector(".ratingChange-individual-from").style.color=getColor(party.oldRating);

                        ratingChangeNew.querySelector(".ratingChange-individual-to").querySelector("p")
                        .textContent=party.newRating;
                        ratingChangeNew.querySelector(".ratingChange-individual-to").style.color=getColor(party.newRating);
                        
                        if(getColor(party.oldRating)!=getColor(party.newRating)){
                            ratingChangeNew.querySelector(".ratingChange-individual-comment").querySelector("p")
                            .textContent="Became "+getLevel(party.newRating);
                            ratingChangeNew.querySelector(".ratingChange-individual-comment")
                            .style.color=getColor(party.newRating);
                            if(party.newRating>party.oldRating){
                                if(congradulateCaption=="APPLE"){
                                    congradulateCaption="";
                                }
                                congradulateCaption+="Congratulations to "+party.handle+" for becoming "+getLevel(party.newRating)+"\n\n";
                            }
                        }

                        ratingChangesContainer.appendChild(ratingChangeNew);
                    }
                });
                setTimeout(()=>{
                    if(confirm("Are you sure to post Rating Changes?")==true){
                        sendImg(document.getElementById("ratingChanges-outer"),congradulateCaption);
                    }
                },3000)
            }).catch(error=>{
                console.log(error);
            });
        }
        else{
            console.log(data);
            alert("failed to fetch rating changes");
        }
    });
}

function getTimeString(time){
    const date = new Date(time*1000);
    const formattedTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });

    return formattedTime;
}

function getDateString(time){
    const date = new Date(time*1000);   
    const day = date.getUTCDate().toString().padStart(2, '0'); // Get the day and pad with leading zeros if necessary
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Get the month (zero-based) and add 1, then pad with leading zeros if necessary
    const year = date.getUTCFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
}