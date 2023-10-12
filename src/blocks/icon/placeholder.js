import { __ } from '@wordpress/i18n';
import { Placeholder, Button } from '@wordpress/components';
import { Icon } from '@wordpress/icons';
import { bolt, DragBlockLastConfirm } from './icons/bolt';
import { DragBlockLastNon } from './inserters/quick-inserter';
import { sparkles } from './icons/wordpress/temp'
import {Flex} from '@wordpress/components';
import {FlexItem} from '@wordpress/components';
export default function DragBlockLastSimplified( props ) {
	const {
		setInserterOpen,
		isQuickInserterOpen,
		setQuickInserterOpen,
		setCustomInserterOpen,
		setAttributes,
		enableCustomIcons,
	} = props;
	const instructions = enableCustomIcons
		? __(
				'Choose an icon from the library or add your own custom SVG graphic.',
				'dragblock'
		  )
		: __(
				'Browse the icon library and choose one to insert.',
				'dragblock'
		  );
	return (
		<Placeholder
			className="has-illustration"
			instructions={ instructions }
		>
			<Icon
				className="components-placeholder__illustration"
				icon={ sparkles }
			/>
			<div>
			<Button isPrimary onClick={ () => setQuickInserterOpen( true ) } icon={sparkles}>
				{ __( 'Browse', 'dragblock' ) }
			</Button>
			<DragBlockLastNon
				setInserterOpen={ setInserterOpen }
				isQuickInserterOpen={ isQuickInserterOpen }
				setQuickInserterOpen={ setQuickInserterOpen }
				setAttributes={ setAttributes }
			/>			
			</div>		
			{ enableCustomIcons && (
					<Button
						isTertiary
						onClick={ () => setCustomInserterOpen( true ) }						
					>
						{ __( 'Import', 'dragblock' ) }
					</Button>
			) }
		</Placeholder>
	);
}