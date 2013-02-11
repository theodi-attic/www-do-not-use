<?php
/**
 * @file
 * toms_type_00.features.inc
 */

/**
 * Implements hook_node_info().
 */
function toms_type_00_node_info() {
  $items = array(
    'toms_type_00' => array(
      'name' => t('Toms Type 00'),
      'base' => 'node_content',
      'description' => t('Tom\'s first test content type'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  return $items;
}
