<?php
/**
 * DragBlock's Font-library.
 *
 * @package Class dragblock local fonts
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
// dev-reply#33.
/**
 * Check class-def#33
 */
class DragBlock_Local_Fonts {
	/**
	 * Check Documentation#35
	 */
	public static function local_fonts_admin_page() {
		// dev-reply#39.
		wp_enqueue_script( 'inflate', DRAGBLOCK_BUILD_URL . 'applications/font-library/client/font-readers/index.js', array(), DRAGBLOCK_VERSION, false );
		DragBlock_React_App::bootstrap();
		$dragblock_cdlf_app = esc_attr( wp_create_nonce( 'dragblock_font_library' ) );
		$dragblock_cdlf_nonce = "<input id=\"nonce\" type=\"hidden\" value=\"{$dragblock_cdlf_app}\" />";
		$dragblock_cdlf_nonce .= '<div id="dragblock-font-library-app"></div>';
		// dev-reply#320.
		$dragblock_cdlf_html = array(
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
		echo wp_kses( $dragblock_cdlf_nonce, $dragblock_cdlf_html );
	}
}
