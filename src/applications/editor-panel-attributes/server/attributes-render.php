<?php
/**
 * DragBlock's Editor-panel-attributes.
 *
 * @package Attributes render
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
add_filter( 'render_block_data', 'dragblock_attributes_parsing', 10, 1 );
/**
 * Check Documentation#163
 *
 * @param object|array|string $dragblock_ar_parsed check var-def#163.
 */
function dragblock_attributes_parsing( $dragblock_ar_parsed ) {
	if ( empty( $dragblock_ar_parsed['attrs']['dragBlockAttrs'] ) ) {
		return $dragblock_ar_parsed;
	}
	// dev-reply#1613.
	$dragblock_ar_block = array();
	foreach ( $dragblock_ar_parsed['attrs']['dragBlockAttrs'] as $dragblock_ar_renderedattrs ) {
		// dev-reply#1617.
		if (
			! empty( $dragblock_ar_renderedattrs['disabled'] ) ||
			! isset( $dragblock_ar_renderedattrs['value'] ) ||
			empty( $dragblock_ar_renderedattrs['slug'] )
		) {
			continue;
		}
		// dev-reply#1626.
		if ( ! empty( $dragblock_ar_renderedattrs['locale'] ) ) {
			// dev-reply#1631.
			if ( DRAGBLOCK_SITE_LOCALE === $dragblock_ar_renderedattrs['locale'] ) {
				$dragblock_ar_block[ $dragblock_ar_renderedattrs['slug'] ] = $dragblock_ar_renderedattrs['value'];
			} elseif ( 'en_US' === $dragblock_ar_renderedattrs['locale'] && empty( $dragblock_ar_block[ $dragblock_ar_renderedattrs['slug'] ] ) ) {
				$dragblock_ar_block[ $dragblock_ar_renderedattrs['slug'] ] = $dragblock_ar_renderedattrs['value'];
			}
			continue;
		}
		// dev-reply#1644.
		if ( 'sizes' === $dragblock_ar_renderedattrs['slug'] ) {
			if ( ! empty( $dragblock_ar_renderedattrs['devices'] ) && strlen( $dragblock_ar_renderedattrs['devices'] ) < 3 ) {
				if ( 'd' === $dragblock_ar_renderedattrs['devices'] ) {
					$dragblock_ar_renderedattrs['value'] = '(min-width: 1025px) ' . $dragblock_ar_renderedattrs['value'];
				}
				if ( 't' === $dragblock_ar_renderedattrs['devices'] ) {
					$dragblock_ar_renderedattrs['value'] = '(min-width: 768px) and (max-width: 1024px) ' . $dragblock_ar_renderedattrs['value'];
				}
				if ( 'm' === $dragblock_ar_renderedattrs['devices'] ) {
					$dragblock_ar_renderedattrs['value'] = '(max-width: 767px) ' . $dragblock_ar_renderedattrs['value'];
				}
				if ( 'dt' === $dragblock_ar_renderedattrs['devices'] || 'td' === $dragblock_ar_renderedattrs['devices'] ) {
					$dragblock_ar_renderedattrs['value'] = '(min-width: 768px) ' . $dragblock_ar_renderedattrs['value'];
				}
				if ( 'dm' === $dragblock_ar_renderedattrs['devices'] || 'md' === $dragblock_ar_renderedattrs['devices'] ) {
					$dragblock_ar_renderedattrs['value'] = '(min-width: 1025px) ' . $dragblock_ar_renderedattrs['value'] . ', (max-width: 767px) ' . $dragblock_ar_renderedattrs['value'];
				}
				if ( 'tm' === $dragblock_ar_renderedattrs['devices'] || 'mt' === $dragblock_ar_renderedattrs['devices'] ) {
					$dragblock_ar_renderedattrs['value'] = '(max-width: 1024px) ' . $dragblock_ar_renderedattrs['value'];
				}
			}
		}
		// dev-reply#1669.
		if ( empty( $dragblock_ar_block[ $dragblock_ar_renderedattrs['slug'] ] ) ) {
			$dragblock_ar_block[ $dragblock_ar_renderedattrs['slug'] ] = $dragblock_ar_renderedattrs['value'];
		} else {
			$dragblock_ar_block[ $dragblock_ar_renderedattrs['slug'] ] .= ', ' . $dragblock_ar_renderedattrs['value'];
		}
	}
	// dev-reply#1677.
	if ( 'dragblock/image' === $dragblock_ar_parsed['blockName'] ) {
		// dev-reply#1679.
		if ( empty( $dragblock_ar_block['loading'] ) ) {
			$dragblock_ar_block['loading'] = 'lazy';
		}
		if ( empty( $dragblock_ar_block['decoding'] ) ) {
			$dragblock_ar_block['decoding'] = 'async';
		}
		// dev-reply#1687.
		if ( ! empty( $dragblock_ar_block['src'] ) ) {
			// dev-reply#1689.
			if ( strpos( $dragblock_ar_block['src'], '[dragblock.post.image.src' ) !== false ) {
				// dev-reply#1691.
				if ( empty( $dragblock_ar_block['alt'] ) ) {
					$dragblock_ar_block['alt'] = '[dragblock.post.title]';
				}
				if ( empty( $dragblock_ar_block['srcset'] ) ) {
					$dragblock_ar_block['srcset'] = '[dragblock.post.image.srcset]';
				}
			} else {
				$dragblock_ar_attr = dragblock_get_image_srcsets( $dragblock_ar_block['src'] );
				if ( $dragblock_ar_attr ) {
					$dragblock_ar_block['srcset'] = $dragblock_ar_attr;
				}
			}
		}
		if ( empty( $dragblock_ar_block['alt'] ) ) {
			$dragblock_ar_srcsets = empty( $dragblock_ar_block['src'] ) ? '' : esc_attr( basename( $dragblock_ar_block['src'] ) );
			$dragblock_ar_block['alt'] = empty( $dragblock_ar_srcsets ) ? esc_html__( 'Just a placeholder', 'dragblock' ) : $dragblock_ar_srcsets;
		}
	}
	// dev-reply#16117.
	if ( 'dragblock/link' === $dragblock_ar_parsed['blockName'] ) {
		// dev-reply#16119.
		if ( empty( $dragblock_ar_block['aria-label'] ) ) {
			$dragblock_ar_block['aria-label'] = esc_html__( 'DragBlock Link Block', 'dragblock' );
		}
	}
	// dev-reply#16125.
	$dragblock_ar_alt = '';
	if ( ! empty( $dragblock_ar_block['name'] ) && dragblock_is_reseved_terms( $dragblock_ar_block['name'] ) ) {
		$dragblock_ar_block['name'] .= '__dragblock_wp_reseved_terms';
		// dev-reply#16142.
	}
	foreach ( $dragblock_ar_block as $dragblock_ar_attrstring => $dragblock_ar_slug ) {
		$dragblock_ar_alt .= ( sanitize_key( $dragblock_ar_attrstring ) . '="' . esc_attr( do_shortcode( $dragblock_ar_slug ) ) . '"' );
	}
	if ( $dragblock_ar_alt ) {
		$dragblock_ar_parsed['attrs']['dragBlockParsedAttrs'] = $dragblock_ar_alt;
	}
	return $dragblock_ar_parsed;
}
add_filter( 'render_block', 'dragblock_attributes_insert', 10, 2 );
/**
 * Check Documentation#16115
 *
 * @param object|array|string $dragblock_ar_value check var-def#16115.
 * @param object|array|string $dragblock_ar_parsed check var-def#16115.
 */
function dragblock_attributes_insert( $dragblock_ar_value, $dragblock_ar_parsed ) {
	if ( empty( $dragblock_ar_parsed['attrs']['dragBlockParsedAttrs'] ) ) {
		return $dragblock_ar_value;
	}
	$dragblock_ar_content = strpos( $dragblock_ar_value, '<' );
	if ( false === $dragblock_ar_content ) {
		return $dragblock_ar_value;
	}
	$dragblock_ar_tag = strpos( $dragblock_ar_value, ' ', $dragblock_ar_content );
	$dragblock_ar_start = strpos( $dragblock_ar_value, '>', $dragblock_ar_content );
	$dragblock_ar_first = $dragblock_ar_tag;
	if ( false === $dragblock_ar_first ) {
		$dragblock_ar_first = $dragblock_ar_start;
	} elseif ( false !== $dragblock_ar_start && $dragblock_ar_start < $dragblock_ar_first ) {
		$dragblock_ar_first = $dragblock_ar_start;
	}
	if ( false === $dragblock_ar_first ) {
		return $dragblock_ar_value;
	}
	return ( substr( $dragblock_ar_value, 0, $dragblock_ar_first ) . ' ' .
		$dragblock_ar_parsed['attrs']['dragBlockParsedAttrs'] .
		substr( $dragblock_ar_value, $dragblock_ar_first )
	);
}
