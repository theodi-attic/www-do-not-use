www
===

Partial source code for the ODI Web site.

Features and Courses
--------------------

How to setup the stuff arising from [this issue](https://github.com/theodi/open-orgn-services/issues/16):

Assume you're logged in as ```odi```, in ```/home/odi```, then:

    mkdir git
    git clone -b 14-02-2013 git://github.com/theodi/www.git
    sudo ln -s /home/odi/git/www/drupal-features/courses/ /home/odi/odi/www/sites/all/modules/courses/
    sudo ln -s /home/odi/git/www/drupal-features/course_list/ /home/odi/odi/www/sites/all/modules/

Then on the drupal admin interface:

* Under 'Structure -> Features', check the boxes next to 'Course List' and 'Courses', and 'Save settings'
* On the following screen, leave everything enabled

You should now be able to create Course Types and Course Instances.

Styling
-------

The CSS is managed using LESS. This requires `node.js` and `lessc` to be installed on the box like so:

	# Installs Node
	
	sudo apt-get install python-software-properties python g++ make
	sudo add-apt-repository ppa:chris-lea/node.js
	sudo apt-get update
	sudo apt-get install nodejs npm
	
	# Installs lessc
	
	sudo npm install -g less

To compile to the css directory, run `lessc` from the styling directory like so:

	lessc odi.less > /home/odi/odi/www/sites/all/themes/odi/css/odi.css
	

Then clear the cache and you should be good to go!

These instructions _will_ change as we migrate the website stuff from Hg to Git.

License
-------

This code is open source under the MIT license. See the LICENSE.md file for 
full details.
