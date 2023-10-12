import { __ } from '@wordpress/i18n';
import { Button, Icon } from '@wordpress/components';
function DragBlockLast( { toggleIsHelpOpen } ) {
	const { adminUrl } = dragBlockFontLib;
	return (
		<>
			<div className="manage-fonts-header-flex">
				<h1 className="wp-heading-inline">
					{ __( 'Font Library', 'dragblock' ) }
				</h1>
				<div className="buttons">
					<Button
						href={ `${ adminUrl }admin.php?page=dragblock-add-google-fonts` }
						variant="secondary"
					>
						{ __( 'Add Google Font', 'dragblock' ) }
					</Button>
					<Button
						href={ `${ adminUrl }admin.php?page=dragblock-add-local-fonts` }
						variant="secondary"
					>
						{ __( 'Add Local Font', 'dragblock' ) }
					</Button>
				</div>
			</div>
			<hr className="wp-header-end" />
			<p className="help">
				{ __(
					'There may be some fonts currently embedded in your theme',
					'dragblock'
				) }
				<Button
					onClick={ toggleIsHelpOpen }
					style={ { padding: '0', height: '1rem' } }
				>
					<Icon icon={ 'info' } />
				</Button>
			</p>
		</>
	);
}
export default DragBlockLast;