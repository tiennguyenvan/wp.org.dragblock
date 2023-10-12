<?php
/**
 * DragBlock's Font-library.
 *
 * @package Class dragblock manage fonts admin
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
/**
 * Check class-def#242
 */
class DragBlock_Manage_Fonts_Admin {
	/**
	 * Check Documentation#244
	 */
	public function __construct() {
		// dev-reply#248.
		add_action( 'init', array( $this, 'save_manage_fonts_changes' ), 1 ); // dev-reply#249.
		add_action( 'admin_init', array( $this, 'save_google_fonts' ) );
		add_action( 'admin_init', array( $this, 'save_local_fonts' ) );
		add_action( 'admin_menu', array( $this, 'create_admin_menu' ) );
		add_filter( 'wp_check_filetype_and_ext', array( $this, 'wp_check_filetype_and_ext' ), 10, 4 );
	}
	const ALLOWED_FONT_MIME_TYPES = array(
		'otf'   => 'font/otf',
		'ttf'   => 'font/ttf',
		'woff'  => 'font/woff',
		'woff2' => 'font/woff2',
	);
	// dev-reply#2423.
	/**
	 * Check Documentation#2420
	 *
	 * @param object|array|string $dragblock_cdmfa_this check var-def#2420.
	 * @param object|array|string $dragblock_cdmfa_wp check var-def#2420.
	 * @param object|array|string $dragblock_cdmfa_check check var-def#2420.
	 * @param object|array|string $dragblock_cdmfa_filetype check var-def#2420.
	 */
	public function wp_check_filetype_and_ext( $dragblock_cdmfa_this, $dragblock_cdmfa_wp, $dragblock_cdmfa_check, $dragblock_cdmfa_filetype ) {
		if (
			! empty( $dragblock_cdmfa_this['ext'] ) ||
			! empty( $dragblock_cdmfa_this['type'] ) ||
			! empty( $dragblock_cdmfa_this['proper_filename '] )
		) {
			return $dragblock_cdmfa_this;
		}
		$dragblock_cdmfa_and = pathinfo( sanitize_file_name( $dragblock_cdmfa_check ), PATHINFO_EXTENSION );
		if ( empty( $dragblock_cdmfa_and ) ) {
			return $dragblock_cdmfa_this;
		}
		$dragblock_cdmfa_this['ext'] = $dragblock_cdmfa_and;
		if ( ! empty( self::ALLOWED_FONT_MIME_TYPES[ $dragblock_cdmfa_and ] ) ) {
			$dragblock_cdmfa_this['type'] = self::ALLOWED_FONT_MIME_TYPES[ $dragblock_cdmfa_and ];
		}
		return $dragblock_cdmfa_this;
	}
	/**
	 * Check Documentation#2439
	 *
	 * @param object|array|string $dragblock_cdmfa_wp check var-def#2439.
	 */
	public function has_font_mime_type( $dragblock_cdmfa_wp ) {
		$dragblock_cdmfa_ext = wp_check_filetype( $dragblock_cdmfa_wp, self::ALLOWED_FONT_MIME_TYPES );
		return in_array( $dragblock_cdmfa_ext['type'], self::ALLOWED_FONT_MIME_TYPES, true );
	}
	/**
	 * Check Documentation#2444
	 */
	public function create_admin_menu() {
		if ( ! wp_is_block_theme() ) {
			return;
		}
		// dev-reply#2460.
		add_submenu_page(
			DRAGBLOCK_ADMIN_MENU_SLUG,
			_x( 'Font Library', 'UI String', 'dragblock' ), // dev-reply#2466.
			_x( 'Font Library', 'UI String', 'dragblock' ), // dev-reply#2467.
			'edit_theme_options',
			DRAGBLOCK_FONT_LIB_SLUG,
			array( 'DragBlock_Fonts_Page', 'manage_fonts_admin_page' )
		);
		add_submenu_page(
			DRAGBLOCK_FONT_LIB_SLUG . '-google-font',
			_x( 'Embed Google font in the site editor', 'UI String', 'dragblock' ), // dev-reply#2475.
			_x( 'Embed Google Font', 'UI String', 'dragblock' ), // dev-reply#2476.
			'edit_theme_options',
			'dragblock-add-google-fonts',
			array( 'DragBlock_Google_Fonts', 'google_fonts_admin_page' )
		);
		add_submenu_page(
			DRAGBLOCK_FONT_LIB_SLUG . '-local-font',
			_x( 'Embed local font in the site editor', 'UI String', 'dragblock' ), // dev-reply#2485.
			_x( 'Embed local font', 'UI String', 'dragblock' ), // dev-reply#2486.
			'edit_theme_options',
			'dragblock-add-local-fonts',
			array( 'DragBlock_Local_Fonts', 'local_fonts_admin_page' )
		);
	}
	/**
	 * Check Documentation#2475
	 */
	public function has_file_and_user_permissions() {
		$dragblock_cdmfa_file = $this->user_can_edit_themes();
		$dragblock_cdmfa_filename = $this->can_read_and_write_font_assets_directory();
		return $dragblock_cdmfa_file && $dragblock_cdmfa_filename;
	}
	/**
	 * Check Documentation#2481
	 */
	public function user_can_edit_themes() {
		if ( defined( 'DISALLOW_FILE_EDIT' ) && true === DISALLOW_FILE_EDIT ) {
			add_action( 'admin_notices', array( 'DragBlock_Font_Form_Messages', 'admin_notice_file_edit_error' ) );
			return false;
		}
		if ( ! current_user_can( 'edit_themes' ) ) {
			add_action( 'admin_notices', array( 'DragBlock_Font_Form_Messages', 'admin_notice_user_cant_edit_theme' ) );
			return false;
		}
		return true;
	}
	/**
	 * Check Documentation#2493
	 */
	public function can_read_and_write_font_assets_directory() {
		// dev-reply#24116.
		$dragblock_cdmfa_mimes = get_temp_dir();
		$dragblock_cdmfa_has = DRAGBLOCK_UPLOAD_DIR . '/fonts/';
		if ( ! is_dir( $dragblock_cdmfa_has ) ) {
			// dev-reply#24122.
			wp_mkdir_p( $dragblock_cdmfa_has );
		}
		if ( ! wp_is_writable( $dragblock_cdmfa_has ) || ! is_readable( $dragblock_cdmfa_has ) || ! wp_is_writable( $dragblock_cdmfa_mimes ) ) {
			add_action( 'admin_notices', array( 'DragBlock_Font_Form_Messages', 'admin_notice_manage_fonts_permission_error' ) );
			return false;
		}
		return true;
	}
	/**
	 * Check Documentation#24108
	 */
	public function refresh_global_styles() {
		$dragblock_cdmfa_user = WP_Theme_JSON_Resolver::get_user_data_from_wp_global_styles( wp_get_theme(), true );
		if ( empty( $dragblock_cdmfa_user ) || empty( $dragblock_cdmfa_user['ID'] ) || empty( $dragblock_cdmfa_user['post_content'] ) ) {
			return;
		}
		// dev-reply#24145.
		$dragblock_cdmfa_permissions = json_decode( $dragblock_cdmfa_user['post_content'], true );
		$dragblock_cdmfa_permissions = dragblock_default_theme_json_font_lib( $dragblock_cdmfa_permissions );
		// dev-reply#24149.
		wp_update_post( array(
			'ID'           => $dragblock_cdmfa_user['ID'],
			'post_content' => json_encode( $dragblock_cdmfa_permissions ), // dev-reply#24152.,
		) );
	}
	/**
	 * Check Documentation#24123
	 *
	 * @param object|array|string $dragblock_cdmfa_temp check var-def#24123.
	 */
	public function delete_font_asset( $dragblock_cdmfa_temp ) {
		// dev-reply#24158.
		$dragblock_cdmfa_dir = str_replace( WP_CONTENT_URL, WP_CONTENT_DIR, $dragblock_cdmfa_temp['src'][0] );
		if ( file_exists( $dragblock_cdmfa_dir ) && unlink( $dragblock_cdmfa_dir ) ) {
			return true;
		}
		return add_action( 'admin_notices', array( 'DragBlock_Font_Form_Messages', 'admin_notice_font_asset_removal_error' ) );
	}
	/**
	 * Check Documentation#24132
	 *
	 * @param object|array|string $dragblock_cdmfa_font check var-def#24132.
	 */
	protected function prepare_font_families_for_database( $dragblock_cdmfa_font ) {
		$dragblock_cdmfa_assets = array();
		foreach ( $dragblock_cdmfa_font as $dragblock_cdmfa_path ) {
			if ( isset( $dragblock_cdmfa_path['fontFace'] ) ) {
				$dragblock_cdmfa_cpt = array();
				foreach ( $dragblock_cdmfa_path['fontFace'] as $dragblock_cdmfa_temp ) {
					$dragblock_cdmfa_theme = $dragblock_cdmfa_temp;
					// dev-reply#24177.
					if ( ! isset( $dragblock_cdmfa_temp['shouldBeRemoved'] ) && ! isset( $dragblock_cdmfa_path['shouldBeRemoved'] ) ) {
						$dragblock_cdmfa_cpt[] = $dragblock_cdmfa_theme;
					} else {
						$this->delete_font_asset( $dragblock_cdmfa_temp );
					}
				}
				$dragblock_cdmfa_path['fontFace'] = $dragblock_cdmfa_cpt;
			}
			if ( ! isset( $dragblock_cdmfa_path['shouldBeRemoved'] ) ) {
				$dragblock_cdmfa_assets[] = $dragblock_cdmfa_path;
			}
		}
		return $dragblock_cdmfa_assets;
	}
	/**
	 * Check Documentation#24155
	 */
	public function save_manage_fonts_changes() {
		if (
			! empty( $_POST['nonce'] ) &&
			wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['nonce'] ) ), 'dragblock_font_library' ) &&
			! empty( $_POST['dragblock-font-library-new-font-json'] ) &&
			$this->has_file_and_user_permissions()
		) {
			// dev-reply#24206.
			$dragblock_cdmfa_json = json_decode( sanitize_text_field( wp_unslash( $_POST['dragblock-font-library-new-font-json'] ) ), true );
			if ( empty( $dragblock_cdmfa_json ) ) {
				// dev-reply#24210.
				return;
			}
			$dragblock_cdmfa_face = $this->prepare_font_families_for_database( $dragblock_cdmfa_json );
			$this->replace_all_font_families( $dragblock_cdmfa_face );
			// dev-reply#24216.
			$this->refresh_global_styles();
			add_action( 'admin_notices', array( 'DragBlock_Font_Form_Messages', 'admin_notice_delete_font_success' ) );
		}
	}
	/**
	 * Check Documentation#24176
	 */
	public function save_local_fonts() {
		if (
			! empty( $_POST['nonce'] ) &&
			wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['nonce'] ) ), 'dragblock_font_library' ) &&
			! empty( $_FILES['font-file'] ) &&
			! empty( $_POST['font-name'] ) &&
			! empty( $_POST['font-weight'] ) &&
			! empty( $_POST['font-style'] ) &&
			$this->has_file_and_user_permissions()
		) {
			if (
				! empty( $_FILES ) &&
				isset( $_FILES['font-file'] ) &&
				isset( $_FILES['font-file']['name'] ) &&
				$this->has_font_mime_type( sanitize_file_name( $_FILES['font-file']['name'] ) )
			) {
				$dragblock_cdmfa_families = sanitize_title( wp_unslash( $_POST['font-name'] ) );
				$dragblock_cdmfa_prepared = sanitize_text_field( wp_unslash( $_POST['font-style'] ) );
				$dragblock_cdmfa_family = sanitize_text_field( wp_unslash( $_POST['font-weight'] ) );
				$dragblock_cdmfa_new = sanitize_text_field( wp_unslash( $_POST['font-name'] ) );
				$dragblock_cdmfa_faces = pathinfo( sanitize_file_name( wp_unslash( $_FILES['font-file']['name'] ) ), PATHINFO_EXTENSION );
				$dragblock_cdmfa_updated = $dragblock_cdmfa_families . '_' . $dragblock_cdmfa_prepared . '_' . $dragblock_cdmfa_family . '.' . $dragblock_cdmfa_faces;
				$dragblock_cdmfa_has = DRAGBLOCK_UPLOAD_DIR . '/fonts/';
				$dragblock_cdmfa_this = $dragblock_cdmfa_has . $dragblock_cdmfa_updated;
				// dev-reply#24251.
				$dragblock_cdmfa_post = array(
					'test_form' => false,
					'mines' => self::ALLOWED_FONT_MIME_TYPES,
				);
				$dragblock_cdmfa_files = wp_handle_upload( $_FILES['font-file'], $dragblock_cdmfa_post );
				if ( isset( $dragblock_cdmfa_files['error'] ) ) {
					return add_action( 'admin_notices', array( 'DragBlock_Font_Form_Messages', 'admin_notice_embed_font_file_error' ) );
				}
				// dev-reply#24265.
				if ( ! rename( $dragblock_cdmfa_files['file'], $dragblock_cdmfa_this ) ) {
					return add_action( 'admin_notices', array( 'DragBlock_Font_Form_Messages', 'admin_notice_embed_font_file_error' ) );
				}
				$dragblock_cdmfa_slug = array(
					'fontFamily' => $dragblock_cdmfa_new,
					'fontWeight' => $dragblock_cdmfa_family,
					'fontStyle'  => $dragblock_cdmfa_prepared,
					'src'        => array(
						// dev-reply#24275.
						DRAGBLOCK_UPLOAD_URL . '/fonts/' . $dragblock_cdmfa_updated,
						// dev-reply#24277.
					),
				);
				if ( ! empty( $_POST['font-variation-settings'] ) ) {
					// dev-reply#24282.
					$dragblock_cdmfa_style = sanitize_text_field( wp_unslash( $_POST['font-variation-settings'] ) );
					$dragblock_cdmfa_slug['fontVariationSettings'] = $dragblock_cdmfa_style;
				}
				$dragblock_cdmfa_cpt = array( $dragblock_cdmfa_slug );
				$this->add_or_update_font_faces( $dragblock_cdmfa_new, $dragblock_cdmfa_families, $dragblock_cdmfa_cpt );
				// dev-reply#24291.
				$this->refresh_global_styles();
				return add_action( 'admin_notices', array( 'DragBlock_Font_Form_Messages', 'admin_notice_embed_font_success' ) );
			}
			return add_action( 'admin_notices', array( 'DragBlock_Font_Form_Messages', 'admin_notice_embed_font_file_error' ) );
		}
	}
	/**
	 * Check Documentation#24238
	 *
	 * @param object|array|string $dragblock_cdmfa_weight check var-def#24238.
	 */
	public function get_font_slug( $dragblock_cdmfa_weight ) {
		$dragblock_cdmfa_name = sanitize_title( $dragblock_cdmfa_weight );
		$dragblock_cdmfa_name = preg_replace( '/\s+/', '', $dragblock_cdmfa_name ); // dev-reply#24306.
		return $dragblock_cdmfa_name;
	}
	/**
	 * Check Documentation#24244
	 */
	public function save_google_fonts() {
		if (
			! empty( $_POST['nonce'] ) &&
			wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['nonce'] ) ), 'dragblock_font_library' ) &&
			! empty( $_POST['selection-data'] ) &&
			$this->has_file_and_user_permissions()
		) {
			// dev-reply#24318.
			$dragblock_cdmfa_extension = json_decode( sanitize_text_field( wp_unslash( $_POST['selection-data'] ) ), true );
			if ( empty( $dragblock_cdmfa_extension ) ) {
				return;
			}
			foreach ( $dragblock_cdmfa_extension as $dragblock_cdmfa_path ) {
				$dragblock_cdmfa_upload = $dragblock_cdmfa_path['family'];
				$dragblock_cdmfa_families = $this->get_font_slug( $dragblock_cdmfa_upload );
				$dragblock_cdmfa_overrides = $dragblock_cdmfa_path['faces'];
				$dragblock_cdmfa_cpt = array();
				foreach ( $dragblock_cdmfa_overrides as $dragblock_cdmfa_info ) {
					// dev-reply#24330.
					$dragblock_cdmfa_faces = pathinfo( $dragblock_cdmfa_info['src'], PATHINFO_EXTENSION );
					$dragblock_cdmfa_updated = $dragblock_cdmfa_families . '_' . $dragblock_cdmfa_info['style'] . '_' . $dragblock_cdmfa_info['weight'] . '.' . $dragblock_cdmfa_faces;
					// dev-reply#24334.
					$dragblock_cdmfa_uploaded = download_url( $dragblock_cdmfa_info['src'] );
					if ( $this->has_font_mime_type( $dragblock_cdmfa_info['src'] ) ) {
						// dev-reply#24339.
						rename( $dragblock_cdmfa_uploaded, DRAGBLOCK_UPLOAD_DIR . '/fonts/' . $dragblock_cdmfa_updated );
						// dev-reply#24343.
						$dragblock_cdmfa_cpt[] = array(
							'fontFamily' => $dragblock_cdmfa_upload,
							'fontStyle'  => $dragblock_cdmfa_info['style'],
							'fontWeight' => $dragblock_cdmfa_info['weight'],
							'src'        => array(
								// dev-reply#24349.
								DRAGBLOCK_UPLOAD_URL . '/fonts/' . $dragblock_cdmfa_updated,
								// dev-reply#24354.
							),
						);
					}
				}
				$this->add_or_update_font_faces( $dragblock_cdmfa_upload, $dragblock_cdmfa_families, $dragblock_cdmfa_cpt );
				// dev-reply#24366.
			}
			$this->refresh_global_styles();
			add_action( 'admin_notices', array( 'DragBlock_Font_Form_Messages', 'admin_notice_embed_font_success' ) );
		}
	}
	/**
	 * Check Documentation#24291
	 *
	 * @param object|array|string $dragblock_cdmfa_font check var-def#24291.
	 */
	public function replace_all_font_families( $dragblock_cdmfa_font ) {
		// dev-reply#24381.
		update_option( DRAGBLOCK_FONT_LIB_SLUG, $dragblock_cdmfa_font );
	}
	/**
	 * Check Documentation#24296
	 *
	 * @param object|array|string $dragblock_cdmfa_new check var-def#24296.
	 * @param object|array|string $dragblock_cdmfa_families check var-def#24296.
	 * @param object|array|string $dragblock_cdmfa_variation check var-def#24296.
	 */
	public function add_or_update_font_faces( $dragblock_cdmfa_new, $dragblock_cdmfa_families, $dragblock_cdmfa_variation ) {
		$dragblock_cdmfa_font = get_option( DRAGBLOCK_FONT_LIB_SLUG, array() );
		$dragblock_cdmfa_font[] = array(
			'fontFamily' => $dragblock_cdmfa_new,
			'slug'       => $dragblock_cdmfa_families,
			'fontFace'   => $dragblock_cdmfa_variation,
		);
		update_option( DRAGBLOCK_FONT_LIB_SLUG, $dragblock_cdmfa_font );
	}
}
$dragblock_cdmfa_settings = new DragBlock_Manage_Fonts_Admin();
