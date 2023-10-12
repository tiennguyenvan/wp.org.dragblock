<?php
/**
 * DragBlock's Font-library.
 *
 * @package Fonts
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
define( 'DRAGBLOCK_FONT_LIB_SLUG', sanitize_key( 'dragblockFontLib' ) ); // dev-reply#210.
add_filter( 'upload_mimes', 'dragblock_custom_font_mime_types' );
/**
 * Check Documentation#24
 *
 * @param object|array|string $dragblock_f_mimes check var-def#24.
 */
function dragblock_custom_font_mime_types( $dragblock_f_mimes ) {
	$dragblock_f_mimes['otf'] = 'application/octet-stream';
	$dragblock_f_mimes['ttf'] = 'application/octet-stream';
	$dragblock_f_mimes['woff'] = 'application/octet-stream';
	$dragblock_f_mimes['woff2'] = 'application/octet-stream';
	return $dragblock_f_mimes;
}
