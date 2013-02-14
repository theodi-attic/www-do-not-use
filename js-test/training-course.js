module('table generation');

test('no events', function () {
	var events = {}
	,   ids = {}
	,		$eventTable = $(eventTable(ids, events, new Date('2013-02-13')))
	;
	ok($eventTable.is('table'), 'eventTable() returns a table');
	equal($eventTable.attr('class'), 'table', 'the table has a class of .table');
	ok($eventTable.find('thead').is('thead'), 'the table contains a thead');
	equal($eventTable.find('thead tr').length, 1, 'the thead has a single row');
	equal($eventTable.find('thead tr th').length, 5, 'the thead has four columns');
	equal($eventTable.find('thead tr th:eq(0)').text(), 'Course Date', 'the first column is entitled "Course Date"');
	equal($eventTable.find('thead tr th:eq(1)').text(), 'Location', 'the second column is entitled "Location"');
	equal($eventTable.find('thead tr th:eq(2)').text(), 'Price', 'the third columns is entitled "Price"');
	equal($eventTable.find('thead tr th:eq(3)').text(), '', 'the fourth column has no title');
	equal($eventTable.find('thead tr th:eq(4)').text(), '', 'the final column has no title');
	ok($eventTable.find('tbody').is('tbody'), 'the table contains a tbody');
	equal($eventTable.find('tbody tr').length, 1, 'the tbody has a single row');
	equal($eventTable.find('tbody tr td').length, 1, 'the row has a single cell');
	equal($eventTable.find('tbody tr td').attr('colspan'), '5', 'the cell should span all four columns');
	equal($eventTable.find('tbody tr td').text(), 'This course is not scheduled to run again soon');
});

test('single matched event', function () {
	var events = {
  	"http://dummy.eventbrite.co.uk/": {
	      "@type": "http://schema.org/Event",
	      "startDate": "2013-04-29T09:00:00",
	      "endDate": "2013-05-01T17:00:00",
	      "location": {
	        "@type": "http://schema.org/Place",
	        "name": "Covent Garden, London"
	      },
	      "offers": [{
	        "@type": "http://schema.org/Offer",
	        "name": "Standard Registration",
	        "price": 1395.00,
	        "priceCurrency": "GBP",
	        "validFrom": "2013-03-29",
	        "validThrough": "2013-04-28",
	        "inventoryLevel": 13
	      }, {
	        "@type": "http://schema.org/Offer",
	        "name": "Early-Bird Registration",
	        "price": 1255.00,
	        "priceCurrency": "GBP",
	        "validThrough": "2013-03-29",
	        "inventoryLevel": 13
	      }]
    	}
		}
	, ids = ['http://dummy.eventbrite.co.uk/']
	, date = new Date('2013-02-13')
	, $eventTable = $(eventTable(ids, events, date));
	;
	equal($eventTable.find('tbody tr').length, 1, 'the tbody has a single row');
	equal($eventTable.find('tbody tr td').length, 4, 'the row has four cells');
	equal($eventTable.find('tbody tr td:eq(0)').text(), '29 Apr - 1 May 2013');
	equal($eventTable.find('tbody tr td:eq(1)').text(), 'Covent Garden, London');
	equal($eventTable.find('tbody tr td:eq(2)').text(), '£1,395.00 £1,255.00 (until 29 Mar)');
	equal($eventTable.find('tbody tr td:eq(2) strike').text(), '£1,395.00');
	equal($eventTable.find('tbody tr td:eq(2) em').text(), '£1,255.00 (until 29 Mar)');
	equal($eventTable.find('tbody tr td:eq(3) a').attr('href'), 'http://dummy.eventbrite.co.uk/');
	equal($eventTable.find('tbody tr td:eq(3) a').attr('class'), 'btn btn-primary');
	equal($eventTable.find('tbody tr td:eq(3) a').text(), 'Book Now');
});

test('sold out event', function () {
	var events = {
  	"http://dummy.eventbrite.co.uk/": {
	      "@type": "http://schema.org/Event",
	      "startDate": "2013-04-29T09:00:00",
	      "endDate": "2013-05-01T17:00:00",
	      "location": {
	        "@type": "http://schema.org/Place",
	        "name": "Covent Garden, London"
	      },
	      "offers": [{
	        "@type": "http://schema.org/Offer",
	        "name": "Standard Registration",
	        "price": 1395.00,
	        "priceCurrency": "GBP",
	        "validFrom": "2013-03-29",
	        "validThrough": "2013-04-28",
	        "inventoryLevel": 0
	      }, {
	        "@type": "http://schema.org/Offer",
	        "name": "Early-Bird Registration",
	        "price": 1255.00,
	        "priceCurrency": "GBP",
	        "validThrough": "2013-03-29",
	        "inventoryLevel": 0
	      }]
    	}
		}
	, ids = ['http://dummy.eventbrite.co.uk/']
	, date = new Date('2013-02-13')
	, $eventTable = $(eventTable(ids, events, date));
	;
	equal($eventTable.find('tbody tr').length, 1, 'the tbody has a single row');
	equal($eventTable.find('tbody tr td:eq(2)').text(), 'from £1,255.00');
	equal($eventTable.find('tbody tr td:eq(3)').text(), 'Sold Out');
});

test('multiple matched events', function () {
	var events = {
  	"http://dummy1.eventbrite.co.uk/": {
	      "@type": "http://schema.org/Event",
	      "startDate": "2013-04-29T09:00:00",
	      "endDate": "2013-05-01T17:00:00",
	      "location": {
	        "@type": "http://schema.org/Place",
	        "name": "Covent Garden, London"
	      },
	      "offers": [{
	        "@type": "http://schema.org/Offer",
	        "name": "Standard Registration",
	        "price": 1395.00,
	        "priceCurrency": "GBP",
	        "validFrom": "2013-03-29",
	        "validThrough": "2013-04-28",
	        "inventoryLevel": 13
	      }, {
	        "@type": "http://schema.org/Offer",
	        "name": "Early-Bird Registration",
	        "price": 1255.00,
	        "priceCurrency": "GBP",
	        "validThrough": "2013-03-29",
	        "inventoryLevel": 13
	      }]
    	}
  	, "http://dummy2.eventbrite.co.uk/": {
	      "@type": "http://schema.org/Event",
	      "startDate": "2013-06-10T09:00:00",
	      "endDate": "2013-06-12T17:00:00",
	      "location": {
	        "@type": "http://schema.org/Place",
	        "name": "Clerkenwell, London"
	      },
	      "offers": [{
	        "@type": "http://schema.org/Offer",
	        "name": "Standard Registration",
	        "price": 1395.00,
	        "priceCurrency": "GBP",
	        "validFrom": "2013-05-13",
	        "validThrough": "2013-06-09",
	        "inventoryLevel": 13
	      }, {
	        "@type": "http://schema.org/Offer",
	        "name": "Early-Bird Registration",
	        "price": 1255.00,
	        "priceCurrency": "GBP",
	        "validThrough": "2013-05-13",
	        "inventoryLevel": 13
	      }]
    	}
		}
	, ids = ['http://dummy1.eventbrite.co.uk/', 'http://dummy2.eventbrite.co.uk/']
	, date = new Date('2013-02-13')
	, $eventTable = $(eventTable(ids, events, date));
	;
	equal($eventTable.find('tbody tr').length, 2, 'the tbody has two rows');
	equal($eventTable.find('tbody tr:eq(0) td:eq(0)').text(), '29 Apr - 1 May 2013');
	equal($eventTable.find('tbody tr:eq(0) td:eq(1)').text(), 'Covent Garden, London');
	equal($eventTable.find('tbody tr:eq(0) td:eq(2)').text(), '£1,395.00 £1,255.00 (until 29 Mar)');
	equal($eventTable.find('tbody tr:eq(0) td:eq(3) a').attr('href'), 'http://dummy1.eventbrite.co.uk/');
	equal($eventTable.find('tbody tr:eq(1) td:eq(0)').text(), '10-12 Jun 2013');
	equal($eventTable.find('tbody tr:eq(1) td:eq(1)').text(), 'Clerkenwell, London');
	equal($eventTable.find('tbody tr:eq(1) td:eq(2)').text(), '£1,395.00 £1,255.00 (until 13 May)');
	equal($eventTable.find('tbody tr:eq(1) td:eq(3) a').attr('href'), 'http://dummy2.eventbrite.co.uk/');
});

module('date range formatting');

test('date range formatting', function () {
	equal(dateRange('2013-01-01T09:00:00', '2013-01-03T17:00:00'), '1-3 Jan 2013');
	equal(dateRange('2013-01-31T09:00:00', '2013-02-01T17:00:00'), '31 Jan - 1 Feb 2013');
	equal(dateRange('2013-12-31T09:00:00', '2014-01-02T17:00:00'), '31 Dec 2013 - 2 Jan 2014');
	equal(dateRange('2013-01-01T09:00:00', '2013-01-01T17:00:00'), '1 Jan 2013');
});

module('price formatting');

test('single price', function () {
	var offers = [{
			"@type": "http://schema.org/Offer",
			"name": "Registration",
			"price": 1255.00,
			"priceCurrency": "GBP",
      "validThrough": "2013-04-28",
			"inventoryLevel": 13
		}]
	;
	equal(priceOptions(offers, new Date('2013-02-13'), new Date('2013-04-28'), false), '£1,255.00');
});

test('member price', function () {
	var offers = [{
			"@type": "http://schema.org/Offer",
			"name": "Member Registration",
			"price": 360.75,
			"priceCurrency": "GBP",
      "validThrough": "2013-04-28",
			"inventoryLevel": 34
		}, {
			"@type": "http://schema.org/Offer",
			"name": "Standard Registration",
			"price": 570.32,
			"priceCurrency": "GBP",
      "validThrough": "2013-04-28",
			"inventoryLevel": 34
		}]
	;
	equal(priceOptions(offers, new Date('2013-02-13'), new Date('2013-04-28'), false), 'from £360.75');
});

test('early-bird prices', function () {
	var offers = [{
			"@type": "http://schema.org/Offer",
			"name": "Standard Registration",
			"price": 1395.00,
			"priceCurrency": "GBP",
			"validFrom": "2013-03-29",
      "validThrough": "2013-04-28",
			"inventoryLevel": 13
		}, {
			"@type": "http://schema.org/Offer",
			"name": "Early-Bird Registration",
			"price": 1255.00,
			"priceCurrency": "GBP",
			"validThrough": "2013-03-29",
			"inventoryLevel": 13
		}]
	;
	equal(priceOptions(offers, new Date('2013-02-28'), new Date('2013-04-28'), false), '<strike>£1,395.00</strike> <em>£1,255.00 (until 29 Mar)</em>');
	equal(priceOptions(offers, new Date('2013-03-29'), new Date('2013-04-28'), false), '£1,395.00');
	equal(priceOptions(offers, new Date('2013-04-05'), new Date('2013-04-28'), false), '£1,395.00');
});

test('sold-out early-bird prices', function () {
	var offers = [{
			"@type": "http://schema.org/Offer",
			"name": "Standard Registration",
			"price": 1395.00,
			"priceCurrency": "GBP",
      "validThrough": "2013-04-28",
			"inventoryLevel": 13
		}, {
			"@type": "http://schema.org/Offer",
			"name": "Early-Bird Registration",
			"price": 1255.00,
			"priceCurrency": "GBP",
      "validThrough": "2013-04-28",
			"inventoryLevel": 0
		}]
	;
	equal(priceOptions(offers, new Date('2013-02-28'), new Date('2013-04-28'), false), '£1,395.00');
});
