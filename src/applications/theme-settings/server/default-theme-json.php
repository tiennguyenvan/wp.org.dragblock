<?php
/**
 * DragBlock's Theme-settings.
 *
 * @package Default theme json
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
global $dragblock_update_theme_json;
$dragblock_update_theme_json = null;
// dev-reply#421.
define( 'DRAG_BLOCK_DEFAULT_THEME_JSON', json_decode( file_get_contents( DRAGBLOCK_URL . 'assets/jsons/default-theme.json' ), true ) );
add_filter( 'wp_theme_json_data_theme', 'dragblock_default_theme_json', 1 );
/**
 * Check Documentation#47
 *
 * @param object|array|string $dragblock_dtj_dragblock check var-def#47.
 */
function dragblock_default_theme_json( $dragblock_dtj_dragblock ) {
	global $dragblock_update_theme_json;
	if ( ! empty( $dragblock_update_theme_json ) ) {
		return $dragblock_dtj_dragblock->update_with( $dragblock_update_theme_json );
	}
	$dragblock_update_theme_json = $dragblock_dtj_dragblock->get_data();
	$dragblock_update_theme_json = dragblock_theme_json_merge( $dragblock_update_theme_json, DRAG_BLOCK_DEFAULT_THEME_JSON );
	if (
		empty( $dragblock_update_theme_json['settings']['color']['palette']['theme'] ) &&
		! empty( DRAG_BLOCK_DEFAULT_THEME_JSON['settings']['color']['palette'] )
	) {
		$dragblock_update_theme_json['settings']['color']['palette']['theme'] =
			DRAG_BLOCK_DEFAULT_THEME_JSON['settings']['color']['palette'];
	}
	// dev-reply#445.
	if ( DRAGBLOCK_CUSTOM_DEFAULT_STYLE ) {
		if ( empty( $dragblock_update_theme_json['styles']['css'] ) ) {
			$dragblock_update_theme_json['styles']['css'] = '';
		}
		$dragblock_update_theme_json['styles']['css'] .= '/* START: CSS OF DRAGBLOCK */' . file_get_contents( dragblock_url( 'build/applications/front/style-index.css' ) ) . '/* END: CSS OF DRAGBLOCK */';
	}
	$dragblock_update_theme_json = apply_filters( 'dragblock_default_theme_json', $dragblock_update_theme_json );
	return $dragblock_dtj_dragblock->update_with( $dragblock_update_theme_json );
}
