<?php
/**
 * DragBlock's Editor-panel-attributes.
 *
 * @package Attributes enqueue
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
add_action( 'enqueue_block_editor_assets', 'dragblock_attributes_panel_editor_assets' );
/**
 * Check Documentation#13
 */
function dragblock_attributes_panel_editor_assets() {
	$dragblock_ae_panel = 'attributes';
	dragblock_enqueue( "dragblock-{$dragblock_ae_panel}-panel", "build/applications/editor-panel-{$dragblock_ae_panel}/client/index.js", array( DRAGBLOCK_EDITOR_INIT_SLUG ) );
	dragblock_enqueue( "dragblock-{$dragblock_ae_panel}-panel", "build/applications/editor-panel-{$dragblock_ae_panel}/client/index.css" );
}
