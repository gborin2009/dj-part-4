song1=""
song2=""
song1_status=""
song2_status=""
leftwristX=0
leftwristY=0
rightwristX=0
rightwristY=0
scoreLeftwrist=0
function preload(){
    song1=loadSound("finally_me.mp3")
    song2=loadSound("who_i_am.mp3")
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded)
    poseNet.on("pose",gotPoses)
}
function modelLoaded(){
    console.log("model is loaded")
}
function draw(){
    image(video,0,0,600,500)
    song1_status=song1.isPlaying()
    song2_status=song2.isPlaying()
    fill("#FFD700")
    stroke("#FF69B4")
    if(scoreLeftwrist>0.2){
  circle(leftwristX,leftwristY,18)
        song2.stop()
        if(song1_status==false){
            song1.play()
            document.getElementById("song").innerHTML="playing finally me song"
        }
        }
}
function  gotPoses(results){
    if(results.length>0){
        console.log(results)
        scoreLeftwrist= results[0].pose.keypoints[9].score
        leftwristX=results[0].pose.leftWrist.x
        leftwristY=results[0].pose.leftWrist.y
        rightwristX=results[0].pose.rightWrist.x
        rightwristY=results[0].pose.rightWrist.y
    }
}