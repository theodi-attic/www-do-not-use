<?php
/**
 * @file
 * course.features.inc
 */

/**
 * Implements hook_node_info().
 */
function course_node_info() {
  $items = array(
    'course' => array(
      'name' => t('Course'),
      'base' => 'node_content',
      'description' => t('A training or educational course.'),
      'has_title' => '1',
      'title_label' => t('Course Title'),
      'help' => '',
    ),
  );
  return $items;
}
