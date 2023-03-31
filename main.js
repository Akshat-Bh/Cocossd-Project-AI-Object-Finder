dstatus = "";
video= "";
objects= [];
object = document.getElementById("object_name").value;

function preload()
{
    video= createVideo('video.mp4');
    video.hide();
}

function setup()
{
    canvas= createCanvas(480, 380);
    canvas.center();
    synth= window.speechSynthesis;
}

function draw()
{
    image(video, 0, 0, 480, 380);

    if (dstatus != "")
    {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are= "+ objects.length;

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (objects == object)
            {
                document.getElementById("object_found").innerHTML = "Object Found";
                utterThis= new SpeechSynthesisUtterance("Object Found");
                synth.speak(utterThis);
            }
        }
    }
}

function start()
{
    objectDetector= ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Object(s)";
}

function modelLoaded()
{
    console.log("Model Loaded!");
    dstatus = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, results) 
{
    if (error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}