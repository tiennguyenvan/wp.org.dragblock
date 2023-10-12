<?php
/**
 * DragBlock's Form-entries.
 *
 * @package Form enqueues
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
add_action( 'wp_enqueue_scripts', 'dragblock_form_front_scripts' );
/**
 * Check Documentation#33
 */
function dragblock_form_front_scripts() {
	global $dragblock_form_script_required;
	if ( ! $dragblock_form_script_required ) {
		return;
	}
	// dev-reply#313.
	dragblock_enqueue( DRAGBLOCK_FORM_ENTRY, 'build/applications/form-entries/client/index.js', array( 'jquery' ) );
	// dev-reply#317.
	wp_add_inline_script( DRAGBLOCK_FORM_ENTRY, 'var DRAG_BLOCK_FORM_NONCE_ACTION ="' . esc_js( wp_create_nonce( 'dragblock/form-nonce-action' ) ) . '"', 'before' );
	// dev-reply#321.
	if ( ! session_id() ) {
		session_start();
	}
	// dev-reply#327.
	$dragblock_fe_dragblock = uniqid();
	$_SESSION[ $dragblock_fe_dragblock ] = time();
	wp_add_inline_script( DRAGBLOCK_FORM_ENTRY, 'var DRAG_BLOCK_FORM_SESSION_TOKEN ="' . $dragblock_fe_dragblock . '"', 'before' );
}
add_action( 'admin_enqueue_scripts', 'dragblock_form_admin_scripts' );
/**
 * Check Documentation#323
 */
function dragblock_form_admin_scripts() {
	global $pagenow;
	// dev-reply#342.
	if ( 'edit.php' === $pagenow && isset( $_GET['post_type'] ) && DRAGBLOCK_FORM_ENTRY === $_GET['post_type'] ) {
		dragblock_enqueue( DRAGBLOCK_FORM_ENTRY, 'build/applications/form-entries/client/index.css' );
	}
}
