Webcam.set({


    width:325,
    height:255,
    image_quality:'png',
    png_quality:100
})

Webcam.attach("#camera")

function take_picture() {

    Webcam.snap(function (take_the_picture) {
        document.getElementById("result").innerHTML=`<img id=image_of_user src=${take_the_picture}>`;

    })
    
}

console.log("ml5.version" + ml5.version);

var storage= ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/Xcbqz1ijI/model.json" ,modelLoaded)


function modelLoaded(){
    console.log("Model Loaded- Sucessfuly")
}

function speak(){

    var synthesis = window.speechSynthesis;
    speak_data1="The First Prediction Is "+prediction_1;
    speak_data2="And The Second Prediction Is" + prediction_2;
    utterThis = new SpeechSynthesisUtterance(speak_data1+speak_data2);
    synthesis.speak(utterThis);

}


function identify_emotion(){

    img = document.getElementById("image_of_user")
    storage.classify(img,gotresult)

}


function gotresult(error,result){

    if(error){

        console.error(error)
    }
    else{
        console.log(result)
        document.getElementById("emotion_example_1").innerHTML = result[0].label;
        document.getElementById("emotion_example_2").innerHTML = result[1].label;

        prediction_1 = result[0].label;
        prediction_2= result[1].label;
        speak();

        if(prediction_1 =="Sad" ){

            document.getElementById("emoji_name_1").innerHTML= "&#128532";
        }
        if(prediction_1=="Happy"){

            document.getElementById("emoji_name_1").innerHTML="&#128522";
        }
        if(prediction_1=="Angry"){

            document.getElementById("emoji_name_1").innerHTML="&#128545";
        }
        if(prediction_2=="Sad"){
            document.getElementById("emoji_name_2").innerHTML="&#128532"
        }
        if(prediction_2=="Happy"){

            document.getElementById("emoji_name_2").innerHTML="128522";
        }
        if(prediction_2=="Angry"){

            document.getElementById("emoji_name_2").innerHTML="&#128545";

        }

    }

}