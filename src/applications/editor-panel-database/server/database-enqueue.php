<?php
/**
 * DragBlock's Editor-panel-database.
 *
 * @package Database enqueue
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
add_action( 'enqueue_block_editor_assets', 'dragblock_database_panel_editor_assets' );
/**
 * Check Documentation#13
 */
function dragblock_database_panel_editor_assets() {
	$dragblock_de_panel = 'database';
	dragblock_enqueue( "dragblock-{$dragblock_de_panel}-panel", "build/applications/editor-panel-{$dragblock_de_panel}/client/index.js", array( DRAGBLOCK_EDITOR_INIT_SLUG ) );
	dragblock_enqueue( "dragblock-{$dragblock_de_panel}-panel", "build/applications/editor-panel-{$dragblock_de_panel}/client/index.css" );
}
