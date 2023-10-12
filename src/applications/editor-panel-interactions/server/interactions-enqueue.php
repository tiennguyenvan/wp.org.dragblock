<?php
/**
 * DragBlock's Editor-panel-interactions.
 *
 * @package Interactions enqueue
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
add_action( 'enqueue_block_editor_assets', 'dragblock_interactions_panel_editor_assets' );
/**
 * Check Documentation#73
 */
function dragblock_interactions_panel_editor_assets() {
	$dragblock_ie_panel = 'interactions';
	dragblock_enqueue( "dragblock-{$dragblock_ie_panel}-panel", "build/applications/editor-panel-{$dragblock_ie_panel}/client/index.js", array( DRAGBLOCK_EDITOR_INIT_SLUG ) );
	dragblock_enqueue( "dragblock-{$dragblock_ie_panel}-panel", "build/applications/editor-panel-{$dragblock_ie_panel}/client/index.css" );
}
global $dragblock_js;
$dragblock_js = array();
add_filter( 'render_block', 'dragblock_interactions_collect_js', 10, 2 );
/**
 * Check Documentation#712
 *
 * @param object|array|string $dragblock_ie_dragblock check var-def#712.
 * @param object|array|string $dragblock_ie_js check var-def#712.
 */
function dragblock_interactions_collect_js( $dragblock_ie_dragblock, $dragblock_ie_js ) {
	if (
		'core/null' === $dragblock_ie_js['blockName'] ||
		empty( $dragblock_ie_js['attrs']['dragBlockClientId'] )
	) {
		return $dragblock_ie_dragblock;
	}
	$dragblock_ie_block = $dragblock_ie_js['blockName'] . $dragblock_ie_js['attrs']['dragBlockClientId'];
	$dragblock_ie_content = '';
	if ( ! empty( $dragblock_ie_js['attrs']['dragBlockJS'] ) ) {
		global $dragblock_uids;
		if ( ! empty( $dragblock_uids[ $dragblock_ie_block ] ) ) {
			$dragblock_ie_parsed = '.' . $dragblock_uids[ $dragblock_ie_block ];
			$dragblock_ie_content =
				str_replace(
					'[data-dragblock-client-id="' . $dragblock_ie_js['attrs']['dragBlockClientId'] . '"]',
					$dragblock_ie_parsed,
					$dragblock_ie_js['attrs']['dragBlockJS']
				);
		}
	}
	// dev-reply#759.
	global $dragblock_js;
	// dev-reply#763.
	if ( ! empty( $dragblock_ie_js['innerBlocks'] ) ) {
		foreach ( $dragblock_ie_js['innerBlocks'] as $dragblock_ie_uid ) {
			if ( empty( $dragblock_ie_uid['blockName'] ) || empty( $dragblock_ie_uid['attrs']['dragBlockClientId'] ) ) {
				continue;
			}
			$dragblock_ie_key = $dragblock_ie_uid['blockName'] . $dragblock_ie_uid['attrs']['dragBlockClientId'];
			if ( ! empty( $dragblock_js[ $dragblock_ie_key ] ) ) {
				$dragblock_ie_content .= $dragblock_js[ $dragblock_ie_key ];
				unset( $dragblock_js[ $dragblock_ie_key ] );
			}
		}
	}
	if ( $dragblock_ie_content ) {
		$dragblock_js[ $dragblock_ie_block ] = $dragblock_ie_content;
	}
	return $dragblock_ie_dragblock;
}
add_action( 'wp_footer', 'dragblock_enqueue_front_end' );
/**
 * Check Documentation#755
 */
function dragblock_enqueue_front_end() {
	global $dragblock_js;
	$dragblock_ie_uids = implode( '', $dragblock_js );
	if ( $dragblock_ie_uids ) {
		// dev-reply#796.
		wp_add_inline_script( DRAGBLOCK_EDITOR_INIT_SLUG, $dragblock_ie_uids, 'before' );
	}
}
