<?php
/**
 * DragBlock's Editor-panel-renderability.
 *
 * @package Renderability render
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
add_filter( 'render_block', 'dragblock_renderability_render', 1, 2 );
/**
 * Check Documentation#103
 *
 * @param object|array|string $dragblock_rr_block check var-def#103.
 * @param object|array|string $dragblock_rr_content check var-def#103.
 */
function dragblock_renderability_render( $dragblock_rr_block, $dragblock_rr_content ) {
	if (
		'core/null' === $dragblock_rr_content['blockName'] ||
		empty( $dragblock_rr_content['attrs']['dragBlockRenderability'] )
	) {
		return $dragblock_rr_block;
	}
	$dragblock_rr_parsed = null;
	$dragblock_rr_browsers = null;
	$dragblock_rr_devices = null;
	$dragblock_rr_oses = null;
	foreach ( $dragblock_rr_content['attrs']['dragBlockRenderability'] as $dragblock_rr_user ) {
		if ( ! empty( $dragblock_rr_user['disabled'] ) || empty( $dragblock_rr_user['slug'] ) || empty( $dragblock_rr_user['value'] ) ) {
			continue;
		}
		// dev-reply#1027.
		if ( 'browser' === $dragblock_rr_user['slug'] ) {
			if ( null === $dragblock_rr_parsed ) {
				$dragblock_rr_parsed = false;
			}
			if ( false === $dragblock_rr_parsed ) {
				if ( ( empty( $dragblock_rr_user['operator'] ) || '==' === $dragblock_rr_user['operator'] ) ) {
					$dragblock_rr_parsed = ( dragblock_get_current_browser() === $dragblock_rr_user['value'] );
				} else {
					$dragblock_rr_parsed = ( dragblock_get_current_browser() !== $dragblock_rr_user['value'] );
				}
			}
			continue;
		}
		// dev-reply#1042.
		if ( 'device' === $dragblock_rr_user['slug'] ) {
			if ( null === $dragblock_rr_browsers ) {
				$dragblock_rr_browsers = false;
			}
			if ( false === $dragblock_rr_browsers ) {
				if ( ( empty( $dragblock_rr_user['operator'] ) || '==' === $dragblock_rr_user['operator'] ) ) {
					$dragblock_rr_browsers = ( dragblock_get_current_device() === $dragblock_rr_user['value'] );
				} else {
					$dragblock_rr_browsers = ( dragblock_get_current_device() !== $dragblock_rr_user['value'] );
				}
			}
			continue;
		}
		// dev-reply#1057.
		if ( 'os' === $dragblock_rr_user['slug'] ) {
			if ( null === $dragblock_rr_devices ) {
				$dragblock_rr_devices = false;
			}
			if ( false === $dragblock_rr_devices ) {
				if ( ( empty( $dragblock_rr_user['operator'] ) || '==' === $dragblock_rr_user['operator'] ) ) {
					$dragblock_rr_devices = ( dragblock_get_current_os() === $dragblock_rr_user['value'] );
				} else {
					$dragblock_rr_devices = ( dragblock_get_current_os() !== $dragblock_rr_user['value'] );
				}
			}
			continue;
		}
		// dev-reply#1072.
		if ( 'user-logged' === $dragblock_rr_user['slug'] ) {
			if ( null === $dragblock_rr_oses ) {
				$dragblock_rr_oses = false;
			}
			if ( false === $dragblock_rr_oses ) {
				$dragblock_rr_logged = is_user_logged_in() ? 'in' : 'out';
				if ( ( empty( $dragblock_rr_user['operator'] ) || '==' === $dragblock_rr_user['operator'] ) ) {
					$dragblock_rr_oses = ( ( $dragblock_rr_logged ) === $dragblock_rr_user['value'] );
				} else {
					$dragblock_rr_oses = ( ( $dragblock_rr_logged ) !== $dragblock_rr_user['value'] );
				}
			}
			continue;
		}
	}
	// dev-reply#1089.
	if ( null === $dragblock_rr_parsed ) {
		$dragblock_rr_parsed = true;
	}
	if ( null === $dragblock_rr_browsers ) {
		$dragblock_rr_browsers = true;
	}
	if ( null === $dragblock_rr_devices ) {
		$dragblock_rr_devices = true;
	}
	if ( null === $dragblock_rr_oses ) {
		$dragblock_rr_oses = true;
	}
	if ( $dragblock_rr_parsed && $dragblock_rr_browsers && $dragblock_rr_devices && $dragblock_rr_oses ) {
		return $dragblock_rr_block;
	}
	return '';
}
