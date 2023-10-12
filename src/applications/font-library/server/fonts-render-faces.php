<?php
/**
 * DragBlock's Font-library.
 *
 * @package Fonts render faces
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
// dev-reply#43.
/**
 * Check Documentation#43
 *
 * @param object|array|string $dragblock_frf_font check var-def#43.
 */
function dragblock_render_font_styles( $dragblock_frf_font ) {
	$dragblock_frf_families = '';
	if ( ! is_array( $dragblock_frf_font ) ) {
		return $dragblock_frf_families;
	}
	foreach ( $dragblock_frf_font as $dragblock_frf_styles ) {
		if ( isset( $dragblock_frf_styles['fontFace'] ) && is_array( $dragblock_frf_styles['fontFace'] ) ) {
			foreach ( $dragblock_frf_styles['fontFace'] as $dragblock_frf_family ) {
				if ( ! isset( $dragblock_frf_family['src'][0] ) || ! isset( $dragblock_frf_family['fontFamily'] ) ) {
					continue;
				}
				$dragblock_frf_face = esc_url_raw( $dragblock_frf_family['src'][0] );
				$dragblock_frf_url = ! empty( $dragblock_frf_family['fontWeight'] ) ? $dragblock_frf_family['fontWeight'] : 'normal';
				$dragblock_frf_weight = ! empty( $dragblock_frf_family['fontStyle'] ) ? $dragblock_frf_family['fontStyle'] : 'normal';
				$dragblock_frf_families .= '@font-face {';
				$dragblock_frf_families .= "font-family: '" . $dragblock_frf_family['fontFamily'] . "';";
				$dragblock_frf_families .= 'src: url(' . $dragblock_frf_face . ');';
				$dragblock_frf_families .= 'font-weight: ' . $dragblock_frf_url . ';';
				$dragblock_frf_families .= 'font-style: ' . $dragblock_frf_weight . ';';
				$dragblock_frf_families .= '}';
			}
		}
	}
	return $dragblock_frf_families;
}
