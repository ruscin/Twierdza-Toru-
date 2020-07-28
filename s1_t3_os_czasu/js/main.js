$(document).ready(function() {
		zzz.init("rgba(0,0,0,0.7)");
		$(".zoom-icon").on("click", function () {
			$(this).parent().find('img').click();
		});
		
		var panel = document.getElementById("timeline");
		var total = $('#start-page').outerHeight() - 1920;
		var scroll = $(window).scrollTop();
		var percentage = scroll/total*100;
		scrollRange.value = percentage;
		var leftPosition = $(window).scrollTop();
});

var scrollRange = document.getElementById("timeline-small");
scrollRange.oninput = function () {
    var total = $('#start-page').outerHeight() - 1920;
    var percentage = total*(this.value/100);
		$('html, body').scrollTop(percentage);
}

$(window).scroll(function(){
    var total = $('#start-page').outerHeight() - 1920;
	 var scroll = $(window).scrollTop();
	 var percentage = scroll/total*100;
	 scrollRange.value = percentage;
});

translateTimeline();
$(".languages > div").on("click", function () {
    translateTimeline();
});
function translateTimeline() {
		var timelineItems = '';
		translatesArray['timeline'].forEach(function(item, index) {
				var side = index%2 == 0?'left':'right';
				timelineItems = '<div class="container '+side+'">'+
							'<div class="content">'+
								'<div class="timeline-date">'+item["date"]+'</div>'+
								'<div class="timeline-title">'+addNbsp(item["title"])+'</div>'+
								'<div class="timeline-text">'+addNbsp(item["description"])+'</div>';
								if(item["img"]){
									timelineItems +='<div class="timeline-image"><img class="zzz" src="img/'+item["img"]+'"/><div class="zoom-icon"></div></div>';
								}
							
					timelineItems +='</div>'+
						'</div>';
						
				$('#timeline').prepend(timelineItems);
		});
}