<?php
/**
 * DragBlock's Form-entries.
 *
 * @package Form submission
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
// dev-reply#124.
add_action( 'init', 'dragblock_form_submission', 1 );
// dev-reply#126.
/**
 * Check Documentation#125
 */
function dragblock_form_submission() {
	// dev-reply#1213.
	if (
		empty( $_POST['dragblock/form-nonce-field'] ) ||
		! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['dragblock/form-nonce-field'] ) ), 'dragblock/form-nonce-action' )
	) {
		return;
	}
	// dev-reply#1221.
	if (
		// dev-reply#1225.
		! isset( $_POST['dragblock/form-title'] ) ||
		// dev-reply#1228.
		! empty( $_POST['dragblock/form-title'] ) ||
		// dev-reply#1231.
		empty( $_POST['dragblock/form-session-token'] )
	) {
		return;
	}
	// dev-reply#1238.
	if ( ! session_id() ) {
		session_start();
	}
	// dev-reply#1244.
	$dragblock_fs_ = sanitize_text_field( wp_unslash( $_POST['dragblock/form-session-token'] ) );
	if ( empty( $_SESSION[ $dragblock_fs_ ] ) ) {
		return;
	}
	$dragblock_fs_post = sanitize_text_field( wp_unslash( $_SESSION[ $dragblock_fs_ ] ) );
	// dev-reply#1251.
	if ( ! $dragblock_fs_post || time() - $dragblock_fs_post < 1 ) {
		return;
	}
	// dev-reply#1256.
	$dragblock_fs_unique = '';
	if ( isset( $_POST['dragblock/form-client-id'] ) ) {
		$dragblock_fs_unique = sanitize_text_field( wp_unslash( $_POST['dragblock/form-client-id'] ) );
	} else {
		$dragblock_fs_unique = 'dragblock-form-unorganized';
	}
	// dev-reply#1265.
	unset( $_POST['dragblock/form-client-id'] );
	unset( $_POST['dragblock/form-nonce-field'] );
	unset( $_POST['dragblock/form-session-token'] );
	unset( $_POST['dragblock/form-title'] );
	unset( $_POST['submit'] );
	// dev-reply#1273.
	global $dragblock_form_entries_message_error;
	$dragblock_form_entries_message_error[ $dragblock_fs_unique ] = false; // dev-reply#1275.
	$dragblock_fs_id = get_transient( 'dragblock/form-transient-' . $dragblock_fs_unique );
	$dragblock_fs_session = array();
	foreach ( $_POST as $dragblock_fs_createdformtime => $dragblock_fs_formclientid ) {
		$dragblock_fs_session[ sanitize_text_field( $dragblock_fs_createdformtime ) ] = sanitize_textarea_field( wp_unslash( $dragblock_fs_formclientid ) );
	}
	$dragblock_fs_dragblock = sha1( http_build_query( $dragblock_fs_session ) );
	if ( ( $dragblock_fs_id ) === $dragblock_fs_dragblock ) {
		set_transient( 'dragblock/form-transient-' . $dragblock_fs_unique, $dragblock_fs_dragblock, 3600 );
		$dragblock_form_entries_message_error[ $dragblock_fs_unique ] = esc_html__( 'Duplicate submission', 'dragblock' );
		return;
	}
	set_transient( 'dragblock/form-transient-' . $dragblock_fs_unique, $dragblock_fs_dragblock, 3600 );
	// dev-reply#1293.
	$dragblock_fs_form = wp_insert_post(
		array(
			'post_content'  => '',
			'post_status'   => 'publish',
			'post_type'     => DRAGBLOCK_FORM_ENTRY,
		)
	);
	if ( is_wp_error( $dragblock_fs_form ) ) {
		// dev-reply#12103.
		$dragblock_form_entries_message_error[ $dragblock_fs_unique ] = $dragblock_fs_form->get_error_message();
		return;
	}
	$dragblock_fs_entries = '';
	$dragblock_fs_message = ucwords( str_replace( '-', ' ', sanitize_title( $dragblock_fs_unique ) ) ) . ': #' . $dragblock_fs_form;
	$dragblock_fs_error = array();
	foreach ( $dragblock_fs_session as $dragblock_fs_createdformtime => $dragblock_fs_formclientid ) {
		// dev-reply#12144.
		if ( strpos( $dragblock_fs_createdformtime, '__dragblock_wp_reseved_terms' ) !== false ) {
			$dragblock_fs_createdformtime = str_replace( '__dragblock_wp_reseved_terms', '', $dragblock_fs_createdformtime );
		}
		if ( '_wp_http_referer' !== $dragblock_fs_createdformtime ) {
			$dragblock_fs_entries .= '<p><strong>' . esc_html( $dragblock_fs_createdformtime ) . ':</strong> ' . esc_html( $dragblock_fs_formclientid ) . '</p>';
		}
		array_push( $dragblock_fs_error, $dragblock_fs_createdformtime );
		// dev-reply#12154.
		update_post_meta( $dragblock_fs_form, DRAGBLOCK_FORM_ENTRY . '--' . $dragblock_fs_createdformtime, $dragblock_fs_formclientid );
	}
	// dev-reply#12158.
	update_post_meta( $dragblock_fs_form, DRAGBLOCK_FORM_ENTRY . '-keys', $dragblock_fs_error );
	wp_update_post(
		array(
			'ID' => $dragblock_fs_form,
			'post_title' => $dragblock_fs_message,
			'post_content' => $dragblock_fs_entries,
		)
	);
	// dev-reply#12171.
	$dragblock_fs_transienthash = get_option( 'admin_email' );
	$dragblock_fs_sanitized = array( 'Content-Type: text/html; charset=UTF-8' );
	$dragblock_fs_key = get_bloginfo( 'name' ) . ' - DragBlock Form – ' . $dragblock_fs_message;
	if ( DRAGBLOCK_IS_LOCAL ) {
		return;
	}
	// dev-reply#12184.
	if ( ! wp_mail( $dragblock_fs_transienthash, $dragblock_fs_key, $dragblock_fs_entries, $dragblock_fs_sanitized ) ) {
		// dev-reply#12187.
		update_post_meta( $dragblock_fs_form, DRAGBLOCK_FORM_ENTRY . '-failed-email', time() );
		return;
	}
	update_post_meta( $dragblock_fs_form, DRAGBLOCK_FORM_ENTRY . '-failed-email', 'PASSED' );
	// dev-reply#12193.
}
