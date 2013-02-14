var 
	dateRange = function(startDate, endDate) {
		var start = new Date(startDate)
		,   end = new Date(endDate)
		,   startYear = start.getFullYear()
		,   endYear = end.getFullYear()
		,   startMonth = start.toDateString().substr(4, 3)
		,   endMonth = end.toDateString().substr(4, 3)
		,   startDay = start.getDate()
		,   endDay = end.getDate()
		;
		if (startYear === endYear) {
			if (startMonth === endMonth) {
				if (startDay === endDay) {
					return startDay + ' ' + startMonth + ' ' + startYear;
				} else {
					return startDay + '-' + endDay + ' ' + startMonth + ' ' + startYear;
				}
			} else {
				return startDay + ' ' + startMonth + ' - ' + endDay + ' ' + endMonth + ' ' + startYear;
			}
		} else {
			return startDay + ' ' + startMonth + ' ' + startYear + ' - ' + endDay + ' ' + endMonth + ' ' + endYear;
		}
	}

, formatPrice = function(price) {
		price = price.toString().replace(/(\d+)(\d\d\d)($|\.\d\d)/, '$1,$2$3');
		if (price.match(/\.\d+/) === null) {
			price += '.00';
		}
		return '£' + price;
	}

, priceOptions = function(offers, date, lastBookingDate, soldOut) {
		var minFinalPrice
		,   countFinalPrice = 0
		,   minCurrentPrice
		,   currentPriceEndDate
		,   countCurrentPrice = 0
		,   formattedPrice = ''
		;
		$(offers).each(function () {
			var offer = this
			,   price = offer.price
			,   until = new Date(offer.validThrough)
			;
			if (soldOut || (offer.inventoryLevel > 0 && until.toString() === lastBookingDate.toString())) {
				countFinalPrice++;
				if (minFinalPrice === undefined || minFinalPrice > price) {
					minFinalPrice = price;
				}
			}
			if (offer.inventoryLevel > 0 && until > date) {
				if (currentPriceEndDate === undefined || currentPriceEndDate > until) {
					minCurrentPrice = price;
					currentPriceEndDate = until;
					countCurrentPrice = 1;
				} else if (currentPriceEndDate.toString() === until.toString()) {
					countCurrentPrice++;
					if (minCurrentPrice === undefined || minCurrentPrice > price) {
						minCurrentPrice = price;
					}
				}
			}
		});
		// generate the formatted price
		if (minCurrentPrice < minFinalPrice) {
			formattedPrice = '<strike>' + (countFinalPrice > 1 ? 'from ' : '') + formatPrice(minFinalPrice) + '</strike> ';
			formattedPrice += '<em>' + (countCurrentPrice > 1 ? 'from ' : '') + formatPrice(minCurrentPrice) + ' (until ' + currentPriceEndDate.getDate() + ' ' + currentPriceEndDate.toString().substr(4, 3) + ')</em>';
		} else if (countFinalPrice > 1) {
			formattedPrice = 'from ' + formatPrice(minFinalPrice);
		} else {
			formattedPrice = formatPrice(minFinalPrice);
		}
		return formattedPrice;
	}

,	eventTable = function(ids, events, date) {
		var table = ''
		,   eventList = []
		;

		// create a list of the events that we want to list
		$(ids).each(function () {
			var id = this
			,   event = events[id]
			;
			if (event !== undefined) {
				event['@id'] = id;
				eventList.push(event);
			}
			return true;
		});

		// create the table
		table += '<table class="table">';
		table += '<thead><tr><th>Course Date</th><th>Location</th><th>Price</th><th></th></tr></thead>';
		table += '<tbody>';
		if (eventList.length === 0) {
			table += '<tr><td colspan="4">This course is not scheduled to run again soon</td></tr>';
		} else {
			$(eventList).each(function () {
				var event = this
				,   soldOut = true
				,   lastBookingDate
				;
				$(event.offers).each(function () {
					var offer = this
					,   until = offer.validThrough !== undefined ? new Date(offer.validThrough) : undefined
					;
					if (offer.inventoryLevel > 0) {
						soldOut = false;
					}
					if (lastBookingDate === undefined || until > lastBookingDate) {
						lastBookingDate = until
					}
					return true;
				});
				table += '<tr>';
				table += '<td>' + dateRange(event.startDate, event.endDate) + '</td>';
				table += '<td>' + event.location.name + '</td>';
				table += '<td>' + priceOptions(event.offers, date, lastBookingDate, soldOut) + '</td>';
				table += '<td>' + (soldOut ? 'Sold Out' : '<a href="' + event['@id'] + '" class="btn btn-primary">Book Now</a>') + '</td>';
				table += '</tr>';
				return true;
			});
		}
		table += '</tbody>';
		table += '</table>';
		return table;
	}
;