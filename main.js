song="";
music="";
scoreLeftWrist=0;
scoreRightWrist=0;

LeftWristX=0;
LeftWristY=0;
RightWristX=0;
RightWristY=0;

function preload(){
  song=loadSound("music.mp3");
  music=loadSound("Bassthoven.mp3");
}

function setup(){
canvas=createCanvas(600,500);
canvas.center();

video=createCapture(VIDEO);
video.hide();

poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on('pose',gotPoses);
}

function draw(){
  image(video,0,0,600,500);

  fill(255,0,0);
  stroke(255,0,0);

  if (scoreRightWrist >= 0.2) {
    circle(RightWristX,RightWristY,20);
    song.stop();
    music.play();
  music.setVolume(1);
  music.rate(1);
  document.getElementById("song_name").innerHTML="Song-Peter Pan song";

    }

  if(scoreLeftWrist>0.2){
  circle(LeftWristX,LeftWristY,20);
  music.stop();
  song.play();
  song.setVolume(1);
  song.rate(1);
  document.getElementById("song_name").innerHTML="Song-Harry potter theme song";
  }
}

function modelLoaded() {
  console.log('Posenet is initialized');
}

function gotPoses(results){
  if(results.length>0){
    console.log(results);
    scoreLeftWrist=results[0].pose.keypoints[9].score;
    LeftWristX=results[0].pose.leftWrist.x;
    LeftWristY=results[0].pose.leftWrist.y;
    console.log("LeftWristX="+LeftWristX+" LeftWristY="+LeftWristY);
    RightWristX=results[0].pose.rightWrist.x;
    RightWristY=results[0].pose.rightWrist.y;
    console.log("RightWristX="+RightWristX+" RightWristY="+RightWristY);
  }
}