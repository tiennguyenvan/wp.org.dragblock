<?php
/**
 * DragBlock's Library.
 *
 * @package Lib identify
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
/**
 * Check Documentation#92
 */
function dragblock_get_current_browser() {
	static $dragblock_li_browser = null;
	if ( ( $dragblock_li_browser ) !== null ) {
		// dev-reply#98.
		return $dragblock_li_browser;
	}
	$dragblock_li_browser = '';
	if ( empty( $_SERVER['HTTP_USER_AGENT'] ) ) {
		return $dragblock_li_browser;
	}
	$dragblock_li_name = sanitize_text_field( wp_unslash( $_SERVER['HTTP_USER_AGENT'] ) );
	if ( strpos( $dragblock_li_name, 'Chrome' ) !== false ) {
		$dragblock_li_browser = 'chrome';
	} elseif ( strpos( $dragblock_li_name, 'Firefox' ) !== false ) {
		$dragblock_li_browser = 'firefox';
	} elseif ( strpos( $dragblock_li_name, 'Edge' ) !== false ) {
		$dragblock_li_browser = 'edge';
	} elseif ( strpos( $dragblock_li_name, 'MSIE' ) !== false || strpos( $dragblock_li_name, 'Trident/' ) !== false ) {
		$dragblock_li_browser = 'ie';
	} elseif ( strpos( $dragblock_li_name, 'Opera' ) !== false ) {
		$dragblock_li_browser = 'opera';
	} elseif ( strpos( $dragblock_li_name, 'Safari' ) !== false ) {
		$dragblock_li_browser = 'safari';
	} elseif ( strpos( $dragblock_li_name, 'SamsungBrowser' ) !== false ) {
		$dragblock_li_browser = 'samsungi';
	}
	return strtolower( $dragblock_li_browser );
}
/**
 * Check Documentation#931
 */
function dragblock_get_current_device() {
	static $dragblock_li_browser = null;
	if ( ( $dragblock_li_browser ) !== null ) {
		// dev-reply#944.
		return $dragblock_li_browser;
	}
	$dragblock_li_browser = 'desktop';
	if ( empty( $_SERVER['HTTP_USER_AGENT'] ) ) {
		return $dragblock_li_browser;
	}
	$dragblock_li_name = sanitize_text_field( wp_unslash( $_SERVER['HTTP_USER_AGENT'] ) );
	$dragblock_li_server = array(
		'/ipad/i',
		'/android(?!.*mobile)/i',
	);
	$dragblock_li_user = array(
		'/iphone/i',
		'/ipod/i',
		'/android.*mobile/i',
		'/windows phone/i',
		'/blackberry/i',
		'/nokia/i',
		'/sony/i',
		'/lg/i',
		'/htc/i',
		'/mot/i',
		'/samsung/i',
		'/palm/i',
		'/zte/i',
		'/fennec/i',
		'/opera mobi/i',
		'/opera mini/i',
		'/iemobile/i',
	);
	foreach ( $dragblock_li_server as $dragblock_li_agent ) {
		if ( preg_match( $dragblock_li_agent, $dragblock_li_name ) ) {
			$dragblock_li_browser = 'tablet';
			break;
		}
	}
	foreach ( $dragblock_li_user as $dragblock_li_agent ) {
		if ( preg_match( $dragblock_li_agent, $dragblock_li_name ) ) {
			$dragblock_li_browser = 'mobile';
			break;
		}
	}
	// dev-reply#993.
	return $dragblock_li_browser;
}
/**
 * Check Documentation#981
 */
function dragblock_get_current_os() {
	static $dragblock_li_device = null;
	if ( ( $dragblock_li_device ) !== null ) {
		// dev-reply#9102.
		return $dragblock_li_device;
	}
	$dragblock_li_device = '';
	if ( empty( $_SERVER['HTTP_USER_AGENT'] ) ) {
		return $dragblock_li_device;
	}
	$dragblock_li_name = sanitize_text_field( wp_unslash( $_SERVER['HTTP_USER_AGENT'] ) );
	$dragblock_li_tablet = array(
		'windows' => '/windows/i',
		'linux' => '/linux/i',
		'macintosh' => '/macintosh|mac os x/i',
		'ios' => '/iphone|ipad|ipod/i',
		'android' => '/android/i',
	);
	foreach ( $dragblock_li_tablet as $dragblock_li_patterns => $dragblock_li_agent ) {
		if ( preg_match( $dragblock_li_agent, $dragblock_li_name ) ) {
			$dragblock_li_device = $dragblock_li_patterns;
		}
	}
	// dev-reply#9126.
	return $dragblock_li_device;
}
