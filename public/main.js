$(document).ready(function(){
	var objectId;
    $(".delete").on('click', function(){
    	var id = $(this).attr('objectId');
        $.ajax({
		   url: 'quotes',
		   type: 'DELETE',
		   data: {
		      id: id
		   },
		   error: function() {
		   },
		   success: function(data) {
		   		console.log(data);
		   		window.location.reload(true);
		   }
		});
    });

    $(".edit").on('click', function(e){
    	objectId = $(this).attr('objectId');
    	var title = $(this).parents('li').find('.quote-name').text();
    	var quote = $(this).parents('li').find('.quote-text').text();
    	$('#name').val(title);
    	$('#quote').val(quote);
    	$('.form-container').removeClass('hide');
    });

    $('.cancel').on('click', function(){
    	$('.form-container').addClass('hide');
    });

    $('.save').on('click', function(){
    	$('.form-container').addClass('hide');
    	var id = objectId;
    	var title = $('#name').val();
    	var quote = $('#quote').val();
    	$.ajax({
		   url: 'quotes',
		   type: 'PUT',
		   data: {
		      id: id,
		      title: title,
		      quote: quote
		   },
		   error: function() {
		   },
		   success: function(data) {
		   		console.log(data);
		   		window.location.reload(true);
		   }
		});
    });
});