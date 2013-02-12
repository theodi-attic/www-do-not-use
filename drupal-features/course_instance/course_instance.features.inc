<?php
/**
 * @file
 * course_instance.features.inc
 */

/**
 * Implements hook_node_info().
 */
function course_instance_node_info() {
  $items = array(
    'course_instance' => array(
      'name' => t('Course Instance'),
      'base' => 'node_content',
      'description' => t('An instance of a training or educational course.'),
      'has_title' => '1',
      'title_label' => t('Course Instance Description (e.g. Course Name and Date)'),
      'help' => '',
    ),
  );
  return $items;
}
