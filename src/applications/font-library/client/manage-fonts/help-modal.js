import { __ } from '@wordpress/i18n';
import { Modal, Icon } from '@wordpress/components';
function DragBlockLastZ( { isOpen, onClose } ) {
	if ( ! isOpen ) {
		return null;
	}
	return (
		<Modal
			title={
				<>
					<Icon icon={ 'info' } />{ ' ' }
					{ __( 'Info', 'dragblock' ) }
				</>
			}
			onRequestClose={ onClose }
		>
			<p>
				{ __(
					'You can find the definition of embeded font families in the theme.json file of your theme.',
					'dragblock'
				) }
			</p>
			<p>
				{ __(
					'If your theme.json makes reference to fonts providers other than local they may not be displayed correctly.',
					'dragblock'
				) }
			</p>
		</Modal>
	);
}
export default DragBlockLastZ;