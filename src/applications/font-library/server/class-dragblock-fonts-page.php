<?php
/**
 * DragBlock's Font-library.
 *
 * @package Class dragblock fonts page
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
// dev-reply#43.
/**
 * Check class-def#43
 */
class DragBlock_Fonts_Page {
	/**
	 * Check Documentation#45
	 */
	public static function manage_fonts_admin_page() {
		DragBlock_React_App::bootstrap();
		// dev-reply#411.
		$dragblock_cdfp_font = get_option( DRAGBLOCK_FONT_LIB_SLUG, array() );
		// dev-reply#417.
		if ( class_exists( 'WP_Webfonts' ) !== true ) {
			$dragblock_cdfp_families = dragblock_render_font_styles( $dragblock_cdfp_font );
			wp_register_style( 'dragblock-font-library', false );
			wp_add_inline_style( 'dragblock-font-library', $dragblock_cdfp_families );
			wp_enqueue_style( 'dragblock-font-library' );
		}
		$dragblock_cdfp_assets = wp_json_encode( $dragblock_cdfp_font );
		// dev-reply#432.
		$dragblock_cdfp_stylesheet = esc_html( preg_replace( '~(?:^|\G)\h{4}~m', "\t", $dragblock_cdfp_assets ) );
		$dragblock_cdfp_fonts = esc_attr( wp_create_nonce( 'dragblock_font_library' ) );
		$dragblock_cdfp_json = "<p name=dragblock-font-library-json id=dragblock-font-library-json class=hidden>{$dragblock_cdfp_stylesheet}</p>";
		$dragblock_cdfp_json .= '<div id=dragblock-font-library-app></div>';
		$dragblock_cdfp_json .= "<input type=hidden name=nonce id=nonce value=\"{$dragblock_cdfp_fonts}\" />";
		// dev-reply#441.
		$dragblock_cdfp_string = array(
			'p' => array(
				'name' => true,
				'id' => true,
				'class' => true,
			),
			'div' => array(
				'id' => true,
			),
			'input' => array(
				'type' => true,
				'name' => true,
				'id' => true,
				'value' => true,
			),
		);
		echo wp_kses( $dragblock_cdfp_json, $dragblock_cdfp_string );
	}
}
