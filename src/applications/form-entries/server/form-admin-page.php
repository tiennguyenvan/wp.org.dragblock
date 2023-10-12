<?php
/**
 * DragBlock's Form-entries.
 *
 * @package Form admin page
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
add_action( 'admin_menu', 'dragblock_admin_menu_form_entries' );
/**
 * Check Documentation#73
 */
function dragblock_admin_menu_form_entries() {
	add_submenu_page(
		DRAGBLOCK_ADMIN_MENU_SLUG,
		esc_html__( 'DragBlock - Form Entries', 'dragblock' ),
		esc_html__( 'Form Entries', 'dragblock' ),
		'manage_options',
		'edit.php?post_type=' . DRAGBLOCK_FORM_ENTRY,
		''
	);
}
add_filter( 'manage_' . DRAGBLOCK_FORM_ENTRY . '_posts_columns', 'dragblock_manage_posts_columns_form_entries' );
/**
 * Check Documentation#715
 *
 * @param object|array|string $dragblock_fap_columns check var-def#715.
 */
function dragblock_manage_posts_columns_form_entries( $dragblock_fap_columns ) {
	unset( $dragblock_fap_columns['date'] );
	$dragblock_fap_columns['content'] = esc_html__( 'Content', 'dragblock' );
	$dragblock_fap_columns['referrer'] = esc_html__( 'Referrer', 'dragblock' );
	$dragblock_fap_columns['email'] = esc_html__( 'Emailed', 'dragblock' );
	$dragblock_fap_columns['date'] = esc_html__( 'Date', 'dragblock' );
	return $dragblock_fap_columns;
}
add_action( 'manage_' . DRAGBLOCK_FORM_ENTRY . '_posts_custom_column', 'dragblock_manage_posts_custom_column_form_entries', 10, 2 );
/**
 * Check Documentation#725
 *
 * @param object|array|string $dragblock_fap_column check var-def#725.
 * @param object|array|string $dragblock_fap_post check var-def#725.
 */
function dragblock_manage_posts_custom_column_form_entries( $dragblock_fap_column, $dragblock_fap_post ) {
	if ( 'content' === $dragblock_fap_column ) {
		echo wp_kses(
			get_the_content( $dragblock_fap_post ),
			array(
				'strong' => array(),
				'p' => array(),
			)
		);
		return;
	}
	if ( 'referrer' === $dragblock_fap_column ) {
		$dragblock_fap_id = get_post_meta( $dragblock_fap_post, DRAGBLOCK_FORM_ENTRY . '--_wp_http_referer', true );
		$dragblock_fap_referrer = '<a target="_blank" href="' . esc_url( $dragblock_fap_id ) . '">' . esc_html( $dragblock_fap_id ) . '</a>';
		echo wp_kses(
			$dragblock_fap_referrer,
			array(
				'a' => array(
					'target' => array(),
					'href' => array(),
				),
			)
		);
		return;
	}
	if ( 'email' === $dragblock_fap_column ) {
		$dragblock_fap_html = get_post_meta( $dragblock_fap_post, DRAGBLOCK_FORM_ENTRY . '-failed-email', true );
		if ( 'PASSED' === $dragblock_fap_html ) {
			echo wp_kses(
				'<span class="dragblock-form-emailed-successful">' . esc_html__( 'SENT', 'dragblock' ) . '</span>',
				array(
					'span' => array(
						'class' => array(),
					),
				)
			);
		} elseif ( ! $dragblock_fap_html ) {
			echo wp_kses(
				'<strong class="dragblock-form-emailed-local">' . esc_html__( 'LOCAL', 'dragblock' ) . '</strong>',
				array(
					'strong' => array(
						'class' => array(),
					),
				)
			);
		} else {
			echo wp_kses(
				'<strong class="dragblock-form-emailed-failed">' . esc_html__( 'FAILED', 'dragblock' ) . '</strong>',
				array(
					'strong' => array(
						'class' => array(),
					),
				)
			);
		}
		return;
	}
}
