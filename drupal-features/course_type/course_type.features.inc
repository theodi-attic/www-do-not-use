<?php
/**
 * @file
 * course_type.features.inc
 */

/**
 * Implements hook_node_info().
 */
function course_type_node_info() {
  $items = array(
    'course_type' => array(
      'name' => t('Course Type'),
      'base' => 'node_content',
      'description' => t('A type of training or educational course.'),
      'has_title' => '1',
      'title_label' => t('Course Title'),
      'help' => '',
    ),
  );
  return $items;
}
