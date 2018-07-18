$(function() {

	var menu = $('.menu_toggle .menu');
	menu.click(function(e){
		e.preventDefault();
		menu.toggleClass('menu--active');
		$('.header .nav').slideToggle(500);
	});



	$('.slider_reviews').slick({
		dots:false,
		arrows:true,
		autoplay:false,
		autoplaySpeed:2000,
		slidesToShow: 1,
		adaptiveHeight:true
	});


	$('#footer_form').validate({
		rules: {
			form_email: {
				required: true,
				email: true
			}
		},
		messages: {
			form_email: {
				required: "E-mail is required",
				email: "Please enter a valid e-mail address"
			}
		}
	});

});