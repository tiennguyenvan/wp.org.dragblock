<?php
/**
 * DragBlock's Font-library.
 *
 * @package Fonts theme json
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
add_filter( 'dragblock_default_theme_json', 'dragblock_default_theme_json_font_lib' );
/**
 * Check Documentation#103
 *
 * @param object|array|string $dragblock_ftj_theme check var-def#103.
 */
function dragblock_default_theme_json_font_lib( $dragblock_ftj_theme ) {
	if ( ! isset( $dragblock_ftj_theme['settings']['typography']['fontFamilies']['theme'] ) ) {
		$dragblock_ftj_theme['settings']['typography']['fontFamilies']['theme'] = array();
	}
	// dev-reply#1016.
	$dragblock_ftj_json = array();
	foreach ( $dragblock_ftj_theme['settings']['typography']['fontFamilies']['theme'] as $dragblock_ftj_existed => $dragblock_ftj_families ) {
		if ( empty( $dragblock_ftj_families['slug'] ) ) {
			continue;
		}
		$dragblock_ftj_json[ $dragblock_ftj_families['slug'] ] = $dragblock_ftj_existed;
	}
	// dev-reply#1025.
	$dragblock_ftj_index = get_option( DRAGBLOCK_FONT_LIB_SLUG, array() );
	foreach ( $dragblock_ftj_index as $dragblock_ftj_families ) {
		if ( empty( $dragblock_ftj_families['slug'] ) || empty( $dragblock_ftj_families['fontFace'] ) ) {
			continue;
		}
		// dev-reply#1032.
		if (
			isset( $dragblock_ftj_json[ $dragblock_ftj_families['slug'] ] ) &&
			! empty( $dragblock_ftj_theme['settings']['typography']['fontFamilies']['theme'][ $dragblock_ftj_json[ $dragblock_ftj_families['slug'] ] ]['src'][0] ) &&
			strpos( $dragblock_ftj_theme['settings']['typography']['fontFamilies']['theme'][ $dragblock_ftj_json[ $dragblock_ftj_families['slug'] ] ]['src'][0], '/dragblock/' ) === false
		) {
			continue;
		}
		// dev-reply#1042.
		foreach ( $dragblock_ftj_families['fontFace'] as $dragblock_ftj_fontfamily => $dragblock_ftj_uploaded ) {
			if ( empty( $dragblock_ftj_uploaded['fontDisplay'] ) || 'fallback' === $dragblock_ftj_uploaded['fontDisplay'] ) {
				$dragblock_ftj_families['fontFace'][ $dragblock_ftj_fontfamily ]['fontDisplay'] = 'swap';
			}
		}
		$dragblock_ftj_theme['settings']['typography']['fontFamilies']['theme'][] = ( $dragblock_ftj_families );
		// dev-reply#1050.
		if ( isset( $dragblock_ftj_json[ $dragblock_ftj_families['slug'] ] ) ) {
			unset( $dragblock_ftj_theme['settings']['typography']['fontFamilies']['theme'][ $dragblock_ftj_json[ $dragblock_ftj_families['slug'] ] ] );
			unset( $dragblock_ftj_json[ $dragblock_ftj_families['slug'] ] );
		}
	}
	// dev-reply#1057.
	if ( ! empty( DRAG_BLOCK_DEFAULT_THEME_JSON['settings']['typography']['fontFamilies'] ) ) {
		// dev-reply#1059.
		foreach ( DRAG_BLOCK_DEFAULT_THEME_JSON['settings']['typography']['fontFamilies'] as $dragblock_ftj_families ) {
			if ( empty( $dragblock_ftj_families['slug'] ) ) {
				continue;
			}
			$dragblock_ftj_theme['settings']['typography']['fontFamilies']['theme'][] = ( $dragblock_ftj_families );
			// dev-reply#1067.
			if ( isset( $dragblock_ftj_json[ $dragblock_ftj_families['slug'] ] ) ) {
				unset( $dragblock_ftj_theme['settings']['typography']['fontFamilies']['theme'][ $dragblock_ftj_json[ $dragblock_ftj_families['slug'] ] ] );
				unset( $dragblock_ftj_json[ $dragblock_ftj_families['slug'] ] );
			}
		}
	}
	// dev-reply#1074.
	foreach ( $dragblock_ftj_json as $dragblock_ftj_key => $dragblock_ftj_existed ) {
		// dev-reply#1076.
		if (
			! empty( $dragblock_ftj_theme['settings']['typography']['fontFamilies']['theme'][ $dragblock_ftj_existed ]['src'][0] ) &&
			strpos( $dragblock_ftj_theme['settings']['typography']['fontFamilies']['theme'][ $dragblock_ftj_existed ]['src'][0], '/dragblock/' ) === false
		) {
			continue;
		}
		unset( $dragblock_ftj_theme['settings']['typography']['fontFamilies']['theme'][ $dragblock_ftj_existed ] );
	}
	// dev-reply#1088.
	$dragblock_ftj_theme['settings']['typography']['fontFamilies']['theme'] = array_values( $dragblock_ftj_theme['settings']['typography']['fontFamilies']['theme'] );
	return $dragblock_ftj_theme;
}
add_filter( 'wp_theme_json_data_user', 'dragblock_theme_json_data_user_font', 100 );
/**
 * Check Documentation#1074
 *
 * @param object|array|string $dragblock_ftj_value check var-def#1074.
 */
function dragblock_theme_json_data_user_font( $dragblock_ftj_value ) {
	$dragblock_ftj_theme = $dragblock_ftj_value->get_data();
	$dragblock_ftj_theme = dragblock_default_theme_json_font_lib( $dragblock_ftj_theme );
	return $dragblock_ftj_value->update_with( $dragblock_ftj_theme );
}
