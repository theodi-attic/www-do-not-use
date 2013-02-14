www
===

Partial source code for the ODI Web site.

Features and Courses
--------------------

How to setup the stuff arising from [this issue](https://github.com/theodi/open-orgn-services/issues/16):

    mkdir git
    git clone -b 14-02-2013 git://github.com/theodi/www.git
    sudo ln -s /home/odi/git/www/drupal-features/courses/ /home/odi/odi/www/sites/all/modules/courses/
    sudo ln -s /home/odi/git/www/drupal-features/course_list/ /home/odi/odi/www/sites/all/modules/

Then on the drupal admin interface:

* Under 'Structure -> Features', check the boxes next to 'Course List' and 'Courses', and 'Save settings'
* On the following screen, leave everything enabled

You should now be able to create Course Types and Course Instances.

These instructions _will_ change as we migrate the website stuff from Hg to Git.

License
-------

This code is open source under the MIT license. See the LICENSE.md file for 
full details.
