<?php
/**
 * DragBlock's Form-entries.
 *
 * @package Form custom post type
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
// dev-reply#64.
add_action( 'init', 'dragblock_register_post_type_form_entries' );
/**
 * Check Documentation#64
 */
function dragblock_register_post_type_form_entries() {
	$dragblock_fcpt_labels = array(
		'name'                  => esc_html__( 'DragBlock Form Entries', 'dragblock' ),
		'singular_name'         => esc_html__( 'DragBlock Form Entry', 'dragblock' ),
		'menu_name'             => esc_html__( 'Block Form Entry', 'dragblock' ),
		'name_admin_bar'        => esc_html__( 'Block Form Entry', 'dragblock' ),
		'add_new'               => esc_html__( 'Add New', 'dragblock' ),
		'add_new_item'          => esc_html__( 'Add New DragBlock Form Entry', 'dragblock' ),
		'new_item'              => esc_html__( 'New DragBlock Form Entry', 'dragblock' ),
		'edit_item'             => esc_html__( 'Edit DragBlock Form Entry', 'dragblock' ),
		'view_item'             => esc_html__( 'View DragBlock Form Entry', 'dragblock' ),
		'all_items'             => esc_html__( 'All DragBlock Forms', 'dragblock' ),
		'search_items'          => esc_html__( 'Search DragBlock Forms', 'dragblock' ),
		'parent_item_colon'     => esc_html__( 'Parent DragBlock Forms:', 'dragblock' ),
		'not_found'             => esc_html__( 'No DragBlock Forms found.', 'dragblock' ),
		'not_found_in_trash'    => esc_html__( 'No DragBlock Forms found in Trash.', 'dragblock' ),
		'archives'              => esc_html__( 'DragBlock Form Archives', 'dragblock' ),
		'attributes'            => esc_html__( 'DragBlock Form Attributes', 'dragblock' ),
		'insert_into_item'      => esc_html__( 'Insert into DragBlock Form', 'dragblock' ),
		'uploaded_to_this_item' => esc_html__( 'Uploaded to this DragBlock Form', 'dragblock' ),
		'featured_image'        => esc_html__( 'Featured Image', 'dragblock' ),
		'set_featured_image'    => esc_html__( 'Set featured image', 'dragblock' ),
		'remove_featured_image' => esc_html__( 'Remove featured image', 'dragblock' ),
		'use_featured_image'    => esc_html__( 'Use as featured image', 'dragblock' ),
		'filter_items_list'     => esc_html__( 'Filter DragBlock Forms list', 'dragblock' ),
		'items_list_navigation' => esc_html__( 'DragBlock Forms list navigation', 'dragblock' ),
		'items_list'            => esc_html__( 'DragBlock Forms list', 'dragblock' ),
	);
	$dragblock_fcpt_args = array(
		'labels'              => $dragblock_fcpt_labels,
		'public'              => true,
		'publicly_queryable'  => true,
		'show_ui'             => true,
		'show_in_menu'        => false,
		'query_var'           => true,
		'rewrite'             => array( 'slug' => DRAGBLOCK_FORM_ENTRY ),
		// dev-reply#644.
		'has_archive'         => true,
		'hierarchical'        => false,
		'menu_position'       => 1,
		'supports'            => array( 'title', 'editor', 'custom-fields' ),
		'menu_icon'           => 'dashicons-email',
		'show_in_rest'        => true,
		'exclude_from_search' => true,
	);
	register_post_type( DRAGBLOCK_FORM_ENTRY, $dragblock_fcpt_args );
}
