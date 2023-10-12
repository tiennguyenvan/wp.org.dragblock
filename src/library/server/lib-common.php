<?php
/**
 * DragBlock's Library.
 *
 * @package Lib common
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
// dev-reply#193.
add_action( 'init', 'dragblock_block_start_session', 1 );
/**
 * Check Documentation#194
 */
function dragblock_block_start_session() {
	if ( ! session_id() ) {
		session_start();
	}
}
/**
 * Check Documentation#1910
 *
 * @param object|array|string $dragblock_lc_receiver check var-def#1910.
 * @param object|array|string $dragblock_lc_provider check var-def#1910.
 */
function dragblock_theme_json_merge( $dragblock_lc_receiver, $dragblock_lc_provider ) {
	// dev-reply#1914.
	if ( ! is_array( $dragblock_lc_receiver ) || ! is_array( $dragblock_lc_provider ) ) {
		return $dragblock_lc_receiver;
	}
	foreach ( $dragblock_lc_provider as $dragblock_lc_key => $dragblock_lc_value ) {
		// dev-reply#1921.
		if ( is_array( $dragblock_lc_value ) && key( $dragblock_lc_value ) === 0 ) {
			continue;
		}
		// dev-reply#1925.
		if ( ! isset( $dragblock_lc_receiver[ $dragblock_lc_key ] ) ) {
			$dragblock_lc_receiver[ $dragblock_lc_key ] = $dragblock_lc_value;
			continue;
		}
		// dev-reply#1932.
		$dragblock_lc_receiver[ $dragblock_lc_key ] = dragblock_theme_json_merge( $dragblock_lc_receiver[ $dragblock_lc_key ], $dragblock_lc_value );
	}
	return $dragblock_lc_receiver;
}
/**
 * Check Documentation#1931
 *
 * @param object|array|string $dragblock_lc_path check var-def#1931.
 */
function dragblock_url( $dragblock_lc_path ) {
	return DRAGBLOCK_URL . '/' . $dragblock_lc_path;
	// dev-reply#1946.
}
/**
 * Check Documentation#1936
 *
 * @param object|array|string $dragblock_lc_attachment check var-def#1936.
 */
function dragblock_get_image_srcsets( $dragblock_lc_attachment ) {
	// dev-reply#1955.
	if ( ! is_numeric( $dragblock_lc_attachment ) ) {
		$dragblock_lc_attachment = attachment_url_to_postid( $dragblock_lc_attachment );
		if ( ! $dragblock_lc_attachment ) {
			return '';
		}
	}
	// dev-reply#1963.
	$dragblock_lc_attachment = (int) $dragblock_lc_attachment;
	$dragblock_lc_id = get_intermediate_image_sizes(); // dev-reply#1966.
	$dragblock_lc_image = array();
	foreach ( $dragblock_lc_id as $dragblock_lc_sizes ) {
		$dragblock_lc_srcset = wp_get_attachment_image_src( $dragblock_lc_attachment, $dragblock_lc_sizes );
		if ( $dragblock_lc_srcset ) {
			$dragblock_lc_image[ $dragblock_lc_srcset[1] . 'w' ] = $dragblock_lc_srcset[0];
		}
	}
	$dragblock_lc_values = '';
	foreach ( $dragblock_lc_image as $dragblock_lc_size => $dragblock_lc_src ) {
		$dragblock_lc_values .= $dragblock_lc_src . ' ' . $dragblock_lc_size . ', ';
	}
	// dev-reply#1983.
	$dragblock_lc_values = rtrim( $dragblock_lc_values, ', ' );
	return $dragblock_lc_values;
}
/**
 * Check Documentation#1963
 *
 * @param object|array|string $dragblock_lc_width check var-def#1963.
 */
function dragblock_is_reseved_terms( $dragblock_lc_width ) {
	$dragblock_lc_url = array(
		'action',
		'attachment',
		'attachment_id',
		'author',
		'author_name',
		'calendar',
		'cat',
		'category',
		'category__and',
		'category__in',
		'category__not_in',
		'category_name',
		'comments_per_page',
		'comments_popup',
		'custom',
		'customize_messenger_channel',
		'customized',
		'cpage',
		'day',
		'debug',
		'embed',
		'error',
		'exact',
		'feed',
		'fields',
		'hour',
		'link_category',
		'm',
		'minute',
		'monthnum',
		'more',
		'name',
		'nav_menu',
		'nonce',
		'nopaging',
		'offset',
		'order',
		'orderby',
		'p',
		'page',
		'page_id',
		'paged',
		'pagename',
		'pb',
		'perm',
		'post',
		'post__in',
		'post__not_in',
		'post_format',
		'post_mime_type',
		'post_status',
		'post_tag',
		'post_type',
		'posts',
		'posts_per_archive_page',
		'posts_per_page',
		'preview',
		'robots',
		's',
		'search',
		'second',
		'sentence',
		'showposts',
		'static',
		'status',
		'subpost',
		'subpost_id',
		'tag',
		'tag__and',
		'tag__in',
		'tag__not_in',
		'tag_id',
		'tag_slug__and',
		'tag_slug__in',
		'taxonomy',
		'tb',
		'term',
		'terms',
		'theme',
		'title',
		'type',
		'types',
		'w',
		'withcomments',
		'withoutcomments',
		'year',
		'about',
		'accordion',
		'admin-bar',
		'admin-bar',
		'admin-comments',
		'admin-gallery',
		'admin-menu',
		'admin-tags',
		'admin-widgets',
		'autosave',
		'backbone',
		'buttons',
		'clipboard',
		'code-editor',
		'code-editor',
		'colorpicker',
		'colors',
		'colors-fresh',
		'comment',
		'comment-reply',
		'common',
		'common',
		'cropper',
		'csslint',
		'custom-background',
		'custom-header',
		'custom-html-widgets',
		'customize-base',
		'customize-controls',
		'customize-controls',
		'customize-loader',
		'customize-models',
		'customize-nav-menus',
		'customize-nav-menus',
		'customize-preview',
		'customize-preview',
		'customize-preview-nav-menus',
		'customize-preview-widgets',
		'customize-selective-refresh',
		'customize-views',
		'customize-widgets',
		'customize-widgets',
		'dashboard',
		'dashboard',
		'dashicons',
		'deprecated-media',
		'edit',
		'editor',
		'editor-buttons',
		'editor-expand',
		'esprima',
		'farbtastic',
		'farbtastic',
		'forms',
		'handle',
		'heartbeat',
		'hoverIntent',
		'hoverintent-js',
		'htmlhint',
		'htmlhint-kses',
		'image-edit',
		'imagesloaded',
		'imgareaselect',
		'imgareaselect',
		'inline-edit-post',
		'inline-edit-tax',
		'install',
		'iris',
		'jcrop',
		'jcrop',
		'jquery',
		'jquery-color',
		'jquery-core',
		'jquery-effects-blind',
		'jquery-effects-bounce',
		'jquery-effects-clip',
		'jquery-effects-core',
		'jquery-effects-drop',
		'jquery-effects-explode',
		'jquery-effects-fade',
		'jquery-effects-fold',
		'jquery-effects-highlight',
		'jquery-effects-puff',
		'jquery-effects-pulsate',
		'jquery-effects-scale',
		'jquery-effects-shake',
		'jquery-effects-size',
		'jquery-effects-slide',
		'jquery-effects-transfer',
		'jquery-form',
		'jquery-hotkeys',
		'jquery-masonry',
		'jquery-migrate',
		'jquery-query',
		'jquery-serialize-object',
		'jquery-table-hotkeys',
		'jquery-touch-punch',
		'jquery-ui-accordion',
		'jquery-ui-autocomplete',
		'jquery-ui-button',
		'jquery-ui-core',
		'jquery-ui-datepicker',
		'jquery-ui-dialog',
		'jquery-ui-draggable',
		'jquery-ui-droppable',
		'jquery-ui-menu',
		'jquery-ui-mouse',
		'jquery-ui-position',
		'jquery-ui-progressbar',
		'jquery-ui-resizable',
		'jquery-ui-selectable',
		'jquery-ui-selectmenu',
		'jquery-ui-slider',
		'jquery-ui-sortable',
		'jquery-ui-spinner',
		'jquery-ui-tabs',
		'jquery-ui-tooltip',
		'jquery-ui-widget',
		'jshint',
		'json2',
		'jsonlint',
		'l10n',
		'language-chooser',
		'link',
		'list-revisions',
		'list-tables',
		'login',
		'masonry',
		'mce-view',
		'media',
		'media',
		'media-audio-widget',
		'media-audiovideo',
		'media-editor',
		'media-gallery',
		'media-gallery-widget',
		'media-grid',
		'media-image-widget',
		'media-models',
		'media-upload',
		'media-video-widget',
		'media-views',
		'media-views',
		'media-widgets',
		'mediaelement',
		'mediaelement',
		'mediaelement-core',
		'mediaelement-migrate',
		'mediaelement-vimeo',
		'moxiejs',
		'nav-menu',
		'nav-menus',
		'open-sans',
		'password-strength-meter',
		'plugin-install',
		'plupload',
		'plupload-handlers',
		'post',
		'postbox',
		'privacy-tools',
		'prototype',
		'quicktags',
		'revisions',
		'revisions',
		'sack',
		'schedule',
		'scriptaculous',
		'scriptaculous-builder',
		'scriptaculous-controls',
		'scriptaculous-dragdrop',
		'scriptaculous-effects',
		'scriptaculous-root',
		'scriptaculous-slider',
		'scriptaculous-sound',
		'set-post-thumbnail',
		'shortcode',
		'site-health',
		'site-health',
		'site-icon',
		'suggest',
		'svg-painter',
		'swfobject',
		'swfupload',
		'swfupload-all',
		'swfupload-handlers',
		'tags-box',
		'tags-suggest',
		'text-widgets',
		'theme',
		'themes',
		'thickbox',
		'thickbox',
		'underscore',
		'updates',
		'user-profile',
		'user-suggest',
		'utils',
		'widgets',
		'word-count',
		'wp-admin',
		'wp-ajax-response',
		'wp-api',
		'wp-api-request',
		'wp-auth-check',
		'wp-auth-check',
		'wp-backbone',
		'wp-block-library-theme',
		'wp-codemirror',
		'wp-codemirror',
		'wp-color-picker',
		'wp-color-picker',
		'wp-custom-header',
		'wp-edit-blocks',
		'wp-editor-font',
		'wp-embed',
		'wp-embed-template-ie',
		'wp-jquery-ui-dialog',
		'wp-lists',
		'wp-mediaelement',
		'wp-mediaelement',
		'wp-playlist',
		'wp-plupload',
		'wp-pointer',
		'wp-pointer',
		'wp-polyfill',
		'wp-sanitize',
		'wp-theme-plugin-editor',
		'wp-tinymce',
		'wp-tinymce',
		'wp-tinymce-lists',
		'wp-tinymce-root',
		'wp-util',
		'wpdialogs',
		'wplink',
		'xfn',
		'zxcvbn-async',
	);
	return in_array( $dragblock_lc_width, $dragblock_lc_url );
}
