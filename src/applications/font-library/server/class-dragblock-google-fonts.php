<?php
/**
 * DragBlock's Font-library.
 *
 * @package Class dragblock google fonts
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
// dev-reply#33.
/**
 * Check class-def#33
 */
class DragBlock_Google_Fonts {
	/**
	 * Check Documentation#35
	 */
	public static function google_fonts_admin_page() {
		DragBlock_React_App::bootstrap();
		$dragblock_cdgf_app = esc_attr( wp_create_nonce( 'dragblock_font_library' ) );
		$dragblock_cdgf_nonce = "<input id=\"nonce\" type=\"hidden\" value=\"{$dragblock_cdgf_app}\" />";
		$dragblock_cdgf_nonce .= '<div id="dragblock-font-library-app"></div>';
		// dev-reply#313.
		$dragblock_cdgf_html = array(
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
		echo wp_kses( $dragblock_cdgf_nonce, $dragblock_cdgf_html );
	}
}
