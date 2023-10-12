<?php
/**
 * DragBlock's Form-entries.
 *
 * @package Form render
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
global $dragblock_form_script_required;
$dragblock_form_script_required = false;
add_filter( 'render_block', 'dragblock_form_render', 10, 2 );
/**
 * Check Documentation#95
 *
 * @param object|array|string $dragblock_fr_dragblock check var-def#95.
 * @param object|array|string $dragblock_fr_form check var-def#95.
 */
function dragblock_form_render( $dragblock_fr_dragblock, $dragblock_fr_form ) {
	// dev-reply#911.
	if ( empty( $dragblock_fr_form['attrs']['dragBlockClientId'] ) ) {
		return $dragblock_fr_dragblock;
	}
	// dev-reply#917.
	if (
		'dragblock/form' !== $dragblock_fr_form['blockName'] ||
		strpos( $dragblock_fr_dragblock, '[dragblock.form.action]' ) === false
	) {
		return str_replace( '__dragblock_wp_reseved_terms', '', $dragblock_fr_dragblock );
	}
	global $dragblock_form_script_required;
	$dragblock_form_script_required = true;
	// dev-reply#928.
	$dragblock_fr_script = false;
	if ( $dragblock_fr_form['attrs']['dragBlockAttrs'] ) {
		foreach ( $dragblock_fr_form['attrs']['dragBlockAttrs'] as $dragblock_fr_required ) {
			if ( 'action' === $dragblock_fr_required['slug'] ) {
				if ( trim( $dragblock_fr_required['value'] ) === '[dragblock.form.action]' ) {
					$dragblock_fr_script = true;
				}
				break;
			}
		}
	}
	// dev-reply#941.
	if ( ! $dragblock_fr_script ) {
		return $dragblock_fr_dragblock;
	}
	// dev-reply#946.
	$dragblock_fr_block = '';
	foreach ( $dragblock_fr_form['attrs']['dragBlockAttrs'] as $dragblock_fr_required ) {
		if ( 'name' === $dragblock_fr_required['slug'] ) {
			if ( $dragblock_fr_required['value'] ) {
				$dragblock_fr_block = $dragblock_fr_required['value'];
			}
			break;
		}
	}
	if ( ! $dragblock_fr_block && $dragblock_fr_form['attrs']['dragBlockClientId'] ) {
		$dragblock_fr_block = $dragblock_fr_form['attrs']['dragBlockClientId'];
	}
	// dev-reply#964.
	$dragblock_fr_content = strrpos( $dragblock_fr_dragblock, '</form>' );
	if ( false !== $dragblock_fr_content ) {
		$dragblock_fr_parsed = '';
		// dev-reply#968.
		if ( $dragblock_fr_block ) {
			// dev-reply#970.
			if ( strlen( $dragblock_fr_block ) > 32 ) {
				$dragblock_fr_block = substr( $dragblock_fr_block, 0, 32 );
			}
			// dev-reply#975.
			$dragblock_fr_block = sanitize_key( $dragblock_fr_block );
			$dragblock_fr_parsed .= '<input type="hidden" name="dragblock/form-client-id" value="' . esc_attr( $dragblock_fr_block ) . '"/>';
		}
		// dev-reply#981.
		$dragblock_fr_parsed .= '<input type="text" name="dragblock/form-title" value="">';
		$dragblock_fr_dragblock = substr( $dragblock_fr_dragblock, 0, $dragblock_fr_content ) . ' ' . $dragblock_fr_parsed . substr( $dragblock_fr_dragblock, $dragblock_fr_content );
	}
	// dev-reply#991.
	global $dragblock_form_entries_message_error;
	// dev-reply#994.
	$dragblock_fr_hasaction = 'class="';
	$dragblock_fr_attr = strpos( $dragblock_fr_dragblock, $dragblock_fr_hasaction );
	if ( false === $dragblock_fr_attr ) {
		$dragblock_fr_hasaction = 'class=\'';
		$dragblock_fr_attr = strpos( $dragblock_fr_dragblock, $dragblock_fr_hasaction );
	}
	if ( false !== $dragblock_fr_attr && isset( $dragblock_form_entries_message_error[ $dragblock_fr_block ] ) ) {
		$dragblock_fr_attr += strlen( $dragblock_fr_hasaction );
		if ( false === $dragblock_form_entries_message_error[ $dragblock_fr_block ] ) {
			// dev-reply#9106.
			$dragblock_fr_dragblock = substr( $dragblock_fr_dragblock, 0, $dragblock_fr_attr ) . 'pass ' . substr( $dragblock_fr_dragblock, $dragblock_fr_attr );
		} else {
			// dev-reply#9109.
			$dragblock_fr_dragblock = substr( $dragblock_fr_dragblock, 0, $dragblock_fr_attr ) . 'fail ' . substr( $dragblock_fr_dragblock, $dragblock_fr_attr );
		}
	}
	// dev-reply#9114.
	$dragblock_fr_dragblock = str_replace(
		'[dragblock.form.message.error]',
		! empty( $dragblock_form_entries_message_error[ $dragblock_fr_block ] ) ? $dragblock_form_entries_message_error[ $dragblock_fr_block ] : '',
		$dragblock_fr_dragblock
	);
	// dev-reply#9121.
	$dragblock_fr_dragblock = str_replace( '[dragblock.form.action]', '', $dragblock_fr_dragblock );
	return $dragblock_fr_dragblock;
}
