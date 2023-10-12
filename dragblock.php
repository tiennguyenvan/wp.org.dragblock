<?php

/**
 * Plugin Name: DragBlock
 * Plugin URI: https://dragblock.com/
 * Requires at least: 5.9
 * Requires PHP: 7.0
 * Version: 23.10.12
 * Author: DragBlock.Com
 * Author URI: https://dragblock.com
 * License: GPLv2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Description: Design stunning websites without any coding knowledge using DragBlock, the feature-rich Gutenberg plugin for lightning-fast site creation.
 * Text Domain: dragblock
 * Domain Path: /languages
 *
 * @package dragblock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
if ( ! defined( 'WPINC' ) ) {
	die;
}
define( 'DRAGBLOCK_FILE_PATH', __FILE__ );
define( 'DRAGBLOCK_OPENSSL_CONF', isset( $_SERVER['OPENSSL_CONF'] ) ? sanitize_text_field( wp_unslash( $_SERVER['OPENSSL_CONF'] ) ) : '' );
define(
	'DRAGBLOCK_IS_LOCAL',
	strpos( DRAGBLOCK_OPENSSL_CONF, 'C:/' ) === 0 ||
	strpos( DRAGBLOCK_OPENSSL_CONF, 'D:/' ) === 0 ||
	strpos( DRAGBLOCK_OPENSSL_CONF, 'E:/' ) === 0
);
define( 'DRAGBLOCK_VERSION', DRAGBLOCK_IS_LOCAL ? time() : '23.10.12' );
require_once 'build/index.php';
