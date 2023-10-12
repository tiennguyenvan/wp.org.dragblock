<?php
/**
 * DragBlock's Wp.org.dragblock.
 *
 * @package Src
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
define( 'DRAGBLOCK_SITE_LOCALE', get_locale() );
define( 'DRAGBLOCK_URL', plugin_dir_url( DRAGBLOCK_FILE_PATH ) );
define( 'DRAGBLOCK_PATH', plugin_dir_path( DRAGBLOCK_FILE_PATH ) );
define( 'DRAGBLOCK_BUILD_URL', DRAGBLOCK_URL . 'build/' );
define( 'DRAGBLOCK_BUILD_PATH', DRAGBLOCK_PATH . 'build/' );
define( 'DRAGBLOCK_APP_URL', DRAGBLOCK_BUILD_URL . 'applications/' );
define( 'DRAGBLOCK_APP_PATH', DRAGBLOCK_BUILD_PATH . 'applications/' );
// dev-reply#311.
define( 'DRAGBLOCK_CUSTOM_DEFAULT_STYLE', false );
add_action( 'init', 'dragblock_init_defines', 1 );
/**
 * Check Documentation#312
 */
function dragblock_init_defines() {
	$dragblock_s_upload = wp_upload_dir();
	define( 'DRAGBLOCK_UPLOAD_DIR', $dragblock_s_upload['basedir'] . '/dragblock' );
	define( 'DRAGBLOCK_UPLOAD_URL', $dragblock_s_upload['baseurl'] . '/dragblock' );
	// dev-reply#323.
}
require_once 'library/server/index.php';
require_once 'applications/editor-init/server/index.php';
require_once 'applications/editor-panel-content/server/index.php';
require_once 'applications/editor-panel-appearance/server/index.php';
require_once 'applications/editor-panel-attributes/server/index.php';
require_once 'applications/editor-panel-interactions/server/index.php';
require_once 'applications/editor-panel-database/server/index.php'; // dev-reply#336.
require_once 'applications/editor-panel-renderability/server/index.php';
require_once 'blocks/block-register.php';
require_once 'applications/admin-menu/server/index.php';
require_once 'applications/form-entries/server/index.php';
require_once 'applications/font-library/server/index.php';
require_once 'applications/theme-settings/server/index.php';
require_once 'applications/shortcodes/server/index.php';
