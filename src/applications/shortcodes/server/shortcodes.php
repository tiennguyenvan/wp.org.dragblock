<?php
/**
 * DragBlock's Shortcodes.
 *
 * @package Shortcodes
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
// dev-reply#242.
/**
 * Check Documentation#243
 */
function dragblock_get_current_list_query_id() {
	global $dragblock_queries;
	global $dragblock_current_query_list_id;
	global $dragblock_current_query_list_item_id;
	// dev-reply#2417.
	if ( null === $dragblock_current_query_list_item_id ) {
		$dragblock_current_query_list_item_id = 0;
	}
	$dragblock_s_dragblock = null;
	if (
		null !== $dragblock_current_query_list_id &&
		! empty( $dragblock_queries ) &&
		! empty( $dragblock_queries[ $dragblock_current_query_list_id ] ) &&
		! empty( $dragblock_queries[ $dragblock_current_query_list_id ][ $dragblock_current_query_list_item_id ] )
	) {
		$dragblock_s_dragblock = $dragblock_queries[ $dragblock_current_query_list_id ][ $dragblock_current_query_list_item_id ];
	}
	return $dragblock_s_dragblock;
}
add_shortcode( 'dragblock.post.snippet', 'dragblock_shortcode_post_snippet' );
/**
 * Check Documentation#2424
 *
 * @param object|array|string $dragblock_s_queries check var-def#2424.
 */
function dragblock_shortcode_post_snippet( $dragblock_s_queries ) {
	$dragblock_s_current = dragblock_get_current_list_query_id();
	$dragblock_s_query = '125';
	if ( null === $dragblock_s_current ) {
		return '';
	}
	// dev-reply#2453.
	$dragblock_s_list = '';
	$dragblock_s_id = ! empty( $dragblock_s_queries['len'] ) ? sanitize_text_field( $dragblock_s_queries['len'] ) : $dragblock_s_query;
	if ( empty( $dragblock_s_id ) || ! is_numeric( $dragblock_s_id ) ) {
		$dragblock_s_id = $dragblock_s_query;
	}
	$dragblock_s_id = (int) $dragblock_s_id;
	if ( has_excerpt( $dragblock_s_current ) ) {
		$dragblock_s_list = get_the_excerpt( $dragblock_s_current );
	} else {
		$dragblock_s_list = get_the_content( null, false, $dragblock_s_current );
	}
	if ( strlen( $dragblock_s_list ) > $dragblock_s_id ) {
		$dragblock_s_item = count( explode( ' ', $dragblock_s_list ) );
		$dragblock_s_attrs = strlen( $dragblock_s_list ) / $dragblock_s_item;
		$dragblock_s_post = (int) ( $dragblock_s_id / $dragblock_s_attrs );
		$dragblock_s_list = wp_trim_words( $dragblock_s_list, $dragblock_s_post, '...' );
	}
	// dev-reply#2474.
	return $dragblock_s_list;
}
add_shortcode( 'dragblock.post.title', 'dragblock_shortcode_post_title' );
/**
 * Check Documentation#2453
 *
 * @param object|array|string $dragblock_s_queries check var-def#2453.
 */
function dragblock_shortcode_post_title( $dragblock_s_queries ) {
	$dragblock_s_current = dragblock_get_current_list_query_id();
	if ( null === $dragblock_s_current ) {
		return '';
	}
	return get_the_title( $dragblock_s_current );
}
add_shortcode( 'dragblock.post.url', 'dragblock_shortcode_post_url' );
/**
 * Check Documentation#2462
 *
 * @param object|array|string $dragblock_s_queries check var-def#2462.
 */
function dragblock_shortcode_post_url( $dragblock_s_queries ) {
	$dragblock_s_current = dragblock_get_current_list_query_id();
	if ( null === $dragblock_s_current ) {
		return 'javascript:void(0)';
	}
	return get_the_permalink( $dragblock_s_current );
}
add_shortcode( 'dragblock.post.comment.number', 'dragblock_shortcode_post_comment_number' );
/**
 * Check Documentation#2471
 *
 * @param object|array|string $dragblock_s_queries check var-def#2471.
 */
function dragblock_shortcode_post_comment_number( $dragblock_s_queries ) {
	$dragblock_s_current = dragblock_get_current_list_query_id();
	if ( null === $dragblock_s_current ) {
		return '';
	}
	return get_comments_number( $dragblock_s_current );
}
add_shortcode( 'dragblock.post.image.src', 'dragblock_shortcode_post_image_src' );
/**
 * Check Documentation#2480
 *
 * @param object|array|string $dragblock_s_queries check var-def#2480.
 */
function dragblock_shortcode_post_image_src( $dragblock_s_queries ) {
	$dragblock_s_def = isset( $dragblock_s_queries['size'] ) ? sanitize_text_field( $dragblock_s_queries['size'] ) : 'full';
	$dragblock_s_current = dragblock_get_current_list_query_id();
	if ( null === $dragblock_s_current ) {
		return 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
	}
	// dev-reply#24134.
	if ( has_post_thumbnail( $dragblock_s_current ) ) {
		$dragblock_s_len = get_the_post_thumbnail_url( $dragblock_s_current, $dragblock_s_def );
		return $dragblock_s_len;
	}
	// dev-reply#24140.
	$dragblock_s_snippet = get_post_field( 'post_content', $dragblock_s_current );
	if ( $dragblock_s_snippet ) {
		$dragblock_s_word = new DOMDocument();
		@$dragblock_s_word->loadHTML( $dragblock_s_snippet );
		$dragblock_s_count = $dragblock_s_word->getElementsByTagName( 'img' );
		if ( count( $dragblock_s_count ) > 0 ) {
			$dragblock_s_len = $dragblock_s_count[0]->getAttribute( 'src' );
			return $dragblock_s_len;
		}
		// dev-reply#24154.
		$dragblock_s_max = '/<iframe.*?src="(https?:\/\/www\.youtube\.com\/embed\/([\w-]+))".*?><\/iframe>/i';
		preg_match( $dragblock_s_max, $dragblock_s_snippet, $dragblock_s_size );
		if ( count( $dragblock_s_size ) > 0 ) {
			$dragblock_s_image = $dragblock_s_size[2];
			$dragblock_s_len = 'https://img.youtube.com/vi/' . $dragblock_s_image . '/hqdefault.jpg';
			return $dragblock_s_len;
		}
	}
	// dev-reply#24167.
	return 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
	// dev-reply#24171.
}
add_shortcode( 'dragblock.post.image.srcset', 'dragblock_shortcode_post_image_srcset' );
/**
 * Check Documentation#24116
 *
 * @param object|array|string $dragblock_s_queries check var-def#24116.
 */
function dragblock_shortcode_post_image_srcset( $dragblock_s_queries ) {
	$dragblock_s_current = dragblock_get_current_list_query_id();
	if ( null === $dragblock_s_current || ! has_post_thumbnail( $dragblock_s_current ) ) {
		return '';
	}
	// dev-reply#24197.
	$dragblock_s_url = get_post_thumbnail_id( $dragblock_s_current );
	$dragblock_s_content = wp_get_attachment_image_srcset( $dragblock_s_url );
	return $dragblock_s_content;
}
add_shortcode( 'dragblock.post.image.sizes', 'dragblock_shortcode_post_image_sizes' );
/**
 * Check Documentation#24128
 *
 * @param object|array|string $dragblock_s_queries check var-def#24128.
 */
function dragblock_shortcode_post_image_sizes( $dragblock_s_queries ) {
	$dragblock_s_def = isset( $dragblock_s_queries['size'] ) ? sanitize_text_field( $dragblock_s_queries['size'] ) : 'full';
	// dev-reply#24212.
	if ( 'full' === $dragblock_s_def ) {
		return '';
	}
	// dev-reply#24217.
	if ( 'large' === $dragblock_s_def ) {
		return '75vw';
		// dev-reply#24220.
	}
	if ( 'medium' === $dragblock_s_def ) {
		return '50vw';
		// dev-reply#24225.
	}
	if ( 'thumbnail' === $dragblock_s_def ) {
		return '25vw';
		// dev-reply#24230.
	}
}
add_shortcode( 'dragblock.post.date', 'dragblock_shortcode_post_date' );
/**
 * Check Documentation#24150
 *
 * @param object|array|string $dragblock_s_queries check var-def#24150.
 */
function dragblock_shortcode_post_date( $dragblock_s_queries ) {
	$dragblock_s_current = dragblock_get_current_list_query_id();
	if ( null === $dragblock_s_current ) {
		return '';
	}
	// dev-reply#24245.
	$dragblock_s_doc = get_post_field( 'post_date', $dragblock_s_current );
	// dev-reply#24248.
	$dragblock_s_img = get_option( 'date_format' );
	// dev-reply#24251.
	$dragblock_s_tags = date_i18n( $dragblock_s_img, strtotime( $dragblock_s_doc ) );
	return $dragblock_s_tags;
}
add_shortcode( 'dragblock.post.author.url', 'dragblock_shortcode_post_author_url' );
/**
 * Check Documentation#24165
 *
 * @param object|array|string $dragblock_s_queries check var-def#24165.
 */
function dragblock_shortcode_post_author_url( $dragblock_s_queries ) {
	$dragblock_s_current = dragblock_get_current_list_query_id();
	if ( null === $dragblock_s_current ) {
		return '';
	}
	// dev-reply#24266.
	$dragblock_s_pattern = get_post_field( 'post_author', $dragblock_s_current );
	// dev-reply#24269.
	$dragblock_s_matches = get_author_posts_url( $dragblock_s_pattern );
	return esc_url_raw( $dragblock_s_matches );
}
add_shortcode( 'dragblock.post.author.name', 'dragblock_shortcode_post_author_name' );
/**
 * Check Documentation#24178
 *
 * @param object|array|string $dragblock_s_queries check var-def#24178.
 */
function dragblock_shortcode_post_author_name( $dragblock_s_queries ) {
	$dragblock_s_current = dragblock_get_current_list_query_id();
	if ( null === $dragblock_s_current ) {
		return '';
	}
	// dev-reply#24284.
	$dragblock_s_pattern = get_post_field( 'post_author', $dragblock_s_current );
	// dev-reply#24287.
	$dragblock_s_video = get_the_author_meta( 'display_name', $dragblock_s_pattern );
	// dev-reply#24290.
	return $dragblock_s_video;
}
add_shortcode( 'dragblock.post.author.avatar.src', 'dragblock_shortcode_post_author_avatar_src' );
/**
 * Check Documentation#24192
 *
 * @param object|array|string $dragblock_s_queries check var-def#24192.
 */
function dragblock_shortcode_post_author_avatar_src( $dragblock_s_queries ) {
	$dragblock_s_current = dragblock_get_current_list_query_id();
	if ( null === $dragblock_s_current ) {
		return '';
	}
	// dev-reply#24302.
	$dragblock_s_pattern = get_post_field( 'post_author', $dragblock_s_current );
	// dev-reply#24305.
	$dragblock_s_srcset = get_avatar_url( $dragblock_s_pattern );
	return esc_url_raw( $dragblock_s_srcset );
}
add_shortcode( 'dragblock.post.cat.name', 'dragblock_shortcode_post_cat_name' );
/**
 * Check Documentation#24205
 *
 * @param object|array|string $dragblock_s_queries check var-def#24205.
 */
function dragblock_shortcode_post_cat_name( $dragblock_s_queries ) {
	$dragblock_s_current = dragblock_get_current_list_query_id();
	if ( null === $dragblock_s_current ) {
		return '';
	}
	$dragblock_s_date = get_the_category( $dragblock_s_current );
	if ( ! empty( $dragblock_s_date ) ) {
		foreach ( $dragblock_s_date as $dragblock_s_format ) {
			if ( 0 === $dragblock_s_format->category_parent ) {
				return $dragblock_s_format->name;
			}
		}
	}
	return ''; // dev-reply#24337.
}
add_shortcode( 'dragblock.post.cat.url', 'dragblock_shortcode_post_cat_url' );
/**
 * Check Documentation#24222
 *
 * @param object|array|string $dragblock_s_queries check var-def#24222.
 */
function dragblock_shortcode_post_cat_url( $dragblock_s_queries ) {
	$dragblock_s_current = dragblock_get_current_list_query_id();
	if ( null === $dragblock_s_current ) {
		return '';
	}
	$dragblock_s_date = get_the_category( $dragblock_s_current );
	if ( ! empty( $dragblock_s_date ) ) {
		foreach ( $dragblock_s_date as $dragblock_s_format ) {
			if ( 0 === $dragblock_s_format->category_parent ) {
				return esc_url_raw( get_category_link( $dragblock_s_format->term_id ) );
			}
		}
	}
	return '#empty_cat_id'; // dev-reply#24363.
}
add_shortcode( 'dragblock.post.cat.id', 'dragblock_shortcode_post_cat_id' );
/**
 * Check Documentation#24239
 *
 * @param object|array|string $dragblock_s_queries check var-def#24239.
 */
function dragblock_shortcode_post_cat_id( $dragblock_s_queries ) {
	$dragblock_s_current = dragblock_get_current_list_query_id();
	if ( null === $dragblock_s_current ) {
		return '';
	}
	$dragblock_s_date = get_the_category( $dragblock_s_current );
	if ( ! empty( $dragblock_s_date ) ) {
		foreach ( $dragblock_s_date as $dragblock_s_format ) {
			if ( 0 === $dragblock_s_format->category_parent ) {
				return $dragblock_s_format->term_id;
			}
		}
	}
	return - 1;
}
// dev-reply#24394.
add_shortcode( 'dragblock.share.url.twitter', 'dragblock_shortcode_share_url_twitter' );
/**
 * Check Documentation#24257
 *
 * @param object|array|string $dragblock_s_queries check var-def#24257.
 */
function dragblock_shortcode_share_url_twitter( $dragblock_s_queries ) {
	if ( empty( $_SERVER['REQUEST_URI'] ) ) {
		return '';
	}
	return 'https://twitter.com/intent/tweet?text=' . esc_url_raw( sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ) ) );
}
add_shortcode( 'dragblock.share.url.facebook', 'dragblock_shortcode_share_url_facebook' );
/**
 * Check Documentation#24265
 *
 * @param object|array|string $dragblock_s_queries check var-def#24265.
 */
function dragblock_shortcode_share_url_facebook( $dragblock_s_queries ) {
	if ( empty( $_SERVER['REQUEST_URI'] ) ) {
		return '';
	}
	return 'https://www.facebook.com/sharer/sharer.php?u=' . esc_url_raw( sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ) ) );
}
add_shortcode( 'dragblock.share.url.whatsapp', 'dragblock_shortcode_share_url_whatsapp' );
/**
 * Check Documentation#24273
 *
 * @param object|array|string $dragblock_s_queries check var-def#24273.
 */
function dragblock_shortcode_share_url_whatsapp( $dragblock_s_queries ) {
	if ( empty( $_SERVER['REQUEST_URI'] ) ) {
		return '';
	}
	return 'https://wa.me/?text=' . esc_url_raw( sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ) ) );
}
add_shortcode( 'dragblock.share.url.telegram', 'dragblock_shortcode_share_url_telegram' );
/**
 * Check Documentation#24281
 *
 * @param object|array|string $dragblock_s_queries check var-def#24281.
 */
function dragblock_shortcode_share_url_telegram( $dragblock_s_queries ) {
	if ( empty( $_SERVER['REQUEST_URI'] ) ) {
		return '';
	}
	return 'https://t.me/share/url?url=' . esc_url_raw( sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ) ) );
}
add_shortcode( 'dragblock.share.url.tumblr', 'dragblock_shortcode_share_url_tumblr' );
/**
 * Check Documentation#24289
 *
 * @param object|array|string $dragblock_s_queries check var-def#24289.
 */
function dragblock_shortcode_share_url_tumblr( $dragblock_s_queries ) {
	if ( empty( $_SERVER['REQUEST_URI'] ) ) {
		return '';
	}
	return 'https://www.tumblr.com/widgets/share/tool?canonicalUrl=' . esc_url_raw( sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ) ) );
}
add_shortcode( 'dragblock.share.url.reddit', 'dragblock_shortcode_share_url_reddit' );
/**
 * Check Documentation#24297
 *
 * @param object|array|string $dragblock_s_queries check var-def#24297.
 */
function dragblock_shortcode_share_url_reddit( $dragblock_s_queries ) {
	if ( empty( $_SERVER['REQUEST_URI'] ) ) {
		return '';
	}
	return 'https://www.reddit.com/submit?url=' . esc_url_raw( sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ) ) );
}
add_shortcode( 'dragblock.share.url.linkedin', 'dragblock_shortcode_share_url_linkedin' );
/**
 * Check Documentation#24305
 *
 * @param object|array|string $dragblock_s_queries check var-def#24305.
 */
function dragblock_shortcode_share_url_linkedin( $dragblock_s_queries ) {
	if ( empty( $_SERVER['REQUEST_URI'] ) ) {
		return '';
	}
	return 'https://www.linkedin.com/sharing/share-offsite/?url=' . esc_url_raw( sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ) ) );
}
add_shortcode( 'dragblock.share.url.gmail', 'dragblock_shortcode_share_url_gmail' );
/**
 * Check Documentation#24313
 *
 * @param object|array|string $dragblock_s_queries check var-def#24313.
 */
function dragblock_shortcode_share_url_gmail( $dragblock_s_queries ) {
	if ( empty( $_SERVER['REQUEST_URI'] ) ) {
		return '';
	}
	return 'https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&body=' . esc_url_raw( sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ) ) );
}
add_shortcode( 'dragblock.share.url.email', 'dragblock_shortcode_share_url_email' );
/**
 * Check Documentation#24321
 *
 * @param object|array|string $dragblock_s_queries check var-def#24321.
 */
function dragblock_shortcode_share_url_email( $dragblock_s_queries ) {
	if ( empty( $_SERVER['REQUEST_URI'] ) ) {
		return '';
	}
	return 'mailto:?body=' . esc_url_raw( sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ) ) );
}
add_shortcode( 'dragblock.share.url.navigator', 'dragblock_shortcode_share_url_navigator' );
/**
 * Check Documentation#24329
 *
 * @param object|array|string $dragblock_s_queries check var-def#24329.
 */
function dragblock_shortcode_share_url_navigator( $dragblock_s_queries ) {
	return 'javascript:navigator.share?navigator.share({url:location.href}):null';
}
add_filter( 'kses_allowed_protocols', 'dragblock_kses_allowed_protocols', 1 );
/**
 * Check Documentation#24334
 *
 * @param object|array|string $dragblock_s_formatted check var-def#24334.
 */
function dragblock_kses_allowed_protocols( $dragblock_s_formatted ) {
	$dragblock_s_formatted[] = 'data';
	$dragblock_s_formatted[] = 'javascript';
	return $dragblock_s_formatted;
}
