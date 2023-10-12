<?php
/**
 * DragBlock's Font-library.
 *
 * @package Class dragblock font form messages
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
/**
 * Check class-def#132
 */
class DragBlock_Font_Form_Messages {
	/**
	 * Check Documentation#134
	 */
	public static function admin_notice_embed_font_success() {
		// dev-reply#137.
		$dragblock_cdffm_theme = wp_get_theme()->get( 'Name' );
		$dragblock_cdffm_name = '';
		if (
			! empty( $_POST['nonce'] ) &&
			wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['nonce'] ) ), 'dragblock_font_library' ) &&
			isset( $_POST['selection-data'] )
		) {
			$dragblock_cdffm_font = json_decode( sanitize_text_field( wp_unslash( $_POST['selection-data'] ) ), true );
			if ( ! empty( $dragblock_cdffm_font ) ) {
				$dragblock_cdffm_family = array();
				foreach ( $dragblock_cdffm_font as $dragblock_cdffm_name ) {
					$dragblock_cdffm_family[] = $dragblock_cdffm_name['family'];
				}
				$dragblock_cdffm_name = implode( ', ', $dragblock_cdffm_family );
			}
		}
		if (
			! empty( $_POST['nonce'] ) &&
			wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['nonce'] ) ), 'dragblock_font_library' ) &&
			isset( $_POST['font-name'] )
		) {
			$dragblock_cdffm_name = sanitize_text_field( wp_unslash( $_POST['font-name'] ) );
		}
		$dragblock_cdffm_name = esc_html( $dragblock_cdffm_name );
		$dragblock_cdffm_theme = esc_html( $dragblock_cdffm_theme );
		/* translators: see trans-note#1332 */
		$dragblock_cdffm_theme = sprintf( esc_html__( '%1$s font added to the DragBlock\'s font library.', 'dragblock' ), $dragblock_cdffm_name, $dragblock_cdffm_theme );
		$dragblock_cdffm_post = esc_attr( 'admin.php?page=' . DRAGBLOCK_FONT_LIB_SLUG );
		$dragblock_cdffm_data = "<a href=\"{$dragblock_cdffm_post}\">" . esc_html__( 'Font Library', 'dragblock' ) . '</a>';
		$dragblock_cdffm_names = "<div class=\"notice notice-success is-dismissible\"><p>{$dragblock_cdffm_theme}{$dragblock_cdffm_data}</p></div>";
		echo wp_kses_post( $dragblock_cdffm_names );
	}
	/**
	 * Check Documentation#1338
	 */
	public static function admin_notice_embed_font_permission_error() {
		$dragblock_cdffm_theme = wp_get_theme()->get( 'Name' );
		$dragblock_cdffm_name = '';
		if (
			! empty( $_POST['nonce'] ) &&
			wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['nonce'] ) ), 'dragblock_font_library' ) &&
			isset( $_POST['selection-data'] )
		) {
			$dragblock_cdffm_font = json_decode( sanitize_text_field( wp_unslash( $_POST['selection-data'] ) ), true );
			if ( ! empty( $dragblock_cdffm_font ) && ! empty( $dragblock_cdffm_font['family'] ) ) {
				$dragblock_cdffm_name = $dragblock_cdffm_font['family'];
			}
		}
		if (
			! empty( $_POST['nonce'] ) &&
			wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['nonce'] ) ), 'dragblock_font_library' ) &&
			isset( $_POST['font-name'] )
		) {
			$dragblock_cdffm_name = sanitize_text_field( wp_unslash( $_POST['font-name'] ) );
		}
		$dragblock_cdffm_name = esc_html( $dragblock_cdffm_name );
		$dragblock_cdffm_theme = esc_html( $dragblock_cdffm_theme );
		/* translators: see trans-note#1361 */
		$dragblock_cdffm_theme = sprintf( esc_html__( 'Error adding %1$s font to the DragBlock\'s font library. WordPress lack permissions to write the font assets.', 'dragblock' ), $dragblock_cdffm_name, $dragblock_cdffm_theme );
		$dragblock_cdffm_names = "<div class=\"notice notice-error is-dismissible\"><p>{$dragblock_cdffm_theme}</p></div>";
		echo wp_kses_post( $dragblock_cdffm_names );
	}
	/**
	 * Check Documentation#1365
	 */
	public static function admin_notice_embed_font_file_error() {
		$dragblock_cdffm_theme = wp_get_theme()->get( 'Name' );
		$dragblock_cdffm_name = '';
		if (
			! empty( $_POST['nonce'] ) &&
			wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['nonce'] ) ), 'dragblock_font_library' ) &&
			isset( $_POST['font-name'] )
		) {
			$dragblock_cdffm_name = sanitize_text_field( wp_unslash( $_POST['font-name'] ) );
		}
		$dragblock_cdffm_name = esc_html( $dragblock_cdffm_name );
		$dragblock_cdffm_theme = esc_html( $dragblock_cdffm_theme );
		/* translators: see trans-note#1378 */
		$dragblock_cdffm_theme = sprintf( esc_html__( 'Error adding %1$s font to the DragBlock\'s font library. The uploaded file is not valid.', 'dragblock' ), $dragblock_cdffm_name, $dragblock_cdffm_theme );
		$dragblock_cdffm_names = "<div class=\"notice notice-error is-dismissible\"><p>{$dragblock_cdffm_theme}</p></div>";
		echo wp_kses_post( $dragblock_cdffm_names );
	}
	/**
	 * Check Documentation#1382
	 */
	public static function admin_notice_font_asset_removal_error() {
		$dragblock_cdffm_theme = wp_get_theme()->get( 'Name' );
		$dragblock_cdffm_theme = esc_html( $dragblock_cdffm_theme );
		/* translators: see trans-note#1386 */
		$dragblock_cdffm_theme = sprintf( esc_html__( 'Error removing font asset. WordPress lacks permissions to remove these font assets.', 'dragblock' ), $dragblock_cdffm_theme );
		$dragblock_cdffm_names = "<div class=\"notice notice-error is-dismissible\"><p>{$dragblock_cdffm_theme}</p></div>";
		echo wp_kses_post( $dragblock_cdffm_names );
	}
	/**
	 * Check Documentation#1390
	 */
	public static function admin_notice_manage_fonts_permission_error() {
		$dragblock_cdffm_theme = wp_get_theme()->get( 'Name' );
		$dragblock_cdffm_theme = esc_html( $dragblock_cdffm_theme );
		/* translators: see trans-note#1394 */
		$dragblock_cdffm_theme = sprintf( esc_html__( 'Error handling font changes. WordPress lack permissions to manage the font assets.', 'dragblock' ), $dragblock_cdffm_theme );
		$dragblock_cdffm_names = "<div class=\"notice notice-error is-dismissible\"><p>{$dragblock_cdffm_theme}</p></div>";
		echo wp_kses_post( $dragblock_cdffm_names );
	}
	/**
	 * Check Documentation#1398
	 */
	public static function admin_notice_delete_font_success() {
		$dragblock_cdffm_theme = wp_get_theme()->get( 'Name' );
		$dragblock_cdffm_theme = esc_html( $dragblock_cdffm_theme );
		/* translators: see trans-note#13102 */
		$dragblock_cdffm_theme = sprintf( esc_html__( 'Font definition removed from the DragBlock\'s font library.', 'dragblock' ), $dragblock_cdffm_theme );
		$dragblock_cdffm_names = "<div class=\"notice notice-success is-dismissible\"><p>{$dragblock_cdffm_theme}</p></div>";
		echo wp_kses_post( $dragblock_cdffm_names );
	}
	/**
	 * Check Documentation#13106
	 */
	public static function admin_notice_file_edit_error() {
		$dragblock_cdffm_theme = esc_html( 'Error: `DISALLOW_FILE_EDIT` cannot be enabled in wp-config.php to make modifications to local files.' );
		$dragblock_cdffm_names = "<div class=\"notice notice-error is-dismissible\"><p>{$dragblock_cdffm_theme}</p></div>";
		echo wp_kses_post( $dragblock_cdffm_names );
	}
	/**
	 * Check Documentation#13112
	 */
	public static function admin_notice_user_cant_edit_theme() {
		$dragblock_cdffm_theme = esc_html( 'Error: You do not have sufficient permission to edit local files.' );
		$dragblock_cdffm_names = "<div class=\"notice notice-error is-dismissible\"><p>{$dragblock_cdffm_theme}</p></div>";
		echo wp_kses_post( $dragblock_cdffm_names );
	}
}
