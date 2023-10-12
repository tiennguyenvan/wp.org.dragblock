<?php
/**
 * DragBlock's Form-entries.
 *
 * @package Form defines
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
define( 'DRAGBLOCK_FORM_ENTRY', sanitize_key( 'dragBlockFormMsg' ) ); // dev-reply#16.
global $dragblock_form_entries_message_error;
$dragblock_form_entries_message_error = array();
