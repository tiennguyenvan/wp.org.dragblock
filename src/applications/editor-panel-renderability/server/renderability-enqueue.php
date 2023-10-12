<?php
/**
 * DragBlock's Editor-panel-renderability.
 *
 * @package Renderability enqueue
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
add_action( 'enqueue_block_editor_assets', 'dragblock_renderability_panel_editor_assets' );
/**
 * Check Documentation#13
 */
function dragblock_renderability_panel_editor_assets() {
	$dragblock_re_panel = 'renderability';
	dragblock_enqueue( "dragblock-{$dragblock_re_panel}-panel", "build/applications/editor-panel-{$dragblock_re_panel}/client/index.js", array( DRAGBLOCK_EDITOR_INIT_SLUG ) );
	dragblock_enqueue( "dragblock-{$dragblock_re_panel}-panel", "build/applications/editor-panel-{$dragblock_re_panel}/client/index.css" );
}
