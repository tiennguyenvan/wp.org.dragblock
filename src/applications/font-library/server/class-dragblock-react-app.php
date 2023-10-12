<?php
/**
 * DragBlock's Font-library.
 *
 * @package Class dragblock react app
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
/**
 * Check class-def#32
 */
class DragBlock_React_App {
	/**
	 * Check Documentation#34
	 */
	public static function bootstrap() {
		// dev-reply#37.
		$dragblock_cdra_asset = include DRAGBLOCK_BUILD_PATH . 'applications/font-library/client/index.asset.php';
		// dev-reply#311.
		foreach ( $dragblock_cdra_asset['dependencies'] as $dragblock_cdra_file ) {
			wp_enqueue_style( $dragblock_cdra_file );
		}
		// dev-reply#316.
		wp_enqueue_style( 'dragblock-font-library-app', DRAGBLOCK_BUILD_URL . 'applications/font-library/client/index.css', array(), $dragblock_cdra_asset['version'] );
		// dev-reply#319.
		array_push( $dragblock_cdra_asset['dependencies'], 'wp-i18n' );
		wp_enqueue_script( 'dragblock-font-library-app', DRAGBLOCK_BUILD_URL . 'applications/font-library/client/index.js', $dragblock_cdra_asset['dependencies'], $dragblock_cdra_asset['version'] );
		// dev-reply#324.
		wp_localize_script(
			'dragblock-font-library-app',
			'dragBlockFontLib',
			array(
				'googleFontsDataUrl' => DRAGBLOCK_URL . 'assets/jsons/google-fallback-fonts-list.json',
				'adminUrl'           => admin_url(),
				'uploadUrl'           => DRAGBLOCK_UPLOAD_URL,
				'adminMenuSlug' => DRAGBLOCK_ADMIN_MENU_SLUG,
				'fontLibSlug' => DRAGBLOCK_FONT_LIB_SLUG,
			)
		);
	}
}
