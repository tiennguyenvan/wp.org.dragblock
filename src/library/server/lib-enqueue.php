<?php
/**
 * DragBlock's Library.
 *
 * @package Lib enqueue
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
/**
 * Check Documentation#32
 *
 * @param object|array|string $dragblock_le_handle check var-def#32.
 * @param object|array|string $dragblock_le_path check var-def#32.
 * @param object|array|string $dragblock_le_dep check var-def#32.
 */
function dragblock_enqueue_register( $dragblock_le_handle, $dragblock_le_path, $dragblock_le_dep = null ) {
	// dev-reply#39.
	if ( strpos( $dragblock_le_path, '.js' ) ) {
		wp_register_script(
			$dragblock_le_handle,
			DRAGBLOCK_URL . $dragblock_le_path,
			$dragblock_le_dep,
			DRAGBLOCK_VERSION,
			true
		);
	} else {
		wp_register_style(
			$dragblock_le_handle,
			DRAGBLOCK_URL . $dragblock_le_path,
			$dragblock_le_dep,
			DRAGBLOCK_VERSION
		);
	}
}
/**
 * Check Documentation#324
 *
 * @param object|array|string $dragblock_le_handle check var-def#324.
 * @param object|array|string $dragblock_le_path check var-def#324.
 * @param object|array|string $dragblock_le_dep check var-def#324.
 */
function dragblock_enqueue( $dragblock_le_handle, $dragblock_le_path, $dragblock_le_dep = null ) {
	dragblock_enqueue_register( $dragblock_le_handle, $dragblock_le_path, $dragblock_le_dep );
	// dev-reply#336.
	if ( strpos( $dragblock_le_path, '.js' ) ) {
		wp_enqueue_script( $dragblock_le_handle );
	} else {
		wp_enqueue_style( $dragblock_le_handle );
	}
}
