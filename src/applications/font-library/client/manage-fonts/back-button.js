import { Button } from '@wordpress/components';
import { chevronLeft } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
function DragBlockLastRenderability() {
	const { adminUrl, fontLibSlug } = dragBlockFontLib;
	return (
		<Button
			varint="secondary"
			icon={ chevronLeft }
			href={ `${ adminUrl }admin.php?page=${ fontLibSlug }` }
			iconSize={ 20 }
			style={ {
				padding: '0',
				height: '1.5rem',
				minWidth: '1.5rem',
				marginLeft: '-.5rem',
			} }
			aria-label={ __( 'Back to manage fonts', 'dragblock' ) }
		></Button>
	);
}
export default DragBlockLastRenderability;