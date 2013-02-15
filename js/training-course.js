(function($) {
	$.ajax(
		'http://151.236.219.131/sites/default/files/courses.json',
		{
			dataType: 'json',
			success: function (data) {
				$('.event-instances')
					.eventTable({ data: data });
				return true;
			}
		}
	);
})(jQuery);