<?php
/**
 * DragBlock's Editor-panel-attributes.
 *
 * @package Attributes uid
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
global $dragblock_uids;
$dragblock_uids = array();
add_filter( 'render_block_data', 'dragblock_uid_parser', 1, 2 );
/**
 * Check Documentation#75
 *
 * @param object|array|string $dragblock_au_dragblock check var-def#75.
 * @param object|array|string $dragblock_au_uids check var-def#75.
 */
function dragblock_uid_parser( $dragblock_au_dragblock, $dragblock_au_uids ) {
	if (
		'core/null' === $dragblock_au_dragblock['blockName'] ||
		empty( $dragblock_au_dragblock['attrs']['dragBlockClientId'] ) ||
		( empty( $dragblock_au_dragblock['attrs']['dragBlockCSS'] ) && empty( $dragblock_au_dragblock['attrs']['dragBlockJS'] ) )
		// dev-reply#729.
	) {
		return $dragblock_au_dragblock;
	}
	global $dragblock_uids;
	$dragblock_au_parsed = $dragblock_au_dragblock['blockName'] . $dragblock_au_dragblock['attrs']['dragBlockClientId'];
	if ( ! empty( $dragblock_uids[ $dragblock_au_parsed ] ) ) {
		return $dragblock_au_dragblock;
	}
	$dragblock_au_block = 'i' . count( $dragblock_uids );
	$dragblock_uids[ $dragblock_au_parsed ] = $dragblock_au_block;
	return $dragblock_au_dragblock;
}
add_filter( 'render_block', 'dragblock_uid_inserter', 10, 3 );
/**
 * Check Documentation#724
 *
 * @param object|array|string $dragblock_au_source check var-def#724.
 * @param object|array|string $dragblock_au_dragblock check var-def#724.
 * @param object|array|string $dragblock_au_uid check var-def#724.
 */
function dragblock_uid_inserter( $dragblock_au_source, $dragblock_au_dragblock, $dragblock_au_uid ) {
	if (
		'core/null' === $dragblock_au_dragblock['blockName'] ||
		empty( $dragblock_au_dragblock['attrs']['dragBlockClientId'] ) ||
		( empty( $dragblock_au_dragblock['attrs']['dragBlockCSS'] ) && empty( $dragblock_au_dragblock['attrs']['dragBlockJS'] ) )
	) {
		return $dragblock_au_source;
	}
	global $dragblock_uids;
	$dragblock_au_parsed = $dragblock_au_dragblock['blockName'] . $dragblock_au_dragblock['attrs']['dragBlockClientId'];
	// dev-reply#780.
	$dragblock_au_key = 'class="';
	$dragblock_au_short = strpos( $dragblock_au_source, $dragblock_au_key );
	$dragblock_au_class = strpos( $dragblock_au_source, '>' );
	// dev-reply#785.
	if ( false === $dragblock_au_class ) {
		return $dragblock_au_source;
	}
	// dev-reply#790.
	if ( false === $dragblock_au_short ) {
		return (
			substr( $dragblock_au_source, 0, $dragblock_au_class ) .
			'class="' . ( $dragblock_uids[ $dragblock_au_parsed ] ) . '"' .
			substr( $dragblock_au_source, $dragblock_au_class )
		);
	}
	if ( $dragblock_au_short >= $dragblock_au_class ) {
		return $dragblock_au_source;
	}
	return (
		substr( $dragblock_au_source, 0, $dragblock_au_short + strlen( $dragblock_au_key ) ) .
		( $dragblock_uids[ $dragblock_au_parsed ] ) . ' ' .
		substr( $dragblock_au_source, $dragblock_au_short + strlen( $dragblock_au_key ) )
	);
}
