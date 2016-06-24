var typingTest;
typingTest={
	paragraph:["Blind would equal while oh mr do style. Lain led and fact none. One preferred sportsmen resolving the happiness continued. High at of in loud rich true. Oh conveying do immediate acuteness in he. Equally welcome her set nothing has gravity whether parties. Fertile suppose shyness mr up pointed in staying on respect. Blind would equal while oh mr do style. Lain led and fact none. One preferred sportsmen resolving ", "Quick six blind smart out burst. Perfectly on furniture dejection determine my depending an to. Add short water court fat. Her bachelor honoured perceive securing but desirous ham required.Questions deficient acuteness to engrossed as. Entirely led ten humoured greatest and yourself. Besides ye country on observe. She continue appetite endeavor she judgment interest the met. For she surrounded motionless", "Tiled say decay spoil now walls meant house. My mr interest thoughts screened of outweigh removing. Evening society musical besides inhabit ye my. Lose hill well up will he over on. Increasing sufficient everything men him admiration unpleasing sex. Around really his use uneasy longer him man. His our pulled nature elinor talked now for excuse result. Admitted add peculiar get joy doubtful. Blind would equal while oh mr do"],
	generateRandomNumber:Math.floor(Math.random()*3),
	concatenate_paragraph:"",
	characterCount:0,
	counter:1,
	userInput:"",
	keypressCounter:0,
	correctWords:0,
	wrongWords:0,
	getParagraph:function(){
		//console.log(typingTest.generateRandomNumber);
		return typingTest.paragraph[typingTest.generateRandomNumber];
	},
	showParagraph:function(){

		var fetchParagraph=typingTest.getParagraph().split(" ");
		characterCount=typingTest.getParagraph().split("");
		//alert(characterCount.length);
		for(var i=0;i<fetchParagraph.length;i++){
			typingTest.concatenate_paragraph=typingTest.concatenate_paragraph+"<span id="+"'"+(i+1)+"'>"+fetchParagraph[i]+" "+"</span>";
		}
		
		return $("#text-display").html(typingTest.concatenate_paragraph);
	},
	inputText:function(){
		$("#typingArea").bind('keyup','space',function(){
			typingTest.userInput=$("#typingArea").val().trim();
			//console.log(typingTest.userInput);

			var inputArray=typingTest.userInput.split(" ");
			var lastWord=inputArray[inputArray.length-1];
			//console.log(lastWord);
			var checkInputWord=$("#"+typingTest.counter).html().trim();
			//console.log(checkInputWord);
			$("#"+typingTest.counter).css('background-color','transparent');
			$("#"+(typingTest.counter+1)).css('background-color','yellow');
			if(lastWord==checkInputWord){
				$("#"+typingTest.counter).css('color','green');
				typingTest.correctWords++;
			}
			else{
				$("#"+typingTest.counter).css('color','red');
				typingTest.wrongWords++;
			}
			typingTest.counter++;
		});

	},
	onKeypress:function(){
		$("#typingArea").keypress(function(){
			typingTest.keypressCounter++;
			
			//console.log(typingTest.keypressCounter);
			if(typingTest.keypressCounter==1){
				return typingTest.startTimer();
			}
		});
	},
	startTimer:function(){
		var id=setInterval(myTimer,1000);
		var stopWatch=$("#seconds").text();
		stopWatch=parseInt(stopWatch);
		function myTimer(){
			stopWatch--;
			$("#seconds").text(stopWatch);
			//console.log(stopWatch);
			if(stopWatch==0){
				clearInterval(id);
				$("#typingArea").attr('readonly','readonly');
				var accuracy=typingTest.correctWords/(typingTest.correctWords+typingTest.wrongWords);
				accuracy=accuracy*100;
				typingTest.userInput=typingTest.userInput.split("");
				//console.log(typingTest.userInput);
				var inputTextCharacters=typingTest.userInput.length;
				
				var typingSpeed=inputTextCharacters/5;
				$(".typing-area").html("<b>Accuracy : </b>"+accuracy+"%"+"<br><b>Typing Speed : </b>"+typingSpeed+"WPM");
				$(".typing-area").css({"margin-left":"250px","margin-top":"50px","font-size":"25px"});
				//console.log("", typingSpeed+"WPM");
				
				//console.log("Accuracy is : ",accuracy+"%");
				//console.log("Typing Speed is : ", typingSpeed+"WPM");
			}
		}
	},
	reloadPage:function(){
		$(".reset").click(function(){
			location.reload();
		});
	}	
}
$(document).ready(function(){
	typingTest.getParagraph();
	typingTest.showParagraph();
	typingTest.inputText();
	typingTest.onKeypress();
	typingTest.reloadPage();
	// typingTest.startTimer();
	// $('#typing-area').keyboard();
});