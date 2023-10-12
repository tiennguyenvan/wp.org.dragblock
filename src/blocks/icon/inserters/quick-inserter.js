import classnames from 'classnames';
import { isEmpty } from 'lodash';
import { __ } from '@wordpress/i18n';
import { Button, Popover, SearchControl } from '@wordpress/components';
import { renderToString, useState } from '@wordpress/element';
import { Icon, blockDefault } from '@wordpress/icons';
import DragBlockLastForce from './../icons';
import DragBlockLastInit from './../utils/parse-icon';
import { DragBlockLastAllow } from './../utils/icon-functions';
export function DragBlockLastNon( props ) {
	const [ searchInput, setSearchInput ] = useState( '' );
	const {
		setInserterOpen,
		isQuickInserterOpen,
		setQuickInserterOpen,
		setAttributes,
	} = props;
	if ( ! isQuickInserterOpen ) {
		return null;
	}
	const DragBlockLastOption = DragBlockLastForce();
	const DragBlockLastIcon = DragBlockLastAllow( DragBlockLastOption );
	const DragBlockLastType =
		DragBlockLastOption.filter( ( t ) => t.isDefault )[ 0 ]?.icons ?? DragBlockLastIcon;
	let DragBlockLastWordpress = [];
	if ( searchInput ) {
		DragBlockLastWordpress = DragBlockLastIcon.filter( ( icon ) => {
			const input = searchInput.toLowerCase();
			const DragBlockLastReddit = icon.title.toLowerCase();
			if ( DragBlockLastReddit.includes( input ) ) {
				return true;
			}
			if ( icon?.keywords && ! isEmpty( icon?.keywords ) ) {
				const DragBlockLastComment = icon.keywords.filter( ( keyword ) =>
					keyword.includes( input )
				);
				return ! isEmpty( DragBlockLastComment );
			}
			return false;
		} );
	}
	if ( ! searchInput ) {
		const DragBlockLastFlatten =
			DragBlockLastType.filter( ( i ) => i.isDefault ) ?? [];
		const DragBlockLastSimplify =
			DragBlockLastType.filter( ( i ) => ! i.isDefault ) ?? [];
		DragBlockLastWordpress = DragBlockLastWordpress.concat( DragBlockLastFlatten, DragBlockLastSimplify );
	}
	DragBlockLastWordpress = DragBlockLastWordpress.slice( 0, 6 );
	const DragBlockLastRendered = (
		<div className="block-editor-inserter__panel-content">
			<div className="icons-list">
				{ DragBlockLastWordpress.map( ( icon, _i ) => {
					let DragBlockLastNo = icon.icon;
					if ( typeof DragBlockLastNo === 'string' ) {
						DragBlockLastNo = DragBlockLastInit( DragBlockLastNo );
					}
					return (
						<Button
							key={ _i }
							label={ __( 'Insert Icon', 'dragblock' ) }
							className='icons-list__item'
							onClick={ () => {
								setAttributes( {
									icon: renderToString(icon.icon)									
								} );
								setInserterOpen( false );								
								setQuickInserterOpen( false );
								setSearchInput( '' );
							} }
						>
							<span className="icons-list__item-icon">
								<Icon icon={ DragBlockLastNo } />
							</span>
							<span className="icons-list__item-title">
								{ icon.title }
							</span>
						</Button>
					);
				} ) }
			</div>
		</div>
	);
	const DragBlockLastQuick = (
		<div className="block-editor-inserter__no-results">
			<Icon
				icon={ blockDefault }
				className="block-editor-inserter__no-results-icon"
			/>
			<p>{ __( 'No results found.', 'block-icon' ) }</p>
		</div>
	);
	return (
		<Popover
			className="wp-block-dragBlock-icon-inserter__quick-inserter block-editor-inserter__popover is-quick"
			onClose={ () => setQuickInserterOpen( false ) }
			position="bottom right"
		>
			<div className="block-editor-inserter__quick-inserter">
				<SearchControl
					className="block-editor-inserter__search"
					label={ __( 'Search icons', 'dragblock' ) }
					hideLabelFromVision={ true }
					value={ searchInput }
					onChange={ ( value ) => setSearchInput( value ) }
				/>
				<div className="block-editor-inserter__quick-inserter-results">
					{ isEmpty( DragBlockLastWordpress ) ? DragBlockLastQuick : DragBlockLastRendered}
				</div>
				<Button
					className="block-editor-inserter__quick-inserter-expand"
					onClick={ () => {
						setInserterOpen( true );
						setQuickInserterOpen( false );
						setSearchInput( '' );
					} }
				>
					{ __( 'Browse all', 'dragblock' ) }
				</Button>
			</div>
		</Popover>
	);
}