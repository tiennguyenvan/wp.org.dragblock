<?php
/**
 * DragBlock's Editor-panel-database.
 *
 * @package Database render
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
global $dragblock_queries;
global $dragblock_current_query_list_id;
global $dragblock_current_query_list_item_id;
$dragblock_queries = null;
$dragblock_current_query_list_id = null;
$dragblock_current_query_list_item_id = null;
add_filter( 'render_block_data', 'dragblock_database_collector', 10, 1 );
/**
 * Check Documentation#109
 *
 * @param object|array|string $dragblock_dr_dragblock check var-def#109.
 */
function dragblock_database_collector( $dragblock_dr_dragblock ) {
	// dev-reply#1037.
	if ( empty( $dragblock_dr_dragblock['attrs']['dragBlockClientId'] ) ) {
		return $dragblock_dr_dragblock;
	}
	// dev-reply#1048.
	global $dragblock_queries;
	global $dragblock_current_query_list_id;
	global $dragblock_current_query_list_item_id;
	// dev-reply#1054.
	if ( empty( $dragblock_queries ) ) {
		global $wp_query;
		$dragblock_current_query_list_id = 'default';
		$dragblock_current_query_list_item_id = null;
		$dragblock_queries[ $dragblock_current_query_list_id ] = array();
		if ( property_exists( $wp_query, 'posts' ) && is_array( $wp_query->posts ) ) {
			foreach ( $wp_query->posts as $dragblock_dr_queries ) {
				array_push( $dragblock_queries[ $dragblock_current_query_list_id ], $dragblock_dr_queries->ID );
			}
		}
	}
	// dev-reply#1069.
	if ( ! empty( $dragblock_dr_dragblock['attrs']['dragBlockQueries'] ) ) {
		foreach ( $dragblock_dr_dragblock['attrs']['dragBlockQueries'] as $dragblock_dr_current ) {
			if ( ! empty( $dragblock_dr_current['disabled'] ) ) {
				continue;
			}
			$dragblock_dr_query = $dragblock_dr_current['slug'];
			$dragblock_dr_list = $dragblock_dr_current['id'];
			if ( empty( $dragblock_dr_current['params'] ) ) {
				$dragblock_dr_current['params'] = array();
			}
			$dragblock_dr_id = $dragblock_dr_current['params'];
			// dev-reply#1085.
			if ( in_array( $dragblock_dr_query, array( 'WP_Query', 'WP_Query_Default' ) ) ) {
				$dragblock_dr_item = array(
					'fields' => 'ids',
				);
				foreach ( $dragblock_dr_current['params'] as $dragblock_dr_parsed ) {
					if ( ! empty( $dragblock_dr_parsed['disabled'] ) || empty( $dragblock_dr_parsed['value'] ) ) {
						continue;
					}
					// dev-reply#1097.
					$dragblock_dr_block = $dragblock_dr_parsed['slug'];
					$dragblock_dr_wp = $dragblock_dr_parsed['value'];
					// dev-reply#10103.
					if ( 'ignore_loaded_posts' === $dragblock_dr_block ) {
						if ( $dragblock_dr_wp ) {
							$dragblock_dr_item['post__not_in'] = array_merge( ...array_values( $dragblock_queries ) );
						}
						continue;
					}
					// dev-reply#10112.
					if ( strpos( $dragblock_dr_wp, '[dragblock.' ) !== false ) {
						$dragblock_dr_wp = do_shortcode( $dragblock_dr_wp );
					}
					// dev-reply#10117.
					if ( strpos( $dragblock_dr_block, '__' ) !== false ) {
						$dragblock_dr_item[ $dragblock_dr_block ] = explode( ',', $dragblock_dr_wp );
						continue;
					}
					$dragblock_dr_item[ $dragblock_dr_block ] = $dragblock_dr_wp;
				}
				$dragblock_current_query_list_id = $dragblock_dr_list;
				if ( 'WP_Query' === $dragblock_dr_query ) {
					$dragblock_queries[ $dragblock_current_query_list_id ] = new WP_Query( $dragblock_dr_item );
					$dragblock_queries[ $dragblock_current_query_list_id ] = $dragblock_queries[ $dragblock_current_query_list_id ]->posts;
					// dev-reply#10133.
					$dragblock_current_query_list_item_id = null;
				} elseif ( 'WP_Query_Default' === $dragblock_dr_query ) {
					// dev-reply#10136.
					$dragblock_current_query_list_item_id = null;
					$dragblock_current_query_list_id = 'default';
				}
			}
			// dev-reply#10142.
			if ( 'parse_item' === $dragblock_dr_query ) {
				if ( ! empty( $dragblock_dr_id['query_id'] ) ) {
					$dragblock_current_query_list_id = $dragblock_dr_id['query_id'];
				}
				if ( ! empty( $dragblock_dr_id['item_index'] ) ) {
					$dragblock_current_query_list_item_id = intval( $dragblock_dr_id['item_index'] );
				} elseif ( null === $dragblock_current_query_list_item_id ) {
					$dragblock_current_query_list_item_id = 0;
				} else {
					$dragblock_current_query_list_item_id++;
				}
			}
		}
	}
	return $dragblock_dr_dragblock;
}
