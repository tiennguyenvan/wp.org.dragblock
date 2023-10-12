<?php
/**
 * DragBlock's Editor-panel-content.
 *
 * @package Content render
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
add_filter( 'render_block_data', 'dragblock_content_parser', 10, 1 );
/**
 * Check Documentation#63
 *
 * @param object|array|string $dragblock_cr_parsed check var-def#63.
 */
function dragblock_content_parser( $dragblock_cr_parsed ) {
	// dev-reply#610.
	if ( empty( $dragblock_cr_parsed['attrs']['dragBlockText'] ) ) {
		return $dragblock_cr_parsed;
	}
	// dev-reply#614.
	$dragblock_cr_block = '';
	$dragblock_cr_content = '';
	// dev-reply#619.
	foreach ( $dragblock_cr_parsed['attrs']['dragBlockText'] as $dragblock_cr_english ) {
		// dev-reply#621.
		if (
			empty( $dragblock_cr_english['slug'] ) ||
			! isset( $dragblock_cr_english['value'] ) ||
			'' === $dragblock_cr_english['value'] ||
			! empty( $dragblock_cr_english['disabled'] )
		) {
			continue;
		}
		// dev-reply#631.
		if ( DRAGBLOCK_SITE_LOCALE === $dragblock_cr_english['slug'] ) {
			$dragblock_cr_block = $dragblock_cr_english['value'];
			break;
		}
		// dev-reply#637.
		if ( 'en_US' === $dragblock_cr_english['slug'] ) {
			$dragblock_cr_content = $dragblock_cr_english['value'];
			continue;
		}
	}
	// dev-reply#644.
	if ( '' === $dragblock_cr_block && '' !== $dragblock_cr_content ) {
		$dragblock_cr_block = $dragblock_cr_content;
	}
	// dev-reply#651.
	$dragblock_cr_block = do_shortcode( $dragblock_cr_block );
	if ( ( $dragblock_cr_block ) !== '' ) {
		$dragblock_cr_parsed['attrs']['dragBlockParsedContent'] = $dragblock_cr_block;
	}
	return $dragblock_cr_parsed;
}
add_filter( 'render_block', 'dragblock_content_inserter', 10, 2 );
/**
 * Check Documentation#646
 *
 * @param object|array|string $dragblock_cr_us check var-def#646.
 * @param object|array|string $dragblock_cr_parsed check var-def#646.
 */
function dragblock_content_inserter( $dragblock_cr_us, $dragblock_cr_parsed ) {
	if ( ! isset( $dragblock_cr_parsed['attrs']['dragBlockParsedContent'] ) || $dragblock_cr_parsed['attrs']['dragBlockParsedContent'] === '' ) {
		return $dragblock_cr_us;
	}
	$dragblock_cr_text = strrpos( $dragblock_cr_us, '</' );
	// dev-reply#681.
	if ( false === $dragblock_cr_text ) {
		return $dragblock_cr_us;
	}
	return (
		substr( $dragblock_cr_us, 0, $dragblock_cr_text ) .
		$dragblock_cr_parsed['attrs']['dragBlockParsedContent'] .
		substr( $dragblock_cr_us, $dragblock_cr_text )
	);
}
