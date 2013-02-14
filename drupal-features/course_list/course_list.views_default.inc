<?php
/**
 * @file
 * course_list.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function course_list_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'course_list';
  $view->description = 'A view showing all listed courses (Course Types)';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Course List';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Courses';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '20';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  /* Sort criterion: Content: Title */
  $handler->display->display_options['sorts']['title']['id'] = 'title';
  $handler->display->display_options['sorts']['title']['table'] = 'node';
  $handler->display->display_options['sorts']['title']['field'] = 'title';
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'course_type' => 'course_type',
  );

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'page');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['header'] = FALSE;
  /* Header: Global: Text area */
  $handler->display->display_options['header']['area']['id'] = 'area';
  $handler->display->display_options['header']['area']['table'] = 'views';
  $handler->display->display_options['header']['area']['field'] = 'area';
  $handler->display->display_options['header']['area']['label'] = 'Introduction';
  $handler->display->display_options['header']['area']['empty'] = TRUE;
  $handler->display->display_options['header']['area']['content'] = '<p>ODI is committed to providing world class training in the area of Open and Linked Data Technologies. The following courses are offered:</p>';
  $handler->display->display_options['header']['area']['format'] = 'filtered_html';
  $handler->display->display_options['path'] = 'courses';
  $export['course_list'] = $view;

  $view = new view();
  $view->name = 'upcoming_courses';
  $view->description = 'A view showing all the course instances of a particular type';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Upcoming courses';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Upcoming dates';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '10';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  /* Field: Content: Start/End Date/Time */
  $handler->display->display_options['fields']['field_startend_datetime']['id'] = 'field_startend_datetime';
  $handler->display->display_options['fields']['field_startend_datetime']['table'] = 'field_data_field_startend_datetime';
  $handler->display->display_options['fields']['field_startend_datetime']['field'] = 'field_startend_datetime';
  $handler->display->display_options['fields']['field_startend_datetime']['label'] = '';
  $handler->display->display_options['fields']['field_startend_datetime']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_startend_datetime']['settings'] = array(
    'format_type' => 'just_date',
    'fromto' => 'value',
    'multiple_number' => '',
    'multiple_from' => '',
    'multiple_to' => '',
  );
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Contextual filter: Content: Course Type (field_course_type) */
  $handler->display->display_options['arguments']['field_course_type_target_id']['id'] = 'field_course_type_target_id';
  $handler->display->display_options['arguments']['field_course_type_target_id']['table'] = 'field_data_field_course_type';
  $handler->display->display_options['arguments']['field_course_type_target_id']['field'] = 'field_course_type_target_id';
  $handler->display->display_options['arguments']['field_course_type_target_id']['default_action'] = 'default';
  $handler->display->display_options['arguments']['field_course_type_target_id']['default_argument_type'] = 'node';
  $handler->display->display_options['arguments']['field_course_type_target_id']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['field_course_type_target_id']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['field_course_type_target_id']['summary_options']['items_per_page'] = '25';
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'course_instance' => 'course_instance',
  );
  /* Filter criterion: Content: Start/End Date/Time -  start date (field_startend_datetime) */
  $handler->display->display_options['filters']['field_startend_datetime_value']['id'] = 'field_startend_datetime_value';
  $handler->display->display_options['filters']['field_startend_datetime_value']['table'] = 'field_data_field_startend_datetime';
  $handler->display->display_options['filters']['field_startend_datetime_value']['field'] = 'field_startend_datetime_value';
  $handler->display->display_options['filters']['field_startend_datetime_value']['operator'] = '>=';
  $handler->display->display_options['filters']['field_startend_datetime_value']['default_date'] = 'today';

  /* Display: Block */
  $handler = $view->new_display('block', 'Block', 'block');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $export['upcoming_courses'] = $view;

  return $export;
}